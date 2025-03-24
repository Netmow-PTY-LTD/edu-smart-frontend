import Maps from '@/components/common/Maps';
import Link from 'next/link';
import React from 'react';
import { Col, Row } from 'reactstrap';

export default function UniversityContact({ university }) {
  const universityLocation = [
    university?.address_line_1 || '',
    university?.address_line_2 || '',
    university?.city || '',
    university?.state || '',
    university?.country || '',
    university?.zip || '',
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <section className="contact-section">
      <div className="container">
        <Row>
          <Col lg={4}>
            <Maps
              headerTitle={'University Location'}
              place={universityLocation}
            />
          </Col>
          <Col lg={8} className="ps-0 ps-lg-5">
            <div className="univ-contact-main">
              <h2>Contact Us</h2>
              <div className="university-details">
                <div className="univ-info">
                  <h5 className="mb-4">University Details</h5>
                  <div className="univ-info-single">
                    <b>University Name : </b>{' '}
                    <span>{university?.name || 'University of Malaya'}</span>
                  </div>
                  <div className="univ-info-single">
                    <b>Registration No: </b>{' '}
                    <span>
                      {university?.registration_no || '199701021324 (436821-T)'}
                    </span>
                  </div>
                  <div className="univ-info-single">
                    <b>MOE Registration Certification No: </b>{' '}
                    <span>
                      {university?.moe_registration_certificate_no ||
                        'DU001(B).'}
                    </span>
                  </div>
                </div>
                <div className="univ-address">
                  <h5>Address</h5>
                  <div className="address-details">
                    {university?.address_line_1?.trim() !== ''
                      ? university?.address_line_1?.trim() +
                        (university?.address_line_2?.trim() !== '' ||
                        university?.city?.trim() !== '' ||
                        university?.state?.trim() !== '' ||
                        university?.zip?.trim() !== '' ||
                        (university?.country?.trim() !== '' &&
                          university?.country !== 'undefined')
                          ? ', '
                          : '')
                      : ''}
                    {university?.address_line_2?.trim() !== ''
                      ? university?.address_line_2?.trim() +
                        (university?.city?.trim() !== '' ||
                        university?.state?.trim() !== '' ||
                        university?.zip?.trim() !== '' ||
                        (university?.country?.trim() !== '' &&
                          university?.country !== 'undefined')
                          ? ', '
                          : '')
                      : ''}
                    {university?.city?.trim() !== ''
                      ? university?.city?.trim() +
                        (university?.state?.trim() !== '' ||
                        university?.zip?.trim() !== '' ||
                        (university?.country?.trim() !== '' &&
                          university?.country !== 'undefined')
                          ? ', '
                          : '')
                      : ''}

                    {university?.state?.trim() !== ''
                      ? university?.state?.trim() +
                        (university?.zip?.trim() !== '' ||
                        (university?.country?.trim() !== '' &&
                          university?.country !== 'undefined')
                          ? ', '
                          : '')
                      : ''}

                    {university?.zip?.trim() !== ''
                      ? university?.zip?.trim() +
                        (university?.country?.trim() !== '' &&
                        university?.country !== 'undefined'
                          ? ', '
                          : '')
                      : ''}
                    {university?.country?.trim() &&
                    university?.country !== 'undefined'
                      ? university?.country?.trim()
                      : ''}
                  </div>
                </div>
                <div className="univ-contact">
                  <div className="contact-details">
                    <div className="contact-info-single">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="#092A67"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 21a9 9 0 1 0 0-18m0 18a9 9 0 1 1 0-18m0 18c2.761 0 3.941-5.163 3.941-9S14.761 3 12 3m0 18c-2.761 0-3.941-5.163-3.941-9S9.239 3 12 3M3.5 9h17m-17 6h17"
                        />
                      </svg>
                      <span>Visit Website</span>
                      <Link
                        href={
                          university?.website
                            ? university.website
                            : 'https://www.companywebsite.com'
                        }
                        target="_blank"
                      >
                        {university?.website || 'www.companywebsite.com'}
                      </Link>
                    </div>
                    <div className="contact-info-single">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 49 49"
                        fill="none"
                      >
                        <path
                          d="M35.9142 25.0864C35.7286 24.9005 35.5082 24.753 35.2656 24.6524C35.0229 24.5518 34.7628 24.5 34.5002 24.5C34.2375 24.5 33.9774 24.5518 33.7348 24.6524C33.4922 24.753 33.2718 24.9005 33.0862 25.0864L29.8982 28.2744C28.4202 27.8344 25.6622 26.8344 23.9142 25.0864C22.1662 23.3384 21.1662 20.5804 20.7262 19.1024L23.9142 15.9144C24.1001 15.7288 24.2475 15.5084 24.3482 15.2658C24.4488 15.0232 24.5006 14.7631 24.5006 14.5004C24.5006 14.2377 24.4488 13.9776 24.3482 13.735C24.2475 13.4924 24.1001 13.272 23.9142 13.0864L15.9142 5.0864C15.7286 4.90051 15.5082 4.75304 15.2656 4.65241C15.0229 4.55179 14.7628 4.5 14.5002 4.5C14.2375 4.5 13.9774 4.55179 13.7348 4.65241C13.4922 4.75304 13.2718 4.90051 13.0862 5.0864L7.66218 10.5104C6.90218 11.2704 6.47418 12.3144 6.49018 13.3804C6.53618 16.2284 7.29018 26.1204 15.0862 33.9164C22.8822 41.7124 32.7742 42.4644 35.6242 42.5124H35.6802C36.7362 42.5124 37.7342 42.0964 38.4902 41.3404L43.9142 35.9164C44.1001 35.7308 44.2475 35.5104 44.3482 35.2678C44.4488 35.0252 44.5006 34.7651 44.5006 34.5024C44.5006 34.2397 44.4488 33.9796 44.3482 33.737C44.2475 33.4944 44.1001 33.274 43.9142 33.0884L35.9142 25.0864ZM35.6602 38.5104C33.1642 38.4684 24.6242 37.7984 17.9142 31.0864C11.1822 24.3544 10.5302 15.7844 10.4902 13.3384L14.5002 9.3284L19.6722 14.5004L17.0862 17.0864C16.8511 17.3213 16.6783 17.6111 16.5833 17.9295C16.4883 18.248 16.4742 18.5851 16.5422 18.9104C16.5902 19.1404 17.7642 24.5944 21.0842 27.9144C24.4042 31.2344 29.8582 32.4084 30.0882 32.4564C30.4133 32.5263 30.7507 32.5133 31.0695 32.4186C31.3882 32.3239 31.678 32.1505 31.9122 31.9144L34.5002 29.3284L39.6722 34.5004L35.6602 38.5104Z"
                          fill="#092A67"
                        />
                      </svg>
                      <span>
                        <b>Phone:</b>
                      </span>
                      <Link
                        href={`tel:${university?.phone ? university?.phone : '+60 3 9876 5432'}`}
                      >
                        {university?.phone || '+60 3 9876 5432'}
                      </Link>
                    </div>
                    <div className="contact-info-single">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 49"
                        fill="none"
                      >
                        <path
                          d="M40 8.50049H8C5.794 8.50049 4 10.2945 4 12.5005V36.5005C4 38.7065 5.794 40.5005 8 40.5005H40C42.206 40.5005 44 38.7065 44 36.5005V12.5005C44 10.2945 42.206 8.50049 40 8.50049ZM40 12.5005V13.5225L24 25.9685L8 13.5245V12.5005H40ZM8 36.5005V18.5885L22.772 30.0785C23.1222 30.3536 23.5547 30.5031 24 30.5031C24.4453 30.5031 24.8778 30.3536 25.228 30.0785L40 18.5885L40.004 36.5005H8Z"
                          fill="#092A67"
                        />
                      </svg>
                      <span>
                        {' '}
                        <b>Email:</b>
                      </span>{' '}
                      <Link
                        href={`mailto:${university?.email ? university?.email : 'info@universiti-telekom.my'}`}
                      >
                        {university?.email || 'info@universiti-telekom.my'}
                      </Link>
                    </div>
                    <div className="contact-info-single">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 49"
                        fill="none"
                      >
                        <path
                          d="M40 4.50049H8C5.794 4.50049 4 6.29449 4 8.50049V32.5005C4 34.7065 5.794 36.5005 8 36.5005H14V44.0345L26.554 36.5005H40C42.206 36.5005 44 34.7065 44 32.5005V8.50049C44 6.29449 42.206 4.50049 40 4.50049ZM40 32.5005H25.446L18 36.9665V32.5005H8V8.50049H40V32.5005Z"
                          fill="#092A67"
                        />
                        <path
                          d="M14 14.5005H34V18.5005H14V14.5005ZM14 22.5005H28V26.5005H14V22.5005Z"
                          fill="#092A67"
                        />
                      </svg>
                      <span>Follow Online</span>
                      <div className="contact-social-links">
                        <Link
                          href={
                            university?.social_links?.facebook ||
                            'https://www.facebook.com'
                          }
                          target="_blank"
                          className="fb"
                        >
                          <svg
                            width="10"
                            height="15"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.4478 17V9.25811H9.11329L9.50949 6.22692H6.4478V4.29617C6.4478 3.42148 6.69651 2.8226 7.97768 2.8226H9.60107V0.120123C8.8112 0.0371794 8.01725 -0.00286969 7.22286 0.000159793C4.86682 0.000159793 3.24921 1.40949 3.24921 3.99673V6.22125H0.601074V9.25245H3.25499V17H6.4478Z"
                              fill="#092A67"
                            />
                          </svg>
                        </Link>

                        <Link
                          href={
                            university?.social_links?.linkedin ||
                            'https://www.linkedin.com'
                          }
                          target="_blank"
                          className="linkedin"
                        >
                          <svg
                            width="17"
                            height="15"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.57205 4.25617C3.66059 4.25617 4.54303 3.37373 4.54303 2.28519C4.54303 1.19665 3.66059 0.314209 2.57205 0.314209C1.48351 0.314209 0.601074 1.19665 0.601074 2.28519C0.601074 3.37373 1.48351 4.25617 2.57205 4.25617Z"
                              fill="#092A67"
                            />
                            <path
                              d="M6.40389 5.74995V16.6849H9.79905V11.2773C9.79905 9.85045 10.0675 8.4686 11.8367 8.4686C13.5816 8.4686 13.6032 10.1 13.6032 11.3674V16.6858H17.0001V10.6891C17.0001 7.74345 16.366 5.47971 12.9231 5.47971C11.2701 5.47971 10.1621 6.38682 9.70897 7.2453H9.66303V5.74995H6.40389ZM0.871094 5.74995H4.27166V16.6849H0.871094V5.74995Z"
                              fill="#092A67"
                            />
                          </svg>
                        </Link>

                        <Link
                          href={
                            university?.social_links?.twitter ||
                            'https://www.twitter.com'
                          }
                          target="_blank"
                          className="twitter"
                        >
                          <svg
                            width="18"
                            height="15"
                            viewBox="0 0 18 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 1.78181C17.3381 2.07471 16.6177 2.28551 15.8757 2.36761C16.6461 1.89816 17.223 1.15652 17.4981 0.281814C16.7753 0.722914 15.9834 1.03222 15.1576 1.19601C14.8124 0.817523 14.395 0.516 13.9312 0.310233C13.4675 0.104466 12.9675 -0.00113561 12.4622 9.20947e-06C10.418 9.20947e-06 8.77395 1.69971 8.77395 3.78551C8.77395 4.07841 8.80856 4.37131 8.8648 4.65311C5.80387 4.48891 3.07391 2.98891 1.25898 0.692316C0.928285 1.27171 0.754987 1.93143 0.75712 2.60282C0.75712 3.91643 1.40824 5.07471 2.40115 5.75592C1.81602 5.73229 1.24458 5.56731 0.733325 5.27441V5.32101C0.733325 7.16051 2.00096 8.68492 3.69042 9.03551C3.37321 9.12003 3.04688 9.16327 2.71914 9.16421C2.47903 9.16421 2.25189 9.1398 2.02259 9.10651C2.48984 10.6065 3.8505 11.696 5.47074 11.7315C4.2031 12.75 2.61531 13.3491 0.891239 13.3491C0.581901 13.3491 0.296359 13.338 0 13.3025C1.63538 14.3787 3.57577 15 5.66542 15C12.4492 15 16.1613 9.23521 16.1613 4.23152C16.1613 4.06731 16.1613 3.90311 16.1505 3.73891C16.8686 3.19971 17.4981 2.53181 18 1.78181Z"
                              fill="#092A67"
                            />
                          </svg>
                        </Link>
                        <Link
                          href={
                            university?.social_links?.instagram ||
                            'https://www.instagram.com'
                          }
                          target="_blank"
                          className="insta"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#092A67"
                              d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
