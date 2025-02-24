import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';

import {
  useCheckApplicationIsValidQuery,
  useGetApplicationsQuery,
} from '@/slice/services/common/applicationService';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import {
  useCreateApplicationMutation,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/public/application/applicationServiceNew';
import {
  useGetSingleCourseQuery,
  useGetsingleUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
  const university_id = router.query.id;
  const course_id = router.query.courseId;

  const { data: userInfoData, isLoading: userInfoLoading } =
    useGetUserInfoQuery();

  const { refetch: applicationDataRefetch } = useGetApplicationsQuery();

  const {
    data: checkApplicationIsValidData,
    error: checkApplicationIsValidError,
  } = useCheckApplicationIsValidQuery(
    {
      course_id: course_id,
      student_id: userInfoData?.data?._id,
    },
    {
      skip: !course_id || !userInfoData?.data?._id,
    }
  );

  useEffect(() => {
    if (router?.query?.payment_status && router?.query?.transaction_id) {
      console.log('check status');
      ('');
    } else if (checkApplicationIsValidData) {
      const status = checkApplicationIsValidData.data.status;
      if (status === 'rejected') {
        toast.success('You can apply');
      } else {
        toast.error('Application Already Exists');
      }
    }
  }, [checkApplicationIsValidData]);

  const {
    data: getSingleUniversityDataForStudent,
    refetch: getSingleUniversityForStudentRefetch,
  } = useGetsingleUniversityQuery(university_id);

  const { data: getSingleCourseData, isLoading: getSingleCourseIsLoading } =
    useGetSingleCourseQuery({
      university_id: university_id,
      course_id: course_id,
    });

  const [
    createApplication,
    { data: createApplicationData, isLoading: createApplicationIsLoading },
  ] = useCreateApplicationMutation();

  const [updateApplicationStatus, { data: updateApplicationStatusData }] =
    useUpdateApplicationStatusMutation();

  useEffect(() => {
    if (router?.query?.payment_status === 'failed') {
      toast.error('Payment Failed');
    }
    if (router?.query?.payment_status === 'cancel') {
      toast.error('Payment Cancelled');
    }
  }, [router?.query?.payment_status]);

  useEffect(() => {
    if (university_id) {
      getSingleUniversityForStudentRefetch(university_id);
    }
  }, [getSingleUniversityForStudentRefetch, university_id]);

  // useEffect(() => {
  //   if (router?.query?.payment_status && router?.query?.transaction_id) {
  //     console.log('check status');
  //     ('');
  //   } else {
  //     if (
  //       checkApplicationIsValidError?.data?.message ===
  //       'Invalid ObjectId. The provided id is not a valid MongoDB ObjectId.'
  //     ) {
  //       ('');
  //     } else {

  //       toast.error(checkApplicationIsValidError?.data?.message);
  //     }
  //   }
  // }, [
  //   checkApplicationIsValidError?.data?.message,
  //   router?.query?.payment_status,
  //   router?.query?.transaction_id,
  // ]);

  useEffect(() => {
    if (updateApplicationStatusData?.success) {
      toast.success('Application Payment successful');
      applicationDataRefetch();
      router.push(`/dashboard/student/applications`);
    } else if (updateApplicationStatusData?.error) {
      toast.error('Application failed');
    }
  }, [
    applicationDataRefetch,
    router,
    updateApplicationStatusData?.error,
    updateApplicationStatusData?.success,
  ]);

  useEffect(() => {
    if (createApplicationData?.success) {
      // toast.success(createApplicationData?.message);
      if (buttonType === 'Proceed to Payment') {
        router.push(
          `/dashboard/student/university-management/single-university-profile/${university_id}/course/${course_id}/payment-options?application_id=${createApplicationData?.data?._id}`
        );
      } else {
        applicationDataRefetch();
        // router.push(`/dashboard/student/applications`);
        router.push(
          `/dashboard/student/university-management/single-university-profile/${university_id}/course/${course_id}/payment-options?application_id=${createApplicationData?.data?._id}`
        );
      }
    }
  }, [
    applicationDataRefetch,
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
      try {
        updateApplicationStatus({
          status: 'paid',
          transaction_id,
          application_id,
          transaction_reason: 'application_emgs',
          payment_method: 'sslcommerz',
        }).unwrap();
      } catch (error) {
        //
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
      requestToCreateApplication(transaction_id, application_id);
    }
  }, [router, updateApplicationStatus, userInfoData?.data?._id]);

  const handleAddSubmit = async (values, { setSubmitting }, actionType) => {
    setSubmitting(true);
    setButtonType(actionType);

    const addData = {
      course_id: getSingleCourseData?.data?._id,
      student_id: userInfoData?.data?._id,
      applied_by: userInfoData?.data?._id,
      payment_price:
        getSingleCourseData?.data?.emgs_fee || getSingleCourseData?.data?.price,
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

    // for (const [key, value] of finalData.entries()) {
    //   console.log(`${key}: ${value instanceof File ? value.name : value}`);
    // }

    try {
      createApplication(finalData);
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues =
    getSingleCourseData?.data?.document_requirements?.reduce((acc, item) => {
      const fieldName = item?.title?.toLowerCase().replace(/\s+/g, '_');
      acc[fieldName] = [];
      return acc;
    }, {});

  // const initialValues = getSingleCourseData?.data?.document_requirements?.reduce(
  //   (acc, item) => {
  //     const fieldName = item?.title?.toLowerCase().replace(/\s+/g, '_');
  //     acc[fieldName] = {
  //       files: [],
  //       description: item?.description || ''
  //     };
  //     return acc;
  //   },
  //   {}
  // );

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

  const startDate = new Date(
    getSingleCourseData?.data?.accommodation_start_date
  );
  const endDate = new Date(getSingleCourseData?.data?.accommodation_end_date);

  // Calculate the difference in total days
  const timeDifference = endDate - startDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  // Calculate months and remaining days
  const months = Math.floor(daysDifference / 30); // Approximate months
  const remainingDays = daysDifference % 30; // Remaining days after full months

  // Generate the display format
  const accommodationShow =
    daysDifference < 30
      ? `${daysDifference} Day${daysDifference === 1 ? '' : 's'}` // If 1 day, show "Day" instead of "Days"
      : `${months} Month${months > 1 ? 's' : ''} ${remainingDays > 0 ? `${remainingDays} Day${remainingDays === 1 ? '' : 's'}` : ''}`;

  const scholarshipAmount = getSingleCourseData?.data?.scholarship_amount;
  const tuitionFee =
    getSingleCourseData?.data?.tution_fee ||
    getSingleCourseData?.data?.university_price;

  const scholarshipPercentage =
    tuitionFee > 0 ? Math.round((scholarshipAmount / tuitionFee) * 100) : 0;

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
                            <div className="d-flex gap-4 flex-wrap">
                              <div className="available-seats course-act">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23"
                                  height="26"
                                  viewBox="0 0 23 26"
                                  fill="none"
                                >
                                  <path
                                    d="M4.97916 16.595C4.77485 16.908 4.66611 17.2756 4.66666 17.6514V18.4191L2.29895 18.42C2.22045 18.4201 2.14305 18.4387 2.07285 18.4746C2.00266 18.5104 1.94162 18.5623 1.89455 18.6263C1.84747 18.6903 1.81567 18.7646 1.80165 18.8433C1.78763 18.922 1.79179 19.0029 1.81378 19.0796L3.17265 23.1426L3.18016 23.1646C3.24585 23.3806 3.44105 23.5269 3.66252 23.5269H4.66666V25.3509L3.66252 25.3519C3.17467 25.3535 2.6991 25.1962 2.30522 24.9029C1.91135 24.6097 1.61979 24.1959 1.47312 23.7219L0.112369 19.6561L0.108615 19.6446L0.104861 19.6332C-0.00283691 19.2827 -0.0280168 18.9113 0.0313605 18.549C0.0907378 18.1868 0.233004 17.8439 0.446643 17.5481C0.660283 17.2523 0.939294 17.0118 1.26109 16.8463C1.58289 16.6807 1.93844 16.5946 2.29895 16.595H4.97916ZM11.705 0.64915C12.8928 0.650667 14.0315 1.13199 14.8713 1.98756C15.7112 2.84312 16.1837 4.00309 16.1852 5.21304C16.1837 6.42299 15.7112 7.58295 14.8713 8.43852C14.0315 9.29408 12.8928 9.77541 11.705 9.77693C10.5173 9.77541 9.3786 9.29408 8.53873 8.43852C7.69886 7.58295 7.22636 6.42299 7.22487 5.21304C7.22611 4.00292 7.6985 2.84271 8.53839 1.98694C9.37829 1.13117 10.5171 0.649712 11.705 0.648193V0.64915ZM11.705 2.47413C11.18 2.47412 10.6664 2.63071 10.2277 2.92459C9.78901 3.21847 9.44438 3.63676 9.23635 4.12785C9.02831 4.61895 8.96599 5.16134 9.05706 5.6881C9.14813 6.21486 9.38861 6.70293 9.74883 7.09207C10.109 7.48121 10.5732 7.7544 11.0841 7.87791C11.5949 8.00143 12.1301 7.96987 12.6236 7.78712C13.117 7.60438 13.5472 7.27845 13.8609 6.84956C14.1746 6.42067 14.3582 5.90759 14.389 5.37364L14.3937 5.21304C14.393 4.51465 14.1307 3.84286 13.6604 3.33476C13.19 2.82666 12.547 2.52055 11.8627 2.47891L11.705 2.47413Z"
                                    fill="#B5D336"
                                  ></path>
                                  <path
                                    d="M20.3592 17.6852C20.1107 17.6852 19.8723 17.5897 19.6965 17.4196C19.5208 17.2496 19.422 17.0189 19.422 16.7784C19.422 15.4253 18.9785 14.1605 18.1747 13.2176C17.4132 12.3241 16.4181 11.8322 15.3681 11.8322H8.48299C7.43491 11.8322 6.43786 12.3241 5.67634 13.2166C4.87164 14.1605 4.43003 15.4243 4.43003 16.7784C4.43003 17.0189 4.33129 17.2496 4.15554 17.4196C3.97978 17.5897 3.74141 17.6852 3.49285 17.6852C3.24429 17.6852 3.00592 17.5897 2.83016 17.4196C2.6544 17.2496 2.55566 17.0189 2.55566 16.7784C2.55566 15.0046 3.15036 13.3306 4.23082 12.0629C4.7463 11.4485 5.38701 10.9433 6.11304 10.5788C6.84525 10.2111 7.65803 10.0189 8.48299 10.0186H15.3681C16.1934 10.0186 17.0069 10.2113 17.738 10.5788C18.4476 10.9301 19.0795 11.4296 19.6203 12.0639C20.7007 13.3306 21.2964 15.0046 21.2964 16.7784C21.2964 17.0189 21.1977 17.2496 21.0219 17.4196C20.8462 17.5897 20.6078 17.6852 20.3592 17.6852Z"
                                    fill="#B5D336"
                                  ></path>
                                  <path
                                    d="M11.9166 13.426L11.0952 15.7453C11.0732 15.8086 11.0682 15.8778 11.0807 15.9443C11.0933 16.0108 11.1228 16.0718 11.1658 16.1197L11.7106 16.7307C11.831 16.8667 12.0262 16.8677 12.1483 16.7335L12.6881 16.1281C12.7308 16.08 12.7599 16.0188 12.7718 15.9521C12.7836 15.8855 12.7776 15.8165 12.7545 15.7537L11.9157 13.426H11.9166Z"
                                    fill="#B5D336"
                                  ></path>
                                  <path
                                    d="M12.3883 13.4259H11.4618C11.4033 13.4257 11.3465 13.4094 11.3005 13.3794C11.2545 13.3495 11.2218 13.3077 11.2077 13.2606L11.0819 12.845C11.0721 12.8128 11.0714 12.7792 11.0797 12.7468C11.088 12.7143 11.1051 12.6839 11.1298 12.6577C11.1544 12.6316 11.186 12.6105 11.222 12.596C11.258 12.5815 11.2975 12.574 11.3376 12.5741H12.5149C12.5549 12.5741 12.5943 12.5817 12.6302 12.5962C12.6661 12.6107 12.6976 12.6319 12.7221 12.658C12.7467 12.6841 12.7638 12.7145 12.772 12.7469C12.7803 12.7793 12.7795 12.8129 12.7697 12.845L12.6447 13.2606C12.6305 13.308 12.5975 13.3501 12.551 13.38C12.5045 13.41 12.4472 13.4262 12.3883 13.4259Z"
                                    fill="#B5D336"
                                  ></path>
                                  <path
                                    d="M21.3788 17.6852H8.6982C7.747 17.6852 6.83475 18.0582 6.16206 18.7221C5.48937 19.386 5.11134 20.2865 5.11108 21.2256V21.8114L5.1168 21.9976C5.16669 22.9026 5.56558 23.7544 6.23158 24.3781C6.89759 25.0019 7.78018 25.3503 8.6982 25.3518H19.4138C20.3648 25.3516 21.2769 24.9785 21.9493 24.3146C22.6218 23.6507 22.9997 22.7503 23 21.8114V19.2857C23 18.4017 22.2742 17.6852 21.3788 17.6852ZM8.6982 19.5659L21.094 19.5649V21.8114C21.094 22.7283 20.3415 23.4711 19.4129 23.4711H8.69724C7.80761 23.4711 7.07228 22.7847 7.01989 21.913L7.01608 21.7832V21.2256C7.01608 20.3088 7.76856 19.5659 8.6982 19.5659Z"
                                    fill="#B5D336"
                                  ></path>
                                </svg>
                                <b>
                                  Available Seats:{' '}
                                  {getSingleCourseData?.data?.available_seats}
                                </b>
                              </div>
                              <div className="program-duration course-act">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23"
                                  height="20"
                                  viewBox="0 0 23 20"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.8194 0.595562C11.0894 0.468146 11.3995 0.468146 11.6695 0.595562L21.8917 5.42095C22.2555 5.59271 22.4889 5.96784 22.4889 6.38096C22.4889 6.79406 22.2555 7.1692 21.8917 7.34095L19.4222 8.50671V14.694C19.4222 14.9062 19.3706 15.1387 19.2404 15.3546C18.9023 15.9155 16.532 19.5 11.2444 19.5C5.95694 19.5 3.58653 15.9155 3.24847 15.3546C3.11829 15.1387 3.06667 14.9062 3.06667 14.694V8.50671L0.597223 7.34095C0.233373 7.1692 0 6.79406 0 6.38096C0 5.96784 0.233373 5.59271 0.597223 5.42095L10.8194 0.595562ZM5.11111 9.4717V14.4327C5.61187 15.15 7.47606 17.3889 11.2444 17.3889C15.0129 17.3889 16.877 15.15 17.3778 14.4327V9.4717L11.6695 12.1663C11.3995 12.2937 11.0894 12.2937 10.8194 12.1663L5.11111 9.4717ZM3.48091 6.38096L4.51389 6.86857L11.2444 10.0457L17.975 6.86857L19.008 6.38096L11.2444 2.71618L3.48091 6.38096ZM23 9.47222C23 10.3466 22.3135 11.0556 21.4667 11.0556C20.6199 11.0556 19.9333 10.3466 19.9333 9.47222C19.9333 8.5978 20.6199 7.88889 21.4667 7.88889C22.3135 7.88889 23 8.5978 23 9.47222ZM22.4889 12.6389C22.4889 12.0559 22.0312 11.5833 21.4667 11.5833C20.9021 11.5833 20.4444 12.0559 20.4444 12.6389V18.4444C20.4444 19.0274 20.9021 19.5 21.4667 19.5C22.0312 19.5 22.4889 19.0274 22.4889 18.4444V12.6389Z"
                                    fill="#B5D336"
                                  ></path>
                                </svg>
                                <b>
                                  Program Duration:{' '}
                                  {getSingleCourseData?.data?.program_duration}
                                </b>{' '}
                              </div>
                              <div className="program-duration course-act">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23"
                                  height="20"
                                  viewBox="0 0 23 20"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.8194 0.595562C11.0894 0.468146 11.3995 0.468146 11.6695 0.595562L21.8917 5.42095C22.2555 5.59271 22.4889 5.96784 22.4889 6.38096C22.4889 6.79406 22.2555 7.1692 21.8917 7.34095L19.4222 8.50671V14.694C19.4222 14.9062 19.3706 15.1387 19.2404 15.3546C18.9023 15.9155 16.532 19.5 11.2444 19.5C5.95694 19.5 3.58653 15.9155 3.24847 15.3546C3.11829 15.1387 3.06667 14.9062 3.06667 14.694V8.50671L0.597223 7.34095C0.233373 7.1692 0 6.79406 0 6.38096C0 5.96784 0.233373 5.59271 0.597223 5.42095L10.8194 0.595562ZM5.11111 9.4717V14.4327C5.61187 15.15 7.47606 17.3889 11.2444 17.3889C15.0129 17.3889 16.877 15.15 17.3778 14.4327V9.4717L11.6695 12.1663C11.3995 12.2937 11.0894 12.2937 10.8194 12.1663L5.11111 9.4717ZM3.48091 6.38096L4.51389 6.86857L11.2444 10.0457L17.975 6.86857L19.008 6.38096L11.2444 2.71618L3.48091 6.38096ZM23 9.47222C23 10.3466 22.3135 11.0556 21.4667 11.0556C20.6199 11.0556 19.9333 10.3466 19.9333 9.47222C19.9333 8.5978 20.6199 7.88889 21.4667 7.88889C22.3135 7.88889 23 8.5978 23 9.47222ZM22.4889 12.6389C22.4889 12.0559 22.0312 11.5833 21.4667 11.5833C20.9021 11.5833 20.4444 12.0559 20.4444 12.6389V18.4444C20.4444 19.0274 20.9021 19.5 21.4667 19.5C22.0312 19.5 22.4889 19.0274 22.4889 18.4444V12.6389Z"
                                    fill="#B5D336"
                                  ></path>
                                </svg>
                                <b>
                                  Tuition Fee:{' '}
                                  {getSingleCourseData?.data?.tuition_fee ||
                                    getSingleCourseData?.data
                                      ?.university_price}{' '}
                                  {'MYR'}
                                </b>{' '}
                              </div>

                              <div
                                className="program-duration course-act"
                                style={{ lineHeight: '17px' }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23"
                                  height="20"
                                  viewBox="0 0 23 20"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.8194 0.595562C11.0894 0.468146 11.3995 0.468146 11.6695 0.595562L21.8917 5.42095C22.2555 5.59271 22.4889 5.96784 22.4889 6.38096C22.4889 6.79406 22.2555 7.1692 21.8917 7.34095L19.4222 8.50671V14.694C19.4222 14.9062 19.3706 15.1387 19.2404 15.3546C18.9023 15.9155 16.532 19.5 11.2444 19.5C5.95694 19.5 3.58653 15.9155 3.24847 15.3546C3.11829 15.1387 3.06667 14.9062 3.06667 14.694V8.50671L0.597223 7.34095C0.233373 7.1692 0 6.79406 0 6.38096C0 5.96784 0.233373 5.59271 0.597223 5.42095L10.8194 0.595562ZM5.11111 9.4717V14.4327C5.61187 15.15 7.47606 17.3889 11.2444 17.3889C15.0129 17.3889 16.877 15.15 17.3778 14.4327V9.4717L11.6695 12.1663C11.3995 12.2937 11.0894 12.2937 10.8194 12.1663L5.11111 9.4717ZM3.48091 6.38096L4.51389 6.86857L11.2444 10.0457L17.975 6.86857L19.008 6.38096L11.2444 2.71618L3.48091 6.38096ZM23 9.47222C23 10.3466 22.3135 11.0556 21.4667 11.0556C20.6199 11.0556 19.9333 10.3466 19.9333 9.47222C19.9333 8.5978 20.6199 7.88889 21.4667 7.88889C22.3135 7.88889 23 8.5978 23 9.47222ZM22.4889 12.6389C22.4889 12.0559 22.0312 11.5833 21.4667 11.5833C20.9021 11.5833 20.4444 12.0559 20.4444 12.6389V18.4444C20.4444 19.0274 20.9021 19.5 21.4667 19.5C22.0312 19.5 22.4889 19.0274 22.4889 18.4444V12.6389Z"
                                    fill="#B5D336"
                                  ></path>
                                </svg>
                                <b>
                                  EMGS Fee:{' '}
                                  {getSingleCourseData?.data?.emgs_fee ||
                                    getSingleCourseData?.data?.price}{' '}
                                  {'MYR'}
                                  <br />
                                  <span style={{ fontSize: '12px' }}>
                                    (Required to start the application)
                                  </span>
                                </b>{' '}
                              </div>

                              <div
                                className="program-duration course-act"
                                style={{ lineHeight: '17px' }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23"
                                  height="20"
                                  viewBox="0 0 23 20"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.8194 0.595562C11.0894 0.468146 11.3995 0.468146 11.6695 0.595562L21.8917 5.42095C22.2555 5.59271 22.4889 5.96784 22.4889 6.38096C22.4889 6.79406 22.2555 7.1692 21.8917 7.34095L19.4222 8.50671V14.694C19.4222 14.9062 19.3706 15.1387 19.2404 15.3546C18.9023 15.9155 16.532 19.5 11.2444 19.5C5.95694 19.5 3.58653 15.9155 3.24847 15.3546C3.11829 15.1387 3.06667 14.9062 3.06667 14.694V8.50671L0.597223 7.34095C0.233373 7.1692 0 6.79406 0 6.38096C0 5.96784 0.233373 5.59271 0.597223 5.42095L10.8194 0.595562ZM5.11111 9.4717V14.4327C5.61187 15.15 7.47606 17.3889 11.2444 17.3889C15.0129 17.3889 16.877 15.15 17.3778 14.4327V9.4717L11.6695 12.1663C11.3995 12.2937 11.0894 12.2937 10.8194 12.1663L5.11111 9.4717ZM3.48091 6.38096L4.51389 6.86857L11.2444 10.0457L17.975 6.86857L19.008 6.38096L11.2444 2.71618L3.48091 6.38096ZM23 9.47222C23 10.3466 22.3135 11.0556 21.4667 11.0556C20.6199 11.0556 19.9333 10.3466 19.9333 9.47222C19.9333 8.5978 20.6199 7.88889 21.4667 7.88889C22.3135 7.88889 23 8.5978 23 9.47222ZM22.4889 12.6389C22.4889 12.0559 22.0312 11.5833 21.4667 11.5833C20.9021 11.5833 20.4444 12.0559 20.4444 12.6389V18.4444C20.4444 19.0274 20.9021 19.5 21.4667 19.5C22.0312 19.5 22.4889 19.0274 22.4889 18.4444V12.6389Z"
                                    fill="#B5D336"
                                  ></path>
                                </svg>
                                <b>
                                  Balance Payable:{' '}
                                  {(getSingleCourseData?.data?.tuition_fee ||
                                    getSingleCourseData?.data
                                      ?.university_price ||
                                    0) -
                                    (getSingleCourseData?.data?.emgs_fee ||
                                      getSingleCourseData?.data?.price ||
                                      0)}{' '}
                                  MYR
                                  <br />
                                  <span style={{ fontSize: '12px' }}>
                                    (Payment is required after EMGS processing.)
                                  </span>
                                </b>{' '}
                              </div>
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
                            <div className="document-requirements">
                              <h3>Required Documents for this course:</h3>
                              {getSingleCourseData?.data?.document_requirements
                                ?.length > 0 &&
                                getSingleCourseData?.data?.document_requirements?.map(
                                  (doc, i) => {
                                    return (
                                      <>
                                        <h4
                                          style={{
                                            color: 'rgb(9, 42, 103)',
                                            display: 'inline',
                                            fontFamily: 'Lora, serif',
                                            fontSize: '18px',
                                            fontWeight: 600,
                                            height: 'auto',
                                            lineHeight: '27px',
                                            marginBottom: '0px',
                                            marginLeft: '0px',
                                            marginRight: '0px',
                                            marginTop: '0px',
                                            outlineColor: 'rgb(9, 42, 103)',
                                            outlineStyle: 'none',
                                            outlineWidth: '0px',
                                            overflowWrap: 'break-word',
                                            paddingBottom: '0px',
                                            paddingLeft: '0px',
                                            paddingRight: '0px',
                                            paddingTop: '0px',
                                            textAlign: 'start',
                                            textSizeAdjust: '100%',
                                          }}
                                        >
                                          {doc?.title ? doc?.title : ''}
                                        </h4>
                                        <div className="doc-description">
                                          {doc?.description
                                            ? doc?.description
                                            : ''}
                                        </div>
                                      </>
                                    );
                                  }
                                )}
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
                            </Accordion>
                          </div>

                          <div className="course-details">
                            <div className="course-offers">
                              {(getSingleCourseData?.data?.free_air_ticket ||
                                getSingleCourseData?.data
                                  ?.scholarship_on_tuition_fee ||
                                getSingleCourseData?.data?.free_accommodation ||
                                getSingleCourseData?.data
                                  ?.free_accessories) && (
                                <h3>Offers Included in this Course:</h3>
                              )}
                              <div className="course-offers-list">
                                <ul>
                                  {getSingleCourseData?.data
                                    ?.free_air_ticket && (
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="31"
                                        viewBox="0 0 30 31"
                                        fill="none"
                                      >
                                        <path
                                          d="M5.82022 4.44693C7.06296 4.47792 8.2198 3.78494 8.76099 2.68349C8.93853 2.32573 9.34228 2.13699 9.73457 2.23277L14.0498 3.26097L2.65034 14.4754L4.96402 5.09202C5.0614 4.70609 5.41647 4.43566 5.82022 4.44693Z"
                                          fill="#13C9BF"
                                        ></path>
                                        <path
                                          d="M1.85181 17.4023C1.63416 17.0671 1.68 16.6276 1.96635 16.3459L2.26412 16.0529L15.0266 3.4948L15.6451 2.88632C15.8112 2.72294 16.0316 2.63843 16.2521 2.63843C16.4125 2.63843 16.5728 2.6835 16.716 2.77364C17.24 3.10605 17.8385 3.26944 18.4369 3.26944C19.0354 3.26944 19.6367 3.10323 20.1579 2.77364C20.3011 2.6835 20.4614 2.63843 20.6218 2.63843C20.8423 2.63843 21.0628 2.72294 21.2288 2.88632L28.0324 9.57388C28.3188 9.85558 28.3675 10.295 28.147 10.6274C27.4741 11.6556 27.4741 12.9881 28.147 14.0163C28.3646 14.3515 28.3188 14.7881 28.0324 15.0698L18.1249 24.8167L14.3508 28.5295C14.1847 28.6928 13.9643 28.7774 13.7438 28.7774C13.5834 28.7774 13.4231 28.7323 13.2799 28.6421C12.7559 28.3097 12.1574 28.1463 11.559 28.1463C10.9605 28.1463 10.3592 28.3125 9.838 28.6421C9.69483 28.7323 9.53447 28.7774 9.37412 28.7774C9.15366 28.7774 8.93318 28.6928 8.7671 28.5295L1.96924 21.8419C1.68289 21.5602 1.63708 21.1179 1.85756 20.7827C2.50757 19.7855 2.52478 18.5038 1.91197 17.4925C1.88903 17.4614 1.86899 17.4333 1.85181 17.4023ZM8.60096 13.5402L13.7495 15.8107L12.3206 17.2163H9.76928C9.69196 17.2163 9.62038 17.2473 9.56594 17.298L9.1851 17.6727C9.04193 17.8135 9.08775 18.053 9.27387 18.1319L11.5532 19.0925L12.5354 21.3348C12.6156 21.5179 12.859 21.563 13.0021 21.4222L13.383 21.0475C13.4374 20.994 13.466 20.9236 13.466 20.8475V18.3375L14.8949 16.9318L17.2028 21.9996C17.2858 22.1799 17.5235 22.2221 17.6667 22.0841L18.2279 21.532C18.2909 21.47 18.3195 21.3855 18.3109 21.2982L17.4691 14.4022L19.5451 12.3599C19.568 12.3373 19.5881 12.3092 19.6024 12.2782L20.2209 10.9429C20.3297 10.7063 20.0834 10.4612 19.8429 10.5711L18.4856 11.1795C18.4542 11.1936 18.4255 11.2133 18.4026 11.2359L16.3266 13.2782L9.31688 12.45C9.23097 12.4387 9.14221 12.4697 9.07921 12.5317L8.51797 13.0838C8.37477 13.2219 8.41772 13.4585 8.60096 13.5402Z"
                                          fill="#13C9BF"
                                        ></path>
                                      </svg>
                                      <span>A free air ticket</span>
                                    </li>
                                  )}

                                  {getSingleCourseData?.data
                                    ?.free_accommodation && (
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="31"
                                        height="31"
                                        viewBox="0 0 31 31"
                                        fill="none"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M14.0927 9.88828H5.64865C4.3218 9.88828 3.65839 9.88827 3.24618 10.3005C2.83398 10.7127 2.83398 11.3761 2.83398 12.7029V14.1103C2.83398 15.4371 2.83398 16.1005 3.24618 16.5127C3.65839 16.925 4.3218 16.925 5.64865 16.925H7.05599H14.0927V9.88828ZM7.05599 19.7396V25.369C7.05599 26.6958 7.05599 27.3592 7.46818 27.7714C7.88039 28.1836 8.54381 28.1836 9.87066 28.1836H14.0927V19.7396H7.05599ZM16.9073 28.1836H21.1293C22.4562 28.1836 23.1196 28.1836 23.5318 27.7714C23.944 27.3592 23.944 26.6958 23.944 25.369V19.7396H16.9073V28.1836ZM23.944 16.925H25.3513C26.6782 16.925 27.3416 16.925 27.7538 16.5127C28.166 16.1005 28.166 15.4371 28.166 14.1103V12.7029C28.166 11.3761 28.166 10.7127 27.7538 10.3005C27.3416 9.88827 26.6782 9.88828 25.3513 9.88828H16.9073V16.925H23.944Z"
                                          fill="#13C9BF"
                                        ></path>
                                        <path
                                          d="M25.3513 5.14904V4.89275C25.3513 3.19624 23.6893 1.9983 22.0799 2.53479C20.0665 3.20591 18.2371 4.33656 16.7365 5.8372L15.5 7.07363V8.48097H20.6725C20.9751 8.48097 21.2757 8.43219 21.5627 8.33653L23.5255 7.68225C24.6159 7.31879 25.3513 6.29839 25.3513 5.14904Z"
                                          fill="#13C9BF"
                                        ></path>
                                        <path
                                          d="M5.64844 5.14904V4.89275C5.64844 3.19624 7.31049 1.9983 8.91993 2.53479C10.9333 3.20591 12.7627 4.33656 14.2633 5.8372L15.4998 7.07363V8.48097H10.3272C10.0247 8.48097 9.72412 8.43219 9.43712 8.33653L7.47427 7.68225C6.3839 7.31879 5.64844 6.29839 5.64844 5.14904Z"
                                          fill="#13C9BF"
                                        ></path>
                                      </svg>
                                      <span>
                                        {' '}
                                        {accommodationShow} free accommodation
                                      </span>
                                    </li>
                                  )}

                                  {getSingleCourseData?.data
                                    ?.scholarship_on_tuition_fee && (
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="31"
                                        viewBox="0 0 30 31"
                                        fill="none"
                                      >
                                        <path
                                          d="M26.087 15.4927L27.4858 13.0751C27.6539 12.7843 27.6997 12.4385 27.6129 12.114C27.5262 11.7894 27.3141 11.5126 27.0233 11.3443L24.6032 9.94548V7.15793C24.6032 6.82189 24.4698 6.4996 24.2321 6.26198C23.9945 6.02436 23.6722 5.89087 23.3362 5.89087H20.5499L19.1523 3.47204C18.9835 3.18178 18.7072 2.96966 18.3832 2.88159C18.2225 2.83803 18.0548 2.82679 17.8897 2.84854C17.7246 2.87029 17.5655 2.92459 17.4215 3.0083L15.0014 4.40714L12.5813 3.00703C12.2903 2.83902 11.9445 2.79348 11.6199 2.88045C11.2953 2.96742 11.0186 3.17977 10.8505 3.47078L9.45169 5.89087H6.66542C6.32938 5.89087 6.00709 6.02436 5.76947 6.26198C5.53185 6.4996 5.39836 6.82189 5.39836 7.15793V9.94421L2.97827 11.343C2.83386 11.4261 2.70729 11.5369 2.60583 11.669C2.50437 11.8011 2.43001 11.952 2.38704 12.113C2.34406 12.2739 2.33331 12.4418 2.35541 12.6069C2.3775 12.772 2.43201 12.9311 2.51579 13.0751L3.91463 15.4927L2.51579 17.9102C2.34852 18.2014 2.30314 18.5468 2.38953 18.8713C2.47593 19.1958 2.6871 19.4729 2.977 19.6423L5.39709 21.0412V23.8274C5.39709 24.1635 5.53058 24.4858 5.7682 24.7234C6.00583 24.961 6.32811 25.0945 6.66415 25.0945H9.45169L10.8505 27.5146C10.9627 27.7063 11.1229 27.8656 11.3153 27.9767C11.5077 28.0878 11.7257 28.1468 11.9478 28.1481C12.1683 28.1481 12.3875 28.0898 12.5826 27.9771L15.0002 26.5782L17.4203 27.9771C17.7112 28.1448 18.0568 28.1904 18.3813 28.1037C18.7058 28.017 18.9826 27.8051 19.1511 27.5146L20.5486 25.0945H23.3349C23.671 25.0945 23.9932 24.961 24.2309 24.7234C24.4685 24.4858 24.602 24.1635 24.602 23.8274V21.0412L27.0221 19.6423C27.1662 19.559 27.2926 19.4481 27.3938 19.316C27.4951 19.1838 27.5693 19.033 27.6123 18.8721C27.6552 18.7113 27.6661 18.5435 27.6441 18.3785C27.6222 18.2134 27.568 18.0543 27.4846 17.9102L26.087 15.4927ZM11.8325 9.14469C12.3367 9.14486 12.8203 9.34533 13.1767 9.70199C13.5331 10.0587 13.7333 10.5423 13.7331 11.0466C13.7329 11.5508 13.5325 12.0343 13.1758 12.3907C12.8191 12.7472 12.3355 12.9473 11.8312 12.9471C11.327 12.947 10.8435 12.7465 10.4871 12.3898C10.1306 12.0332 9.93048 11.5495 9.93064 11.0453C9.93081 10.541 10.1313 10.0575 10.4879 9.7011C10.8446 9.34467 11.3283 9.14452 11.8325 9.14469ZM12.2126 21.3085L10.1853 19.7893L17.7877 9.65278L19.815 11.172L12.2126 21.3085ZM18.1678 21.8153C17.9182 21.8152 17.6709 21.766 17.4403 21.6704C17.2097 21.5747 17.0001 21.4346 16.8236 21.258C16.6472 21.0814 16.5072 20.8718 16.4117 20.6411C16.3162 20.4104 16.2671 20.1631 16.2672 19.9135C16.2673 19.6638 16.3166 19.4166 16.4122 19.1859C16.5078 18.9553 16.6479 18.7458 16.8245 18.5693C17.0011 18.3928 17.2108 18.2528 17.4415 18.1574C17.6722 18.0619 17.9194 18.0128 18.1691 18.0129C18.6733 18.013 19.1569 18.2135 19.5133 18.5702C19.8697 18.9268 20.0699 19.4105 20.0697 19.9147C20.0695 20.419 19.8691 20.9025 19.5124 21.2589C19.1557 21.6154 18.6721 21.8155 18.1678 21.8153Z"
                                          fill="#13C9BF"
                                        ></path>
                                      </svg>
                                      <span>
                                        14% Scholarship on tuition fee
                                      </span>
                                    </li>
                                  )}

                                  {getSingleCourseData?.data
                                    ?.free_accessories && (
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="37"
                                        height="31"
                                        viewBox="0 0 37 31"
                                        fill="none"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M31.8258 25.5319C29.419 25.5319 8.14698 25.8597 5.5188 25.8597C2.89061 25.8597 2.52637 24.1169 2.52637 22.0407C3.11196 22.0407 9.00436 22.0827 15.3703 22.1332C15.3703 23.3912 15.4767 23.4108 18.4075 23.4108C21.3383 23.4108 21.4112 23.3464 21.4112 22.178C27.3596 22.2228 33.1539 22.2593 34.4736 22.2593C34.468 23.5706 34.0561 25.5319 31.8258 25.5319ZM5.76817 21.0152C5.76817 20.99 5.57483 9.07072 5.60846 7.62494C5.64768 5.72805 6.19686 5.12564 7.84998 5.12564C9.17247 5.12564 26.9589 5.15646 28.6569 5.19289C30.5902 5.23211 30.8676 6.14273 30.8676 7.89952C30.8676 9.17999 30.5202 20.8247 30.5202 20.8247L5.76817 21.0152Z"
                                          fill="#13C9BF"
                                        ></path>
                                      </svg>
                                      {getSingleCourseData?.data?.accessories
                                        .length > 0 &&
                                      getSingleCourseData.data.accessories.some(
                                        (item) => item.trim() !== ''
                                      ) ? (
                                        getSingleCourseData.data.accessories.map(
                                          (item, index) =>
                                            item.trim() !== '' && (
                                              <span key={index}>
                                                {item.charAt(0).toUpperCase() +
                                                  item.slice(1)}
                                                {index <
                                                  getSingleCourseData.data
                                                    .accessories.length -
                                                    1 && ', '}
                                              </span>
                                            )
                                        )
                                      ) : (
                                        <span>No Accessories</span>
                                      )}
                                    </li>
                                  )}
                                </ul>
                              </div>

                              {(getSingleCourseData?.data?.free_air_ticket ||
                                getSingleCourseData?.data
                                  ?.scholarship_on_tuition_fee ||
                                getSingleCourseData?.data?.free_accommodation ||
                                getSingleCourseData?.data
                                  ?.free_accessories) && (
                                <div className="terms-conditions">
                                  * <span>Terms &amp; Conditions Apply</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Col>

                        <Col lg={12}>
                          {(checkApplicationIsValidData &&
                            checkApplicationIsValidData.data.status ===
                              'rejected') ||
                          (checkApplicationIsValidError &&
                            checkApplicationIsValidError.data.message ===
                              'Application not found') ? (
                            <div className="d-flex justify-content-center">
                              <button
                                onClick={() => setStep(step + 1)}
                                className="button py-3 px-5"
                              >
                                Continue For Apply
                              </button>
                            </div>
                          ) : (
                            ''
                          )}
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                ) : (
                  // <CourseForm setStep={setStep} step={step} />
                  <AppliedCourseForm
                    setStep={setStep}
                    step={step}
                    documentRequirements={
                      getSingleCourseData?.data?.document_requirements
                    }
                    handleAddSubmit={handleAddSubmit}
                    initialValues={initialValues}
                    emgsfee={
                      getSingleCourseData?.data?.emgs_fee ||
                      getSingleCourseData?.data?.price
                    }
                  />
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
