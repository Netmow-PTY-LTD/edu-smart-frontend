import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import { useGetAllDocumentListQuery } from '@/slice/services/common/commonDocumentService';
import CreatableSelect from 'react-select/creatable';

const DocumentRequestModalForm = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
}) => {
  const { data: documentData } = useGetAllDocumentListQuery();

  // Generate document options from API response
  const options =
    documentData?.data?.map((item) => ({
      value: item.title,
      label: item.title,
      description: item.description, // Store description for auto-fill
    })) || [];

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
          {({ isSubmitting, values, setFieldValue, submitForm }) => {
            // Find selected document from API
            const selectedDocument = options.find(
              (option) => option.value === values.title
            );

            // Auto-fill description when a known document is selected
            useEffect(() => {
              if (selectedDocument) {
                setFieldValue('description', selectedDocument.description);
              } else {
                setFieldValue('description', '');
              }
            }, [values.title, selectedDocument, setFieldValue, submitForm]);

            // Check if a new title is created
            const isNewTitle =
              values.title &&
              !options.some((option) => option.value === values.title);

            return (
              <Form>
                <Row>
                  <Col lg={12}>
                    <Row>
                      {/* Title Select Field */}
                      <Col md={12} xl={12}>
                        <div className="mb-3">
                          <label className="form-label  mb-2">
                            Document Title *
                          </label>
                          <CreatableSelect
                            isClearable
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={
                              values.title
                                ? { label: values.title, value: values.title }
                                : null
                            }
                            onChange={(selectedOption) => {
                              setFieldValue(
                                'title',
                                selectedOption ? selectedOption.value : ''
                              );
                            }}
                            onCreateOption={(inputValue) => {
                              setFieldValue('title', inputValue);
                            }}
                          />
                        </div>
                      </Col>

                      {/* Show "Description" & "Notes" when a new title is created */}
                      {isNewTitle && (
                        <>
                          <Col md={12} xl={12}>
                            <div className="mb-3">
                              <TextArea
                                name="description"
                                label="Document Description *"
                              />
                            </div>
                          </Col>
                        </>
                      )}
                      <Col md={12} xl={12}>
                        <p>
                          <span className="text-success fw-semibold">NB:</span>{' '}
                          If you need new Document request write into select
                          field.
                        </p>
                      </Col>
                      {/* Submit Button */}
                      <Col md={12} xl={12}>
                        <div className="my-4">
                          <SubmitButton
                            isSubmitting={isSubmitting}
                            formSubmit="formSubmit"
                          >
                            {formSubmit}
                          </SubmitButton>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default DocumentRequestModalForm;
