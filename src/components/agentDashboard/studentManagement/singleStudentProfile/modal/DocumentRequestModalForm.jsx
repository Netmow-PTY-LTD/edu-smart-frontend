import React from 'react';
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
      value: item.title, // Store title instead of ID for easier comparison
      label: item.title,
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
          {({ isSubmitting, values, setFieldValue }) => {
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

                      {/* Show "Description" & "Notes" when a new title is created or "Others" is selected */}
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
                          {/* <Col md={12} xl={12}>
                            <div className="mb-3">
                              <TextArea name="notes" label="Notes *" />
                            </div>
                          </Col> */}
                        </>
                      )}

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
