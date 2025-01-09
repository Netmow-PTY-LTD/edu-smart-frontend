import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useGetSingleCourseQuery,
  useGetsingleUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';
import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react';
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
import CourseForm from '../course-form';

const SingleUniversityCourse = () => {
  const router = useRouter();
  const [open, setOpen] = useState('1');
  const [step, setStep] = useState(1);
  const university_id = router.query.id;
  const course_id = router.query.courseId;

  const {
    data: getSingleUniversityDataForStudent,
    isLoading: getSingleUniversityIsLoadingForStudent,
    refetch: getSingleUniversityForStudentRefetch,
  } = useGetsingleUniversityQuery(university_id);

  useEffect(() => {
    if (university_id) {
      console.log('university_id', university_id);
      getSingleUniversityForStudentRefetch(university_id);
    }
  }, [getSingleUniversityForStudentRefetch, university_id]);

  const {
    data: getSingleCourseData,
    isLoading: getSingleCourseIsLoading,
    refetch: getSingleCourseRefetch,
  } = useGetSingleCourseQuery({
    university_id: university_id,
    course_id: course_id,
  });

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

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <ProfileBgCover
            profileData={getSingleUniversityDataForStudent?.data}
          />
          <Container fluid>
            {getSingleCourseIsLoading ? (
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
                        <Col lg={12}>
                          <div className="d-flex justify-content-center">
                            <button
                              onClick={() => setStep(step + 1)}
                              className="button py-3 px-5"
                            >
                              For Apply
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                ) : (
                  <CourseForm setStep={setStep} step={step} />
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
