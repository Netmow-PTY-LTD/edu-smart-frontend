import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import Layout from '@/components/layout';
import { useGetsingleUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
  Nav,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap';

const SingleUniversityCourse = ({ university_id }) => {
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const router = useRouter();
  const courseId = router.query.id;

  const {
    data: getSingleUniversityDataForStudent,
    isLoading: getSingleUniversityIsLoadingForStudent,
    refetch: getSingleUniversityForStudentRefetch,
  } = useGetsingleUniversityQuery(university_id);

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <ProfileBgCover
            profileData={getSingleUniversityDataForStudent?.data}
          />
          <Container fluid>
            <Card>
              <CardHeader>Course Details</CardHeader>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <div className="course-details">
                      <h2>Bachelor in Accounting (Hons.)</h2>
                      <div className="course-description">
                        <b className="text-secondary-alt fw-semibold fs-18">
                          Course Description:
                        </b>{' '}
                        <br />
                        Accounting is the language of business, and accountants
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
                        Institute of Accountants.
                      </div>
                      <div className="course-btns">
                        <Link href="#" className="btn-secondary-alt">
                          Download Brochure
                        </Link>
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
                            <strong>
                              This is the first item&#39;s accordion body.
                            </strong>
                            You can modify any of this with custom CSS or
                            overriding our default variables. It&#39;s also
                            worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the
                            transition does limit overflow.
                          </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionHeader targetId="2">
                            Programme Structure
                          </AccordionHeader>
                          <AccordionBody accordionId="2">
                            <strong>
                              This is the second item&#39;s accordion body.
                            </strong>
                            You can modify any of this with custom CSS or
                            overriding our default variables. It&#39;s also
                            worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the
                            transition does limit overflow.
                          </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionHeader targetId="2">
                            Course Curriculum
                          </AccordionHeader>
                          <AccordionBody accordionId="2">
                            <strong>
                              This is the second item&#39;s accordion body.
                            </strong>
                            You can modify any of this with custom CSS or
                            overriding our default variables. It&#39;s also
                            worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the
                            transition does limit overflow.
                          </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionHeader targetId="3">
                            Eligibility
                          </AccordionHeader>
                          <AccordionBody accordionId="3">
                            <strong>
                              This is the third item&#39;s accordion body.
                            </strong>
                            You can modify any of this with custom CSS or
                            overriding our default variables. It&#39;s also
                            worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the
                            transition does limit overflow.
                          </AccordionBody>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="d-flex justify-content-center">
                      <Link
                        href={`${university_id}/course/course-form`}
                        className="button py-3 px-5"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default SingleUniversityCourse;
