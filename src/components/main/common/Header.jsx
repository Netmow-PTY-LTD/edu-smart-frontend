import {
  useGetAllCoursesQuery,
  useGetAllUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// import MobileNav from '../mobileNav';
import { useState } from 'react';
import { brandlogo } from '@/utils/common/data';
import MobileNavMain from './MobileNavMain';

export default function Header() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };
  const { data: universityData } = useGetAllUniversityQuery();
  const { data: allCourses } = useGetAllCoursesQuery();

  return (
    <>
      <header className="header">
        <div className={`header-bottom`}>
          <div className="container">
            <div className="header-bottom-content">
              <Link href="/" className="logo">
                <Image
                  priority={true}
                  src={brandlogo}
                  width={200}
                  height={50}
                  alt="SquadDeck Logo"
                />
              </Link>
              <nav className="main-nav">
                <ul className="nav-list">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about" className="nav-link">
                      <span>About</span>
                    </Link>
                  </li>
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
                      {allCourses?.data?.length > 0 &&
                        allCourses?.data?.map((item, index) => (
                          <li key={index}>
                            <Link
                              href={`/university/${item?.university?._id}/course/${item?._id}`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      {/* <li>
                        <Link href={`/courses`}>View All Courses</Link>
                      </li> */}
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
                  {/* <li className="menu-item-has-children">
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
                  </li> */}
                  {/* <li>
                    <Link href="/agent/blogs" className="nav-link">
                      <span>Blogs</span>
                    </Link>
                  </li> */}
                  <li>
                    <Link href="/contact" className="nav-link">
                      <span>Contact</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/packages" className="nav-link">
                      <span>Join as agent</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="d-flex gap-3">
                <Link
                  href={`/auth/login`}
                  className={`fs-20 fw-semibold py-2 px-3 d-none d-lg-block btn-login-main`}
                >
                  Login
                </Link>
                <Link
                  href={`/auth/register`}
                  className={`fs-20 fw-semibold py-2 px-5 d-none d-lg-block btn-register-main`}
                >
                  Register
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
        <MobileNavMain
          showMobileNav={showMobileNav}
          setShowMobileNav={setShowMobileNav}
        />
      </header>
    </>
  );
}
