import SubmitButton from '@/components/common/formField/SubmitButton';
import Layout from '@/components/layout';
import { useGetRecentApplicationsQuery } from '@/slice/services/common/applicationService';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import Select from 'react-select';
import { Card, CardBody, Col, Row } from 'reactstrap';
import * as Yup from 'yup';

const AirportPickupRequestPage = () => {
  const router = useRouter();
  const {
    data: getAllRecentApplicationsData,
    error: getAllRecentApplicationsError,
    isLoading: getAllRecentApplicationsIsLoading,
    refetch: getAllRecentApplicationsRefetch,
  } = useGetRecentApplicationsQuery();

  const recentApplicantStudentOptions =
  
    getAllRecentApplicationsData?.data?.map((item) => ({
      value: item?._id,
      label: `${item?.student?.first_name} ${item?.student?.last_name} - ${item?._id}`,
      student_id: item?.student?._id,
      applied_by: item?.applied_by,
    })) || [];

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    application_id: Yup.string().required('Applicant Student is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const application_id = values.application_id;

    // Redirect to the student profile page
    router.push({
      pathname: `/dashboard/super-admin/recent-application/`,
      query: { application_id: application_id },
    });

    setSubmitting(false);
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="d-flex align-items-center justify-content-center">
          <Card className="p-3">
            <h1>Airport Pickup Request</h1>
            <CardBody>
              {getAllRecentApplicationsIsLoading ? (
                <p>Loading...</p>
              ) : getAllRecentApplicationsError ? (
                <p>Error fetching applications. Please try again.</p>
              ) : (
                <Formik
                  initialValues={{
                    application_id: '',
                    student_id: '',
                    applied_by: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                      <Row>
                        <Col md={12} xl={12}>
                          <div className="mb-4">
                            <label className="form-label mb-2">
                              Select Application *
                            </label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              isClearable
                              isSearchable
                              placeholder="Select Application"
                              name="application_id"
                              options={recentApplicantStudentOptions}
                              onChange={(option) => {
                                setFieldValue(
                                  'application_id',
                                  option ? option.value : ''
                                );
                                setFieldValue(
                                  'student_id',
                                  option ? option.student_id : ''
                                );
                                setFieldValue(
                                  'applied_by',
                                  option ? option.applied_by : ''
                                );
                              }}
                              value={
                                recentApplicantStudentOptions.find(
                                  (opt) => opt.value === values?.application_id
                                ) || null
                              }
                            />
                          </div>
                        </Col>

                        <Col md={12} xl={12}>
                          <div className="my-4 text-center">
                            <SubmitButton
                              isSubmitting={isSubmitting}
                              formSubmit="Submit for Request"
                            />
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AirportPickupRequestPage;
