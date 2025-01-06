import Link from 'next/link';
import React from 'react';
import CountUp from 'react-countup';
import { Card, CardBody } from 'reactstrap';

const SingleCountCard = ({ data }) => {
  return (
    <>
      <Card className="card-animate p-4">
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1 overflow-hidden">
              <p className="fs-2 text-uppercase fw-medium text-primary text-truncate mb-0 ">
                {data?.label}
              </p>
            </div>
          </div>
          <div className="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 className="fs-18 fw-semibold ff-secondary my-3 text-black">
                <span className="counter-value">
                  <CountUp
                    start={data?.start}
                    prefix={data?.prefix}
                    suffix={data?.suffix}
                    end={data?.end}
                    decimals={data?.decimals}
                    duration={data?.counter}
                  />
                </span>
              </h4>

              <Link
                href={data?.pathName ? data?.pathName : '#'}
                className="text-decoration-underline text-primary"
              >
                {data?.link}
              </Link>
            </div>
            <div className="avatar-sm flex-shrink-0">
              <span
                style={{
                  fontSize: 35,
                }}
              >
                <i className={`${data?.icon} third-color`}></i>
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default SingleCountCard;
