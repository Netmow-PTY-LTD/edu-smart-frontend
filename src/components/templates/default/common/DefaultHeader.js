/* eslint-disable @next/next/no-img-element */
import { bgPrimary } from '@/components/constants/utils/themeUtils';
import { userInfo } from '@/slices/dashboard/adminDashboard/Actions/authActions';
import { getNavMenu } from '@/slices/dashboard/adminDashboard/Actions/webInfoAction';
import { clientHomeAction } from '@/slices/home/actions/clientHomeAction';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MobileNav from './mobileNav';
import { getAllCartItemsAction } from '@/slices/home/actions/clientProductAction';

export default function DefaultHeader({ data }) {
  const router = useRouter();
  const [domain, setDomain] = useState('');
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [isSubFeature, setIsSubFeature] = useState(false);
  const [isSubSports, setIsSubSports] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [subdomain, setSubdomain] = useState('');
  const [token, setToken] = useState('');
  const [news, setNews] = useState(true);
  const [events, setEvents] = useState(true);

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };
  const dispatch = useDispatch();

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const {
    data: navMenuData,
    isLoading: navMenuLoading,
    error: navMenuError,
  } = useSelector((state) => state.AdminDashboard.navMenu);

  const {
    data: clientHomeData,
    isLoading: clientHomeLoading,
    error: clientHomeError,
  } = useSelector((state) => state.Home.clientHome);

  const {
    data: userInfoData,
    isLoading: userInfoIsLoading,
    error: userInfoError,
  } = useSelector((state) => state.AdminDashboard.userInfo);

  useEffect(() => {
    setDomain(window?.location?.hostname);
    setSubdomain(themeData?.subdomain);
    setToken(localStorage.getItem('token'));
  }, [themeData?.subdomain]);

  useEffect(() => {
    if (subdomain) {
      dispatch(clientHomeAction(subdomain));
      dispatch(getNavMenu(subdomain));
      dispatch(userInfo());
    }
  }, [dispatch, subdomain]);

  useEffect(() => {
    if (subdomain) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/website-menu/${subdomain}`
        )
        .then((res) => {
          setNews(res.data.news_menu);
          setEvents(res.data.event_menu);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [subdomain]);

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

  const loginHandler = () => {
    window.location.assign(`${window.location.protocol}//${domain}/auth/login`);
  };

  const registrationHandler = () => {
    window.location.assign(
      `${window.location.protocol}//${domain}/auth/register`
    );
  };

  const {
    data: cartData,
    isLoading: isCardDataLoading,
    error: cardDataError,
  } = useSelector((state) => state.Home.getAllCartItems);

  useEffect(() => {
    dispatch(getAllCartItemsAction());
  }, [dispatch]);

  return (
    <>
      <header className="header-temp">
        <div className={`header-bottom-temp ${isHeaderFixed ? 'sticky' : ''}`}>
          <style>
            {`
            .header-bottom-temp{
              background-color: #fff;
            }
              .main-nav-temp ul.sub-menu {
                border-top: 3px solid
                  ${themeData?.branding?.primary_color?.trim() || '#9344E8'};
              }
              .main-nav-temp ul li a{
                color: ${themeData?.branding?.menu_color?.trim() || '#162A73'};
              }
              .hamburger-menu-temp > :is(.line1, .line2, .line3){
                background-color: ${
                  themeData?.branding?.primary_color?.trim() || '#9344E8'
                };
              }
            `}
          </style>
          <div className="container-fluid">
            <div className="header-bottom-content-temp">
              <div className="btn-wrapper-auth">
                <button
                  onClick={() => history.back()}
                  className="btn-back-head"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke={
                        themeData?.branding?.primary_color?.trim() || '#9344E8'
                      }
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="m15 4l-8 8l8 8"
                    ></path>
                  </svg>
                </button>
              </div>
              <Link href="/" className="logo-temp">
                <img
                  height={60 + 'px'}
                  src={
                    themeData?.branding?.logo
                      ? themeData?.branding?.logo?.secure_url
                      : '/images/templates/logo.png'
                  }
                  alt="Logo"
                />
              </Link>
              <nav className="main-nav-temp">
                <ul className="nav-list-temp">
                  {navMenuData?.home && (
                    <li className="nav-item menu-item-has-children">
                      <Link href="/" className="nav-link">
                        <span>Home</span>
                      </Link>
                    </li>
                  )}

                  {navMenuData?.team && (
                    <li className="nav-item">
                      <Link href="/teams" className="nav-link">
                        <span>Teams</span>
                        <svg
                          width="11"
                          height="6"
                          viewBox="0 0 11 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.878632 0.602997L5.28656 5.01092L9.69449 0.602997"
                            stroke={`${themeData?.branding?.menu_color?.trim() || '#162A73'}`}
                            strokeWidth="1.10198"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                      {clientHomeData?.teams &&
                      clientHomeData?.teams?.length > 0 ? (
                        <ul className="sub-menu">
                          {clientHomeData?.teams?.map((team, index) => {
                            return (
                              <li key={index}>
                                <Link href={`/teams/${team._id}`}>
                                  {team.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <ul className="sub-menu">
                          <li>
                            <a href="#">Under 12 Auroras</a>
                          </li>
                          <li>
                            <a href="#">ABC TEAM DEV TEST</a>
                          </li>
                          <li>
                            <a href="#">Under 12 Comets</a>
                          </li>
                          <li>
                            <a href="#">U10 Galaxy</a>
                          </li>
                          <li>
                            <a href="#">Under 10 SuperNovas</a>
                          </li>
                        </ul>
                      )}
                    </li>
                  )}

                  {navMenuData?.players && (
                    <li className="nav-item menu-item-has-children">
                      <Link href="/players" className="nav-link">
                        <span>Players</span>
                      </Link>
                    </li>
                  )}

                  {navMenuData?.communitySupport && (
                    <li className="nav-item menu-item-has-children">
                      <Link href="/community-support" className="nav-link">
                        <span>Community Support</span>
                      </Link>
                    </li>
                  )}

                  {navMenuData?.fixtures &&
                    subdomain === 'centralstarsbasketball' && (
                      <li className="nav-item menu-item-has-children">
                        <Link href="/fixtures" className="nav-link">
                          <span>Fixture & Results</span>
                        </Link>
                      </li>
                    )}

                  {navMenuData?.about && (
                    <li className="nav-item menu-item-has-children">
                      <Link
                        href={`${subdomain === 'centralstarsbasketball' ? '/ssb' : '/about'}`}
                        className="nav-link"
                      >
                        {subdomain === 'centralstarsbasketball' ? (
                          <span>SSB</span>
                        ) : (
                          <span>About</span>
                        )}
                      </Link>
                    </li>
                  )}

                  {navMenuData?.news && (
                    <Fragment>
                      {news && (
                        <li className="nav-item">
                          <Link href="/news" className="nav-link">
                            News
                          </Link>
                        </li>
                      )}
                    </Fragment>
                  )}

                  {navMenuData?.events && (
                    <Fragment>
                      {events && (
                        <li className="nav-item">
                          <Link href="/events" className="nav-link">
                            Events
                          </Link>
                        </li>
                      )}
                    </Fragment>
                  )}

                  {navMenuData?.shop && (
                    <li className="nav-item">
                      <Link href="/ecommerce/products" className="nav-link">
                        Shop
                      </Link>
                    </li>
                  )}

                  {navMenuData?.contact && (
                    <li className="nav-item">
                      <Link href="/contact" className="nav-link">
                        Contact Us
                      </Link>
                    </li>
                  )}

                  {navMenuData?.joinWaitlist && (
                    <li className="nav-item">
                      <Link href="/join-waitlist" className="nav-link">
                        Join Waitlist
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
              <div className="nav-right-temp">
                <Link href="/ecommerce/cart" className="shopping-cart">
                  <svg
                    width="4.1rem"
                    height="4.1rem"
                    viewBox="0 0 29 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.1215 29.0189C12.3047 29.0189 13.264 28.0597 13.264 26.8764C13.264 25.6931 12.3047 24.7339 11.1215 24.7339C9.93818 24.7339 8.97894 25.6931 8.97894 26.8764C8.97894 28.0597 9.93818 29.0189 11.1215 29.0189Z"
                      fill={
                        themeData?.branding?.secondary_color?.trim() ||
                        '#162A73'
                      }
                      stroke={
                        themeData?.branding?.secondary_color?.trim() ||
                        '#162A73'
                      }
                      strokeWidth="0.372596"
                    />
                    <path
                      d="M24.1384 29.0189C25.3216 29.0189 26.2809 28.0597 26.2809 26.8764C26.2809 25.6931 25.3216 24.7339 24.1384 24.7339C22.9551 24.7339 21.9958 25.6931 21.9958 26.8764C21.9958 28.0597 22.9551 29.0189 24.1384 29.0189Z"
                      fill={
                        themeData?.branding?.secondary_color?.trim() ||
                        '#162A73'
                      }
                      stroke={
                        themeData?.branding?.secondary_color?.trim() ||
                        '#162A73'
                      }
                      strokeWidth="0.372596"
                    />
                    <path
                      d="M17.5918 5.21353C17.558 4.89796 17.5406 4.57985 17.5399 4.26131C17.5406 3.94277 17.558 3.62465 17.5918 3.30908H9.36932L9.85169 5.21353H17.5918Z"
                      fill={
                        themeData?.branding?.secondary_color?.trim() ||
                        '#162A73'
                      }
                      stroke={
                        themeData?.branding?.secondary_color?.trim() ||
                        '#162A73'
                      }
                      strokeWidth="0.372596"
                    />
                    <path
                      d="M26.9951 11.4024H26.5952L25.4049 16.6397H11.1215L6.76983 2.86094C6.72276 2.71473 6.64102 2.58208 6.53159 2.47431C6.42215 2.36653 6.28827 2.28682 6.14136 2.24199L2.23723 1.04219C2.11719 1.0053 1.99105 0.992414 1.86602 1.00427C1.741 1.01613 1.61953 1.0525 1.50856 1.1113C1.28445 1.23005 1.11669 1.43297 1.04219 1.67542C0.967687 1.91786 0.992548 2.17997 1.1113 2.40409C1.23006 2.6282 1.43297 2.79596 1.67542 2.87046L5.09391 3.91791L9.46463 17.7252L7.90298 19.0012L7.77919 19.125C7.39291 19.5701 7.17395 20.1361 7.16005 20.7253C7.14614 21.3145 7.33816 21.8901 7.70301 22.353C7.96255 22.6686 8.29235 22.9191 8.66603 23.0845C9.03972 23.2498 9.44691 23.3254 9.85504 23.3052H25.7477C26.0002 23.3052 26.2424 23.2049 26.421 23.0263C26.5996 22.8478 26.6999 22.6056 26.6999 22.353C26.6999 22.1005 26.5996 21.8583 26.421 21.6797C26.2424 21.5011 26.0002 21.4008 25.7477 21.4008H9.70269C9.59303 21.397 9.4862 21.3651 9.39251 21.308C9.29881 21.2509 9.22142 21.1706 9.16782 21.0749C9.11421 20.9792 9.08619 20.8712 9.08648 20.7615C9.08676 20.6518 9.11534 20.544 9.16944 20.4486L11.4643 18.5441H26.1667C26.3868 18.5495 26.602 18.4784 26.7756 18.343C26.9492 18.2076 27.0705 18.0162 27.1189 17.8014L28.6139 11.2215C28.083 11.3433 27.5398 11.404 26.9951 11.4024Z"
                      fill={
                        themeData?.branding?.secondary_color?.trim() ||
                        '#162A73'
                      }
                      stroke={
                        themeData?.branding?.secondary_color?.trim() ||
                        '#162A73'
                      }
                      strokeWidth="0.372596"
                    />
                  </svg>
                  <span className="cart-number" style={bgPrimary(themeData)}>
                    {parseInt(
                      cartData?.length > 0
                        ? cartData?.reduce(
                            (total, item) => total + item?.quantity,
                            0
                          )
                        : 0
                    )}
                  </span>
                </Link>
                {token ? (
                  <Link
                    href={`${
                      userInfoData?.role === 'admin'
                        ? `${window.location.protocol}//${domain}/admin`
                        : userInfoData?.role === 'guardian'
                          ? `${window.location.protocol}//${domain}/guardian`
                          : userInfoData?.role === 'player'
                            ? `${window.location.protocol}//${domain}/player`
                            : userInfoData?.role === 'manager'
                              ? `${window.location.protocol}//${domain}/manager`
                              : userInfoData?.role === 'trainer'
                                ? `${window.location.protocol}//${domain}/trainer`
                                : ''
                    }`}
                    style={{
                      cursor: 'pointer',
                      color: '#fff',
                      backgroundColor: `${themeData?.branding?.primary_color?.trim() || '#9344E8'}`,
                    }}
                    className="login-btn px-4 py-3"
                  >
                    <span>Dashboard</span>
                  </Link>
                ) : !token ? (
                  <>
                    <div
                      style={{
                        cursor: 'pointer',
                        color: '#fff',
                        backgroundColor: `${themeData?.branding?.primary_color?.trim() || '#9344E8'}`,
                      }}
                      onClick={() => loginHandler()}
                      className="login-btn px-4 py-4"
                    >
                      {/* <svg
                        width="1.9rem"
                        height="1.9rem"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="htt p://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_7_114)">
                          <path
                            d="M15.4376 0C17.0116 0 18.2876 1.27599 18.2876 2.85V16.15C18.2876 17.724 17.0116 19 15.4376 19H9.73757C8.16354 19 6.88757 17.724 6.88757 16.15V2.85C6.88757 1.27599 8.16354 0 9.73757 0H15.4376Z"
                            fill={`${
                              themeData?.branding?.primary_color || '#9344E8'
                            }`}
                          />
                          <path
                            d="M10.4094 5.50335C10.0383 5.13235 9.43686 5.13235 9.06582 5.50335C8.69485 5.87435 8.69485 6.47584 9.06582 6.84687L10.7691 8.5501H2.13759C1.61292 8.5501 1.18759 8.97541 1.18759 9.5001C1.18759 10.0247 1.61292 10.4501 2.13759 10.4501H10.7691L9.06582 12.1533C8.69485 12.5244 8.69485 13.1258 9.06582 13.4969C9.43686 13.8678 10.0383 13.8678 10.4094 13.4969L13.0626 10.8436C13.8046 10.1016 13.8046 8.89858 13.0626 8.15657L10.4094 5.50335Z"
                            fill={`${
                              themeData?.branding?.primary_color
                                ? '#fff'
                                : 'var(--color--primary)'
                            }`}
                          />
                          <g clipPath="url(#clip1_7_114)">
                            <path
                              d="M10.4093 5.50335C10.0383 5.13235 9.43683 5.13235 9.06579 5.50335C8.69482 5.87435 8.69482 6.47584 9.06579 6.84687L10.7691 8.5501H2.13756C1.61289 8.5501 1.18756 8.97541 1.18756 9.5001C1.18756 10.0247 1.61289 10.4501 2.13756 10.4501H10.7691L9.06579 12.1533C8.69482 12.5244 8.69482 13.1258 9.06579 13.4969C9.43683 13.8678 10.0383 13.8678 10.4093 13.4969L13.0626 10.8436C13.8046 10.1016 13.8046 8.89858 13.0626 8.15657L10.4093 5.50335Z"
                              fill={`${
                                themeData?.branding?.primary_color
                                  ? themeData?.branding?.primary_color
                                  : '#fff'
                              }`}
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_7_114">
                            <rect width="19" height="19" fill="white" />
                          </clipPath>
                          <clipPath id="clip1_7_114">
                            <rect
                              width="6.34915"
                              height="8.46553"
                              fill="white"
                              transform="translate(0.887878 5.21924)"
                            />
                          </clipPath>
                        </defs>
                      </svg> */}

                      <span className="d-flex">
                        <i className="ri-login-box-line me-3 fs-20"></i>Login
                      </span>
                    </div>
                    <div
                      style={{
                        cursor: 'pointer',
                        color: '#fff',
                        backgroundColor: `${themeData?.branding?.primary_color?.trim() || '#9344E8'}`,
                      }}
                      onClick={() => registrationHandler()}
                      className="login-btn px-4 py-4"
                    >
                      <span>Create Account</span>
                    </div>
                  </>
                ) : (
                  ''
                )}

                <div className="hamburger-menu-temp" onClick={toggleMobileNav}>
                  <div className="line line1"></div>
                  <div className="line line2"></div>
                  <div className="line line3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileNav
        token={token}
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
        news={news}
        events={events}
      />
    </>
  );
}
