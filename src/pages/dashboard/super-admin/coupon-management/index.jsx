import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import Layout from '@/components/layout';
import CouponModal from '@/components/sAdminDashboard/modals/CouponModal';
import { couponHeaders } from '@/utils/common/data';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
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
    package_duration: '',
    coupon_status: '',
  });

  //   const [addCouponInSuperAdmin] = useAddCouponInSuperAdminMutation();
  //   const [updateCouponInSuperAdmin] = useUpdateCouponInSuperAdminMutation();
  //   const [
  //     deleteCouponInSuperAdmin,
  //     { isLoading: deleteCouponInSuperIsLoading },
  //   ] = useDeleteCouponInSuperAdminMutation();
  //   const {
  //     data: getCouponData,
  //     isLoading: getCouponIsLoading,
  //     refetch: getCouponRefetch,
  //   } = useGetCouponInSuperAdminQuery();

  const validationSchema = Yup.object({});

  //   useEffect(() => {
  //     if ('getCouponData'?.data?.length > 0 && couponId) {
  //       setSingleCouponIsLoading(false);
  //       const fetchData = async () => {
  //         const singleCouponData = 'getCouponData'?.data?.find(
  //           (item) => item?._id === couponId
  //         );

  //         try {
  //           setInitialValues({
  //             name: singleCouponData?.name || '',
  //             package_id:
  //               {
  //                 label: singleCouponData?.package?.name || '',
  //                 value: singleCouponData?.package?._id || '',
  //               } || '',
  //             offer_percentage: singleCouponData?.offer_percentage || 0,
  //             offer_duration:
  //               {
  //                 label: singleCouponData?.offer_duration || '',
  //                 value: singleCouponData?.offer_duration || '',
  //               } || '',
  //             hot_offer_status:
  //               {
  //                 label: singleCouponData?.status || '',
  //                 value: singleCouponData?.status || '',
  //               } || '',
  //           });
  //         } catch (error) {
  //           console.error('Error loading data:', error);
  //         }
  //       };
  //       fetchData();
  //       setSingleCouponIsLoading(true);
  //     }
  //   }, [getCouponData?.data, couponId]);

  // add Coupon handler
  const handleAddSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const finalData = {
      name: values?.name,
      start_date: values?.start_date,
      end_date: values?.end_date,
      package_duration: values?.package_duration,
      package_id: values?.package_id,
      coupon_status: values?.coupon_status,
    };

    // const date = values?.start_date.split('T')[0];
    // const time = values?.start_date.split('T')[1];

    // console.log('Date:', date);
    // console.log('Time:', time);

    console.log(finalData);
    //   try {
    //     const response = await addCouponInSuperAdmin(finalData).unwrap();

    //     if (response) {
    //       toast.success(response?.message);
    //       getCouponRefetch();
    //       resetForm();
    //       setOpenModal(!openModal);
    //     }
    //   } catch (error) {
    //     const errorMessage = error?.data?.message;

    //     toast.error(errorMessage);
    //   } finally {
    //     setSubmitting(false);
    //   }
  };

  // update  Coupon handler
  //   const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
  //     setSubmitting(true);
  //     const editData = {
  //       name: values?.name,
  //          start_date: values?.start_date,
  //   end_date: values?.end_date,
  //   package_duration: values?.package_duration,
  //       package_id: values?.package_id?.value || values?.package_id,
  //       coupon_status: values?.coupon_status?.value || values?.coupon_status,
  //       coupon_id: couponId,
  //     };

  //     try {
  //       const response = await updateCouponInSuperAdmin(editData).unwrap();
  //       if (response) {
  //         toast.success(response?.message);
  //         getCouponRefetch();
  //         resetForm();
  //         setCouponId('');
  //         setEditOpenModal(!editOpenModal);
  //         setInitialValues({});
  //       }
  //     } catch (error) {
  //       const errorMessage = error?.data?.message;
  //       toast.error(errorMessage);
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

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

  //    const handleDelete = async (id) => {
  //       try {
  //         const result = await deleteCouponInSuperAdmin(id).unwrap();
  //         if (result) {
  //           toast.success(result?.message);
  //           getCouponRefetch();
  //           setDeleteCouponId('');
  //           setDeleteModalIsOpen(false);
  //         }
  //       } catch (error) {
  //         const errorMessage = error?.data?.message;
  //         toast.error(errorMessage);
  //       } finally {
  //         //
  //       }
  //     };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  //   // Filter data for search option
  //   const isFilteredData =
  //     getCouponData?.data?.length > 0 &&
  //     getCouponData?.data.filter((item) =>
  //       item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  //     );

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
                    {/* {getCouponIsLoading ? (
                      <LoaderSpiner />
                    ) : ( */}
                    <>
                      <CardBody>
                        <CommonTableComponent
                          headers={couponHeaders}
                          //   data={'isFilteredData' ? 'isFilteredData' : []}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          perPageData={perPageData}
                          searchTerm={searchTerm}
                          handleSearchChange={handleSearchChange}
                          emptyMessage="No Data found yet."
                        />
                      </CardBody>
                    </>
                    {/* )} */}
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
                handleSubmit={'handleUpdateSubmit'}
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
                handleDelete={'handleDelete'}
                isloading={'deleteCouponInSuperIsLoading'}
              />
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CouponManagementInSuperAdmin;
