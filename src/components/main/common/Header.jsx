import {
  useGetAllCoursesQuery,
  useGetAllUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
// import MobileNav from '../mobileNav';
import Loader from '@/components/constants/Loader/Loader';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { brandlogo } from '@/utils/common/data';
import Cookies from 'js-cookie';
import { useState } from 'react';
import MobileNavMain from './MobileNavMain';

export default function Header() {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const { data: userInfoData, isLoading: userInfoLoading } =
    useGetUserInfoQuery();

  const { data: universityData } = useGetAllUniversityQuery();
  const { data: allCourses } = useGetAllCoursesQuery();

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsHeaderFixed(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const token = Cookies.get('token');

  return (
    <>
      <header className="header">
        <div
          className={`header-bottom ${isHeaderFixed ? 'sticky-header' : ''}`}
        >
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

                    <div className="sub-menu">
                      <ul>
                        {allCourses?.data?.length > 0 &&
                          allCourses?.data?.slice(0, 10).map((item, index) => (
                            <li key={index}>
                              <Link
                                // href={`/university/${item?.university?._id}/course/${item?._id}`}
                                href={
                                  item?._id ? `/courses?id=${item?._id}` : '#'
                                }
                              >
                                {item?.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                      <Link
                        href={`/courses`}
                        className="button px-3 py-3 rounded-0 justify-content-center"
                      >
                        View All Courses
                      </Link>
                    </div>
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
                    <div className="sub-menu">
                      <ul>
                        {universityData?.data?.length > 0 &&
                          universityData?.data
                            ?.slice(0, 10)
                            .map((item, index) => (
                              <li key={index}>
                                <Link href={`/university/${item?._id}`}>
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                      </ul>
                      <Link
                        href={`/university`}
                        className="button px-3 py-3 rounded-0 justify-content-center"
                      >
                        View All Universities
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link href="/contact" className="nav-link">
                      <span>Contact</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/packages" className="nav-link">
                      <span>Join as partner</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              {userInfoLoading ? (
                <Loader />
              ) : token ? ( // Check if the token exists
                userInfoData?.data?.role === 'super_admin' ? (
                  <div className="d-flex gap-3 ">
                    <Link
                      type="button"
                      href={`/dashboard/${userInfoData?.data?.role?.split('_').join('-')}`}
                      className={`fs-20 fw-semibold py-2 px-3 button text-secondary-alt`}
                    >
                      Dashboard
                    </Link>
                  </div>
                ) : userInfoData?.data?.role === 'agent' ? (
                  <div className="d-flex gap-3 ">
                    <Link
                      href={`/dashboard/agent`}
                      className={`fs-20 fw-semibold py-2 px-3 button text-secondary-alt`}
                    >
                      Dashboard
                    </Link>
                  </div>
                ) : userInfoData?.data?.role === 'student' ? (
                  <div className="d-flex gap-3 ">
                    <Link
                      href={`/dashboard/${userInfoData?.data?.role}`}
                      className={`fs-20 fw-semibold py-2 px-3 button text-secondary-alt`}
                    >
                      Dashboard
                    </Link>
                  </div>
                ) : userInfoData?.data?.role === 'admission_manager' ? (
                  <div className="d-flex gap-3 ">
                    <Link
                      href={`/dashboard/${userInfoData?.data?.role?.split('_').join('-')}`}
                      className={`fs-20 fw-semibold py-2 px-3 button text-secondary-alt`}
                    >
                      Dashboard
                    </Link>
                  </div>
                ) : userInfoData?.data?.role === 'accountant' ? (
                  <div className="d-flex gap-3 ">
                    <Link
                      href={`/dashboard/${userInfoData?.data?.role}`}
                      className={`fs-20 fw-semibold py-2 px-3 button text-secondary-alt`}
                    >
                      Dashboard
                    </Link>
                  </div>
                ) : null
              ) : (
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
                </div>
              )}

              <div className="hamburger-menu" onClick={toggleMobileNav}>
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
              </div>
            </div>
          </div>
        </div>
        <MobileNavMain
          showMobileNav={showMobileNav}
          setShowMobileNav={setShowMobileNav}
          token={token}
        />
      </header>
    </>
  );
}
