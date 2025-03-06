import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import SubmitButton from '@/components/common/formField/SubmitButton';

import TextField from '@/components/common/formField/TextField';

const AirTicketDocumentRequestModalFormForSuperAdmin = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} centered size="md">
      <ModalHeader toggle={onClose} className="fw-semibold text-black">
        {formHeader}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => {
            return (
              <Form>
                <Row>
                  <Col lg={12}>
                    <Row>
                      {/* Title Select Field */}
                      <Col md={12} xl={12}>
                        <TextField label={'Title'} name={'title'} readOnly />
                      </Col>
                      <Col md={12} xl={12}>
                        <TextField
                          as="textarea"
                          rows={4}
                          label={'Description'}
                          name={'description'}
                        />
                      </Col>

                      {/* Submit Button */}
                      <Col md={12} xl={12}>
                        <div className="my-4">
                          <SubmitButton
                            isSubmitting={isSubmitting}
                            formSubmit="formSubmit"
                          >
                            {formSubmit}
                          </SubmitButton>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default AirTicketDocumentRequestModalFormForSuperAdmin;
