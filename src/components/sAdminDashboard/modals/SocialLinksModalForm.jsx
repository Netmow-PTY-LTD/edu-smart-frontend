import SubmitButton from '@/components/common/formField/SubmitButton';
import TextField from '@/components/common/formField/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const SocialLinksModalForm = ({
  isOpen,
  onClose,
  formHeader,
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  formSubmit,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} centered size="lg">
        <ModalHeader toggle={onClose}>
          <h2>{formHeader}</h2>
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
                  {fields?.length > 0 &&
                    fields.map((field, index) => (
                      <Col lg={6} key={index}>
                        <TextField name={field.name} label={field.label} />
                      </Col>
                    ))}
                  <Col md={12} xl={12}>
                    <div className="my-4">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        formSubmit={formSubmit}
                      >
                        {formSubmit}
                      </SubmitButton>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SocialLinksModalForm;
