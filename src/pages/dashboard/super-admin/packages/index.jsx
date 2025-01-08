import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import SinglePackageComponent from '@/components/common/SinglePackageComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import PackageModal from '@/components/sAdminDashboard/modals/PackageModal';
import {
  useGetAllPackageQuery,
  useGetSinglePackageQuery,
} from '@/slice/services/public/package/publicPackageService';
import {
  useAddPackageInSuperAdminMutation,
  useUpdatePackageInSuperAdminMutation,
} from '@/slice/services/super admin/packageService';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody } from 'reactstrap';
import * as Yup from 'yup';

const PackagePageInSuperAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [packageId, setPacakageId] = useState('');
  const [initialValues, setInitialValues] = useState({
    name: '',
    price: '',
    duration: '',
    yearly_bonus: '',
    yearly_bonus_amount: '',
    commission: '',
    family_trip: '',
    family_trip_duration: '',
    minimum_files: '',
    icon: null,
  });

  const [addPackageInSuperAdmin] = useAddPackageInSuperAdminMutation();
  const [updatePackageInSuperAdmin] = useUpdatePackageInSuperAdminMutation();
  const {
    data: getAllPackageData,
    isLoading: getAllPackageIsLoading,
    refetch: getAllPackageRefetch,
  } = useGetAllPackageQuery();
  const {
    data: getSinglePackageData,
    isLoading: getSinglePackageIsLoading,
    refetch: getSinglePackageRefetch,
  } = useGetSinglePackageQuery(packageId, {
    skip: !packageId,
  });

  useEffect(() => {
    if (getSinglePackageData?.data && packageId) {
      const fetchData = async () => {
        try {
          const file = await convertImageUrlToFile(
            getSinglePackageData?.data?.icon?.url
          );
          setInitialValues({
            name: getSinglePackageData?.data?.name || '',
            price: getSinglePackageData?.data?.price || 0,
            duration:
              {
                label: getSinglePackageData?.data?.duration,
                value: getSinglePackageData?.data?.duration,
              } || '',
            yearly_bonus:
              {
                label: getSinglePackageData?.data?.yearly_bonus,
                value: getSinglePackageData?.data?.yearly_bonus,
              } || '',
            yearly_bonus_amount:
              getSinglePackageData?.data?.yearly_bonus_amount || '',
            commission: getSinglePackageData?.data?.commission || '',
            family_trip:
              {
                label: getSinglePackageData?.data?.family_trip,
                value: getSinglePackageData?.data?.family_trip,
              } || '',
            family_trip_duration:
              {
                label: getSinglePackageData?.data?.family_trip_duration,
                value: getSinglePackageData?.data?.family_trip_duration,
              } || '',
            minimum_files: getSinglePackageData?.data?.minimum_files || '',
            icon: file,
          });
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };
      fetchData();
    }
  }, [getSinglePackageData?.data, packageId]);

  const validationSchema = Yup.object({});

  // add package handler
  const handleAddSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const editData = {
      ...values,
    };

    try {
      const finalData = new FormData();
      Object.entries(editData).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const response = await addPackageInSuperAdmin(finalData).unwrap();

      if (response) {
        toast.success(response?.message);
        getAllPackageRefetch();
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

  // update  package handler
  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const editData = {
      name: values?.name || '',
      price: values?.price || 0,
      duration: values?.duration?.value || '',
      yearly_bonus: values?.yearly_bonus?.value || '',
      yearly_bonus_amount: values?.yearly_bonus_amount || '',
      commission: values?.commission || '',
      family_trip: values?.family_trip?.value || '',
      family_trip_duration: values?.family_trip_duration?.value || '',
      minimum_files: values?.minimum_files || '',
      icon: values?.icon,
      package_id: packageId,
    };

    try {
      const finalData = new FormData();
      Object.entries(editData).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const response = await updatePackageInSuperAdmin(finalData).unwrap();
      if (response) {
        toast.success(response?.message);
        getAllPackageRefetch();
        getSinglePackageRefetch();
        resetForm();
        setPacakageId('');
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
    setPacakageId(id);
    setEditOpenModal(!editOpenModal);
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />
          <div className="h-100">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="text-secondary-alt fw-semibold d-flex align-items-center">
                  Our Popular Package
                </h1>
                Please Select Below Your Own Package
              </div>
              <div onClick={togOpenModal}>
                <button className="button px-4 py-2">
                  Add Package <i class="ri-add-line fw-bolder"></i>
                </button>
              </div>
            </div>
            <div>
              <Card>
                <CardBody className="bg-secondary-subtle hot-offer-full-height">
                  <div className="sqdk-pricing-table my-5 gap-5">
                    {getAllPackageIsLoading ? (
                      <LoaderSpiner />
                    ) : (
                      <>
                        {getAllPackageData?.data?.length > 0 ? (
                          getAllPackageData?.data.map((item, index) => (
                            <SinglePackageComponent
                              key={index}
                              data={item}
                              updatePackage={togEditOpenModal}
                            />
                          ))
                        ) : (
                          <div className="d-flex flex-column justify-content-center align-items-center text-center text-capitalize">
                            <h1 className="text-primary">
                              No hot offer found right now
                            </h1>
                            <p className="text-primary">
                              Please add a package.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          {
            <PackageModal
              open={openModal}
              close={togOpenModal}
              modalHeader={'Add Package'}
              submitButton={'Add Package'}
              initialValues={initialValues}
              validationSchema={validationSchema}
              handleSubmit={handleAddSubmit}
            />
          }

          {
            // update package
            <PackageModal
              open={editOpenModal}
              close={() => (
                setPacakageId(''),
                setEditOpenModal(!editOpenModal),
                setInitialValues({})
              )}
              modalHeader={'Update Package'}
              submitButton={'Update Package'}
              initialValues={initialValues}
              validationSchema={validationSchema}
              handleSubmit={handleUpdateSubmit}
              isLoading={getSinglePackageIsLoading}
            />
          }
        </div>
      </div>
    </Layout>
  );
};

export default PackagePageInSuperAdmin;
