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
import { useCustomData } from '@/utils/common/data/customeData';
import { useRouter } from 'next/router';

const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

const ProfileDropdown = () => {
  const [isAuthenticated, setIsAuthenticated] = useState('');
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [panelTextGet, setPanelTextGet] = useState('');
  const router = useRouter();

  const { data: userInfodata, error, isLoading } = useGetUserInfoQuery();
  const customeData = useCustomData();

 



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

    }
  };

  // Extract panelTextGet from URL path
  useEffect(() => {
    if (!router.isReady) return;

    const pathParts = router.pathname.split('/');
    const panel = pathParts[2] || '';

    setPanelTextGet(panel);
  }, [router.isReady, router.pathname]);

  // Compare panelTextGet with customeData?.paneltext and logout if mismatch
  useEffect(() => {
    if (!panelTextGet) return; // wait until panelTextGet is set

    if (panelTextGet !== customeData?.paneltext) {
      handlelogOut();
    }
  }, [panelTextGet, customeData?.paneltext, handlelogOut]);

  console.log('panelTextGet', panelTextGet);

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
                    : userInfodata?.data?.role
                        ?.replace(/_/g, ' ') // Replace underscores with spaces
                        ?.replace(/\b\w/g, char => char.toUpperCase()) || ''}
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
