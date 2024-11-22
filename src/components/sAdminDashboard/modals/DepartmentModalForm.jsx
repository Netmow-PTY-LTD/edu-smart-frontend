import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

// ModalForm Component
const DepartmentModalForm = ({
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
                <Col xl={12}>
                  <TextField name="name" label="Department Name" />
                  <TextArea name="description" label="Description" />
                </Col>
              </Row>

              <SubmitButton isSubmitting={isSubmitting} formSubmit={formSubmit}>
                {formSubmit}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default DepartmentModalForm;
