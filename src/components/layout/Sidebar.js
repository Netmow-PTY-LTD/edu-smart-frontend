import React, { useEffect } from 'react';
import SimpleBar from 'simplebar-react';
//import logo

import mainlogo from '/public/Edusmart-White-Logo.png';

//Import Components
import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'reactstrap';

import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import VerticalLayout from './VerticalLayouts';

const Sidebar = ({ layoutType }) => {
  const { data: userInfodata, error, isLoading } = useGetUserInfoQuery();

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
              userInfodata?.data?.role === 'agent'
                ? '/dashboard/agent'
                : userInfodata?.data?.role === 'student'
                  ? '/dashboard/student'
                  : userInfodata?.data?.role === 'super_admin'
                    ? '/dashboard/super-admin'
                    : userInfodata?.data?.role === 'university_administration'
                      ? '/dashboard/university_administration'
                      : '/'
            }
            className="logo logo-light "
          >
            <span className="logo-sm me-4">
              <Image
                priority={true}
                src={'/assets/images/logo-sm.png'}
                alt=""
                width={35}
                height={35}
              />
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
