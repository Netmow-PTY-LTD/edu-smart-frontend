import React, { useEffect, useState } from 'react';

//import images
import logoSm, {
  default as logoDark,
  default as logoLight,
} from '/public/edusmart-Final-Logo-Final-Logo.png';

//import Components
import FullScreenDropdown from '../common/FullScreenDropdown';
import ProfileDropdown from '../common/ProfileDropdown';

//import next
import Image from 'next/image';
import Link from 'next/link';

//import from redux
import LoaderSpiner from '@/components/constants/Loader/Loader';
import Chat from '@/components/constants/chat/chat';

import { changeSidebarVisibility } from '@/slices/thunks';
import Script from 'next/script';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import AddItems from '../common/AddItems';
import Charges from '../common/Charges';
import SandBoxModeComponent from '../common/SandBoxModeComponent';
import Website from '../common/Website';


const Header = () => {
  const dispatch = useDispatch();

  const selectDashboardData = createSelector(
    (state) => state.Layout.sidebarVisibilitytype,
    (sidebarVisibilitytype) => sidebarVisibilitytype
  );
  // Inside your component
  const sidebarVisibilitytype = useSelector(selectDashboardData);

  const [search, setSearch] = useState(false);
  const toogleSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname?.split('.');
      if ((host.length === 3 && host[0] !== 'www') || host[1] === 'localhost') {
        // dispatch(getTheme(host[0]));
      }
    }
  }, [dispatch]);

  // this is for charges component

  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;
    dispatch(changeSidebarVisibility('show'));

    if (windowSize > 767)
      document.querySelector('.hamburger-icon').classList.toggle('open');

    //For collapse horizontal menu
    if (document.documentElement.getAttribute('data-layout') === 'horizontal') {
      document.body.classList.contains('menu')
        ? document.body.classList.remove('menu')
        : document.body.classList.add('menu');
    }

    //For collapse vertical menu
    if (
      sidebarVisibilitytype === 'show' &&
      (document.documentElement.getAttribute('data-layout') === 'vertical' ||
        document.documentElement.getAttribute('data-layout') === 'semibox')
    ) {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove('vertical-sidebar-enable');
        document.documentElement.getAttribute('data-sidebar-size') === 'sm'
          ? document.documentElement.setAttribute('data-sidebar-size', '')
          : document.documentElement.setAttribute('data-sidebar-size', 'sm');
      } else if (windowSize > 1025) {
        document.body.classList.remove('vertical-sidebar-enable');
        document.documentElement.getAttribute('data-sidebar-size') === 'lg'
          ? document.documentElement.setAttribute('data-sidebar-size', 'sm')
          : document.documentElement.setAttribute('data-sidebar-size', 'lg');
      } else if (windowSize <= 767) {
        document.body.classList.add('vertical-sidebar-enable');
        document.documentElement.setAttribute('data-sidebar-size', 'lg');
      }
    }

    //Two column menu
    if (document.documentElement.getAttribute('data-layout') === 'twocolumn') {
      document.body.classList.contains('twocolumn-panel')
        ? document.body.classList.remove('twocolumn-panel')
        : document.body.classList.add('twocolumn-panel');
    }
  };
  return (
    <>
      <Script
        id="google-gtag"
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11458931367"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11458931367');
        `}
      </Script>
      {/* {userInfoIsLoading ? (
        <LoaderSpiner />
      ) : ( */}
        <header id="page-topbar" className={`headerClass`}>
          <div className="layout-width">
            <div className="navbar-header">
              <div className="btn-wrapper-auth">
                <button
                  onClick={() => history.back()}
                  className="btn-back-head"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#9344E8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="m15 4l-8 8l8 8"
                    ></path>
                  </svg>
                </button>
              </div>
              {/* header icon start*/}
              <div className="d-flex">
                <div className="navbar-brand-box horizontal-logo">
                  <Link href="/admin" className="logo logo-dark">
                    <span className="logo-sm">
                      <Image
                        priority={true}
                        src={logoDark}
                        alt=""
                        height="22"
                      />
                    </span>
                    <span className="logo-lg">
                      <Image
                        priority={true}
                        src={logoDark}
                        alt=""
                        height="17"
                      />
                    </span>
                  </Link>

                  <Link href="/admin" className="logo logo-light">
                    <span className="logo-sm">
                      <Image priority={true} src={logoSm} alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                      <Image
                        priority={true}
                        src={logoLight}
                        alt=""
                        height="17"
                      />
                    </span>
                  </Link>
                </div>

                <button
                  onClick={toogleMenuBtn}
                  type="button"
                  className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                  id="topnav-hamburger-icon"
                >
                  <span className="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>
                {'userInfoData'?.role === 'super_admin' ? ' ' : <Website />}
              </div>
              {/* header icon end*/}
              {'userInfoData'?.role === 'guardian' ? (
                <div className="d-flex flex-grow-1 ms-2">
                  <button className="button p-3 fs-4 ">
                    <Link
                      href={'/guardian/add-player-for-guardian'}
                      className="text-light"
                    >
                      <i className="ri-add-circle-line align-middle me-2"></i>
                      Add Player
                    </Link>
                  </button>
                </div>
              ) : 'userInfoData'?.role === 'player' ? (
                ''
              ) : 'userInfoData'?.role === 'super_admin' ? (
                ''
              ) : 'userInfoData'?.role === 'manager' ? (
                ''
              ) : 'userInfoData'?.role === 'trainer' ? (
                ''
              ) : (
                // <AddItems />
                ''
              )}

              {'userInfoData'?.role === 'admin' ? <SandBoxModeComponent /> : ''}
              <div className="d-flex ">
                {/* LanguageDropdown */}
                {/* <LanguageDropdown /> */}

                {/* WebAppsDropdown */}
                {/* <WebAppsDropdown /> */}

                {'userInfoData'?.role === 'guardian' ? (
                  ''
                ) : 'userInfoData'?.role === 'player' ? (
                  ''
                ) : 'userInfoData'?.role === 'manager' ? (
                  ''
                ) : 'userInfoData'?.role === 'super_admin' ? (
                  ''
                ) : 'userInfoData'?.role === 'trainer' ? (
                  ''
                ) : (
                  // <Charges totalCharges={''} />
                  ''
                )}
                {'userInfoData'?.role === 'admin' ? (
                  <div className="ms-2 header-item d-none d-lg-flex">
                    <Link
                      // href={''}
                      href={'/admin/upgrade'}
                      className="button d-flex align-items-center p-3 fs-4 text-light"
                    >
                      Upgrade
                    </Link>
                  </div>
                ) : (
                  ''
                )}

                {/* <Dropdown
                  isOpen={search}
                  toggle={toogleSearch}
                  className=" topbar-head-dropdown header-item"
                >
                  <DropdownToggle
                    type="button"
                    tag="button"
                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  >
                    <i className="bx bx-search fs-22"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-lg dropdown-menu-end ">
                    <Form className="p-3">
                      <div className="form-group m-0">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control fs-3"
                            placeholder="Search ..."
                            aria-label="Recipient's username"
                          />
                          <button className="btn btn-primary" type="submit">
                            <i className="mdi mdi-magnify fs-1"></i>
                          </button>
                        </div>
                      </div>
                    </Form>
                  </DropdownMenu>
                </Dropdown> */}
                {/* <SearchOption /> */}

                {/* MyCartDropdwon */}
                {/* <MyCartDropdown /> */}

                {/* FullScreenDropdown */}
                <FullScreenDropdown />

                {/* Dark/Light Mode set */}
                {/* <LightDark
                  layoutMode={layoutModeType}
                  onChangeLayoutMode={onChangeLayoutMode}
                /> */}

                {/* NotificationDropdown */}
                {/* <NotificationDropdown /> */}

                {/* ProfileDropdown */}
                <ProfileDropdown data={''} totalCharges={''} />
              </div>
            </div>
          </div>
          {'userInfoData'?.role === 'super_admin' ? '' : <Chat />}
        </header>
      {/* )} */}
    </>
  );
};

export default Header;
