import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

//import images
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';

import { userDummyImage } from '@/utils/common/data';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';

const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

const ProfileDropdown = () => {
  const [isAuthenticated, setIsAuthenticated] = useState('');
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);

  const { data: userInfodata, error, isLoading } = useGetUserInfoQuery();

  console.log("userInfodata", userInfodata);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/auth/login';
    }
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const handlelogOut = () => {
    // if (userInfoData?.role === 'super_admin') {

    // window.location.assign(
    //   `${window.location.protocol}//${domain === 'localhost' ? `localhost:3005` : domain}/auth/login`
    // );
    if (appEnvironment === 'development') {
      Cookies.remove('token');
      Cookies.remove('subdomain');
      Cookies.remove('role');
      window.location.assign(
        `${window.location.protocol}//${'localhost:3005'}/auth/login`
      );
    } else {
      Cookies.remove('token');
      Cookies.remove('subdomain');
      Cookies.remove('role');
      window.location.assign(
        `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/auth/login`
      );

      // const domain = process.env.NEXT_PUBLIC_REDIRECT_URL;
      // Cookies.remove('token', { domain: domain });
      // Cookies.remove('subdomain', { domain: domain });
      // Cookies.remove('role', { domain: domain });
      // window.location.assign(
      //   `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/auth/login`
      // );
    }
    // } else {
    //   document.cookie = 'token=; max-age=0; path=/';

    //   window.location.assign(
    //     `${window.location.protocol}//${subdomain}.${domain === 'localhost' ? 'localhost:3005' : `${domain}.app`}/auth/login`
    //   );
    // }
    // if (window.innerWidth <= 1024) {
    //   window.location.assign(`${window.location.protocol}//squaddeck.app`);
    // }
  };

  return (
    <>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle
          id="userprofile"
          tag="button"
          type="button"
          className="btn"
        >
          <span className="d-flex align-items-center">
            <Image
              priority={true}
              className="rounded-circle header-profile-user"
              src={
                userInfodata?.data?.profile_image?.url ||
                (userInfodata?.data?.role === 'super_admin'
                  ? '/favicon.png'
                  : userDummyImage)
              }
              width={50}
              height={30}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text text-uppercase">
                {userInfodata?.data?.first_name
                  ? userInfodata?.data?.first_name +
                    ' ' +
                    userInfodata?.data?.last_name
                  : ''}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted text-uppercase user-name-sub-text">
              {userInfodata?.data?.role === 'agent'
                ? `${userInfodata?.data?.agent_package?.package?.name || ''} Partner`
                : userInfodata?.data?.role || ''}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
        <h6 className="dropdown-header text-uppercase fs-3">
          Welcome!{' '}
          {userInfodata?.data?.first_name && userInfodata?.data?.last_name
            ? userInfodata?.data?.first_name + ' ' + userInfodata?.data?.last_name
            : ''}
        </h6> 
         <DropdownItem className="p-0">
            <Link
              href={`/dashboard/${userInfodata?.data?.role?.split('_').join('-')}/settings/profile`}
              className="dropdown-item"
            >
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-2"></i>
              <span className="align-middle">Profile</span>
            </Link>
          </DropdownItem>

          <DropdownItem className="p-0">
            {isAuthenticated ? (
              <div onClick={() => handlelogOut()} className="dropdown-item">
                <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{' '}
                <span>LogOut</span>
              </div>
            ) : (
              <div className="dropdown-item">
                <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{' '}
                <Link href={'/auth/login'} className="text-black">
                  <span className=" align-middle" data-key="t-logout">
                    SignIn
                  </span>
                </Link>
              </div>
            )}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default ProfileDropdown;
