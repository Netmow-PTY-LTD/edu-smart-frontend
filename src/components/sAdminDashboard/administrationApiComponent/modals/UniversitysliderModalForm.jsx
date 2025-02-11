import SingleImageField from '@/components/common/formField/SingleImageField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

// ModalForm Component
const UniversitysliderModalForm = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
}) => {
  const sliderFields = [
    { name: 'title', label: 'Title:' },
    { name: 'sub_title', label: 'Sub Title:' },
    { name: 'button_1_text', label: 'Button One Text:' },
    { name: 'button_1_link', label: 'Button One Link:' },
    { name: 'button_2_text', label: 'Button Two Text:' },
    { name: 'button_2_link', label: 'Button Two Link:' },
  ];

  return (
    <Modal isOpen={isOpen} centered size="md">
      <ModalHeader toggle={onClose} className="fw-semibold text-black">
        {formHeader}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <Row>
                {sliderFields?.length > 0 &&
                  sliderFields.map((field, index) => (
                    <Col lg={6} key={index}>
                      <TextField name={field.name} label={field.label} />
                    </Col>
                  ))}

                <Col lg={12}>
                  <TextArea label="Description" name="description" />
                </Col>
                <Col lg={12}>
                  <SingleImageField
                    field={{ name: 'image' }}
                    form={{ setFieldValue, values }}
                    label="Uploaded Picture"
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    formSubmit={'Update'}
                  >
                    {formSubmit}
                  </SubmitButton>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default UniversitysliderModalForm;
