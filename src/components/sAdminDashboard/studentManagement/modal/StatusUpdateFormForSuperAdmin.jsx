import SubmitButton from '@/components/common/formField/SubmitButton';
import TextField from '@/components/common/formField/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';

const StatusUpdateFormForSuperAdmin = ({
  initialValues,
  OpenModal,
  toggle,
  handleAddSubmit,
  submitBtn,
  validationSchema,
}) => {
  return (
    <>
      <Modal isOpen={OpenModal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>
          <h5>Document Rejected Notes</h5>
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Formik
                initialValues={initialValues}
                onSubmit={handleAddSubmit}
                validationSchema={validationSchema}
                enableReinitialize
              >
                {({ isSubmitting, setFieldValue, values }) => {
                  return (
                    <Form>
                      <Row>
                        <Col lg={12}>
                          <TextField
                            as="textarea"
                            rows={4}
                            name={'notes'}
                            label={'Notes'}
                          />
                        </Col>

                        <Col md={12} xl={12}>
                          <div className="my-4 text-center">
                            <SubmitButton
                              isSubmitting={isSubmitting}
                              formSubmit={submitBtn}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
};

export default StatusUpdateFormForSuperAdmin;
