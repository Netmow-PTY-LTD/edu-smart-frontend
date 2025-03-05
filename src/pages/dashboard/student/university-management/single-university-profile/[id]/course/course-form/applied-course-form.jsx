import MultipleFileUploadAcceptAll from '@/components/common/formField/MultipleFileUploadAcceptAll';
import SubmitButton from '@/components/common/formField/SubmitButton';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppliedCourseForm = ({
  setStep,
  step,
  loading,
  handleAddSubmit,
  validationSchema,
  documentRequirements,
  initialValues,
  emgsfee,
}) => {
  return (
    <Card>
      <div className="card-header">
        <h5 className="fs-20 text-secondary-alt fw-semibold mb-0">
          Required Documents
        </h5>
        <h5
          onClick={() => setStep(step - 1)}
          className="button px-4 py-2 fs-20 text-secondary-alt fw-semibold mb-0 cursor-pointer"
        >
          <i className="ri-arrow-left-double-line"></i>
          Previous
        </h5>
      </div>
      {loading ? (
        <LoaderSpiner />
      ) : (
        <CardBody>
          <div className="form-content">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                handleAddSubmit(values, { setSubmitting });
              }}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({
                isSubmitting,
                setFieldValue,
                values,
                errors,
                touched,
                validateForm,
                setSubmitting,
              }) => {
                return (
                  <Form>
                    <Row>
                      <Col lg={12}>
                        <div className="ps-0">
                          <Row>
                            {Array.isArray(documentRequirements) &&
                            documentRequirements?.length > 0 ? (
                              documentRequirements
                                .filter((item) => item && item.title) // Filter out invalid entries
                                .map((item, index) => {
                                  const fieldName = item?.title
                                    ?.toLowerCase()
                                    .replace(/\s+/g, '_');
                                  return (
                                    <div key={index}>
                                      <Field
                                        name={fieldName}
                                        component={MultipleFileUploadAcceptAll}
                                        label={
                                          <>
                                            <span className="title">
                                              {item?.title
                                                ? item.title
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                  item.title.slice(1)
                                                : ''}
                                            </span>
                                            {item?.description && (
                                              <div>
                                                <span
                                                  className="description"
                                                  style={{ fontWeight: '400' }}
                                                >
                                                  {item.description}
                                                </span>
                                              </div>
                                            )}
                                          </>
                                        }
                                        field={{
                                          name: fieldName,
                                        }}
                                        form={{ values, setFieldValue }}
                                        validate={(value) => {
                                          if (
                                            item.isRequired &&
                                            (!value || value.length === 0)
                                          ) {
                                            toast.error(
                                              `${item.title} - This field is required`
                                            );
                                            return 'This field is required';
                                          }
                                          return undefined;
                                        }}
                                      />
                                      {item?.description && (
                                        <Field
                                          type="hidden"
                                          name={`${fieldName}_description`}
                                          value={item.description}
                                        />
                                      )}
                                      {errors[fieldName] &&
                                        touched[fieldName] && (
                                          <div className="error-message">
                                            {errors[fieldName]}
                                          </div>
                                        )}
                                    </div>
                                  );
                                })
                            ) : (
                              <div>No document requirements available.</div>
                            )}

                            <Col md={12} xl={12}>
                              <div className="d-flex align-items-center justify-content-center my-4 gap-3">
                                <SubmitButton
                                  // isSubmitting={isSubmitting}
                                  formSubmit={'Proceed to Payment'}
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    const formErrors = await validateForm();
                                    if (Object.keys(formErrors).length === 0) {
                                      setSubmitting(true);
                                      handleAddSubmit(values, {
                                        setSubmitting,
                                      });
                                    } else {
                                      //toast.error('Please fix the errors before proceeding.');
                                    }
                                  }}
                                >
                                  {`Proceed to Payment With EMGS Fee ${emgsfee} MYR`}
                                </SubmitButton>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
            <ToastContainer />
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default AppliedCourseForm;
