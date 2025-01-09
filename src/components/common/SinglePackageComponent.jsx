import { userDummyImage } from '@/utils/common/data';
import Image from 'next/image';
import React from 'react';

const SinglePackageComponent = ({ data, updatePackage }) => {
  console.log(data);
  return (
    <>
      <div className="sqdk-single-pricing-table position-relative">
        <div
          style={{
            position: 'absolute',
            top: '0',
          }}
          className="mt-2 me-2 text-danger text-center fw-bold"
        >
          {data?.hot_offer ? (
            <>
              <i className="ri-fire-fill text-danger fw-bold fs-1"></i>
              <span className="ms-2">{`Hot Offer ${data?.hot_offer?.offer_percentage}% Extra Commission`}</span>
            </>
          ) : (
            ''
          )}
        </div>
        <div className="d-flex align-items-center justify-content-between mt-3 gap-5">
          <h1 className="text-secondary-alt text-capitalize">{data?.name}</h1>
          <div className="icon">
            <Image
              src={
                typeof data?.icon?.url === 'string'
                  ? data?.icon?.url
                  : data?.icon?.url instanceof Blob
                    ? URL.createObjectURL(data?.icon?.url)
                    : userDummyImage
              }
              alt="alt-image"
              width={50}
              height={50}
              className="rounded-circle avatar-md img-thumbnail user-profile-image"
            />
          </div>
        </div>

        <div className="price">
          <p>
            <span>MYR</span>
            <small className="ms-3 text-primary">{data?.price}</small>
            <small className="text-capitalize">/{data?.duration}</small>
          </p>
        </div>

        <div className="pricing-lists">
          <ul>
            <li className="d-flex align-items-center gap-2">
              <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">
                Commission {data?.commission}%
              </span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">
                Minimum Files {data?.minimum_files}
              </span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">
                Auto Commission Deduct
              </span>
            </li>
            <li className="d-flex align-items-center gap-2">
              {data?.yearly_bonus === true ? (
                <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
              ) : (
                <i class="ri-close-circle-fill text-danger fs-1"></i>
              )}
              <span className="text-primary fw-semibold">Yearly Bonus</span>
            </li>
            <li className="d-flex align-items-center gap-2">
              {data?.family_trip === true ? (
                <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
              ) : (
                <i class="ri-close-circle-fill text-danger fs-1"></i>
              )}
              <span className="text-primary fw-semibold">Family Trip</span>
            </li>
          </ul>
        </div>
        {updatePackage ? (
          <div
            onClick={() => updatePackage(data?._id)}
            className="d-flex align-items-center justify-content-center button hstack py-2"
          >
            <span className="text-center">Edit Package</span>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center button hstack py-2">
            <span className="text-center fw-medium">Upgrade</span>
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePackageComponent;
