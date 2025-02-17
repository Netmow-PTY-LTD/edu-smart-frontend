import { userDummyImage } from '@/utils/common/data';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const PackagesMain = ({
  data,
  selectPackage,
  setSelectPackage,
  updatePackage,
  handleUpgrade,
  style,
  unselectedPackage,
}) => {
  const router = useRouter();
  const handleSelectPackage = (id) => {
    setSelectPackage(id);
    router.push(`/auth/register?packageId=${id}`);
  };

  return (
    <>
      <div
        style={style}
        className="sqdk-single-pricing-table position-relative"
      >
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
          <h1 className="text-secondary-alt text-capitalize text-nowrap">
            {data?.name}
          </h1>
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
              <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">
                Commission {data?.commission}%
              </span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">
                Minimum Files {data?.minimum_files}
              </span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">
                Auto Commission Deduct
              </span>
            </li>
            <li className="d-flex align-items-center gap-2">
              {data?.yearly_bonus === true ? (
                <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
              ) : (
                <i className="ri-close-circle-fill text-danger fs-1"></i>
              )}
              <span className="text-primary fw-semibold">Yearly Bonus</span>
            </li>
            <li className="d-flex align-items-center gap-2">
              {data?.family_trip === true ? (
                <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
              ) : (
                <i className="ri-close-circle-fill text-danger fs-1"></i>
              )}
              <span className="text-primary fw-semibold">Family Trip</span>
            </li>
          </ul>
        </div>
        {!selectPackage?._id ? (
          <div
            className="d-flex align-items-center justify-content-center button hstack fw-semibold p-3"
            onClick={() => handleSelectPackage(data?._id)}
            style={{ cursor: 'pointer' }}
          >
            Select a Package
          </div>
        ) : selectPackage?._id == data._id ? (
          <div className="px-3 py-1 rounded-3 fw-semibold text-primary bg-info-subtle">
            Currently Using This Package
          </div>
        ) : unselectedPackage ? (
          <div className="bg-danger-subtle px-3 py-1 rounded-3 fw-semibold text-danger">
            Can't Downgrade This Package
          </div>
        ) : (
          <Link
            href="/dashboard/agent/upgrade"
            className="d-flex align-items-center justify-content-center button hstack py-2"
          >
            <span className="text-center fw-medium">Upgrade</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default PackagesMain;
