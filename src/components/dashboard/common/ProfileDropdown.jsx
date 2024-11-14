/* eslint-disable no-undef */

import React, { useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

//import images

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProfileDropdown = ({ totalCharges, data, steps }) => {
  const [domain, setDomain] = useState('');
  const router = useRouter();
  const [subdomain, setSubdomain] = useState('');

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  // useEffect(() => {
  //   if (userInfoData?.role === 'super_admin') {
  //     setDomain(window?.location?.hostname);
  //     setSubdomain('');
  //   } else {
  //     setDomain(window?.location?.hostname.split('.')[1]);
  //     setSubdomain(window?.location?.hostname.split('.')[0]);
  //   }
  // }, [userInfoData?.role]);

  const handlelogOut = () => {
    if (userInfoData?.role === 'super_admin') {
      localStorage.removeItem('token');
      window.location.assign(
        `${window.location.protocol}//${domain === 'localhost' ? `localhost:3000` : domain}/auth/login`
      );
    } else {
      localStorage.removeItem('token');
      window.location.assign(
        `${window.location.protocol}//${subdomain}.${domain === 'localhost' ? 'localhost:3000' : `${domain}.app`}/auth/login`
      );
    }
    if (window.innerWidth <= 1024) {
      window.location.assign(`${window.location.protocol}//squaddeck.app`);
    }
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
                data &&
                data?.profile_image &&
                data?.profile_image?.uploadedImage
                  ? data?.profile_image?.uploadedImage
                  : `${'/favicon.png'}`
              }
              width={50}
              height={30}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text text-uppercase">
                {data?.first_name + data?.last_name || 'Jhon Doe'}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted text-uppercase user-name-sub-text">
                {data?.role || 'super admin'}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end ">
          <h6 className="dropdown-header text-uppercase fs-3">
            Welcome {`${data?.first_name || ''} ${data?.last_name || ''}`}!
          </h6>
          <DropdownItem className="p-0">
            <Link
              href={
                data?.role === 'admin'
                  ? '/admin/admin-profile-settings'
                  : data?.role === 'guardian'
                    ? '/guardian/guardian-settings'
                    : data?.role === 'player'
                      ? '/player/player-settings'
                      : data?.role === 'manager'
                        ? '/manager/manager-settings'
                        : data?.role === 'trainer'
                          ? '/trainer/trainer-settings'
                          : data?.role === 'super_admin'
                            ? '/super_admin/settings/profile-settings'
                            : '/'
              }
              className="dropdown-item"
            >
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-2"></i>
              <span className="align-middle">Profile</span>
            </Link>
          </DropdownItem>

          {/* <DropdownItem className="p-0">
            <Link
              href={
                data?.role === 'admin'
                  ? '/admin/chat'
                  : data?.role === 'guardian'
                  ? '/guardian/chat-for-guardian'
                  : data?.role === 'player'
                  ? '/player/playerChatForPlayer'
                  : data?.role === 'manager'
                  ? '/manager/chatForManager'
                  : data?.role === 'trainer'
                  ? '/trainer/chatForTrainer'
                  : '/'
              }
              className="dropdown-item"
            >
              <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{' '}
              <span className="align-middle">Messages</span>
            </Link>
          </DropdownItem> */}

          {data?.role === 'admin' ? (
            <div>
              {/* <DropdownItem className="p-0">
                <Link href={''} className="dropdown-item">
                  <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{' '}
                  <span className="align-middle">Help</span>
                </Link>
              </DropdownItem> */}
              <div className="dropdown-divider"></div>
              {/* <DropdownItem className="p-0">
                <Link href="/admin/charges" className="dropdown-item">
                  <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{' '}
                  <span className="align-middle">
                    Charges :$<b>{totalCharges?.data?.total_charges}</b>
                  </span>
                </Link>
              </DropdownItem> */}
              <DropdownItem className="p-0">
                <Link href="/admin/settings" className="dropdown-item">
                  <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle me-2">Settings</span>
                  <span className="badge bg-success-subtle text-success mt-2">
                    New
                  </span>
                </Link>
              </DropdownItem>
            </div>
          ) : (
            ''
          )}

          <DropdownItem className="p-0">
            {data?.first_name && data?.last_name ? (
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
