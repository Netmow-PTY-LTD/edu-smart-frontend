/* eslint-disable @next/next/next-script-for-ga */
import { menuAction } from '@/slices/main_home/action/mainHomeAction';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Cookies from 'js-cookie';
import Head from 'next/head';

export default function Header() {
  const dispatch = useDispatch();

  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [isSubFeature, setIsSubFeature] = useState(false);
  const [isSubSports, setIsSubSports] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [domain, setDomain] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [token, setToken] = useState('');
  const [userinfo, setUserInfo] = useState('');

  useEffect(() => {
    dispatch(menuAction());
  }, [dispatch]);

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };

  const navRef = useRef(null);

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

  const handleLogOut = () => {
    Cookies.remove('token');
    // window.location.assign(
    //   `${window.location.protocol}//${domain === 'localhost' ? `${domain}:3000` : domain}/auth/login`
    // );
    // if (window.innerWidth <= 1024) {
    //   window.location.assign(`${window.location.protocol}//squaddeck.app`);
    // }
  };

  return (
    <>
      <Head>
        {/* Google Tag */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7FMW97QG4Y"
        ></script>

        <script id="gtag">
          {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-7FMW97QG4Y');
`}
        </script>
        {/* Google Tag End */}
        {/* Tawk to */}
        <script id="tawk" strategy="lazyOnload">
          {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/63b9064247425128790c20d9/1gm5c0tof';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </script>
        {/* Tawk to End */}
      </Head>
      <header className="header">
        <div
          className={`header-bottom ${isHeaderFixed ? 'sticky-header' : ''}`}
        >
          <div className="container">
            <div className="header-bottom-content">
              <Link href="/" className="logo">
                <Image
                  priority={true}
                  src="/images/home/logo.png"
                  width={500}
                  height={500}
                  alt="SquadDeck Logo"
                />
              </Link>
              {/* <nav className="main-nav">
                <ul className="nav-list">
                  <li className=" menu-item-has-children">
                    <Link href="/features" className="nav-link">
                      <span>Features</span>
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
                      {menuData?.features?.map((feature, index) => {
                        return (
                          <li key={index}>
                            <Link href={`/features/${feature?.slug}`}>
                              {feature.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  <li className=" menu-item-has-children">
                    <Link href="/sports" className="nav-link">
                      <span>Sports</span>
                      <svg
                        width="11"
                        height="6"
                        viewBox="0 0 11 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.878632 0.602997L5.28656 5.01092L9.69449 0.602997"
                          stroke="#162A73"
                          strokeWidth="1.10198"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <ul className="sub-menu">
                      {menuData?.sports?.map((sport, index) => {
                        return (
                          <li key={index}>
                            <Link href={`/sports/${sport?.slug}`}>
                              {sport?.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  <li>
                    <Link href="/pricing">Pricing</Link>
                  </li>
                  <li>
                    <Link href="/blog" className="nav-link">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="nav-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav> */}
              <div className="d-flex">
                <nav className="main-nav">
                  <ul className="nav-list">
                    {userinfo?.role === 'super_admin' ? (
                      <>
                        <li>
                          <Link
                            href={`${
                              userinfo?.role === 'super_admin'
                                ? `${window.location.protocol}//${`${domain === 'localhost' ? `${domain}:3000` : domain}`}/super_admin`
                                : ''
                            }`}
                            className="button py-3 px-5 text-white"
                          >
                            <span>Dashboard</span>
                          </Link>
                        </li>

                        <li>
                          <div
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() => handleLogOut()}
                            className="d-flex align-items-center qoute_color fs-2 fw-medium"
                          >
                            <i className="ri-logout-box-r-line fs-1 fw-bold me-2"></i>
                            <span className="">Log Out</span>
                          </div>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link href="/auth/login" className="login-btn">
                            <Image priority={true} src={''} alt="Login" />
                            <span>LOGIN</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            href="/auth/register"
                            className="btn-sd text-uppercase"
                          >
                            <span>Register Club or Team</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            href="/book-demo"
                            className="button py-3 px-5 text-white"
                          >
                            <span>BOOK A DEMO</span>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
                <div onClick={toggleMobileNav} className="hamburger-menu">
                  <div className="line line1"></div>
                  <div className="line line2"></div>
                  <div className="line line3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section
          className={`mobile-nav-area-main ${showMobileNav ? 'active' : ''}`}
          ref={navRef}
        >
          <div className="mobile-nav-header">
            <Link href="/" className="logo-container">
              <Image
                width={60}
                height={30}
                src="/images/templates/main_logo.png"
                alt="Logo"
              />
            </Link>
            <div onClick={toggleMobileNav} className="close-btn-main">
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
            </div>
          </div>

          {/* <nav className="mobile-nav">
            <ul className="mobile-menu mb-0">
              <li className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <Link href="/features">
                    <span>Features</span>
                  </Link>
                  <div className="me-3" onClick={toggleSubFeatures}>
                    {isSubFeature ? (
                      <i className="ri-subtract-line fs-1 text-white"></i>
                    ) : (
                      <i className="ri-add-line fs-1 text-white"></i>
                    )}
                  </div>
                </div>
                {isSubFeature && (
                  <ul className="text-white fs-3 ms-4 subFeature">
                    {menuData?.features?.map((feature) => {
                      return (
                        <li key={feature.id}>
                          <Link href={`/features/${feature.slug}`}>
                            {feature.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
              <li className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <Link href="/sports">
                    <span>Sports</span>
                  </Link>
                  <div className="me-3" onClick={toggleSubSports}>
                    {isSubSports ? (
                      <i className="ri-subtract-line fs-1 text-white"></i>
                    ) : (
                      <i className="ri-add-line fs-1 text-white"></i>
                    )}
                  </div>
                </div>
                {isSubSports && (
                  <ul className="text-white fs-3 ms-4 subFeature">
                    {menuData?.sports?.map((sport) => {
                      return (
                        <li key={sport.id}>
                          <Link href={`/sports/${sport?.slug}`}>
                            {sport?.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>

              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
            <div className="mobile-header-btns-main">
              {userinfo?.role === 'super_admin' ? (
                <Link
                  href={`${
                    userinfo?.role === 'super_admin'
                      ? `${window.location.protocol}//${`${domain === 'localhost' ? `${domain}:3000` : domain}`}/super_admin`
                      : ''
                  }`}
                  className="button py-3 px-5 fs-14 text-white"
                >
                  <span>Dashboard</span>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login" className="login-btn">
                    <span>Login</span>
                    <Image priority={true} src={loginimg} alt="Login" />
                  </Link>
                  <Link href="/auth/register" className="login-btn fw-medium">
                    <span>Create Account</span>
                  </Link>
                  <Link href="/book-demo" className="login-btn fw-medium">
                    <span>Book A Demo</span>
                  </Link>
                </>
              )}
            </div>
          </nav> */}
        </section>
      </header>
    </>
  );
}
