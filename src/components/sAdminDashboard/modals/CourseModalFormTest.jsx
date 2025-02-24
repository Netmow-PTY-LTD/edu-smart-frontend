// Course Modal Form
import CreatableSelect from 'react-select/creatable';
import NumberField from '@/components/common/formField/NumberField';
import NumberFieldForCourse from '@/components/common/formField/NumberFieldForCourse';
import PackageMultipleSelectFieldTest from '@/components/common/formField/PackageMultipleSelectFieldTest';
import SingleFileUpload from '@/components/common/formField/SingleFileUpload';
import SingleImageField from '@/components/common/formField/SingleImageField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import TimeFieldCourse from '@/components/common/formField/TimeFieldCourse';
import { Field, FieldArray, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';

// ModalForm Component
const CourseModalFormTest = ({
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
  filePreview,
  SelectOption,
  SetCheckFreeAcommodation,
  checkFreeAcommodation,
}) => {
  const accessoryOptions = [
    { value: 'laptop', label: 'Laptop' },
    { value: 'charger', label: 'Charger' },
    { value: 'headphones', label: 'Headphones' },
    { value: 'usb_cable', label: 'USB Cable' },
    { value: 'mouse', label: 'Mouse' },
    { value: 'keyboard', label: 'Keyboard' },
  ];

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
          {({ isSubmitting, setFieldValue, values, errors, touched }) => {
            useEffect(() => {
              const after_emgs_fee_get = values.tuition_fee - values.emgs_fee;
              setFieldValue('after_emgs_fee', after_emgs_fee_get);
            }, [values.tuition_fee, values.emgs_fee, setFieldValue]);

            return (
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
                      <NumberFieldForCourse
                        name="tuition_fee"
                        label="Tuition Fee"
                      />
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div className="mb-3">
                      <NumberFieldForCourse name="emgs_fee" label="EMGS Fee" />
                    </div>
                  </Col>

                  <Col xl={6}>
                    <div className="mb-3">
                      <NumberFieldForCourse
                        name="after_emgs_fee"
                        label="After Emgs Fee"
                        readOnly
                      />
                    </div>
                  </Col>

                  <Col xl={6}>
                    <div className="mb-3">
                      <NumberFieldForCourse
                        name="incentive_amount"
                        label="Incentive Amount"
                      />
                    </div>
                  </Col>

                  <Col xl={12}>
                    <div className="mb-3">
                      <TextField
                        name="program_duration"
                        label="Program Duration"
                      />
                    </div>
                  </Col>

                  <Col xl={12}>
                    <div className="mb-3">
                      <label className="form-label fs-2 mb-3 me-3">
                        Commision Auto Deduct
                      </label>
                      <Field
                        type="checkbox"
                        name="auto_deduct"
                        className="form-check-input"
                      />
                    </div>
                  </Col>

                  <Col xl={12}>
                    <div className="mb-3">
                      <label className="form-label fs-2 mb-3 me-3">
                        Free Air Ticket
                      </label>
                      <Field
                        type="checkbox"
                        name="free_air_ticket"
                        className="form-check-input"
                      />
                    </div>
                  </Col>

                  <Col xl={12}>
                    <div className="mb-3">
                      <label className="form-label fs-2 mb-3 me-3">
                        Scholarship
                      </label>
                      <Field
                        type="checkbox"
                        name="scholarship_on_tuition_fee"
                        className="form-check-input"
                      />
                    </div>
                  </Col>

                  <Field name="scholarship_on_tuition_fee">
                    {({ field, form }) =>
                      field.value && (
                        <>
                          <Col xl={6}>
                            <div className="mb-3">
                              <label className="form-label fs-2 mb-3 me-3">
                                Scholarship Auto Deduct
                              </label>
                              <Field
                                type="checkbox"
                                name="scholarship_auto_deduct"
                                className="form-check-input"
                              />
                            </div>
                          </Col>

                          <Col xl={6}>
                            <div className="mb-3">
                              <NumberFieldForCourse
                                name="scholarship_amount"
                                label="Scholarship Amount"
                              />
                            </div>
                          </Col>
                        </>
                      )
                    }
                  </Field>

                  <Col xl={12}>
                    <div className="mb-3">
                      <label className="form-label fs-2 mb-3 me-3">
                        Free Accommodation
                      </label>
                      <Field
                        type="checkbox"
                        name="checkFreeAcommodation"
                        checked={checkFreeAcommodation} // Bind to state
                        className="form-check-input"
                        onChange={() =>
                          SetCheckFreeAcommodation(!checkFreeAcommodation)
                        }
                        value={checkFreeAcommodation}
                      />
                    </div>
                  </Col>

                  {checkFreeAcommodation ? (
                    <>
                      <Col xl={6}>
                        <div className="mb-3">
                          <Field name="accommodation_start_date">
                            {({ field, form }) => (
                              <TimeFieldCourse
                                field={field}
                                form={form}
                                label="Accommodation Start Date"
                              />
                            )}
                          </Field>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <div className="mb-3">
                          <Field name="accommodation_end_date">
                            {({ field, form }) => (
                              <TimeFieldCourse
                                field={field}
                                form={form}
                                label="Accommodation End Date"
                              />
                            )}
                          </Field>
                        </div>
                      </Col>
                    </>
                  ) : (
                    ''
                  )}

                  <Col xl={12}>
                    <div className="mb-3">
                      <label className="form-label fs-2 mb-3 me-3">
                        Free Accessories
                      </label>
                      <Field
                        type="checkbox"
                        name="free_accessories"
                        className="form-check-input"
                      />
                    </div>
                  </Col>

                  <Field name="free_accessories">
                    {({ field, form }) =>
                      field.value && (
                        <Col xl={12}>
                          <div className="mb-3">
                            <label className="form-label fs-2 mb-3">
                              Accessories
                            </label>
                            <CreatableSelect
                              isMulti
                              name="accessories"
                              options={accessoryOptions} // List of predefined accessories
                              className="basic-multi-select"
                              classNamePrefix="select"
                              value={form.values.accessories?.map((acc) => ({
                                label: acc,
                                value: acc,
                              }))}
                              onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions.map(
                                  (option) => option.value
                                );
                                form.setFieldValue(
                                  'accessories',
                                  selectedValues
                                );
                              }}
                              onCreateOption={(inputValue) => {
                                // Add the newly created value to the list
                                const newOption = {
                                  label: inputValue,
                                  value: inputValue,
                                };
                                form.setFieldValue('accessories', [
                                  ...form.values.accessories,
                                  inputValue,
                                ]);
                              }}
                            />
                          </div>
                        </Col>
                      )
                    }
                  </Field>

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
                        <>
                          <PackageMultipleSelectFieldTest
                            field={{ name: 'document_select' }}
                            label="Select Existing Document Type"
                            options={SelectOption}
                            form={{ setFieldValue, values }}
                          />

                          {/* Display Selected Documents */}
                          {Array.isArray(values.document_requirements) &&
                            values.document_requirements.length > 0 &&
                            values.document_requirements
                              .filter((item) => item?.document_list_id) // This filters out items with undefined or empty document_list_id
                              .map((item, index) => {
                                const isManual =
                                  item.document_list_id?.startsWith('manual_');

                                return (
                                  <Row
                                    key={item.document_list_id}
                                    className="align-items-center mt-4 mb-4"
                                  >
                                    {/* Title (Editable) */}
                                    <Col xs={12} md={12} lg={4}>
                                      <div className="mb-3">
                                        <label className="form-label fw-bold">{`Document Title ${index + 1}`}</label>
                                        <Field
                                          name={`document_requirements[${index}].title`}
                                          placeholder="Enter document title"
                                          className="form-control"
                                          value={item.title || ''}
                                        />
                                      </div>
                                    </Col>

                                    {/* Description (Editable) */}
                                    <Col xs={12} md={12} lg={4}>
                                      <div className="mb-3">
                                        <label className="form-label fw-bold">{`Document Description ${index + 1}`}</label>
                                        <Field
                                          name={`document_requirements[${index}].description`}
                                          placeholder="Enter document description"
                                          className="form-control"
                                          value={item.description || ''}
                                        />
                                      </div>
                                    </Col>

                                    {/* Document List ID (Read-Only) */}
                                    <Col xs={12} md={12} lg={4} hidden>
                                      <div className="mb-3">
                                        <label className="form-label fw-bold">{`Document List ID ${index + 1}`}</label>
                                        <Field
                                          name={`document_requirements[${index}].document_list_id`}
                                          className="form-control"
                                          value={item.document_list_id || ''}
                                          readOnly // Always read-only
                                        />
                                      </div>
                                    </Col>

                                    {/* Remove Button (Only for manually added documents) */}
                                    <Col
                                      xs={12}
                                      md={4}
                                      lg={2}
                                      className="d-flex justify-content-md-center align-items-center flex-column flex-md-row"
                                    >
                                      <div className="form-check mt-3 mt-md-4 me-md-4">
                                        <Field
                                          type="checkbox"
                                          name={`document_requirements[${index}].isRequired`}
                                          className="form-check-input"
                                          id={`document_requirements[${index}].isRequired`}
                                          checked={
                                            values.document_requirements?.[
                                              index
                                            ]?.isRequired ?? false
                                          } // Ensure default is false
                                        />
                                        <label
                                          htmlFor={`document_requirements[${index}].isRequired`}
                                          className="form-check-label ms-2 fw-bold"
                                        >
                                          Required
                                        </label>
                                      </div>
                                      {isManual && (
                                        <Button
                                          type="button"
                                          onClick={() => remove(index)}
                                          className="third-btn mt-2"
                                        >
                                          <i className="ri-delete-bin-line me-2"></i>
                                        </Button>
                                      )}
                                    </Col>
                                  </Row>
                                );
                              })}

                          {/* Add Document Manually Button */}
                          <div className="d-flex justify-content-center mt-4">
                            <Button
                              type="button"
                              onClick={() => {
                                const randomId = `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                                push({
                                  title: '', // Editable
                                  description: '', // Editable
                                  isRequired: false, // Default
                                  document_list_id: randomId, // Read-only
                                });
                              }}
                              className="button d-flex align-items-center"
                            >
                              <i className="ri-add-line fw-bold fs-1"></i>
                              <span>Add New Required Documents</span>
                            </Button>
                          </div>
                        </>
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
                                  <label
                                    htmlFor={`entry_requirements[${index}]`}
                                  >
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
                <SubmitButton
                  isSubmitting={isSubmitting}
                  formSubmit={formSubmit}
                >
                  {formSubmit}
                </SubmitButton>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default CourseModalFormTest;
