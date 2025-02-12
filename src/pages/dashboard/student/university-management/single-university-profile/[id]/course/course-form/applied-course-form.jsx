import MultipleFileUploadAcceptAll from '@/components/common/formField/MultipleFileUploadAcceptAll';
import SubmitButton from '@/components/common/formField/SubmitButton';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

const AppliedCourseForm = ({
  setStep,
  step,
  loading,
  handleAddSubmit,
  validationSchema,
  documentRequirements,
  initialValues,
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
          {/* <div className="form-content">
            <Formik
              initialValues={initialValues}
              onSubmit={handleAddSubmit}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({ isSubmitting, setFieldValue, values }) => {
                return (
                  <Form>
                    <Row>
                      <Col lg={12}>
                        <div className="ps-0">
                          <Row>
                            {documentRequirements.map((item, index) => {
                              const fieldName = item.title
                                .toLowerCase()
                                .replace(/\s+/g, '_');
                              return (
                                <div key={index}>
                                  <Field
                                    name={fieldName}
                                    component={MultipleFileUploadAcceptAll}
                                    label={
                                      item?.title
                                        ? item.title.charAt(0).toUpperCase() +
                                          item.title.slice(1)
                                        : ''
                                    }
                                    field={{
                                      name: fieldName,
                                    }}
                                    form={{ values, setFieldValue }}
                                  />
                                </div>
                              );
                            })}

                            <Col md={12} xl={12}>
                              <div className="d-flex align-items-center justify-content-center my-4 gap-3">
                                <SubmitButton
                                  isSubmitting={isSubmitting}
                                  formSubmit={'Submit Without Payment'}
                                >
                                  {'Submit Without Payment'}
                                </SubmitButton>
                                <SubmitButton
                                  isSubmitting={isSubmitting}
                                  formSubmit={'Proceed to Payment'}
                                >
                                  {'Proceed to Payment'}
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
          </div> */}

          <div className="form-content">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }, actionType) =>
                handleAddSubmit(values, { setSubmitting }, actionType)
              } // Pass the actionType here
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({ isSubmitting, setFieldValue, values, setSubmitting }) => {
                return (
                  <Form>
                    <Row>
                      <Col lg={12}>
                        <div className="ps-0">
                          <Row>
                            {documentRequirements?.length > 0 &&
                              documentRequirements.map((item, index) => {
                                const fieldName = item.title
                                  .toLowerCase()
                                  .replace(/\s+/g, '_');
                                return (
                                  <div key={index}>
                                    <Field
                                      name={fieldName}
                                      component={MultipleFileUploadAcceptAll}
                                      label={
                                        item?.title
                                          ? item.title.charAt(0).toUpperCase() +
                                            item.title.slice(1)
                                          : ''
                                      }
                                      field={{
                                        name: fieldName,
                                      }}
                                      form={{ values, setFieldValue }}
                                    />
                                  </div>
                                );
                              })}

                            <Col md={12} xl={12}>
                              <div className="d-flex align-items-center justify-content-center my-4 gap-3">
                                {/* stop without payment application logic for temporary */}
                                {/* <SubmitButton
                                  // isSubmitting={isSubmitting}
                                  formSubmit={'Submit Without Payment'}
                                  onClick={() =>
                                    handleAddSubmit(
                                      values,
                                      { setSubmitting },
                                      'Submit Without Payment'
                                    )
                                  }
                                >
                                  {'Submit Without Payment'}
                                </SubmitButton> */}
                                <SubmitButton
                                  // isSubmitting={isSubmitting}
                                  formSubmit={'Proceed to Payment'}
                                  onClick={() =>
                                    handleAddSubmit(
                                      values,
                                      { setSubmitting },
                                      'Proceed to Payment'
                                    )
                                  }
                                >
                                  {'Proceed to Payment'}
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
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default AppliedCourseForm;
