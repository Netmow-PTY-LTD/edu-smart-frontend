import React, { useEffect } from 'react';
import SimpleBar from 'simplebar-react';
//import logo

import mainlogo from '/public/Edusmart-White-Logo.png';

//Import Components
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Container } from 'reactstrap';

import VerticalLayout from './VerticalLayouts';

const Sidebar = ({ layoutType }) => {
  const dispatch = useDispatch();

  // const { data: userInfoData } = useSelector(
  //   (state) => state.AdminDashboard.userInfo
  // );

  // const userInfoData = { role: 'super-admin' };
  const userInfoData = { role: 'administration' };

  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName('vertical-overlay');
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener('click', function () {
        document.body.classList.remove('vertical-sidebar-enable');
      });
    }
  });

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
                    : userInfoData?.role === 'administration'
                    ? '/administration' : '/'
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
        {
          <>
            <SimpleBar id="scrollbar" className="h-100">
              <Container fluid>
                <div id="two-column-menu"></div>
                <ul className="navbar-nav" id="navbar-nav">
                  <VerticalLayout layoutType={layoutType} />
                </ul>
              </Container>
            </SimpleBar>
            <div className="sidebar-background"></div>
          </>
        }
      </div>
      <div className="vertical-overlay"></div>
    </>
  );
};

export default Sidebar;
