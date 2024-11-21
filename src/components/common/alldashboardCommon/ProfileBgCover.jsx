import React from 'react';

import {
  profileBg,
  userDummyImage,
} from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import { Col, Row } from 'reactstrap';

const ProfileBgCover = ({ singlePlayerData }) => {
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
                  singlePlayerData?.profile_image?.uploadedImage
                    ? singlePlayerData?.profile_image?.uploadedImage
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
                {singlePlayerData?.first_name +
                  ' ' +
                  singlePlayerData?.last_name}
              </h1>
              <div className="me-2 text-light text-capitalize">
                <i className="ri-user-line me-2 align-middle"></i>
                {singlePlayerData?.role}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileBgCover;
