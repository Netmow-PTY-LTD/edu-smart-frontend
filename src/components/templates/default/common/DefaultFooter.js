/* eslint-disable @next/next/no-img-element */
import { bgSecondary } from '@/components/constants/utils/themeUtils';
import { getFooterMenu } from '@/slices/dashboard/adminDashboard/Actions/webInfoAction';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';

const footerImages = [
  {
    id: 1,
    sports_category: 'Rugby',
    bgImage: '/template1/assets/img/footer-bg.png',
  },
  {
    id: 2,
    sports_category: 'Basketball',
    bgImage: '/template1/assets/img/basketball/footer_bg.jpg',
  },
  {
    id: 3,
    sports_category: 'Football',
    bgImage: '/template1/assets/img/football/footer_bg_football.jpg',
  },
  {
    id: 4,
    sports_category: 'Cricket',
    bgImage: '/template1/assets/img/cricket/footer_bg.jpg',
  },
  {
    id: 5,
    sports_category: 'Volleyball',
    bgImage: '/template1/assets/img/volleyball/footer_bg.jpg',
  },
  {
    id: 6,
    sports_category: 'Baseball',
    bgImage: '/template1/assets/img/baseball/footer_bg.jpg',
  },
  {
    id: 7,
    sports_category: 'Netball',
    bgImage: '/template1/assets/img/netball/footer_bg.jpg',
  },
];

