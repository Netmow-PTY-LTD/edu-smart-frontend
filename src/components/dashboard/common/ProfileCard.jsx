import Image from 'next/image';
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import dummyImg from '../../../../public/assets/images/users/user-dummy-img.jpg';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';

const ProfileCard = ({ data, role }) => {
  return (
    <>
      <Card className="mb-5">
        <CardTitle className="p-4">{role}</CardTitle>
        <CardBody className="mb-4">
          <div className="text-center">
            <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
              <Image
                src={data ? data?.profile_image?.uploadedImage : `${userDummyImage}`}
                width={60}
                height={60}
                className="avatar-xl rounded-circle  img-thumbnail user-profile-image"
                alt="user-profile"
              />
            </div>
            <h5 className="fs-16 mb-1 text-uppercase">
              {`${data?.first_name || ''} ${''} ${data?.last_name || ''}`}
            </h5>
            <span>{role}</span>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ProfileCard;
