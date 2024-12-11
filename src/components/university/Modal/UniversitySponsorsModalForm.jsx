import DatepickerField from '@/components/common/formField/DatepickerField';
import ImageField from '@/components/common/formField/ImageField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

// ModalForm Component
const UniversitySponsorModalForm = ({
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
  return (
    <Modal isOpen={isOpen} centered size="md">
      <ModalHeader toggle={onClose} className="fw-semibold text-black">
        {formHeader}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit} // Corrected onSubmit function
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Row>
                <Col lg={12}>
                  <div className="ps-0">
                    <Row>
                      <Col md={12} xl={12}>
                        <div className="">
                          <TextField name="name" label="Sponsor Name *" />
                        </div>
                      </Col>
                      <Col md={12} xl={12}>
                        <div className="">
                          <TextField name="website" label="Website *" />
                        </div>
                      </Col>
                      <Col md={6} xl={6}>
                        <div className="">
                          <Field
                            name="start_date" // This is your Formik field name
                            component={DatepickerField} // Use your custom DatepickerField component
                            label="Start Date" // Label for the field
                          />
                        </div>
                      </Col>
                      <Col md={6} xl={6}>
                        <div className="">
                          <Field
                            name="end_date"
                            component={DatepickerField}
                            label="End Date"
                          />
                        </div>
                      </Col>
                      <Col md={12} xl={12}>
                        <h4 className="text-secondary-alt fs-2 mb-3 mt-4">
                          Sponsor Logo
                        </h4>
                        <div className="mb-5 profile-img">
                          <ImageField
                            name="logo"
                            label="Upload Logo"
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className="img-preview mb-3">
                          <Image
                            src={''}
                            alt="Brand Logo"
                            width={200}
                            height={200}
                          />
                        </div>
                      </Col>
                      <Col md={12} xl={12}>
                        <div className="my-4">
                          <SubmitButton
                            isSubmitting={isSubmitting}
                            formSubmit="formSubmit"
                          >
                            Add Sponsor
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
  );
};

export default UniversitySponsorModalForm;
