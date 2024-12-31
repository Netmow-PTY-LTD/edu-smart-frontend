import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// import MobileNav from '../mobileNav';
import { useState } from 'react';
import { edulogo } from '@/utils/common/data';

export default function Header() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };
  const { data: universityData } = useGetAllUniversityQuery();
  return (
    <>
      <header className="header">
        {/* <div className="topbar">
          <div className="container">
            <div className="topbar-content">
              <div className="topbar-address">
                Persiaran Multimedia, 63100 Cyberjaya, Selangor, Malaysia
              </div>
              <a href="#">Phone: 1300-800-668</a>
              <a href="#">WhatsApp: 1300-800-668</a>
              <div className="topbar-socials">
                <span>Follow Us: </span>
                <div className="topbar-links">
                  <a href="#" className="fb">
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
                  </a>

                  <a href="#" className="linkedin">
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
                  </a>

                  <a href="#" className="twitter">
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className={`header-bottom`}>
          <div className="container">
            <div className="header-bottom-content">
              <Link href="/agent" className="logo">
                <Image
                  priority={true}
                  src={edulogo}
                  width={50}
                  height={50}
                  alt="SquadDeck Logo"
                />
              </Link>
              <nav className="main-nav">
                <ul className="nav-list">
                  <li className=" menu-item-has-children">
                    <Link href="#" className="nav-link">
                      <span>Courses</span>
                      <svg
                        width="11"
                        height="6"
                        viewBox="0 0 11 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.878632 0.602997L5.28656 5.01092L9.69449 0.602997"
                          stroke="var(--color--secondary)"
                          strokeWidth="1.10198"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <ul className="sub-menu">
                      {universityData?.courses?.length > 0 &&
                        universityData?.courses?.map((item, index) => (
                          <li key={index}>
                            <Link href={`/course/${item?._id}`}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      <li>
                        <Link href={`/courses`}>View All Courses</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <Link href="#" className="nav-link">
                      <span>Universities</span>
                      <svg
                        width="11"
                        height="6"
                        viewBox="0 0 11 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.878632 0.602997L5.28656 5.01092L9.69449 0.602997"
                          stroke="var(--color--secondary)"
                          strokeWidth="1.10198"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <ul className="sub-menu">
                      {/* <li>
                        <Link href="#">Universities</Link>
                      </li> */}
                      {universityData?.data?.length > 0 &&
                        universityData?.data?.map((item, index) => (
                          <li key={index}>
                            <Link href={`/university/${item?._id}`}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      <li>
                        <Link href={`/university`}>View All Universities</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <Link href="#" className="nav-link">
                      <span>Students</span>
                      <svg
                        width="11"
                        height="6"
                        viewBox="0 0 11 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.878632 0.602997L5.28656 5.01092L9.69449 0.602997"
                          stroke="var(--color--secondary)"
                          strokeWidth="1.10198"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <ul className="sub-menu">
                      {universityData?.data?.length > 0 &&
                        universityData?.data?.map((item, index) => (
                          <li key={index}>
                            <Link href={`/university/${item?._id}`}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      <li>
                        <Link href={`/university`}>View All Universities</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href="/agent/blogs" className="nav-link">
                      <span>Blogs</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/agent/about" className="nav-link">
                      <span>About</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/agent/contact" className="nav-link">
                      <span>Contact</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="d-flex">
                <Link
                  href={`/auth/login`}
                  className={`button text-secondary-alt fs-20 fw-semibold py-2 px-5 d-none d-lg-block`}
                >
                  Login
                </Link>
                <div className="hamburger-menu" onClick={toggleMobileNav}>
                  <div className="line line1"></div>
                  <div className="line line2"></div>
                  <div className="line line3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <MobileNav
          showMobileNav={showMobileNav}
          setShowMobileNav={setShowMobileNav}
        /> */}
      </header>
    </>
  );
}
