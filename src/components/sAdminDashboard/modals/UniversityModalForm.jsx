import CountrySelectField from '@/components/common/formField/CountrySelectField';
import ImageField from '@/components/common/formField/ImageField';
import NumberField from '@/components/common/formField/NumberField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import countryList from 'react-select-country-list';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

// ModalForm Component
const UniversityModalForm = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
  imagePreview,
  setImagePreview,
}) => {
  const options = useMemo(() => countryList().getData(), []);

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
                  <TextField name="name" label="University Name" />
                </Col>
                <Col xl={6}>
                  <TextField name="address_line_1" label="Address Line 1 " />
                </Col>
                <Col xl={6}>
                  <TextField name="address_line_2" label="Address Line 2 " />
                </Col>
                <Col xl={6}>
                  <TextField name="city" label="City " />
                </Col>
                <Col xl={6}>
                  <TextField name="state" label="State " />
                </Col>
                <Col xl={6}>
                  <CountrySelectField
                    name="country"
                    label="Country"
                    options={options}
                  />
                </Col>
                <Col xl={6}>
                  <NumberField name="zip" label="Zip Code" />
                </Col>
                <Col xl={6}>
                  <TextField name="code" label="Code " />
                </Col>
                <Col xl={6}>
                  <TextArea name="description" label="Description" />
                </Col>
                <Col xl={6}>
                  <ImageField
                    name="logo"
                    label="Logo"
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
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

export default UniversityModalForm;
