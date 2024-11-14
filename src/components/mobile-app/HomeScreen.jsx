/* eslint-disable @next/next/no-img-element */
import { userInfo } from '@/slices/dashboard/adminDashboard/Actions/authActions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = ({ onclickHandler }) => {
  const dispatch = useDispatch();
  const [domain, setDomain] = useState('');

  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch]);

  useEffect(() => {
    setDomain(window?.location?.hostname);
  }, []);

  // const handleLogOut = () => {
  //   localStorage.removeItem('token');
  //   window.location.assign(
  //     `${window.location.protocol}//${domain === 'localhost' ? `${domain}:3000` : domain}/auth/login`
  //   );
  //   if (window.innerWidth <= 1024) {
  //     window.location.assign(`${window.location.protocol}//squaddeck.app`);
  //   }
  // };

  return (
    <section
      className="mobile-app-wrapper"
      style={{ backgroundImage: `url('/mobile-app/app_bg.png')` }}
    >
      <div className="mobile-app-container">
        <div className="mobile-app-header">
          <img src="/mobile-app/sd-logo.png" alt="" />
        </div>
        <div className="mobile-app-body">
          <div className="mobile-app-content">
            <button
              className="btn-mobile btn-transparent"
              onClick={onclickHandler}
            >
              Find your team
            </button>
            <Link href={'/auth/login'} className="btn-mobile primary-btn">
              Log In
            </Link>
            {/* {userInfoData?._id ? (
              <>
                <Link
                  href={`${
                    userInfoData?.role === 'admin'
                      ? `${window.location.protocol}//${`${userInfoData?.subdomain}.${domain === 'localhost' ? `${domain}:3000` : domain}`}/admin`
                      : userInfoData?.role === 'guardian'
                        ? `${window.location.protocol}//${`${userInfoData?.subdomain}.${domain === 'localhost' ? `${domain}:3000` : domain}`}/guardian`
                        : userInfoData?.role === 'player'
                          ? `${window.location.protocol}//${`${userInfoData?.subdomain}.${domain === 'localhost' ? `${domain}:3000` : domain}`}/player`
                          : userInfoData?.role === 'manager'
                            ? `${window.location.protocol}//${`${userInfoData?.subdomain}.${domain === 'localhost' ? `${domain}:3000` : domain}`}/manager`
                            : userInfoData?.role === 'trainer'
                              ? `${window.location.protocol}//${`${userInfoData?.subdomain}.${domain === 'localhost' ? `${domain}:3000` : domain}`}/trainer`
                              : userInfoData?.role === 'super_admin'
                                ? `${window.location.protocol}//${`${domain === 'localhost' ? `${domain}:3000` : domain}`}/super_admin`
                                : ''
                  }`}
                  className="btn-mobile primary-btn"
                >
                  <span>Dashboard</span>
                </Link>
                <div
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => handleLogOut()}
                  className="btn-mobile primary-btn"
                >
                  <i class="ri-logout-box-r-line fs-1 fw-bold me-2"></i>
                  <span>Log Out</span>
                </div>
              </>
            ) : (
              <Link href={'/auth/login'} className="btn-mobile primary-btn">
                Log In
              </Link>
            )} */}
          </div>
          <div className="app-footer-border"></div>
        </div>
      </div>
    </section>
  );
};

export default HomeScreen;
