import NumberField from '@/components/common/formField/NumberField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextField from '@/components/common/formField/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import { Card, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const HotOfferModal = ({ modalHeader, submitButton, open, close }) => {
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
                    <TextField label="Offer Name" name="name" />
                  </Col>
                  <Col xl={6}>
                    <SingleSelectField
                      name={'offer_package'}
                      label={'Offer '}
                      setInitialValues={''}
                      options={''}
                    />
                  </Col>
                  <Col xl={6}>
                    <NumberField
                      label="Offer Percentage (%)"
                      name="offer_percentage"
                    />
                  </Col>

                  <Col xl={6}>
                    <TextField label="Offer Duration" name="offer_duration" />
                  </Col>

                  <Col xl={6}>
                    <SingleSelectField
                      name={'form_status'}
                      label={'Status'}
                      setInitialValues={''}
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
    </Modal>
  );
};

export default HotOfferModal;
