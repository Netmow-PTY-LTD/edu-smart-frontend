import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import CouponModal from '@/components/sAdminDashboard/modals/CouponModal';
import {
  useAddCouponInSuperAdminMutation,
  useDeleteCouponInSuperAdminMutation,
  useGetCouponInSuperAdminQuery,
  useUpdateCouponInSuperAdminMutation,
} from '@/slice/services/super admin/couponService';
import { couponHeaders } from '@/utils/common/data';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';
import * as Yup from 'yup';

const CouponManagementInSuperAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [couponId, setCouponId] = useState('');
  const [deleteCouponId, setDeleteCouponId] = useState('');
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [singleCouponIsLoading, setSingleCouponIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;
  const [initialValues, setInitialValues] = useState({
    name: '',
    start_date: '',
    end_date: '',
    package_id: null,
    discount_percentage: '',
    coupon_status: '',
    package_duration: '',
  });

  const [addCouponInSuperAdmin] = useAddCouponInSuperAdminMutation();
  const [updateCouponInSuperAdmin] = useUpdateCouponInSuperAdminMutation();
  const [
    deleteCouponInSuperAdmin,
    { isLoading: deleteCouponInSuperIsLoading },
  ] = useDeleteCouponInSuperAdminMutation();

  const {
    data: getCouponData,
    isLoading: getCouponIsLoading,
    refetch: getCouponRefetch,
  } = useGetCouponInSuperAdminQuery();

  const validationSchema = Yup.object({});

  useEffect(() => {
    if (getCouponData?.data?.length > 0 && couponId) {
      setSingleCouponIsLoading(false);

      const fetchData = async () => {
        const singleCouponData = getCouponData?.data?.find(
          (item) => item?._id === couponId
        );

        console.log(singleCouponData);

        const allPackagesData =
          singleCouponData?.packages?.length > 0 &&
          singleCouponData?.packages.map((item) => ({
            label: item?.name,
            value: item?._id,
          }));

        console.log(allPackagesData);

        try {
          setInitialValues({
            name: singleCouponData?.code || '',
            start_date: singleCouponData?.start_date || '',
            end_date: singleCouponData?.expiry_date || '',
            package_id: allPackagesData || '',
            offer_percentage: singleCouponData?.offer_percentage || 0,
            package_duration: singleCouponData?.package_duration || 0,
            discount_percentage: singleCouponData?.discount_percentage || '',
            coupon_status:
              {
                label: singleCouponData?.status || '',
                value: singleCouponData?.status || '',
              } || '',
          });
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };
      fetchData();
      setSingleCouponIsLoading(true);
    }
  }, [getCouponData?.data, couponId]);

  console.log(initialValues);

  // add Coupon handler
  const handleAddSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    const startDate = values?.start_date.split('T')[0];
    const endDate = values?.end_date.split('T')[0];

    const finalData = {
      code: values?.name,
      start_date: startDate,
      expiry_date: endDate,
      package_duration: values?.package_duration,
      discount_percentage: values?.discount_percentage,
      packages: values.package_id,
      status: values?.coupon_status,
    };

    console.log(finalData);

    try {
      const response = await addCouponInSuperAdmin(finalData).unwrap();
      // console.log(response);
      if (response) {
        toast.success(response?.message);
        getCouponRefetch();
        resetForm();
        setOpenModal(!openModal);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // update  Coupon handler
  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const startDate = values?.start_date.split('T')[0];
    const endDate = values?.end_date.split('T')[0];

    console.log(values);

    const editData = {
      code: values?.name,
      start_date: startDate,
      expiry_date: endDate,
      package_duration: values?.package_duration,
      discount_percentage: values?.discount_percentage,
      packages:
        typeof values?.package_id?.[0] === 'object'
          ? values?.package_id.map((item) => item?.value)
          : values?.package_id,
      status: values?.coupon_status?.value || values?.coupon_status,
      coupon_id: couponId,
    };

    console.log(editData);

    try {
      const response = await updateCouponInSuperAdmin(editData).unwrap();
      if (response) {
        toast.success(response?.message);
        getCouponRefetch();
        resetForm();
        setCouponId('');
        setEditOpenModal(!editOpenModal);
        setInitialValues({});
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const togOpenModal = () => {
    setOpenModal(!openModal);
  };

  const togEditOpenModal = (id) => {
    setCouponId(id);
    setEditOpenModal(!editOpenModal);
  };

  const togDeleteModal = (itemId) => {
    setDeleteCouponId(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteCouponInSuperAdmin(id).unwrap();
      if (result) {
        toast.success(result?.message);
        getCouponRefetch();
        setDeleteCouponId('');
        setDeleteModalIsOpen(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      //
    }
  };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    getCouponData?.data?.length > 0 &&
    getCouponData?.data.filter((item) =>
      item?.code?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const allCouponHeaderAction = {
    title: 'Action',
    key: 'actions',
    render: (item) => (
      <div
        onClick={() => togEditOpenModal(item._id)}
        className="text-primary cursor-pointer"
      >
        <i className="ri-pencil-fill align-start me-2 text-muted"></i>
        Edit
      </div>
    ),
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container">
          <div className="h-100">
            <ToastContainer />
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="text-secondary-alt fw-semibold d-flex align-items-center">
                  All Coupon
                </h1>
              </div>
              <div onClick={togOpenModal}>
                <button className="button px-4 py-2">
                  Add New Coupon <i className="ri-add-line fw-bolder"></i>
                </button>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h2>All Agents</h2>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>
                <CardBody>
                  <div className="sqdk-pricing-table">
                    {getCouponIsLoading ? (
                      <LoaderSpiner />
                    ) : (
                      <>
                        <CardBody>
                          <CommonTableComponent
                            headers={[...couponHeaders, allCouponHeaderAction]}
                            data={isFilteredData ? isFilteredData : []}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            perPageData={perPageData}
                            searchTerm={searchTerm}
                            handleSearchChange={handleSearchChange}
                            emptyMessage="No Data found yet."
                          />
                        </CardBody>
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
            {
              // Add Coupon
              <CouponModal
                open={openModal}
                close={togOpenModal}
                modalHeader={'Add New Coupon'}
                submitButton={'Add Coupon'}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleAddSubmit}
              />
            }
            {
              // edit Coupon
              <CouponModal
                open={editOpenModal}
                close={() => (
                  setCouponId(''),
                  setEditOpenModal(!editOpenModal),
                  setInitialValues({})
                )}
                modalHeader={'Update Coupon'}
                submitButton={'Update Coupon'}
                initialValues={initialValues}
                handleSubmit={handleUpdateSubmit}
                isLoading={singleCouponIsLoading}
              />
            }
            {
              <DeleteModal
                Open={deleteModalIsOpen}
                close={() => (
                  setDeleteCouponId(''), setDeleteModalIsOpen(false)
                )}
                id={deleteCouponId}
                handleDelete={handleDelete}
                isloading={deleteCouponInSuperIsLoading}
              />
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CouponManagementInSuperAdmin;
