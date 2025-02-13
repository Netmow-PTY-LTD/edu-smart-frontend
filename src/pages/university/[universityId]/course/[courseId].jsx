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
    document_requirements,
    brochure,
    department,
    available_seats,
    price,
    program_duration,
    status,
    university,
  } = courseDetail;

  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const handleConfirmApplication = (id) => {
    const role = Cookies.get('role');

    let destination = '';

    if (role === 'student') {
      destination = `/dashboard/student/university-management/single-university-profile/${universityId}/course/${id}`;
    } else if (role === 'agent') {
      destination = `/dashboard/agent/university-management/single-university-profile-for-agent/${universityId}/course/${id}`;
    }

    //console.log(destination);

    if (isAuthenticated) {
      router.push(destination);
    } else {
      router.push(`/auth/register?universityId=${universityId}&courseId=${id}`);
    }
  };

  console.log(courseDetail);

  return (
    <UniversityLayout>
      <section className="course-details-main">
        <Container>
          {isLoading ? (
            <div className="d-flex justify-content-center my-5">
              <Loader />
            </div>
          ) : (
            <>
              <Row>
                <Col md={12} lg={6} className="mb-4">
                  <div className="pe-lg-5">
                    <h2>{name}</h2>
                    <h4> {department?.name}</h4>
                    <h3 className="university-name">{university?.name}</h3>

                    {/* <time dateTime="2024-12-19T12:00:00">
                    Course Admission Last Date||December 19, 2024, 12:00 PM
                  </time> */}
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
                          />
                          <path
                            d="M20.3592 17.6852C20.1107 17.6852 19.8723 17.5897 19.6965 17.4196C19.5208 17.2496 19.422 17.0189 19.422 16.7784C19.422 15.4253 18.9785 14.1605 18.1747 13.2176C17.4132 12.3241 16.4181 11.8322 15.3681 11.8322H8.48299C7.43491 11.8322 6.43786 12.3241 5.67634 13.2166C4.87164 14.1605 4.43003 15.4243 4.43003 16.7784C4.43003 17.0189 4.33129 17.2496 4.15554 17.4196C3.97978 17.5897 3.74141 17.6852 3.49285 17.6852C3.24429 17.6852 3.00592 17.5897 2.83016 17.4196C2.6544 17.2496 2.55566 17.0189 2.55566 16.7784C2.55566 15.0046 3.15036 13.3306 4.23082 12.0629C4.7463 11.4485 5.38701 10.9433 6.11304 10.5788C6.84525 10.2111 7.65803 10.0189 8.48299 10.0186H15.3681C16.1934 10.0186 17.0069 10.2113 17.738 10.5788C18.4476 10.9301 19.0795 11.4296 19.6203 12.0639C20.7007 13.3306 21.2964 15.0046 21.2964 16.7784C21.2964 17.0189 21.1977 17.2496 21.0219 17.4196C20.8462 17.5897 20.6078 17.6852 20.3592 17.6852Z"
                            fill="#B5D336"
                          />
                          <path
                            d="M11.9166 13.426L11.0952 15.7453C11.0732 15.8086 11.0682 15.8778 11.0807 15.9443C11.0933 16.0108 11.1228 16.0718 11.1658 16.1197L11.7106 16.7307C11.831 16.8667 12.0262 16.8677 12.1483 16.7335L12.6881 16.1281C12.7308 16.08 12.7599 16.0188 12.7718 15.9521C12.7836 15.8855 12.7776 15.8165 12.7545 15.7537L11.9157 13.426H11.9166Z"
                            fill="#B5D336"
                          />
                          <path
                            d="M12.3883 13.4259H11.4618C11.4033 13.4257 11.3465 13.4094 11.3005 13.3794C11.2545 13.3495 11.2218 13.3077 11.2077 13.2606L11.0819 12.845C11.0721 12.8128 11.0714 12.7792 11.0797 12.7468C11.088 12.7143 11.1051 12.6839 11.1298 12.6577C11.1544 12.6316 11.186 12.6105 11.222 12.596C11.258 12.5815 11.2975 12.574 11.3376 12.5741H12.5149C12.5549 12.5741 12.5943 12.5817 12.6302 12.5962C12.6661 12.6107 12.6976 12.6319 12.7221 12.658C12.7467 12.6841 12.7638 12.7145 12.772 12.7469C12.7803 12.7793 12.7795 12.8129 12.7697 12.845L12.6447 13.2606C12.6305 13.308 12.5975 13.3501 12.551 13.38C12.5045 13.41 12.4472 13.4262 12.3883 13.4259Z"
                            fill="#B5D336"
                          />
                          <path
                            d="M21.3788 17.6852H8.6982C7.747 17.6852 6.83475 18.0582 6.16206 18.7221C5.48937 19.386 5.11134 20.2865 5.11108 21.2256V21.8114L5.1168 21.9976C5.16669 22.9026 5.56558 23.7544 6.23158 24.3781C6.89759 25.0019 7.78018 25.3503 8.6982 25.3518H19.4138C20.3648 25.3516 21.2769 24.9785 21.9493 24.3146C22.6218 23.6507 22.9997 22.7503 23 21.8114V19.2857C23 18.4017 22.2742 17.6852 21.3788 17.6852ZM8.6982 19.5659L21.094 19.5649V21.8114C21.094 22.7283 20.3415 23.4711 19.4129 23.4711H8.69724C7.80761 23.4711 7.07228 22.7847 7.01989 21.913L7.01608 21.7832V21.2256C7.01608 20.3088 7.76856 19.5659 8.6982 19.5659Z"
                            fill="#B5D336"
                          />
                        </svg>
                        <b>Available Seats: {available_seats}</b>
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
                          />
                        </svg>
                        <b>
                          Program Duration:{' '}
                          {program_duration || 'Not specified'}
                        </b>{' '}
                      </div>
                    </div>
                    <div className="description-text">{description}</div>

                    <div className="d-flex gap-4 flex-wrap">
                      <a
                        className="btn-download"
                        href={brochure?.url ? brochure?.url : ''}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download Brochure
                      </a>
                      <button
                        className="btn-confirm-apply"
                        onClick={() => handleConfirmApplication(courseId)}
                      >
                        Apply Now
                      </button>
                    </div>
                    <div className="course-requirements-main">
                      <Accordion flush open={open} toggle={toggle}>
                        <AccordionItem>
                          <AccordionHeader
                            targetId="1"
                            onClick={() => toggle('1')}
                          >
                            Entry Requirements
                          </AccordionHeader>
                          <AccordionBody accordionId="1">
                            <ul>
                              {entry_requirements?.map((req, index) => (
                                <li key={index}>
                                  {index + 1}. {req}{' '}
                                </li>
                              ))}
                            </ul>
                          </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionHeader
                            targetId="2"
                            onClick={() => toggle('2')}
                          >
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
                    <div className="document-requirements">
                      <h3>Required Documents for this course:</h3>
                      {document_requirements?.map((doc, i) => {
                        return (
                          <>
                            <h4>{doc?.title ? doc?.title : ''}</h4>
                            <div className="doc-description">
                              {doc?.description ? doc?.description : ''}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </Col>

                <Col md={12} lg={6} className="mb-4">
                  <div className="ps-lg-5 course-img">
                    <img src={image?.url ? image?.url : ''} alt={name} />
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>
    </UniversityLayout>
  );
};

export default SingleCoursePageInFrontSite;
