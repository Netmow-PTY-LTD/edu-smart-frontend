import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

// ModalForm Component
const CourseCategoryModalForm = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
  allDepartmentName,
  setInitialValues,
}) => {
  // console.log(initialValues);
  // console.log(allDepartmentName);
  return (
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
                <Col xl={6}>
                  <TextField name="name" label="Course Category Name" />
                </Col>
                <Col xl={6}>
                  <SingleSelectField
                    name="department"
                    label="Select Department"
                    options={allDepartmentName}
                    setInitialValues={setInitialValues}
                  />
                </Col>
                <TextArea name="description" label="Description" />
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

export default CourseCategoryModalForm;
