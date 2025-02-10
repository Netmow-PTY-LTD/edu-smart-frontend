import NumberField from '@/components/common/formField/NumberField';
import SingleFileUpload from '@/components/common/formField/SingleFileUpload';
import SingleImageField from '@/components/common/formField/SingleImageField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

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
  setInitialValues,
  handleFileChange,
  filePreview,
  setFilePreview,
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
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
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
                      setInitialValues={setInitialValues}
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <SingleSelectField
                      name="category"
                      label="Select Course Category"
                      options={allCategoryName}
                      setInitialValues={setInitialValues}
                    />
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="mb-3">
                    <NumberField name="price" label="Course Fee" />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <NumberField
                      name="university_price"
                      label="University Fee"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <NumberField name="gst" label="GST In Course Fee (%)" />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <NumberField
                      name="agent_commission"
                      label="Agent Commision (%)"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="mb-3">
                    <TextField
                      name="program_duration"
                      label="Program Duration"
                    />
                  </div>
                </Col>
                <Col xl={12}>
                  <div className="mb-5 profile-img">
                    {filePreview && (
                      <div className="file-preview mb-3">
                        <p>{filePreview}</p>
                      </div>
                    )}
                    <SingleFileUpload
                      form={{ setFieldValue, values }}
                      label="Upload Brochure File"
                      field={{ name: 'brochure' }}
                    />
                  </div>
                </Col>
                <Col xl={12}>
                  <SingleImageField
                    field={{ name: 'image' }}
                    form={{ setFieldValue, values }}
                    label="Uploaded Course Picture"
                  />
                </Col>
                <Col xl={12}>
                  <div className="mb-3">
                    <TextArea name="description" label="Course Description" />
                  </div>
                </Col>
                <Col xl={12}>
                  <FieldArray name="document_requirements">
                    {({ remove, push }) => (
                      <div>
                        {values.document_requirements?.map((item, index) => (
                          <Row key={index} className="align-items-center">
                            <Col md={5}>
                              <div className="mb-3">
                                <label
                                  htmlFor={`document_requirements[${index}].title`}
                                >
                                  {`Document Title ${index + 1}`}
                                </label>
                                <Field
                                  name={`document_requirements[${index}].title`}
                                  placeholder="Enter document title"
                                  className={`form-control ${
                                    errors.document_requirements?.[index]
                                      ?.title &&
                                    touched.document_requirements?.[index]
                                      ?.title
                                      ? 'is-invalid'
                                      : ''
                                  }`}
                                />
                                {errors.document_requirements?.[index]?.title &&
                                  touched.document_requirements?.[index]
                                    ?.title && (
                                    <div className="invalid-feedback">
                                      {
                                        errors.document_requirements[index]
                                          .title
                                      }
                                    </div>
                                  )}
                              </div>
                            </Col>

                            <Col md={5}>
                              <div className="mb-3">
                                <label
                                  htmlFor={`document_requirements[${index}].description`}
                                >
                                  {`Document Description ${index + 1}`}
                                </label>
                                <Field
                                  name={`document_requirements[${index}].description`}
                                  placeholder="Enter description"
                                  className="form-control"
                                />
                              </div>
                            </Col>

                            {index > 0 && (
                              <Col md={2}>
                                <Button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="third-btn mt-3"
                                >
                                  <i className="ri-delete-bin-fill"></i>
                                </Button>
                              </Col>
                            )}
                          </Row>
                        ))}

                        <div className="d-flex align-items-center justify-content-center mb-4">
                          <Button
                            type="button"
                            onClick={() => push({ title: '', description: '' })}
                            className="button d-flex align-items-center"
                          >
                            <i className="ri-add-line fw-bold fs-1"></i>
                            <span>Add New Document</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </Col>
                <Col xl={12}>
                  <FieldArray name="entry_requirements">
                    {({ remove, push }) => (
                      // console.log(values),
                      <div>
                        {values.entry_requirements?.map((item, index) => (
                          <Row key={index} className="align-items-center">
                            <Col md={11}>
                              <div className="mb-3">
                                <label htmlFor={`entry_requirements[${index}]`}>
                                  {`Entry Requirements ${index + 1}`}
                                </label>

                                <Field
                                  name={`entry_requirements[${index}]`}
                                  label={`Entry requirements ${index + 1}`}
                                  placeholder="Enter Text Here"
                                  className={`form-control ${
                                    errors.entry_requirements?.[index] &&
                                    touched.entry_requirements?.[index]
                                      ? 'is-invalid'
                                      : ''
                                  }`}
                                />
                                {errors.entry_requirements?.[index] &&
                                  touched.entry_requirements?.[index] && (
                                    <div className="invalid-feedback">
                                      {errors.entry_requirements[index]}
                                    </div>
                                  )}
                              </div>
                            </Col>
                            {index > 0 && (
                              <Col md={1}>
                                <Button
                                  type="button"
                                  onClick={() => {
                                    remove(index);
                                  }}
                                  className="third-btn mt-3"
                                >
                                  <i className="ri-delete-bin-fill"></i>
                                </Button>
                              </Col>
                            )}
                          </Row>
                        ))}
                        <div className="d-flex align-items-center justify-content-center mb-4">
                          <Button
                            type="button"
                            onClick={() => push('')}
                            className="button d-flex align-items-center"
                          >
                            <i className="ri-add-line fw-bold fs-1"></i>
                            <span>Add New Entry Requirements</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </Col>
                <Col xl={12}>
                  <FieldArray name="english_requirements">
                    {({ remove, push }) => (
                      // console.log(values),
                      <div>
                        {values.english_requirements?.map((item, index) => (
                          <Row key={index} className="align-items-center">
                            <Col md={11}>
                              <div className="mb-3">
                                <label
                                  htmlFor={`english_requirements[${index}]`}
                                >
                                  {`English Requirements ${index + 1}`}
                                </label>

                                <Field
                                  name={`english_requirements[${index}]`}
                                  label={`Entry requirements ${index + 1}`}
                                  placeholder="Enter Text Here"
                                  className={`form-control ${
                                    errors.english_requirements?.[index] &&
                                    touched.english_requirements?.[index]
                                      ? 'is-invalid'
                                      : ''
                                  }`}
                                />
                                {errors.english_requirements?.[index] &&
                                  touched.english_requirements?.[index] && (
                                    <div className="invalid-feedback">
                                      {errors.english_requirements[index]}
                                    </div>
                                  )}
                              </div>
                            </Col>
                            {index > 0 && (
                              <Col md={1}>
                                <Button
                                  type="button"
                                  onClick={() => {
                                    remove(index);
                                  }}
                                  className="third-btn mt-3"
                                >
                                  <i className="ri-delete-bin-fill"></i>
                                </Button>
                              </Col>
                            )}
                          </Row>
                        ))}
                        <div className="hstack d-flex align-items-center justify-content-center mb-4">
                          <Button
                            type="button"
                            onClick={() => push('')}
                            className="button d-flex align-items-center "
                          >
                            <i className="ri-add-line fw-bold fs-1"></i>
                            <span>Add New English Requiremtns</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
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
