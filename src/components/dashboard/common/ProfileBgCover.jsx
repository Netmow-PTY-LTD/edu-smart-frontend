import Image from 'next/image';
import React from 'react';
import { Col, Row } from 'reactstrap';
import profileBg from '../../../../public/assets/images/profile_bg.jpg';

const ProfileBgCover = ({ name, vanue }) => {
  return (
    <>
      <div className="profile-foreground position-relative mx-n5 mt-n5 pt-5">
        <div className="profile-wid-bg ">
          <Image src={profileBg} alt="" className="profile-wid-img " priority />
        </div>
      </div>
      <div className="ps-3 py-5 mb-lg-3 pb-lg-4">
        <Row className="g-4">
          <Col>
            <div className="p-2">
              <h1 className="text-white text-uppercase fs-24 mb-1">{name}</h1>
              <div className="text-white text-opacity-75 text-capitalize">
                <i className="ri-map-pin-user-line me-2 text-white fs-16 align-middle"></i>
                {vanue}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileBgCover;