export default function DefaultFooter() {
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const dispatch = useDispatch();

  const footerMatch = footerImages.find(
    (item) => item.sports_category === themeData.sports_category
  );
  const footer_bg = footerMatch
    ? footerMatch.bgImage
    : '/images/templates/footer-bg.png';

  const footer_bg_color =
    themeData?.subdomain === 'centralstarsbasketball'
      ? '#000'
      : themeData?.branding?.secondary_color?.trim()
        ? themeData?.branding?.secondary_color?.trim()
        : '#162A73';

  // footer menu
  const {
    data: footerMenuData,
    isLoading: footerMenuIsLoading,
    error: footerMenuError,
  } = useSelector((state) => state.AdminDashboard.footerMenu);

  useEffect(() => {
    dispatch(getFooterMenu(themeData?.subdomain));
  }, [dispatch, themeData?.subdomain]);

  //console.log(themeData);

  return (
    <>
      <footer className="footer-temp">
        <style>{`
          .footer-temp {
            background-image: url(${footer_bg});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            background-color: ${themeData?.subdomain === 'centralstarsbasketball' ? '#000' : ''};
          }

          .footer-overlay{
            background-color: ${footer_bg_color};
            opacity: ${themeData?.subdomain === 'centralstarsbasketball' ? 1 : 0.87};
          }
    
        `}</style>

        <div className="footer-overlay"></div>
        <div className="footer-top-temp">
          <div className="container">
            <div className="">
              <Row>
                {themeData?.subdomain === 'centralstarsbasketball' ? (
                  <Col lg={5} md={12}>
                    <div className="footer-about" data-wow-delay="0.1s">
                      <Link href="/" className="footer-logo-temp">
                        <img
                          src={
                            themeData?.branding?.footer_logo?.secure_url
                              ? themeData?.branding?.footer_logo?.secure_url
                              : '/assets/img/footer_logo.png'
                          }
                          alt="Footer Logo"
                        />
                      </Link>
                      <div className="footer-about-text-temp">
                        {themeData?.branding?.footer_text?.trim() ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                themeData?.branding?.footer_text?.trim()
                              ),
                            }}
                          ></p>
                        ) : (
                          <p>
                            Located at the heart of our city,{' '}
                            {themeData?.organisation_name} is where passion
                            meets athleticism. With state-of-the-art facilities
                            and a vibrant community, we're dedicated to
                            fostering sportsmanship and excellence at every
                            level. Join us in celebrating the joy of sports and
                            the spirit of teamwork.
                          </p>
                        )}
                      </div>
                      {themeData?.subdomain === 'centralstarsbasketball' && (
                        <div>
                          <Link
                            href="https://centralstarsbasketball.com/wp-content/uploads/2022/05/Player-and-Guardian-Handbook.pdf"
                            className="footer-dw-box"
                          >
                            <div className="icon-box">
                              <img
                                src="/template1/assets/img/book-open.png"
                                alt="Book Open"
                              />
                            </div>
                            <h3 className="dw-box-title">
                              Player and Guardian Handbook
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 1664 1536"
                              >
                                <path
                                  fill="#fff"
                                  d="M1280 1344q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45m256 0q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45m128-224v320q0 40-28 68t-68 28H96q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68m-325-569q17 41-14 70l-448 448q-18 19-45 19t-45-19L339 621q-31-29-14-70q17-39 59-39h256V64q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39"
                                />
                              </svg>
                            </h3>
                          </Link>
                        </div>
                      )}
                    </div>
                  </Col>
                ) : (
                  <Col lg={6} md={6} sm={12}>
                    <div className="footer-about" data-wow-delay="0.1s">
                      <Link href="/" className="footer-logo-temp">
                        <img
                          src={
                            themeData?.branding?.footer_logo?.secure_url
                              ? themeData?.branding?.footer_logo?.secure_url
                              : '/assets/img/footer_logo.png'
                          }
                          alt="Footer Logo"
                        />
                      </Link>
                      <div className="footer-about-text-temp">
                        {themeData?.branding?.footer_text?.trim() ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                themeData?.branding?.footer_text?.trim()
                              ),
                            }}
                          ></p>
                        ) : (
                          <p>
                            Located at the heart of our city,{' '}
                            {themeData?.organisation_name} is where passion
                            meets athleticism. With state-of-the-art facilities
                            and a vibrant community, we're dedicated to
                            fostering sportsmanship and excellence at every
                            level. Join us in celebrating the joy of sports and
                            the spirit of teamwork.
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                )}
                {themeData?.subdomain === 'centralstarsbasketball' ? (
                  <Col lg={2} md={4} sm={6}>
                    <div className="footer-top-widget">
                      <h3>
                        <span>MENU</span>
                      </h3>
                      <div className="footer-menu-temp">
                        <ul>
                          {footerMenuData?.home && (
                            <li>
                              <Link href="/">Home</Link>
                            </li>
                          )}
                          {footerMenuData?.joinWaitlist && (
                            <li>
                              <Link href="/join-waitlist">Join Waitlist</Link>
                            </li>
                          )}
                          {footerMenuData?.team && (
                            <li>
                              <Link href="/teams">Teams</Link>
                            </li>
                          )}
                          {footerMenuData?.communitySupport && (
                            <li>
                              <Link href="/community-support">
                                Community Support
                              </Link>
                            </li>
                          )}
                          {footerMenuData?.news && (
                            <li>
                              <Link href="/news">News</Link>
                            </li>
                          )}
                          {footerMenuData?.contact && (
                            <li>
                              <Link href="/contact">Contact</Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </Col>
                ) : (
                  <Col lg={3} md={3} sm={6}>
                    <div className="footer-top-widget">
                      <h3>
                        <span>MENU</span>
                      </h3>
                      <div className="footer-menu-temp">
                        <ul>
                          {footerMenuData?.home && (
                            <li>
                              <Link href="/">Home</Link>
                            </li>
                          )}
                          {footerMenuData?.joinWaitlist && (
                            <li>
                              <Link href="/join-waitlist">Join Waitlist</Link>
                            </li>
                          )}
                          {footerMenuData?.team && (
                            <li>
                              <Link href="/teams">Teams</Link>
                            </li>
                          )}
                          {footerMenuData?.communitySupport && (
                            <li>
                              <Link href="/community-support">
                                Community Support
                              </Link>
                            </li>
                          )}
                          {footerMenuData?.news && (
                            <li>
                              <Link href="/news">News</Link>
                            </li>
                          )}
                          {footerMenuData?.contact && (
                            <li>
                              <Link href="/contact">Contact</Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </Col>
                )}

                {themeData?.subdomain === 'centralstarsbasketball' ? (
                  <Col lg={2} md={4} sm={6}>
                    <div className="footer-top-widget">
                      <h3>
                        <span>OTHER PAGES</span>
                      </h3>
                      <div className="footer-menu-temp">
                        <ul>
                          <li>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                          </li>
                          <li>
                            <Link href="/terms">Terms of Use</Link>
                          </li>
                          <li>
                            <Link href="/disclaimer">Disclaimer</Link>
                          </li>
                          <li>
                            <Link href="/faq">FAQ</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                ) : (
                  ''
                )}

                <Col lg={3} md={3} sm={6}>
                  <div className="footer-top-widget">
                    <h3>
                      <span>Contact Us</span>
                    </h3>
                    <div className="footer-contact-temp">
                      <ul>
                        <li>
                          <a
                            href={`tel:${themeData?.branding?.phone ? themeData?.branding?.phone : '+61 477 937 937'}`}
                            className="footer-contact-info"
                          >
                            <div className="icon">
                              <svg
                                width="2.4rem"
                                height="2.4rem"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.30814 7.5L4.28814 7.4425C3.83814 6.15333 3.4548 4.39167 3.4548 3.33333C3.4548 2.875 3.8298 2.5 4.28814 2.5H6.78814C7.23016 2.5 7.65409 2.67559 7.96665 2.98816C8.27921 3.30072 8.4548 3.72464 8.4548 4.16667V5.83333C8.4548 6.27536 8.27921 6.69928 7.96665 7.01184C7.65409 7.3244 7.23016 7.5 6.78814 7.5H6.09064C6.76345 9.15748 7.76182 10.6632 9.02672 11.9281C10.2916 13.193 11.7973 14.1914 13.4548 14.8642V14.1667C13.4548 13.7246 13.6304 13.3007 13.943 12.9882C14.2555 12.6756 14.6794 12.5 15.1215 12.5H16.7881C17.2302 12.5 17.6541 12.6756 17.9666 12.9882C18.2792 13.3007 18.4548 13.7246 18.4548 14.1667V16.6667C18.4548 17.0417 17.9965 17.5 17.6215 17.5C16.184 17.5 14.7548 17.12 13.4548 16.6667C9.19314 15.14 5.8148 11.7617 4.30814 7.5Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                            <span>{`${themeData?.branding?.phone ? themeData?.branding?.phone : '+61 477 937 937'}`}</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href={`mailto:${themeData?.branding?.email ? themeData?.branding?.email : 'info@squaddeck.com'}`}
                            className="footer-contact-info"
                          >
                            <div className="icon">
                              <svg
                                width="2rem"
                                height="1.6rem"
                                viewBox="0 0 21 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17.5702 1C18.3863 1 19.1689 1.32417 19.7459 1.90121C20.323 2.47825 20.6471 3.26087 20.6471 4.07692V13.9231C20.6471 14.7391 20.323 15.5218 19.7459 16.0988C19.1689 16.6758 18.3863 17 17.5702 17H4.03176C3.21571 17 2.43308 16.6758 1.85604 16.0988C1.27901 15.5218 0.954834 14.7391 0.954834 13.9231V4.07692C0.954834 3.26087 1.27901 2.47825 1.85604 1.90121C2.43308 1.32417 3.21571 1 4.03176 1H17.5702ZM19.4164 5.87508L11.1136 10.7612C11.0351 10.8073 10.9474 10.8354 10.8567 10.8435C10.766 10.8516 10.6747 10.8395 10.5893 10.808L10.4884 10.7612L2.1856 5.87754V13.9231C2.1856 14.4127 2.38011 14.8823 2.72633 15.2285C3.07255 15.5747 3.54213 15.7692 4.03176 15.7692H17.5702C18.0598 15.7692 18.5294 15.5747 18.8756 15.2285C19.2219 14.8823 19.4164 14.4127 19.4164 13.9231V5.87508ZM17.5702 2.23077H4.03176C3.54213 2.23077 3.07255 2.42527 2.72633 2.77149C2.38011 3.11772 2.1856 3.58729 2.1856 4.07692V4.44862L10.801 9.51692L19.4164 4.44615V4.07692C19.4164 3.58729 19.2219 3.11772 18.8756 2.77149C18.5294 2.42527 18.0598 2.23077 17.5702 2.23077Z"
                                  fill="white"
                                  stroke="white"
                                  strokeWidth="0.6"
                                />
                              </svg>
                            </div>
                            <span>
                              {`${themeData?.branding?.email ? themeData?.branding?.email : 'info@squaddeck.com'}`}{' '}
                            </span>
                          </a>
                        </li>
                        <li>
                          <Link
                            href="https://www.google.com/maps/place/Nerang+Broadbeach+Rd,+Gold+Coast+QLD+4211,+Australia/@-28.0104343,153.367678,17z/data=!4m6!3m5!1s0x6b911b1e12b794a3:0xaedfa1b91a134950!8m2!3d-28.0100722!4d153.3674751!16s%2Fm%2F04ycq0c?entry=ttu"
                            className="footer-contact-info"
                          >
                            <div className="icon">
                              <svg
                                width="20"
                                height="25"
                                viewBox="0 0 20 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.3618 0.899414C7.85855 0.902353 5.45865 1.89334 3.68857 3.655C1.91849 5.41665 0.922763 7.80512 0.91981 10.2965C0.916812 12.3324 1.58503 14.3131 2.82195 15.9347C2.82195 15.9347 3.07946 16.2722 3.12152 16.3208L10.3618 24.8192L17.6056 16.3166C17.6433 16.2713 17.9017 15.9347 17.9017 15.9347L17.9026 15.9322C19.1389 14.3113 19.8068 12.3315 19.8038 10.2965C19.8009 7.80512 18.8052 5.41665 17.0351 3.655C15.265 1.89334 12.8651 0.902353 10.3618 0.899414ZM10.3618 13.7136C9.68275 13.7136 9.01893 13.5132 8.4543 13.1377C7.88967 12.7622 7.44959 12.2285 7.18972 11.6041C6.92985 10.9798 6.86186 10.2927 6.99434 9.62983C7.12682 8.96698 7.45382 8.3581 7.934 7.88021C8.41418 7.40232 9.02596 7.07687 9.69199 6.94502C10.358 6.81317 11.0484 6.88084 11.6758 7.13947C12.3031 7.39811 12.8394 7.83609 13.2166 8.39803C13.5939 8.95997 13.7953 9.62064 13.7953 10.2965C13.7941 11.2024 13.432 12.0709 12.7884 12.7115C12.1447 13.3521 11.2721 13.7125 10.3618 13.7136Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                            <span>
                              {`${themeData?.branding?.address1 ? themeData?.branding?.address1 : ''}`}{' '}
                              {`${themeData?.branding?.address2 ? themeData?.branding?.address2 : ''}`}{' '}
                              {`${themeData?.branding?.city ? themeData?.branding?.city : ''}`}{' '}
                              {`${themeData?.branding?.state ? themeData?.branding?.state : ''}`}{' '}
                              {`${themeData?.branding?.zip ? themeData?.branding?.zip : ''}`}{' '}
                              {`${themeData?.branding?.country ? themeData?.branding?.country : ''}`}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {themeData?.subdomain === 'centralstarsbasketball' && (
                      <div className="footer-social-icons">
                        <a
                          href="https://www.facebook.com/115638000742285"
                          target="_blank"
                          style={bgSecondary(themeData)}
                          rel="noreferrer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#fff"
                              d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.05.28-1.73 1.76-1.73"
                            />
                          </svg>
                        </a>
                        <a
                          href="https://www.instagram.com/centralstarsbasketball/"
                          style={bgSecondary(themeData)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#fff"
                              d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                            />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>

              {/* <div
                className="footer-top-single-widget footer-top-widget-2"
                data-wow-delay="1s"
              >
                <h3>
                  <span>
                    Important notice <span></span>
                  </span>
                </h3>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="#">School Uniform</a>
                    </li>
                    <li>
                      <a href="#" className="wow animate__ animate__fadeIn">
                        Lab Coat{' '}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="wow animate__ animate__fadeIn">
                        Sports Uniform
                      </a>
                    </li>
                    <li>
                      <a href="#" className="wow animate__ animate__fadeIn">
                        Uniform Sweater
                      </a>
                    </li>
                    <li>
                      <a href="#" className="wow animate__ animate__fadeIn">
                        Other Accesories
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="footer-bottom-temp">
          <div className="container">
            <div className="footer-bottom-content">
              <div className="footer-bottom-left footer-copyright">
                <p>
                  {themeData?.branding?.copy_right_text
                    ? themeData?.branding?.copy_right_text
                    : 'All Rights Reserved ® SquadDeck'}
                </p>
              </div>
              <div className="footer-bottom-middle">
                {/* <div
                  className="footer-bottom-right-nav wow animate__ animate__fadeIn animated"
                  data-wow-delay="1.5s"
                >
                  <a href="#">Terms</a>
                  <a href="#">Privacy</a>
                  <a href="#">Cookies</a>
                  <a href="#">Sitemap</a>
                </div> */}
              </div>
              {/* <div className="footer-bottom-right">
                <div className="footer-social-links-temp">
                  <a href="#" className="fb">
                    <svg
                      width="15"
                      height="28"
                      viewBox="0 0 15 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.26764 27.6926V15.0813H13.4927L14.1207 10.1435H9.26764V6.99836C9.26764 5.57351 9.66187 4.59796 11.6927 4.59796H14.2659V0.195678C13.0139 0.0605644 11.7554 -0.00467466 10.4962 0.0002603C6.76163 0.0002603 4.19756 2.29603 4.19756 6.51059V10.1343H0V15.072H4.20673V27.6926H9.26764Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a href="#" className="linkedin">
                    <svg
                      width="28"
                      height="27"
                      viewBox="0 0 28 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.01108 6.48255C5.80119 6.48255 7.25236 5.03138 7.25236 3.24128C7.25236 1.45117 5.80119 0 4.01108 0C2.22097 0 0.769806 1.45117 0.769806 3.24128C0.769806 5.03138 2.22097 6.48255 4.01108 6.48255Z"
                        fill="white"
                      />
                      <path
                        d="M10.3128 8.93856V26.9211H15.8961V18.0284C15.8961 15.6818 16.3376 13.4094 19.247 13.4094C22.1165 13.4094 22.152 16.0922 22.152 18.1765V26.9226H27.7383V17.061C27.7383 12.2169 26.6954 8.49414 21.0336 8.49414C18.3152 8.49414 16.4931 9.9859 15.748 11.3977H15.6724V8.93856H10.3128ZM1.21408 8.93856H6.80632V26.9211H1.21408V8.93856Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a href="#" className="tw">
                    <svg
                      width="30"
                      height="26"
                      viewBox="0 0 30 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M29.8198 3.50807C28.7397 3.99965 27.5643 4.35344 26.3536 4.49124C27.6106 3.70334 28.5519 2.45861 29.0009 0.990557C27.8214 1.73087 26.5292 2.25 25.1817 2.5249C24.6185 1.88966 23.9374 1.3836 23.1807 1.03825C22.4241 0.692907 21.6081 0.515672 20.7837 0.517594C17.4481 0.517594 14.7655 3.37027 14.7655 6.87095C14.7655 7.36254 14.822 7.85412 14.9137 8.32709C9.91914 8.0515 5.46461 5.53399 2.50316 1.67952C1.96355 2.65195 1.68078 3.75917 1.68426 4.88599C1.68426 7.09068 2.74671 9.03467 4.36686 10.178C3.41208 10.1383 2.47966 9.86142 1.64543 9.36984V9.44805C1.64543 12.5353 3.71386 15.0938 6.47059 15.6822C5.95298 15.8241 5.42052 15.8967 4.88574 15.8982C4.49393 15.8982 4.12331 15.8573 3.74916 15.8014C4.51158 18.3189 6.73179 20.1475 9.37556 20.2071C7.30714 21.9164 4.71631 22.9219 1.90311 22.9219C1.39835 22.9219 0.932427 22.9033 0.448853 22.8437C3.11734 24.6499 6.28351 25.6927 9.69324 25.6927C20.7625 25.6927 26.8195 16.0174 26.8195 7.6195C26.8195 7.34392 26.8195 7.06833 26.8019 6.79275C27.9738 5.88778 29.0009 4.76682 29.8198 3.50807Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a href="#" className="insta">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.88461 0.334812C10.3225 0.268616 10.781 0.253906 14.4438 0.253906C18.1066 0.253906 18.5651 0.269842 20.0018 0.334812C21.4385 0.399782 22.4192 0.629014 23.2772 0.961218C24.1758 1.30078 24.991 1.83157 25.6652 2.51804C26.3517 3.19103 26.8812 4.00499 27.2196 4.90476C27.553 5.76285 27.781 6.74352 27.8472 8.17776C27.9134 9.61813 27.9281 10.0766 27.9281 13.7382C27.9281 17.401 27.9122 17.8595 27.8472 19.2974C27.7822 20.7316 27.553 21.7123 27.2196 22.5704C26.8812 23.4703 26.3508 24.2856 25.6652 24.9596C24.991 25.646 24.1758 26.1756 23.2772 26.5139C22.4192 26.8474 21.4385 27.0754 20.0042 27.1416C18.5651 27.2078 18.1066 27.2225 14.4438 27.2225C10.781 27.2225 10.3225 27.2065 8.88461 27.1416C7.45038 27.0766 6.4697 26.8474 5.61161 26.5139C4.71174 26.1756 3.89644 25.6451 3.22244 24.9596C2.53643 24.2862 2.00556 23.4712 1.66685 22.5716C1.33464 21.7135 1.10663 20.7328 1.04044 19.2986C0.974244 17.8582 0.959534 17.3998 0.959534 13.7382C0.959534 10.0754 0.97547 9.6169 1.04044 8.18021C1.10541 6.74352 1.33464 5.76285 1.66685 4.90476C2.00606 4.00509 2.53734 3.19019 3.22367 2.51681C3.8967 1.83096 4.71119 1.30009 5.61038 0.961218C6.46848 0.629014 7.44915 0.401007 8.88339 0.334812H8.88461ZM19.8927 2.76198C18.4707 2.69701 18.0441 2.68353 14.4438 2.68353C10.8435 2.68353 10.4169 2.69701 8.99494 2.76198C7.67961 2.82205 6.96617 3.04147 6.49054 3.22658C5.86168 3.47175 5.4118 3.76227 4.93985 4.23422C4.49247 4.66946 4.14817 5.19931 3.9322 5.78491C3.7471 6.26054 3.52768 6.97398 3.46761 8.28931C3.40264 9.71129 3.38916 10.1379 3.38916 13.7382C3.38916 17.3385 3.40264 17.7651 3.46761 19.1871C3.52768 20.5024 3.7471 21.2158 3.9322 21.6915C4.14795 22.2762 4.49242 22.807 4.93985 23.2422C5.37502 23.6896 5.90581 24.034 6.49054 24.2498C6.96617 24.4349 7.67961 24.6543 8.99494 24.7144C10.4169 24.7794 10.8423 24.7928 14.4438 24.7928C18.0453 24.7928 18.4707 24.7794 19.8927 24.7144C21.208 24.6543 21.9215 24.4349 22.3971 24.2498C23.0259 24.0046 23.4758 23.7141 23.9478 23.2422C24.3952 22.807 24.7397 22.2762 24.9554 21.6915C25.1405 21.2158 25.36 20.5024 25.42 19.1871C25.485 17.7651 25.4985 17.3385 25.4985 13.7382C25.4985 10.1379 25.485 9.71129 25.42 8.28931C25.36 6.97398 25.1405 6.26054 24.9554 5.78491C24.7103 5.15605 24.4197 4.70617 23.9478 4.23422C23.5125 3.78688 22.9827 3.44258 22.3971 3.22658C21.9215 3.04147 21.208 2.82205 19.8927 2.76198ZM12.7215 17.895C13.6834 18.2954 14.7544 18.3495 15.7517 18.0479C16.749 17.7464 17.6106 17.1079 18.1895 16.2417C18.7684 15.3754 19.0285 14.335 18.9256 13.2982C18.8226 12.2615 18.3628 11.2926 17.6249 10.5571C17.1544 10.087 16.5856 9.727 15.9594 9.50308C15.3331 9.27916 14.665 9.19688 14.0031 9.26216C13.3412 9.32744 12.7021 9.53866 12.1316 9.88062C11.5612 10.2226 11.0737 10.6867 10.7041 11.2397C10.3346 11.7927 10.0923 12.4208 9.99463 13.0786C9.89697 13.7365 9.94638 14.4079 10.1393 15.0443C10.3322 15.6808 10.6639 16.2666 11.1104 16.7596C11.5569 17.2525 12.1071 17.6403 12.7215 17.895ZM9.54289 8.83726C10.1865 8.19367 10.9506 7.68314 11.7915 7.33482C12.6324 6.98651 13.5336 6.80723 14.4438 6.80723C15.354 6.80723 16.2553 6.98651 17.0962 7.33482C17.9371 7.68313 18.7011 8.19367 19.3447 8.83726C19.9883 9.48086 20.4989 10.2449 20.8472 11.0858C21.1955 11.9267 21.3748 12.828 21.3748 13.7382C21.3748 14.6484 21.1955 15.5496 20.8472 16.3905C20.4989 17.2314 19.9883 17.9955 19.3447 18.6391C18.0449 19.9389 16.282 20.6691 14.4438 20.6691C12.6056 20.6691 10.8427 19.9389 9.54289 18.6391C8.24309 17.3393 7.51286 15.5764 7.51286 13.7382C7.51286 11.9 8.24309 10.1371 9.54289 8.83726ZM22.9119 7.83943C23.0714 7.68898 23.1991 7.50806 23.2874 7.30738C23.3757 7.1067 23.4229 6.89034 23.4261 6.67111C23.4293 6.45188 23.3885 6.23424 23.306 6.03107C23.2236 5.82791 23.1013 5.64334 22.9462 5.48831C22.7912 5.33327 22.6066 5.21092 22.4035 5.1285C22.2003 5.04607 21.9826 5.00525 21.7634 5.00844C21.5442 5.01164 21.3278 5.05879 21.1271 5.1471C20.9265 5.23541 20.7455 5.36309 20.5951 5.52258C20.3025 5.83276 20.1423 6.24475 20.1485 6.67111C20.1547 7.09747 20.3269 7.50462 20.6284 7.80614C20.9299 8.10765 21.3371 8.27979 21.7634 8.286C22.1898 8.29222 22.6018 8.13202 22.9119 7.83943Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
