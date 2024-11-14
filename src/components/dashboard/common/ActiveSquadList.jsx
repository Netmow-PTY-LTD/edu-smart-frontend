import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import Pagination from './Pagination';

const ActiveSquadList = ({ tog_setSelect_modal, userInfoData, data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  return (
    <>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <div className="col-sm pe-3 my-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">
                Active Players
              </h4>
            </div>
          </div>
          {/* {userInfoData?.role === 'admin' ? (
            <div className="col-sm-auto ">
              <div>
                <button
                  onClick={tog_setSelect_modal}
                  type="button"
                  className="button px-3 py-2 m-3 text-light"
                >
                  <i className="ri-add-line align-bottom me-1"></i> Assign
                  Player
                </button>
              </div>
            </div>
          ) : (
            ''
          )} */}
        </CardHeader>
        <CardBody style={{ position: 'relative' }}>
          <div className="table-responsive table-card mb-5">
            <table className="table table-hover table-centered align-middle table-nowrap ">
              <thead className="fs-2">
                <tr>
                  {/* <th scope="col" className="py-4">
                    Image
                  </th> */}
                  <th scope="col" className="py-4">
                    Name
                  </th>

                  <th scope="col" className="py-4">
                    Gender
                  </th>
                  <th scope="col" className="py-4">
                    Status
                  </th>
                  {/* {userInfoData?.role === 'admin' ? (
                    <th scope="col" className="py-4">
                      Actions
                    </th>
                  ) : (
                    ''
                  )} */}
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
                    ?.map((item, key) => (
                      <tr key={key}>
                        <td>
                          <div className="d-flex align-items-center py-4">
                            <div>
                              {/* <Link href="#" className="text-reset"> */}
                              <Image
                                src={
                                  item?.profile_image?.uploadedImage
                                    ? item?.profile_image?.uploadedImage
                                    : `${userDummyImage}`
                                }
                                height={500}
                                width={500}
                                alt="User"
                                className="avatar-md rounded-circle me-5"
                              />
                              {/* </Link> */}
                            </div>
                            <h5 className="fs-14 my-1 fw-normal text-uppercase">
                              {' '}
                              {`${item?.first_name || ''} ${''} ${
                                item?.last_name || ''
                              }`}
                            </h5>
                          </div>
                        </td>
                        {/* <td>
                          <Link
                            href="/admin/player-profile"
                            className="text-reset"
                          >
                          <h5 className="fs-14 my-1 fw-normal text-uppercase">
                            {' '}
                            {`${item?.first_name || ''} ${''} ${
                              item?.last_name || ''
                            }`}
                          </h5>
                          </Link>
                        </td> */}
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">
                            {item?.gender}
                          </h5>
                        </td>

                        <td>
                          <h5 className="fs-14 my-1 fw-normal badge bg-light-subtle text-success ">
                            {item?.status}
                          </h5>
                        </td>
                        {/* {userInfoData?.role === 'admin' ? (
                          <td>
                            <div className="flex-shrink-0">
                              <UncontrolledDropdown className="card-header-dropdown">
                                <DropdownToggle
                                  tag="a"
                                  className="text-reset dropdown-btn"
                                  role="button"
                                >
                                  <span className="button px-3 py-1 text-light">
                                    <i className="ri-more-fill align-middle"></i>
                                  </span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                  <DropdownItem>
                                    <i className="ri-delete-bin-fill align-start me-2 text-muted"></i>
                                    Remove
                                  </DropdownItem>
                                  <DropdownItem>
                                    <i className="ri-file-add-line align-bottom me-2 text-muted"></i>
                                    Move to inactive
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </td>
                        ) : (
                          ''
                        )} */}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {data?.length <= 0 && (
            <div className="empty-table-dialog-container">
              <span className="">{"Don't found any active player."}</span>
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
    </>
  );
};

export default ActiveSquadList;
