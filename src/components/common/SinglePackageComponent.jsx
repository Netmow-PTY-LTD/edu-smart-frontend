import { userDummyImage } from '@/utils/common/data';
import Image from 'next/image';
import React from 'react';

const SinglePackageComponent = ({ togEditOpenModal }) => {
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
          <i className="ri-fire-fill text-danger fw-bold fs-1"></i>
          <span className="ms-2">Hot Offer 50% Extra Commission</span>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-3 gap-5">
          <h1 className="text-secondary-alt">{'Introducer Associate'}</h1>
          <div className="icon">
            <Image
              src={userDummyImage}
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
            <small className="ms-3 text-primary">0</small>
            <small>/Month</small>
          </p>
        </div>

        <div className="pricing-lists">
          <ul>
            <li className="d-flex align-items-center gap-2">
              <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">Commission 50%</span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">Minimum Files 5</span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">
                Auto Commission Deduct
              </span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <i class="ri-close-circle-fill text-danger fs-1"></i>
              <span className="text-primary fw-semibold">Yearly Bonus</span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <i class="ri-close-circle-fill text-danger fs-1"></i>
              <span className="text-primary fw-semibold">Family Trip</span>
            </li>
          </ul>
        </div>
        {togEditOpenModal ? (
          <div
            onClick={togEditOpenModal}
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