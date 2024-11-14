import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import guardianImg from '../../../../public/assets/images/users/avatar-8.jpg';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';

const GuardianInfoCard = ({ data, userInfoData }) => {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="fw-semibold mb-3">Guardian</CardTitle>
          <div className="table-responsive ">
            <div className="pt-4 py-5 mb-lg-3 pb-lg-4">
              <div className="d-flex align-items-center gap-4">
                <Image
                  src={
                    data?.guardian?.profile_image
                      ? data?.guardian?.profile_image?.uploadedImage
                      : `${userDummyImage}`
                  }
                  height={60}
                  width={60}
                  alt="user-img"
                  className="img-thumbnail avatar-lg rounded-circle "
                />

                <h2 className="text-Primary fw-semibold text-uppercase fs-2 mb-1 ">
                  {data?.guardian?.first_name
                    ? data?.guardian?.first_name +
                      ' ' +
                      data?.guardian?.last_name
                    : ''}
                </h2>
              </div>
              <div className="pt-5">
                <h3 className="fs-2">Email : {data?.guardian?.email}</h3>
                <p className="fs-2">Phone : {data?.guardian?.phone}</p>
                {userInfoData?.role === 'player' ? (
                  ''
                ) : (
                  <div className="d-flex justify-content-center mt-3">
                    {data?.guardian ? (
                      <Link
                        href={`/admin/guardian-profile/${data?.guardian?._id}`}
                        className="button text-center text-light px-3 py-2 w-100"
                      >
                        View Profile
                      </Link>
                    ) : (
                      ''
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default GuardianInfoCard;
