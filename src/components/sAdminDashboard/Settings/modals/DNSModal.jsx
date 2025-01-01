import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';

import SubmitButton from '@/components/common/formField/SubmitButton';
import TextField from '@/components/common/formField/TextField';
const DNSModal = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
  setInitialValues,
}) => {
  return (
    <div>
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
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col lg={12}>
                    <div className="ps-0">
                      <Row>
                        <Col md={6} xl={12}>
                          <TextField label={'Host Name'} name={'hostName'} />
                        </Col>
                        <Col md={6} xl={12}>
                          <TextField label={'Value'} name={'value'} />
                        </Col>
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
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DNSModal;
