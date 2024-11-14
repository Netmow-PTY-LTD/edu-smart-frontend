import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  bgSecondary,
  navLinkColor,
} from '@/components/constants/utils/themeUtils';
import { userInfo } from '@/slices/dashboard/adminDashboard/Actions/authActions';

const MobileNav = ({
  showMobileNav,
  setShowMobileNav,
  token,
  news,
  events,
}) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [domain, setDomain] = useState('');
  const [subdomain, setSubdomain] = useState('');

  const toggleSubmenu = (menuItem) => {
    setShowSubmenu(menuItem === activeMenuItem ? !showSubmenu : true);
    setActiveMenuItem(menuItem === activeMenuItem ? null : menuItem);
  };

  const navRef = useRef(null);
  const dispatch = useDispatch();

  const {
    data: navMenuData,
    isLoading: navMenuLoading,
    error: navMenuError,
  } = useSelector((state) => state.AdminDashboard.navMenu);

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    setSubdomain(themeData?.subdomain);
  }, [themeData?.subdomain]);

  const {
    data: clientHomeData,
    isLoading: clientHomeLoading,
    error: clientHomeError,
  } = useSelector((state) => state.Home.clientHome);

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
    setDomain(window?.location?.hostname);
  }, []);

  const loginHandler = () => {
    window.location.assign(`${window.location.protocol}//${domain}/auth/login`);
  };

  const {
    data: userInfoData,
    isLoading: userInfoIsLoading,
    error: userInfoError,
  } = useSelector((state) => state.AdminDashboard.userInfo);

  useEffect(() => {
    if (subdomain) {
      dispatch(userInfo());
    }
  }, [dispatch, subdomain]);

  const registrationHandler = () => {
    window.location.assign(
      `${window.location.protocol}//${domain}/auth/register`
    );
  };

  return (
    <section
      className={`mobile-nav-area ${showMobileNav ? 'active' : ''}`}
      style={bgSecondary(themeData)}
      ref={navRef}
    >
      <div className="mobile-nav-header-temp">
        <Link href="/" className="logo-container">
          <img
            src={
              themeData?.branding?.logo
                ? themeData?.branding?.logo?.secure_url
                : 'images/templates/main_logo.png'
            }
            alt="Logo"
          />
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
        <ul className="mobile-menu">
          {navMenuData?.home && (
            <li className="nav-item menu-item-has-children">
              <Link href="/" className="nav-link">
                <span>Home</span>
              </Link>
            </li>
          )}
          {/* <li className="menu-item">
            <Link
              href="/about"
              className="nav-link"
              style={navLinkColor(themeData)}
            >
              <span>About Us</span>
            </Link>
          </li> */}
          {navMenuData?.team && (
            <li
              className={`menu-item menu-item-has-children ${
                activeMenuItem === 'teams' ? 'active' : ''
              }`}
            >
              <Link
                href="#"
                className="nav-link"
                style={navLinkColor(themeData)}
                onClick={() => toggleSubmenu('teams')}
              >
                <span>Teams</span>
                <i
                  className={`${
                    showSubmenu ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                  }`}
                ></i>
              </Link>
              {clientHomeData?.teams && clientHomeData?.teams?.length > 0 ? (
                <ul className={`sub-menu ${showSubmenu ? 'open' : ''}`}>
                  {clientHomeData?.teams?.map((team, index) => {
                    return (
                      <li key={index}>
                        <Link href={`/teams/${team._id}`}>{team.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className={`sub-menu ${showSubmenu ? 'open' : ''}`}>
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
            <li className="menu-item">
              <Link
                href="/players"
                className="nav-link"
                style={navLinkColor(themeData)}
              >
                <span>Players</span>
              </Link>
            </li>
          )}
          {navMenuData?.communitySupport && (
            <li className="nav-item menu-item-has-children">
              <Link
                href="/community-support"
                className="nav-link"
                style={navLinkColor(themeData)}
              >
                <span>Community Support</span>
              </Link>
            </li>
          )}
          {navMenuData?.fixtures && (
            <li className="nav-item menu-item-has-children">
              <Link
                href="/fixtures"
                className="nav-link"
                style={navLinkColor(themeData)}
              >
                <span>Fixture & Results</span>
              </Link>
            </li>
          )}

          {navMenuData?.about && (
            <li className="nav-item menu-item-has-children">
              <Link
                href={`${subdomain === 'centralstarsbasketball' ? '/ssb' : '/about'}`}
                className="nav-link"
                style={navLinkColor(themeData)}
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
            <>
              {news && (
                <li className="nav-item">
                  <Link href="/news" className="nav-link">
                    News
                  </Link>
                </li>
              )}
            </>
          )}

          {navMenuData?.events && (
            <>
              {events && (
                <li className="nav-item">
                  <Link href="/events" className="nav-link">
                    Events
                  </Link>
                </li>
              )}
            </>
          )}
          {/* <li className="nav-item">
                  <a href="shop.html" className="nav-link">
                    Shop
                  </a>
                </li> */}
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
          <li>
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
                  color: `${themeData?.branding?.primary_color?.trim() || '#9344E8'}`,
                  backgroundColor: '#fff',
                }}
                className="login-btn px-4 py-4"
              >
                <span>Dashboard</span>
              </Link>
            ) : (
              <>
                <div
                  style={{
                    cursor: 'pointer',
                    color: `${themeData?.branding?.primary_color?.trim() || '#9344E8'}`,
                    backgroundColor: '#fff',
                  }}
                  onClick={() => loginHandler()}
                  className="login-btn px-4 py-3 mx-4 mt-2"
                >
                  <svg
                    width="1.9rem"
                    height="1.9rem"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="htt p://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_7_114)">
                      <path
                        d="M15.4376 0C17.0116 0 18.2876 1.27599 18.2876 2.85V16.15C18.2876 17.724 17.0116 19 15.4376 19H9.73757C8.16354 19 6.88757 17.724 6.88757 16.15V2.85C6.88757 1.27599 8.16354 0 9.73757 0H15.4376Z"
                        fill={`${themeData?.branding?.primary_color?.trim() || '#9344E8'}`}
                      />
                      <path
                        d="M10.4094 5.50335C10.0383 5.13235 9.43686 5.13235 9.06582 5.50335C8.69485 5.87435 8.69485 6.47584 9.06582 6.84687L10.7691 8.5501H2.13759C1.61292 8.5501 1.18759 8.97541 1.18759 9.5001C1.18759 10.0247 1.61292 10.4501 2.13759 10.4501H10.7691L9.06582 12.1533C8.69485 12.5244 8.69485 13.1258 9.06582 13.4969C9.43686 13.8678 10.0383 13.8678 10.4094 13.4969L13.0626 10.8436C13.8046 10.1016 13.8046 8.89858 13.0626 8.15657L10.4094 5.50335Z"
                        fill={`${
                          themeData?.branding?.primary_color?.trim()
                            ? '#fff'
                            : 'var(--color--primary)'
                        }`}
                      />
                      <g clipPath="url(#clip1_7_114)">
                        <path
                          d="M10.4093 5.50335C10.0383 5.13235 9.43683 5.13235 9.06579 5.50335C8.69482 5.87435 8.69482 6.47584 9.06579 6.84687L10.7691 8.5501H2.13756C1.61289 8.5501 1.18756 8.97541 1.18756 9.5001C1.18756 10.0247 1.61289 10.4501 2.13756 10.4501H10.7691L9.06579 12.1533C8.69482 12.5244 8.69482 13.1258 9.06579 13.4969C9.43683 13.8678 10.0383 13.8678 10.4093 13.4969L13.0626 10.8436C13.8046 10.1016 13.8046 8.89858 13.0626 8.15657L10.4093 5.50335Z"
                          fill={`${
                            themeData?.branding?.primary_color?.trim()
                              ? themeData?.branding?.primary_color?.trim()
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
                  </svg>
                  <span>Login</span>
                </div>
                <div
                  style={{
                    cursor: 'pointer',
                    color: `${themeData?.branding?.primary_color?.trim() || '#9344E8'}`,
                    backgroundColor: '#fff',
                  }}
                  onClick={() => registrationHandler()}
                  className="login-btn mx-4 mt-2"
                >
                  <span>Create Account</span>
                </div>
              </>
            )}
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default MobileNav;
