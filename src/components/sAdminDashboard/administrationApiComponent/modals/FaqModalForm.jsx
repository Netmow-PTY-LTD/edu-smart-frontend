
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import {  Form, Formik } from 'formik';
import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

// ModalForm Component
const UniversityFaqModalForm = ({
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
      <ModalHeader toggle={onClose} className="fw-semibold text-black">
        {formHeader}
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
                <Col md={12} xl={12}><TextField name={'title'} label={'Quessiton'}/></Col>
              <Col md={12} xl={12}><TextArea name={'description' } label={"Answer"}/></Col>
                <Col md={12} xl={12}>
                        <div className="my-4 text-center">
                          <SubmitButton
                            isSubmitting={isSubmitting}
                            formSubmit="formSubmit"
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
  );
};

export default UniversityFaqModalForm;
