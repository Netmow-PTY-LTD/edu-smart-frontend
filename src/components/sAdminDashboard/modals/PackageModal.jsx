import NumberField from '@/components/common/formField/NumberField';
import SingleImageField from '@/components/common/formField/SingleImageField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextField from '@/components/common/formField/TextField';
import CurrencyList from 'currency-list';
import { Form, Formik } from 'formik';
import React from 'react';
import { Card, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const PackageModal = ({ open, close, modalHeader, submitButton }) => {
  const Currencies = CurrencyList.getAll('en_US');
  const currencyDataArray = Object.values(Currencies);
  const currencyNamesArray = currencyDataArray.map((currency) => currency.code);
  const options = currencyNamesArray.map((name) => ({
    label: name,
    value: name,
  }));

  const familytripOptions = [
    {
      label: 'Daily',
      value: 'Daily',
    },
    {
      label: 'Weekly',
      value: 'Weekly',
    },
    {
      label: 'Monthly',
      value: 'Monthly',
    },
    {
      label: 'Yearly',
      value: 'Yearly',
    },
  ];

  const statusOptions = [
    {
      label: 'Active',
      value: 'Active',
    },
    {
      label: 'Inactive',
      value: 'Inactive',
    },
  ];

  return (
    <Modal isOpen={open} toggle={close} centered size="xl">
      <ModalHeader toggle={close}>{modalHeader}</ModalHeader>
      <ModalBody>
        <Card>
          <Formik
            initialValues={{
              image: null,
            }}
            validationSchema={''}
            onSubmit={''}
            enableReinitialize={true}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <Row>
                  <Col xl={6}>
                    <TextField label="Package Name" name="package_name" />
                  </Col>
                  <Col xl={6}>
                    <SingleSelectField
                      name={'package_currency'}
                      label={'Package Currency'}
                      setInitialValues={''}
                      options={options}
                    />
                  </Col>
                  <Col xl={4}>
                    <NumberField label="Yearly Bonus" name="yearly_bonus" />
                  </Col>
                  <Col xl={4}>
                    <NumberField label="Commission (%)" name="commission" />
                  </Col>
                  <Col xl={4}>
                    <NumberField label="Max Files" name="max_files" />
                  </Col>
                  <Col xl={6}>
                    <SingleSelectField
                      name={'family_trip'}
                      label={'Family Trip'}
                      setInitialValues={''}
                      options={familytripOptions}
                    />
                  </Col>
                  <Col xl={6}>
                    <SingleSelectField
                      name={'form_status'}
                      label={'Status'}
                      setInitialValues={''}
                      options={statusOptions}
                    />
                  </Col>
                  <Col xl={12}>
                    <SingleImageField
                      field={{ name: 'image' }}
                      form={{ setFieldValue, values }}
                      label="Uploaded Picture"
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
    </Modal>
  );
};

export default PackageModal;
