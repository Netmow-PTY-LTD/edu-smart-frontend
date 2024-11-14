/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap';
import Pagination from '../common/Pagination';

const LatestTeams = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const dispatch = useDispatch();
  const data = [];
  return (
    <Col xl={6}>
      <Card>
        <CardHeader className="align-items-center d-flex ps-4 mb-1 py-5">
          <h4 className="card-title mb-0 flex-grow-1">Latest Registered Agents</h4>
        </CardHeader>

        <CardBody style={{ position: 'relative' }}>
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
                {((data.length > 0 && data) || [])
                  ?.slice(
                    currentPage * perPageData,
                    'data'?.length - currentPage * perPageData > perPageData
                      ? currentPage * perPageData + perPageData
                      : 'data'?.length
                  )
                  .map((item, key) => (
                    <tr key={key} className="align-middle">
                      <td>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-uppercase">
                            <Link
                              href={`/admin/team-profile/${item?._id}`}
                              className="text-reset fs-3 fw-medium"
                            >
                              {item?.name}
                            </Link>
                          </div>
                        </div>
                      </td>

                      <td>
                        <h5 className="fs-14  fw-normal text-uppercase">
                          {new Date(item?.createdAt).toDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                          {', '}
                          {new Date(item?.createdAt).toLocaleTimeString(
                            'en-GB',
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            }
                          )}
                        </h5>
                      </td>

                      <td>
                        <h5 className="fs-14  fw-normal text-center">
                          {item?.total_player ? item?.total_player : 0}
                        </h5>
                      </td>
                      <td>
                        <Link
                          href={`/admin/team-profile/${item?._id}`}
                          className=" button fs-3 text-light px-3 "
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
          
            data={'data'}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        </CardFooter>
      </Card>
    </Col>
  );
};

export default LatestTeams;
