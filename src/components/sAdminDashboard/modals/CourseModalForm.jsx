import NumberField from '@/components/common/formField/NumberField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

// ModalForm Component
const CourseModalForm = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
  allDepartmentName,
  allCategoryName,
}) => {
  return (
    <Modal isOpen={isOpen} centered size="xl">
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
                  <div className="mb-3">
                    <TextField name="name" label="Course Name" />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <NumberField
                      name="available_seats"
                      label="Available Seats"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <SingleSelectField
                      name="department"
                      label="Select Department"
                      options={allDepartmentName}
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <SingleSelectField
                      name="category"
                      label="Select Course Category"
                      options={allCategoryName}
                    />
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="mb-3">
                    <NumberField
                      name="price_for_student"
                      label="Price For Student"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <NumberField
                      name="gst_for_student"
                      label="GST For Student"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <NumberField
                      name="price_for_agent"
                      label="Price For Agent"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <NumberField name="gst_for_agent" label="GST For Agent" />
                  </div>
                </Col>
                <Col xl={12}>
                  <div className="mb-3">
                    <TextArea name="description" label="Course Description" />
                  </div>
                </Col>
              </Row>
              <div className="hstack d-flex mx-auto justify-content-start mt-4"></div>
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

export default CourseModalForm;
