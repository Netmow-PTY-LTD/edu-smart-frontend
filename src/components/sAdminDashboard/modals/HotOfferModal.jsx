import NumberField from '@/components/common/formField/NumberField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextField from '@/components/common/formField/TextField';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetAllPackageQuery } from '@/slice/services/public/package/publicPackageService';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const HotOfferModal = ({
  modalHeader,
  submitButton,
  open,
  close,
  initialValues,
  validationSchema,
  handleSubmit,
  singleHotOfferIsLoading,
}) => {
  const [allPackages, setAllPackages] = useState(null);
  const {
    data: getAllPackageData,
    isLoading: getAllPackageIsLoading,
    refetch: getAllPackageRefetch,
  } = useGetAllPackageQuery();

  useEffect(() => {
    if (getAllPackageData?.data?.length > 0) {
      const mappedData = getAllPackageData?.data?.map((item) => ({
        label: item?.name,
        value: item?._id,
      }));
      setAllPackages(mappedData);
    }
  }, [getAllPackageData?.data]);

  const statusOptions = [
    {
      label: 'active',
      value: 'active',
    },
    {
      label: 'inactive',
      value: 'inactive',
    },
  ];
  const durationOptions = [
    { label: '1 Month', value: '1_month' },
    { label: '2 Months', value: '2_months' },
    { label: '3 Months', value: '3_months' },
    { label: '4 Months', value: '4_months' },
    { label: '5 Months', value: '5_months' },
    { label: '6 Months', value: '6_months' },
    { label: '7 Months', value: '7_months' },
    { label: '8 Months', value: '8_months' },
    { label: '9 Months', value: '9_months' },
    { label: '10 Months', value: '10_months' },
    { label: '11 Months', value: '11_months' },
    { label: '1 Year', value: '1_year' },
  ];

  return (
    <Modal isOpen={open} toggle={close} centered size="xl">
      <ToastContainer />
      <ModalHeader toggle={close}>{modalHeader}</ModalHeader>
      {singleHotOfferIsLoading ? (
        <LoaderSpiner />
      ) : (
        <ModalBody>
          <Card>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ isSubmitting, resetForm }) => (
                <Form>
                  <Row>
                    <Col xl={6}>
                      <TextField label="Offer Name" name="name" />
                    </Col>
                    <Col xl={6}>
                      <SingleSelectField
                        name={'package_id'}
                        label={'Offer '}
                        options={allPackages}
                      />
                    </Col>
                    <Col xl={6}>
                      <NumberField
                        label="Offer Percentage (%)"
                        name="offer_percentage"
                      />
                    </Col>

                    <Col xl={6}>
                      <SingleSelectField
                        name={'offer_duration'}
                        label={'Offer Duration'}
                        options={durationOptions}
                      />
                    </Col>

                    <Col xl={6}>
                      <SingleSelectField
                        name={'hot_offer_status'}
                        label={'Status'}
                        options={statusOptions}
                      />
                    </Col>

                    <div className="hstck mx-auto d-flex align-items-center justify-content-center my-5">
                      <Col xl={12}>
                        <SubmitButton
                          isSubmitting={isSubmitting}
                          formSubmit={submitButton}
                        />
                      </Col>
                    </div>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card>
        </ModalBody>
      )}
    </Modal>
  );
};

export default HotOfferModal;
