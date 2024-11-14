/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

import Pagination from '../common/Pagination';

const LatestRegisteredPlayer = ({ data, userInfoData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  return (
    <Card>
      <CardHeader className="align-items-center d-flex ps-4 mb-1 py-5">
        <h4 className="card-title mb-0 flex-grow-1">
          Latest Registered Universities
        </h4>
      </CardHeader>

      <CardBody
        style={{ position: 'relative' }}
        className="table-card-body-container"
      >
        <div className="table-responsive">
          <table className="table table-hover table-centered align-middle table-nowrap ">
            <thead className="fs-2">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {((data?.length > 0 && data) || [])
                ?.slice(
                  currentPage * perPageData,
                  data?.length - currentPage * perPageData > perPageData
                    ? currentPage * perPageData + perPageData
                    : data?.length
                )
                .map((item, key) => (
                  <tr key={key} className="align-middle">
                    <td>
                      <div className="d-flex py-0">
                        <div className="flex-shrink-0 ">
                          <Link
                            href={
                              userInfoData?.role === 'admin'
                                ? `/admin/player-profile/${item?._id}`
                                : userInfoData?.role === 'guardian'
                                  ? `/guardian/player-profile-for-guardian/${item?._id}`
                                  : {}
                            }
                            className="text-reset"
                          >
                            <Image
                              src={
                                item?.profile_image?.uploadedImage
                                  ? item?.profile_image?.uploadedImage
                                  : `${''}`
                              }
                              width={36}
                              height={36}
                              alt="User"
                              className="avatar-md p-1 rounded-5"
                            />
                          </Link>
                        </div>
                      </div>
                    </td>

                    <td>
                      <h5 className="fs-14  fw-medium ">
                        <Link
                          href={
                            userInfoData?.role === 'admin'
                              ? `/admin/player-profile/${item?._id}`
                              : userInfoData?.role === 'guardian'
                                ? `/guardian/player-profile-for-guardian/${item?._id}`
                                : {}
                          }
                          className="text-reset text-uppercase"
                        >
                          {`${item?.first_name || ''} ${''} ${
                            item?.last_name || ''
                          }`}
                        </Link>
                      </h5>
                    </td>

                    <td>
                      <h5 className="fs-14  fw-normal text-uppercase">
                        {item?.guardian?.first_name
                          ? item?.guardian?.first_name +
                            ' ' +
                            item?.guardian?.last_name
                          : item?.guardian
                            ? userInfoData.first_name +
                              ' ' +
                              userInfoData?.last_name
                            : ''}
                      </h5>
                    </td>

                    <td>
                      <span
                        className={`fs-5 fw-semibold text-uppercase badge  ${
                          item?.payment_status &&
                          item?.payment_status === 'paid'
                            ? 'bg-success-subtle text-success'
                            : 'bg-danger-subtle text-danger'
                        }`}
                      >
                        {item.payment_status === 'paid' ? 'Active' : 'InActive'}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={
                          userInfoData?.role === 'admin'
                            ? `/admin/player-profile/${item?._id}`
                            : userInfoData?.role === 'guardian'
                              ? `/guardian/player-profile-for-guardian/${item?._id}`
                              : ''
                        }
                        className=" button text-light fs-3 px-3 text-center"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {data?.length <= 0 && (
          <div className="empty-table-dialog-container">
            <span className="me-3">Don't found any Data.</span>
          </div>
        )}
      </CardBody>
      <CardFooter>
        <Pagination
          style={{ position: 'absolute', bottom: 0, right: 20 }}
          data={'data'}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPageData={perPageData}
        />
      </CardFooter>
    </Card>
  );
};

export default LatestRegisteredPlayer;
