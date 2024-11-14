import React from 'react';
import profileBg from '../../../../public/assets/images/profile_bg.jpg';

import { teamDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import { Col, Row } from 'reactstrap';

const CoverBgWithPicture = ({ data }) => {
  return (
    <>
      <div className="profile-foreground position-relative mx-n5 mt-n5 pt-5">
        <div className="profile-wid-bg ">
          <Image src={profileBg} alt="" className="profile-wid-img " />
        </div>
      </div>
      <div className="ps-3 py-5 mb-lg-3 pb-lg-4">
        <Row className="g-4">
          <div className="col-auto">
            <div className="avatar-xl">
              <Image
                src={
                  data?.image?.uploadedImage
                    ? data?.image?.uploadedImage
                    : `${teamDummyImage}`
                }
                alt="user-img"
                height={60}
                width={60}
                className="img-thumbnail avatar-xl rounded-circle"
              />
            </div>
          </div>

          <Col>
            <div className="p-2">
              <h1 className="text-white text-uppercase fs-22 mb-1">
                {data?.name}
              </h1>
              <div className="me-2 text-light">
                <p className="text-white text-opacity-75">
                  <i className="ri-user-line me-2 align-middle"></i>Team
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CoverBgWithPicture;
