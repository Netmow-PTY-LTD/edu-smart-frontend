import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import Pagination from './Pagination';

const EndedSpecialEvents = ({
  endedEventsData,
  currentPage,
  perPageData,
  TogEditEvents,
  tog_modal_delete,
  setCurrentPage,
}) => {
  return (
    <>
      <Row>
        <Col xl={12} className="pt-4">
          <Card>
            <CardHeader className="align-items-center d-flex py-5">
              <div className="col-sm pe-3">
                <div className="d-flex justify-content-sm-start">
                  <h4 className="card-title mb-0 flex-grow-1 ps-2">
                    Ended Special Events
                  </h4>
                </div>
              </div>
            </CardHeader>

            <CardBody style={{ position: 'relative' }}>
              <div className="table-responsive table-card mb-5">
                <table className="table table-hover table-centered align-middle table-nowrap ">
                  <thead className="fs-2">
                    <tr>
                      <th scope="col" className="py-4">
                        Image
                      </th>
                      <th scope="col" className="py-4">
                        Event Name
                      </th>
                      <th scope="col" className="py-4">
                        Starts - Ends (Date)
                      </th>
                      <th scope="col" className="py-4">
                        Location
                      </th>
                      {/* <th scope="col" className="py-4">
                                  Status
                                </th> */}
                      <th scope="col" className="py-4">
                        Going
                      </th>
                      <th scope="col" className="py-4">
                        Not Going
                      </th>
                      <th scope="col" className="py-4">
                        No Decision
                      </th>
                      <th scope="col" className="py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {((endedEventsData?.length > 0 && endedEventsData) || [])
                      ?.slice(
                        currentPage * perPageData,
                        endedEventsData?.length - currentPage * perPageData >
                          perPageData
                          ? currentPage * perPageData + perPageData
                          : endedEventsData?.length
                      )
                      ?.map((item, key) => (
                        <tr key={key}>
                          <td>
                            <div className="d-flex align-items-center py-0">
                              <div className="flex-shrink-0 me-4">
                                <Image
                                  src={
                                    item?.image?.uploadedImage
                                      ? item?.image?.uploadedImage
                                      : `${userDummyImage}`
                                  }
                                  width={50}
                                  height={50}
                                  alt="User"
                                  className="avatar-lg p-3 rounded-circle"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-medium text-reset text-uppercase">
                              {item?.event_name}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {item?.starts} - {item?.ends}
                            </h5>
                          </td>

                          <td>
                            <h5 className="fs-14 my-1 fw-normal text-uppercase">
                              {item?.event_vanue}
                            </h5>
                          </td>
                          {/* <td>
                                      <h5 className="fs-14 my-1 fw-semibold badge bg-success-subtle text-success ">
                                        {item.status && item.status
                                          ? item.status
                                          : 'N/A'}
                                      </h5>
                                    </td> */}
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {item?.going && item?.going ? item?.going : 'N/A'}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {item?.notGoing && item?.notGoing
                                ? item?.notGoing
                                : 'N/A'}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {item?.no && item?.no ? item?.no : 'N/A'}
                            </h5>
                          </td>

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
                                    <div
                                      onClick={() => TogEditEvents(item?._id)}
                                      className=" text-primary p-2"
                                    >
                                      <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                      Edit
                                    </div>
                                  </DropdownItem>

                                  <DropdownItem>
                                    <div
                                      onClick={() =>
                                        tog_modal_delete(item?._id)
                                      }
                                      className=" text-primary p-2"
                                    >
                                      <i className="ri-delete-bin-fill align-start me-2 text-muted"></i>
                                      Delete
                                    </div>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {endedEventsData?.length <= 0 && (
                <div className="empty-table-dialog-container">
                  <span className="">
                    {"Don't found any Upcoming Special Events."}
                  </span>
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
                data={endedEventsData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPageData={perPageData}
              />
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EndedSpecialEvents;
