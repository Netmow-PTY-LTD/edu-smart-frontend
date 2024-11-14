/* eslint-disable @next/next/no-img-element */
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap';
import Pagination from './Pagination';

const RSVPlist = ({ data, title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  return (
    <>
      <Col xl={4} className="pt-4">
        <Card>
          <CardHeader className="align-items-center d-flex">
            <div className="col-sm pe-3">
              <div className="d-flex justify-content-sm-start">
                <h4 className="card-title mb-0 flex-grow-1 ps-2">{title}</h4>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="table-responsive table-card mb-5">
              <table className="table table-hover table-centered align-middle table-nowrap ">
                <thead className="fs-2">
                  <tr>
                    <th scope="col" className="py-4">
                      Name
                    </th>
                    {/* <th scope="col" className="py-4">
                          Name
                        </th> */}

                    <th scope="col" className="py-4">
                      User Type
                    </th>
                    <th scope="col" className="py-4">
                      Status
                    </th>
                    {/* <th scope="col" className="py-4">
                      Actions
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 &&
                    data
                      ?.slice(
                        currentPage * perPageData,
                        data?.length - currentPage * perPageData > perPageData
                          ? currentPage * perPageData + perPageData
                          : data?.length
                      )
                      .map((item, key) => (
                        <tr key={'key'}>
                          <td>
                            <div className="d-flex align-items-center py-3">
                              <div>
                                {/* <Link */}
                                {/* href={'/admin/player-profile'}
                                  className="text-reset"
                                > */}
                                <img
                                  src={
                                    item?.user_id?.profile_image?.uploadedImage
                                      ? item?.user_id?.profile_image
                                          ?.uploadedImage
                                      : `${userDummyImage}`
                                  }
                                  alt="User"
                                  className="avatar-sm rounded me-4"
                                />
                                <span className="fs-14 fw-medium text-uppercase">
                                  {item?.user_id?._id
                                    ? item?.user_id?.first_name +
                                      ' ' +
                                      item?.user_id?.last_name
                                    : 'N/A'}
                                </span>
                                {/* </Link> */}
                              </div>
                            </div>
                          </td>

                          <td>
                            <h5 className="fs-14 my-1 fw-normal text-uppercase fw-semibold">
                              {item?.user_role}
                            </h5>
                          </td>

                          <td>
                            <h5
                              className={`fs-14 my-1 fw-normal badge text-uppercase ${
                                item?.status === 'going'
                                  ? 'bg-light-subtle text-success'
                                  : item?.status === 'not going'
                                    ? 'bg-light-subtle text-danger'
                                    : item?.status === 'no decision'
                                      ? 'bg-light-subtle text-secondary'
                                      : ''
                              }`}
                            >
                              {item?.status}
                            </h5>
                          </td>

                          {/* <td>
                            <h5
                              onClick={''}
                              className="close-btn fs-4 my-1 fw-normal"
                            >
                              <i className="ri-delete-bin-fill align-start me-2 "></i>
                              Delete
                            </h5>
                          </td> */}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {data?.length <= 0 && (
              <div className="empty-table-dialog-container">
                <span className="">{"Don't found any Player."} </span>
              </div>
            )}
          </CardBody>
          <CardFooter>
            <Pagination
              style={{
                position: 'absolute',
                bottom: 0,
                right: 20,
              }}
              data={data}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
            />
          </CardFooter>
        </Card>
      </Col>
    </>
  );
};

export default RSVPlist;
