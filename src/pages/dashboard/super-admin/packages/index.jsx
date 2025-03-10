import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import SinglePackageComponent from '@/components/common/SinglePackageComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import PackageModal from '@/components/sAdminDashboard/modals/PackageModal';
import {
  useGetAllPackageQuery,
  useGetSinglePackageQuery,
} from '@/slice/services/public/package/publicPackageService';
import { useGetHotOfferInSuperAdminQuery } from '@/slice/services/super admin/hotOfferService';
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
  const [packageDetailsData, setPackageDetailsData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: '',
    price: '',
    duration: '',
    monthly_minimum_files: '',
    yearly_bonus: '',
    yearly_bonus_amount: '',
    yearly_bonus_minimum_files: '',
    commission: '',
    family_trip: '',
    family_trip_duration: '',
    family_trip_minimum_files: '',
    family_trip_note: '',
    icon: null,
  });

  const [addPackageInSuperAdmin] = useAddPackageInSuperAdminMutation();
  const [updatePackageInSuperAdmin] = useUpdatePackageInSuperAdminMutation();

  const {
    data: getSinglePackageData,
    isLoading: getSinglePackageIsLoading,
    refetch: getSinglePackageRefetch,
  } = useGetSinglePackageQuery(packageId, {
    skip: !packageId,
  });

  const {
    data: getAllPackageData,
    isLoading: getAllPackageIsLoading,
    refetch: getAllPackageRefetch,
  } = useGetAllPackageQuery();

  const {
    data: getHotOfferData,
    isLoading: getHotOfferIsLoading,
    refetch: getHotOfferRefetch,
  } = useGetHotOfferInSuperAdminQuery();

  useEffect(() => {
    if (
      getAllPackageData?.data?.length > 0 ||
      getHotOfferData?.data?.length > 0
    ) {
      const updatedPackageData = getAllPackageData?.data.map((packageItem) => {
        const matchedOffers = getHotOfferData?.data.find(
          (offerItem) => packageItem?._id === offerItem?.package?._id
        );
        if (matchedOffers) {
          return {
            ...packageItem,
            hot_offer: matchedOffers,
          };
        }
        return packageItem;
      });
      setPackageDetailsData(updatedPackageData);
    }
  }, [getHotOfferData?.data, getAllPackageData?.data]);

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
            monthly_minimum_files:
              getSinglePackageData?.data?.monthly_minimum_files || 0,
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
            yearly_bonus_minimum_files:
              getSinglePackageData?.data?.yearly_bonus_minimum_files || '',
            commission: getSinglePackageData?.data?.commission || '',
            family_trip:
              {
                label: getSinglePackageData?.data?.family_trip,
                value: getSinglePackageData?.data?.family_trip,
              } || '',
            family_trip_duration:
              getSinglePackageData?.data?.family_trip_duration || '',
            family_trip_minimum_files:
              getSinglePackageData?.data?.family_trip_minimum_files || '',
            family_trip_note:
              getSinglePackageData?.data?.family_trip_note || '',
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

    const durationValue = values?.duration?.split('_')[0];
    const totalAmount = durationValue * values?.price;

    const editData = {
      ...values,
      total_package_price: totalAmount,
    };

    // console.log(editData);

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

    const durationValue = values?.duration?.value
      ? values?.duration?.value?.split('_')[0]
      : values?.duration.split('_')[0];

    const totalAmount = durationValue * values?.price;

    // console.log(totalAmount);

    const editData = {
      name: values?.name || '',
      price: values?.price || 0,
      total_package_price: totalAmount || 0,
      monthly_minimum_files: values?.monthly_minimum_files || 0,
      duration: values?.duration?.value || values?.duration || '',
      yearly_bonus: values?.yearly_bonus?.value
        ? values?.yearly_bonus?.value
        : values?.yearly_bonus?.value === false
          ? values?.yearly_bonus?.value
          : values?.yearly_bonus
            ? values?.yearly_bonus
            : values?.yearly_bonus === false
              ? values?.yearly_bonus
              : '',
      yearly_bonus_amount: values?.yearly_bonus_amount || '',
      yearly_bonus_minimum_files: values?.yearly_bonus_minimum_files || '',
      commission: values?.commission || '',
      family_trip: values?.family_trip?.value
        ? values?.family_trip?.value
        : values?.family_trip?.value === false
          ? values?.family_trip?.value
          : values?.family_trip
            ? values?.family_trip
            : values?.family_trip === false
              ? values?.family_trip
              : '',
      family_trip_duration: values?.family_trip_duration || '',
      family_trip_minimum_files: values?.family_trip_minimum_files || '',
      family_trip_note: values?.family_trip_note || '',
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
                  Add Package <i className="ri-add-line fw-bolder"></i>
                </button>
              </div>
            </div>
            <div>
              <Card>
                <CardBody className="bg-secondary-subtle hot-offer-full-height">
                  <div className="sqdk-pricing-table my-5 gap-5">
                    {getAllPackageIsLoading || getHotOfferIsLoading ? (
                      <LoaderSpiner />
                    ) : (
                      <>
                        {packageDetailsData?.length > 0 ? (
                          packageDetailsData.map((item, index) => (
                            <SinglePackageComponent
                              key={index}
                              data={item}
                              updatePackage={togEditOpenModal}
                            />
                          ))
                        ) : (
                          <div className="d-flex flex-column justify-content-center align-items-center text-center text-capitalize">
                            <h1 className="text-primary">
                              No package found right now
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
