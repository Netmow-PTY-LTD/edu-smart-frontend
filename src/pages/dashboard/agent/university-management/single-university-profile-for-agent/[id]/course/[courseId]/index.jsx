import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';

import { useAllStudentForAgentQuery } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import {
  useCreateApplicationMutation,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/public/application/applicationServiceNew';
import {
  useGetSingleCourseQuery,
  useGetsingleUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from 'reactstrap';
import AppliedCourseForm from '../course-form/applied-course-form';

const SingleUniversityCourse = () => {
  const router = useRouter();
  const [open, setOpen] = useState('1');
  const [step, setStep] = useState(1);
  const [buttonType, setButtonType] = useState('');
  const [studentsData, setAllStudentsData] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const university_id = router.query.id;
  const course_id = router.query.courseId;

  const {
    data: allStudentForAgentData,
    error: allStudentForAgentError,
    isLoading: allStudentForAgentIsLoading,
    refetch: allStudentForAgentRefetch,
  } = useAllStudentForAgentQuery();

  const {
    data: getSingleUniversityDataForStudent,
    isLoading: getSingleUniversityIsLoadingForStudent,
    refetch: getSingleUniversityForStudentRefetch,
  } = useGetsingleUniversityQuery(university_id);

  const { data: userInfoData, isLoading: userInfoLoading } =
    useGetUserInfoQuery();

  const {
    data: getSingleCourseData,
    isLoading: getSingleCourseIsLoading,
    refetch: getSingleCourseRefetch,
  } = useGetSingleCourseQuery({
    university_id: university_id,
    course_id: course_id,
  });

  const [
    createApplication,
    { data: createApplicationData, isLoading: createApplicationIsLoading },
  ] = useCreateApplicationMutation();

  const [
    updateApplicationStatus,
    {
      data: updateApplicationStatusData,
      isLoading: updateApplicationStatusIsLoading,
    },
  ] = useUpdateApplicationStatusMutation();

  // console.log(allStudentForAgentData?.data);

  useEffect(() => {
    if (allStudentForAgentData?.data?.length > 0) {
      const students = allStudentForAgentData?.data.map((item) => ({
        label: item?.first_name + ' ' + item?.last_name,
        value: item?._id,
      }));
      setAllStudentsData(students);
    }
  }, [allStudentForAgentData]);

  // console.log(studentsData);

  useEffect(() => {
    if (updateApplicationStatusData?.success) {
      toast.success('Application Payment successfull');
      router.push(`/dashboard/agent/applications`);
    } else if (updateApplicationStatusData?.error) {
      toast.error('Application failed');
    }
  }, [
    router,
    updateApplicationStatusData?.error,
    updateApplicationStatusData?.success,
  ]);

  useEffect(() => {
    if (university_id) {
      getSingleUniversityForStudentRefetch(university_id);
    }
  }, [getSingleUniversityForStudentRefetch, university_id]);

  useEffect(() => {
    if (createApplicationData?.success) {
      toast.success(createApplicationData?.message);
      if (buttonType === 'Proceed to Payment') {
        router.push(
          `/dashboard/agent/university-management/single-university-profile-for-agent/${university_id}/course/${course_id}/payment-options?application_id=${createApplicationData?.data?._id}`
        );
      } else {
        router.push(`/dashboard/agent/applications`);
      }
    }
  }, [
    buttonType,
    course_id,
    createApplicationData?.data?._id,
    createApplicationData?.message,
    createApplicationData?.success,
    router,
    university_id,
  ]);

  useEffect(() => {
    const requestToCreateApplication = async (
      transaction_id,
      application_id
    ) => {
      console.log(transaction_id);
      console.log(application_id);
      try {
        const response = await updateApplicationStatus({
          status: 'paid',
          transaction_id,
          application_id,
        }).unwrap();
        // console.log(response);
        if (response.success) {
          toast.success('Application created successfully');
          router.push(`/dashboard/agent/applications`);
        } else {
          toast.error('Application failed');
        }
      } catch (error) {
        // toast.error('Something went wrong while creating application');
      }
    };

    if (
      router?.query?.payment_status === 'success' &&
      router?.query?.transaction_id &&
      userInfoData?.data?._id
    ) {
      const transaction_id = router?.query?.transaction_id;
      const application_id = router?.query?.application_id;
      toast.success('Payment Successfull');
      Cookies.remove('selectedStudent');
      requestToCreateApplication(transaction_id, application_id);
    }
  }, [router, updateApplicationStatus, userInfoData?.data?._id]);

  useEffect(() => {
    if (router?.query?.payment_status === 'faild') {
      toast.error('Payment Failed');
    }
    if (router?.query?.payment_status === 'cancel') {
      toast.error('Payment Cancelled');
    }
  }, [router?.query?.payment_status]);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const handleDownload = (fileUrl) => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'brochure.pdf';
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
      });
  };

  console.log(Cookies.get('selectedStudent'));

  const handleAddSubmit = async (values, { setSubmitting }, actionType) => {
    setSubmitting(true);
    setButtonType(actionType);

    try {
      console.log('Form Submitted with action:', actionType);
      console.log('Form Values:', values);

      const addData = {
        course_id: getSingleCourseData?.data?._id,
        student_id: Cookies.get('selectedStudent') || null,
        applied_by: userInfoData?.data?._id,
        payment_price: getSingleCourseData?.data?.price,
        payment_gst: getSingleCourseData?.data?.gst,
        payment_status: 'pending',
        ...values,
      };

      const finalData = new FormData();
      for (const [key, value] of Object.entries(addData)) {
        if (Array.isArray(value)) {
          value.forEach((file, index) => {
            finalData.append(`${key}[${index}]`, file);
          });
        } else {
          finalData.append(key, value);
        }
      }

      // Log FormData for debugging
      for (const [key, value] of finalData.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }

      // Submit the form data to the API
      const response = await createApplication(finalData).unwrap();

      if (response.success) {
        toast.success('Application created successfully');
        if (actionType === 'Proceed to Payment') {
          router.push(
            `/dashboard/agent/university-management/single-university-profile-for-agent/${university_id}/course/${course_id}/payment-options`
          );
        }
      }
    } catch (error) {
      console.error('Error during submission:', error);
      // toast.error(error.message || 'An error occurred during submission');
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = getSingleCourseData?.data?.document_requirements.reduce(
    (acc, item) => {
      const fieldName = item.title.toLowerCase().replace(/\s+/g, '_');
      acc[fieldName] = [];
      return acc;
    },
    {}
  );

  console.log(getSingleCourseData?.data?.document_requirements);

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <ProfileBgCover
            profileData={getSingleUniversityDataForStudent?.data}
          />
          <Container fluid>
            <ToastContainer />
            {getSingleCourseIsLoading ||
            userInfoLoading ||
            createApplicationIsLoading ? (
              <LoaderSpiner />
            ) : (
              <>
                {step === 1 ? (
                  <Card>
                    <CardHeader className="fs-1 fw-semibold">
                      Course Details
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col lg={6}>
                          <div className="course-details">
                            <h2>
                              <span>Course Name: </span>
                              {getSingleCourseData?.data?.name
                                ? getSingleCourseData?.data?.name
                                : 'Bachelor in Accounting (Hons.)'}
                            </h2>
                            <div className="course-description">
                              <b className="text-secondary-alt fw-semibold fs-18">
                                Course Description:
                              </b>
                              <br />
                              {getSingleCourseData?.data?.description
                                ? getSingleCourseData?.data?.description
                                : `Accounting is the language of business, and accountants
                        help business leaders make smart financial decisions.
                        The Bachelor in Accounting (Hons) is a three-year
                        programme that is recognised by the Malaysian Institute
                        of Accountants, which will enable graduates with the
                        relevant professional working experience to qualify as a
                        Chartered Accountant Malaysia or C.A. (M). It provides
                        students with the knowledge and skills required to
                        become professional accountants, including digital and
                        entrepreneurial skills. The programme is infused with
                        A’adab©, or the values expected when one is dealing
                        with others and the environment, which is introduced in
                        the Halatuju 4 Program Perakaunan published by Malaysian
                        Institute of Accountants.`}
                            </div>
                            <div className="course-btns">
                              <button
                                onClick={() =>
                                  handleDownload(
                                    getSingleCourseData?.data?.brochure?.url
                                  )
                                }
                                className="btn-secondary-alt"
                              >
                                Download Brochure
                              </button>
                            </div>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="course-details">
                            <Accordion open={open} toggle={toggle}>
                              <AccordionItem>
                                <AccordionHeader targetId="1">
                                  Entry Requirements
                                </AccordionHeader>
                                <AccordionBody accordionId="1">
                                  {getSingleCourseData?.data?.entry_requirements.map(
                                    (item, index) => (
                                      <strong key={index} className="d-flex">
                                        .{item}
                                      </strong>
                                    )
                                  )}
                                </AccordionBody>
                              </AccordionItem>
                              <AccordionItem>
                                <AccordionHeader targetId="2">
                                  English Requirements
                                </AccordionHeader>
                                <AccordionBody accordionId="2">
                                  {getSingleCourseData?.data?.english_requirements.map(
                                    (item, index) => (
                                      <strong key={index} className="d-flex">
                                        .{item}
                                      </strong>
                                    )
                                  )}
                                </AccordionBody>
                              </AccordionItem>
                              <AccordionItem>
                                <AccordionHeader targetId="3">
                                  Program Duration
                                </AccordionHeader>
                                <AccordionBody accordionId="3">
                                  {
                                    <strong className="d-flex">
                                      {
                                        getSingleCourseData?.data
                                          ?.program_duration
                                      }
                                    </strong>
                                  }
                                </AccordionBody>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </Col>
                      </Row>
                      {studentsData?.length > 0 && (
                        <>
                          <div className="d-flex justify-content-center align-items-center">
                            <div className="d-flex flex-column justify-content-center w-25">
                              <div className="mb-3">
                                <label
                                  htmlFor="studentSelect"
                                  className="form-label fs-2"
                                >
                                  Select a Student
                                </label>

                                <ReactSelect
                                  id="studentSelect"
                                  className="fs-2"
                                  options={studentsData.map((student) => ({
                                    value: student.value,
                                    label: student.label,
                                  }))}
                                  onChange={(selectedOption) => {
                                    const selectedValue = selectedOption
                                      ? selectedOption.value
                                      : null;

                                    // Set in cookies
                                    Cookies.set(
                                      'selectedStudent',
                                      selectedValue
                                    ); // You can adjust the expiration time

                                    // Set in state
                                    setSelectedStudent(selectedValue);
                                  }}
                                  placeholder="Choose a student"
                                  isClearable
                                  // isMulti
                                  isSearchable
                                />
                              </div>

                              <button
                                onClick={() => {
                                  if (selectedStudent) {
                                    setStep(step + 1);
                                    // setSelectedStudent([]);
                                    setSelectedStudent('');
                                  } else {
                                    toast.error(
                                      'Please select a student first.'
                                    );
                                  }
                                }}
                                className="button py-3 px-5 fs-2"
                              >
                                Continue For Apply
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                ) : (
                  <>
                    {updateApplicationStatusIsLoading ? (
                      <LoaderSpiner />
                    ) : (
                      <AppliedCourseForm
                        setStep={setStep}
                        step={step}
                        documentRequirements={
                          getSingleCourseData?.data?.document_requirements
                        }
                        handleAddSubmit={handleAddSubmit}
                        initialValues={initialValues}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default SingleUniversityCourse;
