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
import classnames from 'classnames'; // For toggling classes

import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  activeTab,
  toggle,
} from 'reactstrap';
import { toast } from 'react-toastify';
import FormikQuill from '@/components/common/FormikQuill';
import FormikTinyMCE from '@/components/common/FormikTinyMCE ';
import TextFieldDefault from '@/components/common/formField/TextFieldDefault';
import SingleSelectFieldDepartment from '@/components/common/formField/SingleSelectFieldDepartment';

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
  allDepartmentData,
}) => {
  const accessoryOptions = [
    { value: 'Laptop', label: 'Laptop' },
    { value: 'Charger', label: 'Charger' },
    { value: 'Headphones', label: 'Headphones' },
    { value: 'USB Cable', label: 'USB Cable' },
    { value: 'Mouse', label: 'Mouse' },
    { value: 'Keyboard', label: 'Keyboard' },
  ];
  const [activeTab, setActiveTab] = useState('tinyMCE'); // TinyMCE is now default
const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
const [categoryName, setCategoryName] = useState([]);

const handleDepartmentChange = (selectedOption) => {
  const deptId = selectedOption?.value || '';

  console.log("deptId", deptId);
  setSelectedDepartmentId(deptId);

  const selectedDept = allDepartmentData.find(
    (dept) => dept._id === deptId
  );

  const categories = selectedDept?.categories?.map((cat) => ({
    label: cat.name,
    value: cat._id,
  })) || [];

  setCategoryName(categories);
};


console.log("allDepartmentData", allDepartmentData);
console.log("categoryName", categoryName);



  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab); // Only change if it's different
  };

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
          {({
            isSubmitting,
            setFieldValue,
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
          }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              const after_emgs_fee_get = values?.tuition_fee - values?.emgs_fee;
              setFieldValue('after_emgs_fee', after_emgs_fee_get);
            }, [values?.tuition_fee, values?.emgs_fee, setFieldValue]);

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

                      {formSubmit === 'Update' && (
                        <>
                          <Col xl={6}>
                            <div className="mb-3 disableddiaprtmentcourse">
                              <SingleSelectField
                                name="department"
                                label="Select Department"
                                options={allDepartmentName}
                                setInitialValues={setInitialValues}
                              />
                            </div>
                          </Col>
                          <Col xl={6}>
                            <div className="mb-3 disableddiaprtmentcourse">
                              <SingleSelectField
                                name="category"
                                label="Select Course Category"
                                options={allCategoryName}
                                setInitialValues={setInitialValues}
                              />
                            </div>
                          </Col>
                        </>
                      )}

                        {formSubmit === 'Submit' && (
                          <>
                            <Col xl={6}>
                              <div className="mb-3">
                                <SingleSelectFieldDepartment
                                  name="department"
                                  label="Select Department"
                                  options={allDepartmentName}
                                  setInitialValues={setInitialValues}
                                  onChange={handleDepartmentChange}
                                />
                              </div>
                            </Col>

                            <Col xl={6}>
                              <div className="mb-3">
                                <SingleSelectFieldDepartment
                                  name="category"
                                  label="Select Course Category"
                                  options={categoryName}
                                  setInitialValues={setInitialValues}
                                />
                              </div>
                            </Col>
                          </>
                        )}


                  {/* Its will be show as EMGS processing fee */}
                  <Col xl={6}>
                    <div className="mb-3">
                      <NumberFieldForCourse name="emgs_fee" label="EMGS Fee" />
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div className="mb-3">
                      <NumberFieldForCourse
                        name="tuition_fee_put"
                        label="Tuition Fee"
                      />
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div className="mb-3">
                      <NumberFieldForCourse
                        name="others_fee"
                        label="Others Fee"
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


                  <Col xl={6}>
                    <div className="mb-3 disabled">
                      <NumberFieldForCourse
                        name="after_emgs_fee"
                        label="Total Tuition Fee"
                      />
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div className="mb-3 disabled">
                      <NumberFieldForCourse
                        name="tuition_fee"
                        label="Course Fee"
                      />
                    </div>
                  </Col>



                  {/* <Col xl={6}>
                    <div className="mb-3">
                      <NumberFieldForCourse
                        name="tuition_fee"
                        label="Course Fee"
                        readOnly
                      />
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div className="mb-3">
                      <NumberFieldForCourse
                        name="after_emgs_fee"
                        label="Total Tuition Fee"
                        readOnly
                      />
                    </div>
                  </Col>
 */}


                  <Col xl={6}>
                    <div className="mb-3">
                      <TextFieldDefault
                        name="fee_duration"
                        label="Tuition Fee For"
                        placeholder='e.g. "1st semester", "1st year", "full course"'
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
                    <div className="mb-3">
                      <label className="form-label fs-2 mb-3 me-3">
                        Commision Auto Deduct
                      </label>
                      <Field
                        type="checkbox"
                        name="auto_deduct"
                        className="form-check-input"
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFieldValue('auto_deduct', checked);
                          // If the checkbox is checked, ensure incentive_amount is valid (greater than 0)
                          if (
                            checked &&
                            (values?.incentive_amount <= 0 ||
                              values?.incentive_amount === '')
                          ) {
                            toast.error(
                              'Incentive amount cannot be less than 1.'
                            );
                            setFieldValue('auto_deduct', false);
                          }
                        }}
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
                      field?.value && (
                        <>
                          <Col xl={12}>
                            <div className="mb-3">
                              <label className="form-label fs-2 mb-3 me-3">
                                Scholarship Auto Deduct
                              </label>
                              <Field
                                type="checkbox"
                                name="scholarship_auto_deduct"
                                className="form-check-input"
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setFieldValue(
                                    'scholarship_auto_deduct',
                                    checked
                                  );
                                  // If the checkbox is checked, ensure incentive_amount is valid (greater than 0)
                                  if (
                                    checked &&
                                    (values?.scholarship_amount <= 0 ||
                                      values?.scholarship_amount === '')
                                  ) {
                                    toast.error(
                                      'Scholarship Amount cannot be less than 1.'
                                    );
                                    setFieldValue(
                                      'scholarship_auto_deduct',
                                      false
                                    );
                                  }
                                }}
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
                      field?.value && (
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
                                  (option) => option?.value
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
                  {/* <Col xl={12}>
                    <div className="mb-3">
                      <TextArea name="description" label="Course Description" />
                    </div>
                  </Col> */}
                  {/* <Col xl={12}>
                    <FormikQuill
                      name="description"
                      label="Course Description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col xl={12}>
                    <FormikTinyMCE
                      name="description"
                      label="Course Description"
                      apiKey="bs6v7unze8z31f7xx3kcabba4eep30wlsawibimdxeiftycp"
                    />
                  </Col> */}

                  <Col xl={12}>
                    <FormikTinyMCE
                      name="description"
                      label="Course Description"
                      apiKey="bs6v7unze8z31f7xx3kcabba4eep30wlsawibimdxeiftycp"
                    />
                  </Col>

                  {/* 
                  <Col xl={12}>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === 'tinyMCE',
                          })}
                          onClick={() => setActiveTab('tinyMCE')}
                        >
                          TinyMCE Editor
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === 'quill',
                          })}
                          onClick={() => setActiveTab('quill')}
                        >
                          Quill Editor
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="tinyMCE">
                        <FormikTinyMCE
                          name="description"
                          label="Course Description"
                          apiKey="bs6v7unze8z31f7xx3kcabba4eep30wlsawibimdxeiftycp"
                          //apiKey="bs6v7unze8z33kcabba4eep30wlsawibimdxeiftycp"
                        />
                      </TabPane>

                      <TabPane tabId="quill">
                        <FormikQuill
                          name="description"
                          label="Course Description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </TabPane>
                    </TabContent>
                  </Col>
                   */}
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
                                  item?.document_list_id?.startsWith('manual_');

                                return (
                                  <Row
                                    key={item?.document_list_id}
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
                                          value={item?.title || ''}
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
                                          value={item?.description || ''}
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
                                          value={item?.document_list_id || ''}
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
                                            values?.document_requirements?.[
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
                                      {/* {isManual && ( */}
                                        <Button
                                          type="button"
                                          onClick={() => remove(index)}
                                          className="third-btn mt-2"
                                        >
                                          <i className="ri-delete-bin-line me-2"></i>
                                        </Button>
                                      {/* )} */}
                                    </Col>
                                  </Row>
                                );
                              })}

                            {/* ❗ Array-level validation error (custom test or min count) */}
                                        {typeof errors.document_requirements === 'string' && (
                                          <div className="text-danger fw-bold mb-3">
                                            {errors.document_requirements}
                                          </div>
                                        )}

                                    {Array.isArray(errors.document_requirements) &&
                                      errors.document_requirements.map((item, index) => (
                                        <div key={index}>
                                          {item?.title && (
                                            <div className="text-danger fw-bold">
                                              Document {index + 1} Title: {item.title}
                                            </div>
                                          )}
                                          {item?.description && (
                                            <div className="text-danger fw-bold">
                                              Document {index + 1} Description: {item.description}
                                            </div>
                                          )}
                                        </div>
                                      ))}

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
                        <div>
                          {values?.entry_requirements?.length > 0 &&
                            values?.entry_requirements?.map((item, index) => (
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
                                        errors?.entry_requirements?.[index] &&
                                        touched?.entry_requirements?.[index]
                                          ? 'is-invalid'
                                          : ''
                                      }`}
                                    />
                                    {errors?.entry_requirements?.[index] &&
                                      touched?.entry_requirements?.[index] && (
                                        <div className="invalid-feedback">
                                          {errors?.entry_requirements[index]}
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
                          {values?.english_requirements?.length > 0 &&
                            values?.english_requirements?.map((item, index) => (
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
                                        errors?.english_requirements?.[index] &&
                                        touched?.english_requirements?.[index]
                                          ? 'is-invalid'
                                          : ''
                                      }`}
                                    />
                                    {errors?.english_requirements?.[index] &&
                                      touched?.english_requirements?.[
                                        index
                                      ] && (
                                        <div className="invalid-feedback">
                                          {errors?.english_requirements[index]}
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
