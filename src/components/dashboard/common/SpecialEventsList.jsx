/* eslint-disable @next/next/no-img-element */
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import DeleteModal from './Modals/DeleteModal';
import EditEventsModal from './Modals/EditEventsModal';
import EventModalForm from './Modals/EventModalForm';
import Pagination from './Pagination';

const SpecialEventsList = ({
  Tog_edit_profileModal,
  edit_profileModal,
  setEdit_profileModal,
  allEventsData,
  TogEditEvents,
  tog_modal_delete,
  eventsId,
  editEvents,
  setEditEvents,
  teamList,
  modal_delete,
  handleDelete,
  forTeam,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const { data: userInfoData, isLoading: userInfoIsLoading } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  return (
    <>
      <Row>
        <Col xl={12} className="pt-4">
          <Card>
            <CardHeader className="align-items-center d-flex">
              <div className="col-sm pe-3">
                <div className="d-flex justify-content-sm-start">
                  <h4 className="card-title mb-0 flex-grow-1 ps-2">
                    Special Events
                  </h4>
                </div>
              </div>
              {userInfoData?.role === 'admin' && forTeam === 'no' ? (
                <div className="col-sm-auto ">
                  <div>
                    <button
                      onClick={Tog_edit_profileModal}
                      type="button"
                      className="button p-3 m-3 text-light"
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add New
                    </button>
                    <EventModalForm
                      title="Add Special Event"
                      btn="Add"
                      specialEvents="yes"
                      isOpen={edit_profileModal}
                      toggle={Tog_edit_profileModal}
                      setEdit_profileModal={setEdit_profileModal}
                    />
                  </div>
                </div>
              ) : (
                ''
              )}
            </CardHeader>

            <CardBody
              style={{ position: 'relative' }}
              className="table-card-body-container"
            >
              <div className="table-responsive table-card mb-5">
                <table className="table table-hover table-centered align-middle table-nowrap ">
                  <thead className="fs-2">
                    <tr>
                      <th scope="col" className="py-4">
                        Event Name
                      </th>
                      <th scope="col" className="py-4">
                        Date
                      </th>
                      <th scope="col" className="py-4">
                        Location
                      </th>
                      {/* <th scope="col" className="py-4">
                                  Status
                                </th> */}
                      <th scope="col" className="py-4">
                        Status
                      </th>

                      {userInfoData?.role === 'admin' && forTeam === 'no' ? (
                        <th scope="col" className="py-4">
                          Action
                        </th>
                      ) : userInfoData?.role === 'guardian' ? (
                        // <th scope="col" className="py-4">
                        //   Action
                        // </th>
                        ''
                      ) : userInfoData?.role === 'player' ? (
                        // <th scope="col" className="py-4">
                        //   Action
                        // </th>
                        ''
                      ) : userInfoData?.role === 'manager' ? (
                        ''
                      ) : userInfoData?.role === 'trainer' ? (
                        ''
                      ) : (
                        ''
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {allEventsData?.length > 0 &&
                      allEventsData
                        ?.slice(
                          currentPage * perPageData,
                          allEventsData?.length - currentPage * perPageData >
                            perPageData
                            ? currentPage * perPageData + perPageData
                            : allEventsData?.length
                        )
                        ?.map((item, key) => (
                          <tr key={key}>
                            <td>
                              <div className="d-flex align-items-center py-0">
                                {userInfoData?.role === 'admin' ||
                                userInfoData?.role === 'guardian' ||
                                userInfoData?.role === 'player' ||
                                userInfoData?.role === 'manager' ||
                                userInfoData?.role === 'trainer' ? (
                                  <Link
                                    href={
                                      userInfoData?.role === 'admin'
                                        ? `/admin/special-event-profile/${item?.event_id?._id || item?._id}`
                                        : userInfoData?.role === 'guardian'
                                          ? `/guardian/special-events-profile-for-guardian/${item?.event_id?._id || item?._id}`
                                          : userInfoData?.role === 'player'
                                            ? `/player/special-events-profile-for-player/${item?.event_id?._id || item?._id}`
                                            : userInfoData?.role === 'manager'
                                              ? `/manager/special-events-profile-for-manager/${item?.event_id?._id || item?._id}`
                                              : userInfoData?.role === 'trainer'
                                                ? `/trainer/special-events-profile-for-trainer/${item?.event_id?._id || item?._id}`
                                                : ''
                                    }
                                    className="text-reset text-uppercase"
                                  >
                                    <img
                                      src={
                                        item?.event_id?.image?.uploadedImage
                                          ? item?.event_id?.image?.uploadedImage
                                          : item?.image?.uploadedImage
                                            ? item?.image?.uploadedImage
                                            : `${userDummyImage}`
                                      }
                                      height={500}
                                      width={500}
                                      alt="User"
                                      className="avatar-lg p-3 rounded-circle"
                                    />

                                    {item?.event_id?.event_name ||
                                      item?.event_name}
                                  </Link>
                                ) : (
                                  <div>
                                    <div className="flex-shrink-0 me-2">
                                      <img
                                        src={
                                          item?.event_id?.image
                                            ? item?.event_id?.image
                                                ?.uploadedImage
                                            : item?.image?.uploadedImage
                                              ? item?.image?.uploadedImage
                                              : `${userDummyImage}`
                                        }
                                        height={500}
                                        width={500}
                                        alt="User"
                                        className="avatar-lg p-3 rounded-circle"
                                      />

                                      {item?.event_id?.event_name ||
                                        item?.event_name}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>

                            <td>
                              {(item?.event_id?.date?.length > 0 &&
                                item?.event_id?.date
                                  .filter(
                                    (d) =>
                                      new Date(d?.date).setHours(0, 0, 0, 0) >=
                                      new Date().setHours(0, 0, 0, 0)
                                  )
                                  .map((d, i) => (
                                    <h5
                                      key={i}
                                      className="fs-14 my-1 fw-normal"
                                    >
                                      {`${new Date(d?.date).toLocaleDateString()} - ${new Date(
                                        `2000-01-01T${d?.start_time}:00`
                                      ).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                      })} To ${new Date(
                                        `2000-01-01T${d?.end_time}:00`
                                      ).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                      })}`}
                                    </h5>
                                  ))) ||
                                (item?.game_id?.date?.length > 0 &&
                                  item?.game_id?.date
                                    .filter(
                                      (d) =>
                                        new Date(d?.date).setHours(
                                          0,
                                          0,
                                          0,
                                          0
                                        ) >= new Date().setHours(0, 0, 0, 0)
                                    )
                                    .map((d, i) => (
                                      <h5
                                        key={i}
                                        className="fs-14 my-1 fw-normal"
                                      >
                                        {`${new Date(d?.date).toLocaleDateString()} - ${new Date(
                                          `2000-01-01T${d?.start_time}:00`
                                        ).toLocaleString('en-US', {
                                          hour: 'numeric',
                                          minute: 'numeric',
                                          hour12: true,
                                        })} To ${new Date(
                                          `2000-01-01T${d?.end_time}:00`
                                        ).toLocaleString('en-US', {
                                          hour: 'numeric',
                                          minute: 'numeric',
                                          hour12: true,
                                        })}`}
                                      </h5>
                                    ))) ||
                                (item?.date?.length > 0 &&
                                  item?.date
                                    .filter(
                                      (d) =>
                                        new Date(d?.date).setHours(
                                          0,
                                          0,
                                          0,
                                          0
                                        ) >= new Date().setHours(0, 0, 0, 0)
                                    )
                                    .map((d, i) => (
                                      <h5
                                        key={i}
                                        className="fs-14 my-1 fw-normal"
                                      >
                                        {`${new Date(d?.date).toLocaleDateString()} - ${new Date(
                                          `2000-01-01T${d?.start_time}:00`
                                        ).toLocaleString('en-US', {
                                          hour: 'numeric',
                                          minute: 'numeric',
                                          hour12: true,
                                        })} To ${new Date(
                                          `2000-01-01T${d?.end_time}:00`
                                        ).toLocaleString('en-US', {
                                          hour: 'numeric',
                                          minute: 'numeric',
                                          hour12: true,
                                        })}`}
                                      </h5>
                                    )))}
                            </td>

                            <td>
                              <h5 className="fs-14 my-1 fw-normal text-uppercase">
                                {item?.event_id?.event_vanue ||
                                  item?.event_vanue ||
                                  item?.event_venue}
                              </h5>
                            </td>
                            <td>
                              <h5 className="fs-14 my-1 fw-semibold text-uppercase">
                                {item.status && item.status ? item.status : ' '}
                              </h5>
                            </td>

                            {userInfoData?.role === 'admin' &&
                            forTeam === 'no' ? (
                              <td>
                                <div className="d-flex justify-content-start">
                                  <UncontrolledDropdown
                                    className="me-2"
                                    direction="end"
                                  >
                                    <DropdownToggle
                                      tag="a"
                                      className="text-reset"
                                      role="button"
                                    >
                                      <span className="button px-3 py-1 text-light">
                                        <i className="ri-more-fill align-middle"></i>
                                      </span>
                                    </DropdownToggle>
                                    <DropdownMenu className="ms-2">
                                      <DropdownItem>
                                        <div
                                          onClick={() =>
                                            TogEditEvents(item?._id)
                                          }
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
                            ) : userInfoData?.role === 'guardian' ? (
                              // <td>
                              //   <h5 className=" my-1 fw-normal text-uppercase">
                              //     <Link
                              //       // href={`/guardian/checkout-for-guardian/${item?._id}`}
                              //       href=""
                              //       type="button"
                              //       className="third-btn fs-3"
                              //     >
                              //       <span className="d-flex align-items-center justify-content-center text-center mt-1">
                              //         Join
                              //       </span>
                              //     </Link>
                              //   </h5>
                              // </td>
                              ''
                            ) : userInfoData?.role === 'player' ? (
                              // <td>
                              //   <h5 className=" my-1 fw-normal text-uppercase">
                              //     <Link
                              //       // href={`/player/checkout/${item?._id}`}
                              //       href=""
                              //       type="button"
                              //       className="third-btn fs-3"
                              //     >
                              //       <span className="d-flex align-items-center justify-content-center text-center mt-1">
                              //         Join
                              //       </span>
                              //     </Link>
                              //   </h5>
                              // </td>
                              ''
                            ) : userInfoData?.role === 'manager' ? (
                              ''
                            ) : userInfoData?.role === 'trainer' ? (
                              ''
                            ) : (
                              ''
                            )}
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
              {/* edit  */}
              <div>
                <EditEventsModal
                  id={eventsId}
                  editEvents={editEvents}
                  setEditEvents={setEditEvents}
                  teamList={teamList}
                />
              </div>

              {/* Delete Modal */}
              {
                <DeleteModal
                  Open={modal_delete}
                  close={tog_modal_delete}
                  handleDelete={handleDelete}
                  id={eventsId}
                />
              }

              {allEventsData?.length <= 0 && (
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
                data={allEventsData}
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

export default SpecialEventsList;
