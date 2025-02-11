import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
import Loader from '@/components/constants/Loader/Loader';
import { useGetSingleCourseQuery } from '@/slice/services/public/university/publicUniveristyService';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
import Cookies from 'js-cookie';

const SingleCoursePageInFrontSite = () => {
  const [isAuthenticated, setIsAuthenticated] = useState('');
  const router = useRouter();
  const { universityId, courseId } = router.query;
  const { data, isLoading, error } = useGetSingleCourseQuery({
    university_id: universityId,
    course_id: courseId,
  });

  const courseDetail = data?.data || {};

  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const {
    image,
    name,
    description,
    entry_requirements,
    english_requirements,
    brochure,
    department,
    available_seats,
    price,
    program_duration,
    status,
  } = courseDetail;

  const token = Cookies.get('token');
  const role = Cookies.get('role');

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const handleConfirmApplication = (id) => {
    // Determine the user's role from cookies
    const role = Cookies.get('role');

    // Initialize the destination variable
    let destination = '';

    // Set the destination based on the user's role
    if (role === 'student') {
      destination = `/dashboard/student/university-management/single-university-profile/${universityId}/course/${id}`;
    } else if (role === 'agent') {
      destination = `/dashboard/agent/university-management/single-university-profile/${universityId}/course/${id}`;
    }

    console.log(destination);

    // Check if the user is authenticated
    if (isAuthenticated) {
      // Redirect to the destination
      router.push(destination);
    } else {
      // Redirect to the login page with the intended destination as a query parameter
      router.push(`/auth/register?universityId=${universityId}&courseId=${id}`);
    }
  };

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
                <div className="me-lg-3">
                  <img src={image?.url ? image?.url : ''} alt="" />
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

              <Col xs={12} md={6} className="mb-4">
                <div className="ms-lg-3">
                  <Accordion flush open={open} toggle={toggle}>
                    <AccordionItem>
                      <AccordionHeader targetId="1" onClick={() => toggle('1')}>
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
                      <AccordionHeader targetId="2" onClick={() => toggle('2')}>
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
                <button
                  className="button py-3 px-4"
                  onClick={() => handleConfirmApplication(courseId)}
                >
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
