import {
  useGetAllCoursesQuery,
  useGetAllUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';

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

  const { data: allCourses } = useGetAllCoursesQuery();

  return (
    <>
      <header className="header">
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
                  <li>
                    <Link href="/agent" className="nav-link">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/agent/about" className="nav-link">
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
                              {item?.name}
                            </Link>
                          </li>
                        ))}
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
                  {/* <li>
                    <Link href="/agent/about" className="nav-link">
                      <span>About</span>
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link href="/agent/contact" className="nav-link">
                      <span>Contact</span>
                    </Link>
                  </li> */}
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
