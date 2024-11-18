import React from 'react';

//import images
import logoDark from '/public/edusmart-Final-Logo-Final-Logo.png';

//import Components

//import next
import Image from 'next/image';
import Link from 'next/link';

//import from redux

import FullScreenDropdown from '@/components/layout/common/FullScreenDropdown';
import ProfileDropdown from '@/components/layout/common/ProfileDropdown';
import Website from '@/components/layout/common/Website';

import Script from 'next/script';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { changeSidebarVisibility } from '../constants/utils/dashboardSidebarUtils';

const Header = () => {
  const dispatch = useDispatch();

  const selectDashboardData = createSelector(
    (state) => state.Layout.sidebarVisibilitytype,
    (sidebarVisibilitytype) => sidebarVisibilitytype
  );

  // Inside your component
  const sidebarVisibilitytype = useSelector(selectDashboardData);

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

      <header id="page-topbar" className={`headerClass`}>
        <div className="layout-width">
          <div className="navbar-header">
            {/* header icon start*/}
            <div className="d-flex">
              <div className="navbar-brand-box horizontal-logo">
                <Link href="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <Image priority={true} src={logoDark} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <Image priority={true} src={logoDark} alt="" height="17" />
                  </span>
                </Link>

                <Link href="/" className="logo logo-light">
                  <span className="logo-sm">
                    <Image priority={true} src={logoDark} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <Image priority={true} src={logoDark} alt="" height="17" />
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
              {<Website />}
            </div>
            {/* header icon end*/}

            <div className="d-flex ">
              <FullScreenDropdown />
              <ProfileDropdown data={''} totalCharges={''} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
