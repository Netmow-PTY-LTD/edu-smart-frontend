import MultipleFileUpload from '@/components/common/formField/MultipleFileUpload';
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

const SingleDocUploadForm = ({
  initialValues,
  OpenModal,
  toggle,
  handleAddSubmit,
  submitBtn,
}) => {
  return (
    <>
      <Modal isOpen={OpenModal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>
          <h5>Upload Document</h5>
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Formik
                initialValues={initialValues}
                onSubmit={handleAddSubmit}
                enableReinitialize
              >
                {({ isSubmitting, setFieldValue, values }) => {
                  return (
                    <Form>
                      <Row>
                        <Col lg={12}>
                          <TextField name={'title'} label={'Title'} />
                        </Col>
                        <Col lg={12}>
                          <MultipleFileUpload
                            form={{ setFieldValue, values }}
                            label={'Document'}
                            field={{ name: 'document' }}
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

export default SingleDocUploadForm;