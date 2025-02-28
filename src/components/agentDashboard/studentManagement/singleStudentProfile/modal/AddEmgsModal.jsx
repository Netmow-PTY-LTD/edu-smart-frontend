import SingleImageField from '@/components/common/formField/SingleImageField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { useAddEmgsTimelineMutation } from '@/slice/services/common/applicationService';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

// ModalForm Component
const AddEmgsModal = ({ isOpen, onClose, dataRefetch, emgs_status_id }) => {
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    image: '',
  });

  const [addEmgsTimeline] = useAddEmgsTimelineMutation();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      formData.append('id', emgs_status_id);

      const result = await addEmgsTimeline(formData).unwrap();
      if (result?.success) {
        toast.success('EMGS Status Added Successfully');
        dataRefetch();
        onClose();
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} centered size="xl">
      <ModalHeader toggle={onClose}>
        <h2>Add New EMGS Status</h2>
      </ModalHeader>
      <ModalBody>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <Form>
              <Row>
                <Col xl={12}>
                  <div className="mb-3">
                    <TextField name="title" label="Title" />
                  </div>
                </Col>
                <Col xl={12}>
                  <div className="mb-3">
                    <TextArea name="description" label="Description" />
                  </div>
                </Col>
                <Col xl={12}>
                  <div className="mb-5 profile-img">
                    <SingleImageField
                      form={{ setFieldValue, values }}
                      label="Upload File"
                      field={{ name: 'image' }}
                    />
                  </div>
                </Col>
              </Row>
              <div className="hstack d-flex mx-auto justify-content-start mt-4"></div>
              <SubmitButton isSubmitting={isSubmitting} formSubmit={'Add'}>
                Add
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default AddEmgsModal;
