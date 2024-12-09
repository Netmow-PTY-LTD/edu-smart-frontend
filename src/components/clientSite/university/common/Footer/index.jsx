

import { brandlogo } from '@/utils/common/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-top-content">
            <div
              className="footer-top-about-info wow animate__animated animate__fadeIn"
              data-wow-delay="0.1s"
            >
              <Link href="#" className="footer-logo-temp">
                <Image
                  priority={true}
                  src={brandlogo}
                  width={200}
                  height={100}
                  alt="footer logo"
                />
              </Link>
              <div className="footer-about-text">
                Malaysia started focusing on the development of
                telecommunication, Telekom Malaysia Berhad (TM) took a leap of
                faith by establishing the first private-owned higher learning
                institute.
              </div>
              <div className="d-flex gap-3 align-items-center footer-about-text">
                <p>-Follow on</p>
                <p>
                  <i className="ri-facebook-fill third-color fw-bold fs-2"></i>
                </p>
                <p>
                  <i className="ri-twitter-x-fill third-color fw-bold fs-2"></i>
                </p>
                <p>
                  <i className="ri-linkedin-fill third-color fw-bold fs-2"></i>
                </p>
                <p>
                  <i className="ri-youtube-fill third-color fw-bold fs-2"></i>
                </p>
              </div>
            </div>
            <div
              className="footer-top-single-widget footer-top-widget-1"
              data-wow-delay="0.5s"
            >
              <h3 className="wow animate__animated animate__fadeIn">
                <span>QUICK LINKS</span>
              </h3>
              <div className="footer-menu">
                <ul>
                  <li>
                    <Link
                      href="#"
                      className="wow animate__animated animate__fadeIn"
                    >
                      <i className="ri-arrow-right-double-fill"></i>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="wow animate__animated animate__fadeIn"
                    >
                      <i className="ri-arrow-right-double-fill"></i>
                      Universities
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="wow animate__animated animate__fadeIn"
                    >
                      <i className="ri-arrow-right-double-fill"></i>
                      Programs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="wow animate__animated animate__fadeIn"
                    >
                      <i className="ri-arrow-right-double-fill"></i>
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="footer-top-single-widget footer-top-widget-3"
              data-wow-delay="1.5s"
            >
              <h3 className="wow animate__animated animate__fadeIn ">
                <span>Contact Us</span>
              </h3>
              <div className="footer-menu d-flex align-items-center">
                <ul>
                  <li>
                    <Link
                      href="#"
                      className="wow animate__animated animate__fadeIn"
                    >
                      <i className="ri-map-pin-fill third-color fs-1 fw-bold me-2"></i>
                      Multimedia University, Persiaran Multimedia, 63100
                      Cyberjaya, Selangor, Malaysia
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="wow animate__animated animate__fadeIn"
                    >
                      <i className="ri-phone-line third-color fs-1 fw-bold me-2"></i>
                      +1300-800-668
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="wow animate__animated animate__fadeIn"
                    >
                      <i className="ri-mail-line third-color fs-1 fw-bold me-2"></i>
                      hello@example.com.my
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-5">
          <div className="footer-bottom-content-temp">
            <div
              className="footer-bottom-left footer-copyright"
              data-wow-delay="1s"
            >
              <p>Copyright © 2024 EduSmart</p>
            </div>
            <div className="footer-bottom-right">
              <div className="footer-bottom-right-nav" data-wow-delay="1.5s">
                <Link href="#">Terms & Conditions</Link>
                <Link href="#">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <a href="#" className={`scrolltop-btn`} id="scrollToTop">
        <svg
          aria-hidden="true"
          role="img"
          width="0.45em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 768 1728"
        >
          <path
            fill="#fff"
            d="M765 429q-9 19-29 19H512v1248q0 14-9 23t-23 9H288q-14 0-23-9t-9-23V448H32q-21 0-29-19t5-35L358 10q10-10 23-10q14 0 24 10l355 384q13 16 5 35z"
          ></path>
        </svg>
      </a> */}
    </footer>
  );
}
