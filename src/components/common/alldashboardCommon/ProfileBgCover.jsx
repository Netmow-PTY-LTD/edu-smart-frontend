import React from 'react';

import {
  profileBg,
  userDummyImage,
} from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import { Col, Row } from 'reactstrap';

const ProfileBgCover = ({ profileData }) => {
  return (
    <>
      <div className="profile-foreground position-relative mx-n5 mt-n5 pt-5">
        <div className="profile-wid-bg">
          <Image src={profileBg} alt="" className="profile-wid-img" />
        </div>
      </div>
      <div className="ps-3 py-5 mb-lg-3 pb-lg-4">
        <Row className="g-4">
          <div className="col-auto">
            <div>
              <Image
                src={
                  profileData?.logo?.url
                    ? profileData?.logo?.url
                    : `${userDummyImage}`
                }
                height={40}
                width={60}
                alt="user-img"
                className="img-thumbnail avatar-lg rounded-circle"
              />
            </div>
          </div>

          <Col>
            <div className="p-2">
              <h1 className="text-white text-uppercase fs-1 mb-1">
                {profileData?.name ? profileData?.name : ''}
              </h1>
              <div className="me-2 text-light text-capitalize">
                <i className="ri-map-pin-fill me-2 align-middle"></i>
                {profileData?.city ? profileData?.city + ',' : ''}{' '}
                {profileData?.country ? profileData?.country : ''}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileBgCover;
