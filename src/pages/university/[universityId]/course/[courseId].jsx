import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
import { useGetSingleCourseQuery } from '@/slice/services/public/university/publicUniveristyService';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
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
    university,
    category,
    courses,
    department,
    gst_for_agent,
    available_seats,
    gst_for_student,
    price_for_agent,
    price_for_student,
    program_duration,
    status,
  } = courseDetail;
  return (
    <UniversityLayout>
      <Container className="my-5">
        {isLoading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner color="primary" />
          </div>
        ) : error ? (
          <Alert color="danger" className="text-center my-5">
            Failed to load course details.
          </Alert>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col xs={12} className="mb-4">
                <div className="brif-section text-center">
                  <h2 className="courseName fs-1">{university?.name}</h2>
                  <p className="fucultyName"> {department?.name}</p>
                  <hr />
                  <time dateTime="2024-12-19T12:00:00">
                    Course Admission Last Date||December 19, 2024, 12:00 PM
                  </time>
                  <p>{description}</p>
                  <Button
                    color="primary"
                    className="py-3 my-3 px-2"
                    href={brochure.url}
                    target="_blank"
                  >
                    Download Brochure
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h3" className="text-center mb-4">
                      {name}
                    </CardTitle>
                    <ListGroup flush>
                      <ListGroupItem>
                        <strong>Price for Agent:</strong> ${price_for_agent}
                      </ListGroupItem>
                      <ListGroupItem>
                        <strong>GST for Agent:</strong> {gst_for_agent}%
                      </ListGroupItem>
                      <ListGroupItem>
                        <strong>Price for Student:</strong> ${price_for_student}
                      </ListGroupItem>
                      <ListGroupItem>
                        <strong>GST for Student:</strong> {gst_for_student}%
                      </ListGroupItem>
                      <ListGroupItem>
                        <strong>Available Seats:</strong> {available_seats}
                      </ListGroupItem>
                      <ListGroupItem>
                        <strong>Program Duration:</strong>{' '}
                        {program_duration || 'Not specified'}
                      </ListGroupItem>
                      <ListGroupItem>
                        <strong>Status:</strong>{' '}
                        <Badge
                          color={status === 'active' ? 'success' : 'secondary'}
                        >
                          {status}
                        </Badge>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <div className="requirement-section">
                  <Accordion flush open={open} toggle={toggle}>
                    <AccordionItem>
                      <AccordionHeader targetId="1">
                        Entry Requirements
                      </AccordionHeader>
                      <AccordionBody accordionId="1">
                        <ul>
                          {entry_requirements?.map((req, index) => (
                            <li key={index}>{req}</li>
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
                            <li key={index}>{req}</li>
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
                <button className="button py-3 px-2">
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
