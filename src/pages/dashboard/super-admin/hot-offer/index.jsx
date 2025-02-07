import DeleteModal from '@/components/common/DeleteModal';
import SingleHotOfferCardComponent from '@/components/common/SingleHotOfferCardComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import HotOfferModal from '@/components/sAdminDashboard/modals/HotOfferModal';
import {
  useAddHotOfferInSuperAdminMutation,
  useDeleteHotOfferInSuperAdminMutation,
  useGetHotOfferInSuperAdminQuery,
  useUpdateHotOfferInSuperAdminMutation,
} from '@/slice/services/super admin/hotOfferService';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody } from 'reactstrap';
import * as Yup from 'yup';

const HotOfferForSuperAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [hotOfferId, setHotOfferId] = useState('');
  const [hotDeleteOfferId, setDeleteHotOfferId] = useState('');
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [singleHotOfferIsLoading, setSingleHotOfferIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    package_id: '',
    offer_percentage: '',
    offer_duration: '',
    hot_offer_status: '',
  });

  const [addHotOfferInSuperAdmin] = useAddHotOfferInSuperAdminMutation();
  const [updateHotOfferInSuperAdmin] = useUpdateHotOfferInSuperAdminMutation();
  const [
    deleteHotOfferInSuperAdmin,
    { isLoading: deleteHotOfferInSuperIsLoading },
  ] = useDeleteHotOfferInSuperAdminMutation();
  const {
    data: getHotOfferData,
    isLoading: getHotOfferIsLoading,
    refetch: getHotOfferRefetch,
  } = useGetHotOfferInSuperAdminQuery();

  const validationSchema = Yup.object({});

  useEffect(() => {
    if (getHotOfferData?.data?.length > 0 && hotOfferId) {
      setSingleHotOfferIsLoading(false);
      const fetchData = async () => {
        const singleHotOfferData = getHotOfferData?.data?.find(
          (item) => item?._id === hotOfferId
        );

        try {
          setInitialValues({
            name: singleHotOfferData?.name || '',
            package_id:
              {
                label: singleHotOfferData?.package?.name || '',
                value: singleHotOfferData?.package?._id || '',
              } || '',
            offer_percentage: singleHotOfferData?.offer_percentage || 0,
            offer_duration:
              {
                label: singleHotOfferData?.offer_duration || '',
                value: singleHotOfferData?.offer_duration || '',
              } || '',
            hot_offer_status:
              {
                label: singleHotOfferData?.status || '',
                value: singleHotOfferData?.status || '',
              } || '',
          });
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };
      fetchData();
      setSingleHotOfferIsLoading(true);
    }
  }, [getHotOfferData?.data, hotOfferId]);

  // add hotOffer handler
  const handleAddSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const finalData = {
      name: values?.name,
      package_id: values?.package_id,
      offer_percentage: values?.offer_percentage,
      offer_duration: values?.offer_duration,
    };
    // console.log(finalData);
    try {
      const response = await addHotOfferInSuperAdmin(finalData).unwrap();

      if (response) {
        toast.success(response?.message);
        getHotOfferRefetch();
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

  // update  hotOffer handler
  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const editData = {
      name: values?.name,
      package_id: values?.package_id?.value || values?.package_id,
      offer_percentage: values?.offer_percentage,
      offer_duration: values?.offer_duration?.value || values?.offer_duration,
      status: values?.hot_offer_status?.value || values?.hot_offer_status,
      hot_offer_id: hotOfferId,
    };

    try {
      const response = await updateHotOfferInSuperAdmin(editData).unwrap();
      if (response) {
        toast.success(response?.message);
        getHotOfferRefetch();
        resetForm();
        setHotOfferId('');
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
    setHotOfferId(id);
    setEditOpenModal(!editOpenModal);
  };

  const togDeleteModal = (itemId) => {
    setDeleteHotOfferId(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteHotOfferInSuperAdmin(id).unwrap();
      if (result) {
        toast.success(result?.message);
        getHotOfferRefetch();
        setDeleteHotOfferId('');
        setDeleteModalIsOpen(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      //
    }
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />

            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="text-secondary-alt fw-semibold d-flex align-items-center">
                  Our Hot Offer
                </h1>
                Please Select Below Your Own Offer
              </div>
              <div onClick={togOpenModal}>
                <button className="button px-4 py-2">
                  Add Hot Offer <i className="ri-add-line fw-bolder"></i>
                </button>
              </div>
            </div>
            <div>
              <Card>
                <CardBody className="bg-secondary-subtle hot-offer-full-height">
                  <div className="sqdk-pricing-table my-5 gap-5">
                    {getHotOfferIsLoading ? (
                      <LoaderSpiner />
                    ) : (
                      <>
                        {getHotOfferData?.data?.length > 0 ? (
                          getHotOfferData?.data.map((item, index) => (
                            <SingleHotOfferCardComponent
                              key={index}
                              data={item}
                              updateHotOffer={togEditOpenModal}
                              deleteHotOffer={togDeleteModal}
                            />
                          ))
                        ) : (
                          <div className="d-flex flex-column justify-content-center align-items-center text-center text-capitalize">
                            <h1 className="text-primary">
                              No hot offer found right now
                            </h1>
                            <p className="text-primary">
                              Please add a hot offer.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
            {
              // Add hot offer
              <HotOfferModal
                open={openModal}
                close={togOpenModal}
                modalHeader={'Add Hot Offer'}
                submitButton={'Add Offer'}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleAddSubmit}
              />
            }
            {
              // edit hot offer
              <HotOfferModal
                open={editOpenModal}
                close={() => (
                  setHotOfferId(''),
                  setEditOpenModal(!editOpenModal),
                  setInitialValues({})
                )}
                modalHeader={'Update Hot Offer'}
                submitButton={'Update Offer'}
                initialValues={initialValues}
                handleSubmit={handleUpdateSubmit}
                isLoading={singleHotOfferIsLoading}
              />
            }

            {/* Delete University */}
            <DeleteModal
              Open={deleteModalIsOpen}
              close={() => (
                setDeleteHotOfferId(''), setDeleteModalIsOpen(false)
              )}
              id={hotDeleteOfferId}
              handleDelete={handleDelete}
              isloading={deleteHotOfferInSuperIsLoading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HotOfferForSuperAdmin;
