import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
import Loader from '@/components/constants/Loader/Loader';
import { useGetSingleCourseQuery } from '@/slice/services/public/university/publicUniveristyService';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Container,
  Row,
} from 'reactstrap';

const SingleCoursePageInFrontSite = () => {
  const router = useRouter();
  const { universityId, courseId } = router.query;
  const { data, isLoading, error } = useGetSingleCourseQuery({
    university_id: universityId,
    course_id: courseId,
  });

  const courseDetail = data?.data || {};

  const [open, setOpen] = useState('');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const {
    name,
    description,
    entry_requirements,
    english_requirements,
    brochure,
    department,
    available_seats,
    price_for_student,
    program_duration,
    status,
  } = courseDetail;
  return (
    <UniversityLayout>
      <Container className="my-5">
        {isLoading ? (
          <div className="d-flex justify-content-center my-5">
            <Loader />
          </div>
        ) : (
          <>
            <Row>
              <Col xs={12} md={6} className="mb-4">
                <div>
                  <h2 className="fs-1">{name}</h2>
                  <p> {department?.name}</p>
                  <hr />
                  {/* <time dateTime="2024-12-19T12:00:00">
                    Course Admission Last Date||December 19, 2024, 12:00 PM
                  </time> */}
                  <p className="my-3">{description}</p>
                  <div className="d-flex justify-content-between">
                    <p>
                      {' '}
                      <strong>Available Seats:</strong> {available_seats}
                    </p>
                    <p>
                      <strong>Program Duration:</strong>{' '}
                      {program_duration || 'Not specified'}
                    </p>
                  </div>

                  <Button
                    className="button py-3 my-3 px-4"
                    href={brochure.url}
                    target="_blank"
                  >
                    Download Brochure
                  </Button>
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div>
                  <Accordion flush open={open} toggle={toggle}>
                    <AccordionItem>
                      <AccordionHeader targetId="1">
                        Entry Requirements
                      </AccordionHeader>
                      <AccordionBody accordionId="1">
                        <ul>
                          {entry_requirements?.map((req, index) => (
                            <p key={index}>
                              {index + 1}. {req}{' '}
                            </p>
                          ))}
                        </ul>
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="2">
                        English Requirements
                      </AccordionHeader>
                      <AccordionBody accordionId="2">
                        <ul>
                          {english_requirements?.map((req, index) => (
                            <p key={index}>
                              {index + 1}. {req}{' '}
                            </p>
                          ))}
                        </ul>
                      </AccordionBody>
                    </AccordionItem>
                  </Accordion>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center my-3">
                <button className="button py-3 px-4">
                  Confirm Application
                </button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </UniversityLayout>
  );
};

export default SingleCoursePageInFrontSite;
