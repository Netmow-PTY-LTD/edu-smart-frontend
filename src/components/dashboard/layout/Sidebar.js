import React, { useEffect } from 'react';
import SimpleBar from 'simplebar-react';
//import logo

import mainlogo from '/public/Edusmart-White-Logo.png';

//Import Components
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import HorizontalLayout from './HorizontalLayout';
import TwoColumnLayout from './TwoColumnLayout';
import VerticalLayout from './VerticalLayouts';

const Sidebar = ({ layoutType }) => {
  const dispatch = useDispatch();

  // const { data: userInfoData } = useSelector(
  //   (state) => state.AdminDashboard.userInfo
  // );

  const userInfoData = { role: 'super-admin' };

  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName('vertical-overlay');
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener('click', function () {
        document.body.classList.remove('vertical-sidebar-enable');
      });
    }
  });

  const addEventListenerOnSmHoverMenu = () => {
    // add listener Sidebar Hover icon on change layout from setting
    if (
      document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover'
    ) {
      document.documentElement.setAttribute(
        'data-sidebar-size',
        'sm-hover-active'
      );
    } else if (
      document.documentElement.getAttribute('data-sidebar-size') ===
      'sm-hover-active'
    ) {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
    } else {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
    }
  };

  return (
    <>
      <div id="dashboardSidebar" className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link
            href={
              userInfoData?.role === 'admin'
                ? '/admin'
                : userInfoData?.role === 'player'
                  ? '/player'
                  : userInfoData?.role === 'super-admin'
                    ? '/super-admin'
                    : '/'
            }
            className="logo logo-light "
          >
            <span className="logo-sm me-4">
              <Image priority={true} src={mainlogo} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <Image priority={true} src={mainlogo} alt="" height="50" />
            </span>
          </Link>
        </div>
        {layoutType === 'horizontal' ? (
          <div id="scrollbar">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <HorizontalLayout />
              </ul>
            </Container>
          </div>
        ) : layoutType === 'twocolumn' ? (
          <React.Fragment>
            <TwoColumnLayout layoutType={layoutType} />
            <div className="sidebar-background"></div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SimpleBar id="scrollbar" className="h-100">
              <Container fluid>
                <div id="two-column-menu"></div>
                <ul className="navbar-nav" id="navbar-nav">
                  <VerticalLayout layoutType={layoutType} />
                </ul>
              </Container>
            </SimpleBar>
            <div className="sidebar-background"></div>
          </React.Fragment>
        )}
      </div>
      <div className="vertical-overlay"></div>
    </>
  );
};

export default Sidebar;
