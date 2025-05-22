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
            <small className="ms-3 text-primary">
              {data?.total_package_price ||
                data?.price * data?.duration.split('_')[0]}
            </small>
            <small className="text-capitalize">
              /{data?.duration.split('_').join(' ')}
            </small>
          </p>
        </div>

        <div className="pricing-lists">
          <ul>
            {data?.monthly_minimum_files > 0 ? (
              <li className="d-flex align-items-center gap-2">
                <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
                <span className="text-primary fw-semibold">
                  Minimum {data?.monthly_minimum_files} files per month
                </span>
              </li>
            ) : (
              ''
            )}

            {data?.yearly_bonus_minimum_files > 0 ? (
              <li className="d-flex align-items-center gap-2">
                <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
                <span className="text-primary fw-semibold">
                  Minimum {data?.yearly_bonus_minimum_files} files per year
                </span>
              </li>
            ) : (
              ''
            )}

            <li className="d-flex align-items-center gap-2">
              <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">
                Commission {data?.commission}%
              </span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
              <span className="text-primary fw-semibold">
                Commission deduction: automatic or manual
              </span>
            </li>

            {data?.yearly_bonus === true ? (
              <>
                <li className="d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
                  <span className="text-primary fw-semibold">
                    Annual performance bonus
                  </span>
                </li>
              </>
            ) : (
              <li className="d-flex align-items-center gap-2">
                <i className="ri-close-circle-fill text-danger fs-1"></i>
                <span className="text-primary fw-semibold">
                  Annual performance bonus
                </span>
              </li>
            )}

            {data?.family_trip === true ? (
              <>
                <li className="d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-fill fs-1 third-color"></i>
                  <span className="text-primary fw-semibold">
                    Family trip incentive
                  </span>
                </li>
              </>
            ) : (
              <li className="d-flex align-items-center gap-2">
                <i className="ri-close-circle-fill text-danger fs-1"></i>
                <span className="text-primary fw-semibold">
                  Family trip incentive
                </span>
              </li>
            )}

            {/* TRIP & BONUS DETAILS SHOW HERE */}

            {(data?.family_trip === true || data?.yearly_bonus === true) && (
              <div className="p-3 mt-3 border rounded bg-light text-dark shadow-sm">
                <h6 className="text-primary fw-bold mb-3 pt-2">
                  📝 Terms & Conditions
                </h6>
                <ul className="list-unstyled mb-0">
                  {data?.yearly_bonus === true && (
                    <li className="d-flex align-items-start gap-2 mb-2">
                      <i className="ri-checkbox-circle-fill fs-4 text-success mt-1"></i>
                      <small className="fw-medium text-dark">
                        Yearly Bonus Amount: <strong>৳1,50,000 BDT</strong>
                      </small>
                    </li>
                  )}
                  {data?.family_trip === true && (
                    <li className="d-flex align-items-start gap-2">
                      <i className="ri-checkbox-circle-fill fs-4 text-success mt-1"></i>
                      <small className="fw-medium text-dark">
                        Tour Condition: <em>{data?.family_trip_note}</em>
                      </small>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </ul>
        </div>
        {!selectPackage?._id ? (
          <div
            className="d-flex align-items-center justify-content-center button hstack fw-semibold p-3"
            onClick={() => handleSelectPackage(data?._id)}
            style={{ cursor: 'pointer' }}
          >
            Get Started
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
