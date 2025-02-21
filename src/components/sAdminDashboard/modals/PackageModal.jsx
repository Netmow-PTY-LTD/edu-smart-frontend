import NumberField from '@/components/common/formField/NumberField';
import SingleImageField from '@/components/common/formField/SingleImageField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import CurrencyList from 'currency-list';
import { Form, Formik } from 'formik';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const PackageModal = ({
  open,
  close,
  modalHeader,
  submitButton,
  initialValues,
  validationSchema,
  handleSubmit,
  isLoading,
}) => {
  const Currencies = CurrencyList.getAll('en_US');
  const currencyDataArray = Object.values(Currencies);
  const currencyNamesArray = currencyDataArray.map((currency) => currency.code);
  const options = currencyNamesArray.map((name) => ({
    label: name,
    value: name,
  }));

  const durationOptions = [
    {
      label: 'weekly',
      value: 'weekly',
    },
    {
      label: 'monthly',
      value: 'monthly',
    },
    {
      label: 'yearly',
      value: 'yearly',
    },
  ];

  const booleanOptions = [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ];

  return (
    <Modal isOpen={open} toggle={close} centered size="xl">
      <ToastContainer />
      <ModalHeader toggle={close}>{modalHeader}</ModalHeader>
      {isLoading ? (
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
              {({ isSubmitting, values, setFieldValue, resetForm }) => (
                <Form>
                  <Row>
                    <Col xl={6}>
                      <TextField label="Package Name" name="name" />
                    </Col>
                    <Col xl={6}>
                      <NumberField label="Package Price" name="price" />
                    </Col>
                    <Col xl={4}>
                      <SingleSelectField
                        name={'duration'}
                        label={'Package Duration'}
                        options={durationOptions}
                      />
                    </Col>
                    <Col xl={4}>
                      <NumberField
                        label="Monthly Minimum Files Target"
                        name="monthly_minimum_files"
                      />
                    </Col>
                    <Col xl={4}>
                      <NumberField label="Commission (%)" name="commission" />
                    </Col>
                    <Col xl={4}>
                      <SingleSelectField
                        name={'yearly_bonus'}
                        label={'Yearly Bonus'}
                        options={booleanOptions}
                      />
                    </Col>
                    <Col xl={4}>
                      <NumberField
                        label="Yearly Bonus Amount"
                        name="yearly_bonus_amount"
                      />
                    </Col>
                    <Col xl={4}>
                      <NumberField
                        label="Yearly Total Minimum Files"
                        name="yearly_bonus_minimum_files"
                      />
                    </Col>
                    <Col xl={4}>
                      <SingleSelectField
                        name={'family_trip'}
                        label={'Family Trip'}
                        options={booleanOptions}
                      />
                    </Col>

                    <Col xl={4}>
                      <TextField
                        label="Family Trip Duration"
                        name="family_trip_duration"
                      />
                    </Col>
                    <Col xl={4}>
                      <NumberField
                        label="Yearly Total Minimum Files"
                        name="family_trip_minimum_files"
                      />
                    </Col>
                    <Col xl={12}>
                      <TextArea
                        label="Family Trip Note"
                        name="family_trip_note"
                      />
                    </Col>
                    <Col xl={12}>
                      <SingleImageField
                        field={{ name: 'icon' }}
                        form={{ setFieldValue, values }}
                        label="Uploaded Icon"
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

export default PackageModal;
