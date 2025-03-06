import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { Form, Formik } from 'formik';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const RequiredDocemtsModal = ({
  modalHeader,
  submitButton,
  open,
  close,
  initialValues,
  validationSchema,
  handleSubmit,
  singleCouponIsLoading,
}) => {
  return (
    <Modal isOpen={open} centered size="xl">
      <ToastContainer />
      <ModalHeader toggle={close}>{modalHeader}</ModalHeader>
      {singleCouponIsLoading ? (
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
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <Row>
                    <Col xl={12}>
                      <TextField label="Title" name="title" />
                    </Col>
                    <Col xl={12}>
                      <TextArea name={'description'} label={'Description'} />
                    </Col>

                    <div className="hstck mx-auto d-flex align-items-center justify-content-center my-5">
                      <Col xl={12}>
                        <SubmitButton
                          //   isSubmitting={isSubmitting}
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

export default RequiredDocemtsModal;
