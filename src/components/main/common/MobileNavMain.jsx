import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetAllCoursesQuery,
  useGetAllUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import Loader from '@/components/constants/Loader/Loader';

const MobileNavMain = ({ showMobileNav, setShowMobileNav, token }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering

  const {
    data: userInfoData,
    isLoading: userInfoLoading,
    refetch: userInfoRefetch,
  } = useGetUserInfoQuery();

  const { data: universityData } = useGetAllUniversityQuery();

  const { data: allCourses } = useGetAllCoursesQuery();

  const toggleSubmenu = (menuItem) => {
    setShowSubmenu(menuItem === activeMenuItem ? !showSubmenu : true);
    setActiveMenuItem(menuItem === activeMenuItem ? null : menuItem);
  };

  const navRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowMobileNav(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef, setShowMobileNav]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <section
      className={`mobile-nav-area ${showMobileNav ? 'active' : ''}`}
      ref={navRef}
    >
      <div className="mobile-nav-header-temp">
        <Link href="/" className="logo-container">
          <img src="/Edusmart-White-Logo.png" alt="Logo" />
        </Link>
        <button
          className="close-btn-temp"
          onClick={() => setShowMobileNav(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="30px"
            height="30px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
            />
          </svg>
        </button>
      </div>

      <nav className="mobile-nav">
        <ul className="nav-list-temp">
          <li>
            <Link href="/" className="nav-link">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/about" className="nav-link">
              <span>About</span>
            </Link>
          </li>
          <li className={`menu-item-has-children`}>
            <Link
              href="#"
              className="nav-link"
              onClick={() => toggleSubmenu('courses')}
            >
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
                  stroke="#fff"
                  strokeWidth="1.10198"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            {showSubmenu && activeMenuItem === 'courses' && (
              <ul className={`sub-menu ${showSubmenu ? 'open' : ''}`}>
                {allCourses?.data?.length > 0 ? (
                  allCourses?.data?.slice(0, 10).map((item, index) => (
                    <li key={index}>
                      <Link
                        // href={`/university/${item?.university}/course/${item?._id}`}
                        href={`/courses?id=${item?._id}`}
                      >
                        {item?.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Link href="#">Graduate</Link>
                    </li>
                    <li>
                      <Link href="#">Undergraduate</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link href="/courses">View All Courses</Link>
                </li>
              </ul>
            )}
          </li>
          <li className={`menu-item-has-children`}>
            <Link
              href="#"
              className="nav-link"
              onClick={() => toggleSubmenu('universities')}
            >
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
                  stroke="#fff"
                  strokeWidth="1.10198"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            {showSubmenu && activeMenuItem === 'universities' && (
              <ul className={`sub-menu ${showSubmenu ? 'open' : ''}`}>
                {universityData?.data?.length > 0 ? (
                  universityData?.data?.slice(0, 10).map((item, index) => (
                    <li key={index}>
                      <Link href={`/university/${item?._id}`}>
                        {item?.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Link href="#">Graduate</Link>
                    </li>
                    <li>
                      <Link href="#">Undergraduate</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link href="/university">View All Universities</Link>
                </li>
              </ul>
            )}
          </li>
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
          {token ? (
            userInfoData?.data?.role === 'super_admin' ? (
              <li className="mx-4">
                <Link
                  type="button"
                  href={`/dashboard/super-admin`}
                  className="fs-20 fw-semibold py-2 px-3 button text-secondary-alt justify-content-center"
                >
                  Dashboard
                </Link>
              </li>
            ) : userInfoData?.data?.role === 'agent' ? (
              <li className="mx-4">
                <Link
                  href={`/dashboard/agent`}
                  className="fs-20 fw-semibold py-2 px-3 button text-secondary-alt justify-content-center"
                >
                  Dashboard
                </Link>
              </li>
            ) : userInfoData?.data?.role === 'student' ? (
              <li className="mx-4">
                <Link
                  href={`/dashboard/student`}
                  className="fs-20 fw-semibold py-2 px-3 button text-secondary-alt justify-content-center"
                >
                  Dashboard
                </Link>
              </li>
            ) : null
          ) : (
            <>
              <li className="px-3 mt-4">
                <Link
                  href={`/auth/login`}
                  className="button text-secondary-alt text-center fs-20 fw-semibold py-2 px-5 justify-content-center"
                >
                  Login
                </Link>
              </li>
              <li className="px-3 mt-4">
                <Link
                  href={`/auth/register`}
                  className="button text-secondary-alt text-center fs-20 fw-semibold py-2 px-5 justify-content-center"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </section>
  );
};

export default MobileNavMain;
