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
  console.log('documentRequirements', documentRequirements);

  // const handleAddSubmit = async (values, { setSubmitting }, actionType) => {
  //   setSubmitting(true);
  //   setButtonType(actionType);

  //   const addData = {
  //     course_id: getSingleCourseData?.data?._id,
  //     student_id: Cookies.get('selectedStudent') || null,
  //     applied_by: userInfodata?.data?._id,
  //     payment_price: getSingleCourseData?.data?.price,
  //     payment_gst: getSingleCourseData?.data?.gst,
  //     payment_status: 'pending',
  //     ...values,
  //   };

  //   const finalData = new FormData();
  //   for (const [key, value] of Object.entries(addData)) {
  //     if (Array.isArray(value)) {
  //       value.forEach((file, index) => {
  //         finalData.append(`${key}[${index}]`, file);
  //       });
  //     } else {
  //       finalData.append(key, value);
  //     }
  //   }

  //   try {
  //     const createApplicationInfo = await createApplication(finalData).unwrap();
  //     console.log('CreateApplicationStatus', createApplicationInfo);

  //     if (createApplicationInfo?.success) {
  //       toast.success('Application Submitted successfully!');

  //       // Delay the navigation by 2 seconds so user sees the toast
  //       setTimeout(() => {
  //         router.push('/dashboard/student/applications');
  //       }, 2000); // 2000ms = 2 seconds
  //     }
  //   } catch (error) {
  //     console.error('Error during submission:', error);
  //     toast.error('Failed to create application.');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

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
                            documentRequirements.length > 0 &&
                            documentRequirements.some((item) =>
                              item?.title?.trim()
                            ) ? (
                              <>
                                {[
                                  ...new Map(
                                    documentRequirements
                                      .filter(
                                        (item) => item?.title?.trim() !== ''
                                      )
                                      .map((item) => [
                                        item.document_list_id,
                                        item,
                                      ])
                                  ).values(),
                                ].map((item) => {
                                  const fieldName = item?.title
                                    ?.toLowerCase()
                                    .replace(/\s+/g, '_');

                                  return (
                                    <div key={item._id}>
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
                                        field={{ name: fieldName }}
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
                                })}

                                <Col md={12} xl={12}>
                                  <div className="d-flex align-items-center justify-content-center my-4 gap-3">
                                    <SubmitButton
                                      formSubmit={'Submit Without Payment'}
                                      onClick={() => {
                                        const uniqueDocuments = [
                                          ...new Map(
                                            documentRequirements
                                              .filter(
                                                (item) =>
                                                  item?.title?.trim() !== ''
                                              )
                                              .map((item) => [
                                                item.document_list_id,
                                                item,
                                              ])
                                          ).values(),
                                        ];

                                        const missingRequired =
                                          uniqueDocuments.filter((item) => {
                                            const fieldName = item.title
                                              .toLowerCase()
                                              .replace(/\s+/g, '_');
                                            const value = values[fieldName];
                                            return (
                                              item.isRequired &&
                                              (!value || value.length === 0)
                                            );
                                          });

                                        if (missingRequired.length > 0) {
                                          missingRequired.forEach((doc) => {
                                            toast.error(
                                              `Document required: ${doc.title}`
                                            );
                                          });
                                          return;
                                        }

                                        handleAddSubmit(
                                          values,
                                          { setSubmitting },
                                          'Submit Application For Review'
                                        );
                                      }}
                                    >
                                      {'Submit Application For Review'}
                                    </SubmitButton>
                                  </div>
                                </Col>
                              </>
                            ) : (
                              <>
                                <Col md={12} xl={12}>
                                  <div>No document requirements available.</div>

                                  <div className="d-flex align-items-center justify-content-center my-4 gap-3">
                                    <SubmitButton
                                      formSubmit={'Submit Without Payment'}
                                      onClick={() => {
                                        handleAddSubmit(
                                          values,
                                          { setSubmitting },
                                          'Submit Application For Review'
                                        );
                                      }}
                                    >
                                      {'Submit Application For Review'}
                                    </SubmitButton>
                                  </div>
                                </Col>
                              </>
                            )}
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
