import LoaderSpiner from '@/components/constants/Loader/Loader';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import DeleteModal from './Modals/DeleteModal';
import EditSeasonalGame from './Modals/EditSeasonalGame';
import SeasonalGameModalForm from './Modals/SeasonalGameModal';
import SuccessModel from './Modals/SuccessModel';
import PlayerSelectForEvents from './Modals/playerSelectForEvents';
import Pagination from './Pagination';

const SeasonalGameList = ({
  data,
  isLoading,
  togAddNewModal,
  addNewModal,
  setAddNewModal,
  togEditModal,
  togDeleteModal,
  editModal,
  setEditModal,
  seasonalGameId,
  deleteModal,
  handleDelete,
  forTeam,
  setOpenModal,
  openModal,
  togOpenModal,
  playerList,
  gameId,
  invoiceData,
  guardianProfile,
  Tog_add_success_modal,
  redirectToInvoice,
  setAdd_success_modal,
  add_success_modal,
  id,
  adminInfoData,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  const { data: userInfoData, isLoading: userInfoIsLoading } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  useEffect(() => {
    if (router.query.createevents === 'true') {
      togAddNewModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.createevents]);

  return (
    <>
      {isLoading ? (
        <LoaderSpiner />
      ) : (
        <Card>
          <CardHeader className="align-items-center d-flex">
            <div className="col-sm pe-3">
              <div className="d-flex justify-content-sm-start my-3">
                <h4 className="card-title mb-0 flex-grow-1 ps-2">
                  All Seasonal Game List
                </h4>
              </div>
            </div>
            {userInfoData?.role === 'admin' && forTeam === 'no' ? (
              <div className="col-sm-auto ">
                <div>
                  <button
                    onClick={togAddNewModal}
                    type="button"
                    className="button p-3 m-3 text-light"
                    id="addneweventsbtn"
                  >
                    <i className="ri-add-line align-bottom me-1"></i> Add New
                  </button>
                  {/* add event modal  */}
                  <SeasonalGameModalForm
                    title={'Add Seasonal Game'}
                    btn={'Add'}
                    isOpen={addNewModal}
                    toggle={togAddNewModal}
                    setEvent_modal={setAddNewModal}
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
                      Name
                    </th>
                    <th scope="col" className="py-4">
                      Date
                    </th>
                    <th scope="col" className="py-4">
                      Location
                    </th>
                    <th scope="col" className="py-4">
                      Fees
                      {/* ({registrationFee?.data?.currency}) */}
                    </th>
                    {userInfoData?.role === 'admin' && forTeam === 'no' ? (
                      <th scope="col" className="py-4">
                        Action
                      </th>
                    ) : userInfoData?.role === 'guardian' ? (
                      <th scope="col" className="py-4">
                        Action
                      </th>
                    ) : userInfoData?.role === 'player' && forTeam === 'no' ? (
                      <th scope="col" className="py-4">
                        Action
                      </th>
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
                  {data?.length > 0 &&
                    data
                      ?.slice(
                        currentPage * perPageData,
                        data?.length - currentPage * perPageData > perPageData
                          ? currentPage * perPageData + perPageData
                          : data?.length
                      )
                      .map((item, key) => (
                        <tr key={key}>
                          <td>
                            <div className="d-flex align-items-center py-4">
                              <div>
                                <h5 className="fs-14 my-1 fw-medium text-uppercase">
                                  {userInfoData?.role === 'admin' ||
                                  userInfoData?.role === 'guardian' ||
                                  userInfoData?.role === 'player' ||
                                  userInfoData?.role === 'manager' ||
                                  userInfoData?.role === 'trainer' ? (
                                    <Link
                                      href={
                                        userInfoData?.role === 'admin'
                                          ? `/admin/seasonal-games-profile/${
                                              item?.game_id?._id || item?._id
                                            }`
                                          : userInfoData?.role === 'guardian'
                                            ? `/guardian/seasonal-game-profile-for-guardian/${item?.game_id?._id || item?._id}`
                                            : userInfoData?.role === 'player'
                                              ? `/player/seasonal-game-profile-for-player/${item?.game_id?._id || item?._id}`
                                              : userInfoData?.role === 'manager'
                                                ? `/manager/seasonal-game-profile-for-manager/${item?.game_id?._id || item?._id}`
                                                : userInfoData?.role ===
                                                    'trainer'
                                                  ? `/trainer/seasonal-game-profile-for-trainer/${item?.game_id?._id || item?._id}`
                                                  : ''
                                      }
                                      className="text-reset"
                                    >
                                      {item?.name || item?.event_name}
                                    </Link>
                                  ) : (
                                    item?.name || item?.event_name
                                  )}
                                </h5>
                              </div>
                            </div>
                          </td>
                          <td>
                            {(item?.game_id?.date?.length > 0 &&
                              item?.game_id?.date
                                .filter(
                                  (d) =>
                                    new Date(d?.date).setHours(0, 0, 0, 0) >=
                                    new Date().setHours(0, 0, 0, 0)
                                )
                                .map((d, i) => (
                                  <h5 key={i} className="fs-14 my-1 fw-normal">
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
                                  )))}
                          </td>

                          <td>
                            <h5 className="fs-14 my-1 fw-normal text-uppercase">
                              {item?.vanue || item?.event_venue}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1  fw-normal badge bg-success-subtle text-success ">
                              {item?.fees || item?.event_fees}
                              {/* <i className="ri-arrow-right-line align-middle"></i> */}
                            </h5>
                          </td>
                          {guardianProfile &&
                          item?.user_id?.payment_status === 'unpaid' ? (
                            <td>
                              <button
                                type="button"
                                onClick={() =>
                                  Tog_add_success_modal(item?.user_id?._id)
                                }
                                className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                              >
                                Pay Now
                              </button>
                            </td>
                          ) : (
                            guardianProfile &&
                            item?.user_id?.payment_status ===
                              'unpaid'(
                                <Link
                                  href={''}
                                  type="button"
                                  className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                                >
                                  View
                                </Link>
                              )
                          )}
                          {userInfoData?.role === 'admin' &&
                          forTeam === 'no' ? (
                            <td>
                              <div className="d-flex justify-content-start">
                                <UncontrolledDropdown
                                  className="me-2 dropdown"
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
                                      <Link
                                        href={`/admin/seasonal-games-profile/${item?._id}`}
                                      >
                                        <i className="ri-eye-fill align-start me-2 text-muted"></i>
                                        View
                                      </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                      <div
                                        onClick={() => togEditModal(item?._id)}
                                      >
                                        <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                        Edit
                                      </div>
                                    </DropdownItem>
                                    <DropdownItem>
                                      <div
                                        type="button"
                                        onClick={() =>
                                          togDeleteModal(item?._id)
                                        }
                                      >
                                        <i className="ri-delete-bin-fill align-start me-2 text-muted"></i>
                                        Delete
                                      </div>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </td>
                          ) : userInfoData?.role === 'guardian' &&
                          invoiceData?.length > 0 && invoiceData?.some(
                              (invoice) =>
                                invoice?.event_id === item?.game_id?._id &&
                                invoice?.bill_status === 'unpaid'
                            ) ? (
                            <td>
                              <h5 className="my-1 fw-normal text-uppercase">
                                <button
                                  onClick={() =>
                                    togOpenModal(item?.game_id?._id)
                                  }
                                  type="button"
                                  className="third-btn fs-3"
                                >
                                  <span className="d-flex align-items-center justify-content-center text-center mt-1">
                                    Join
                                  </span>
                                </button>
                              </h5>
                            </td>
                          ) : userInfoData?.role === 'player' &&
                            forTeam === 'no' &&
                            invoiceData?.some(
                              (invoice) =>
                                invoice?.event_id === item?.game_id?._id &&
                                invoice?.bill_status === 'unpaid'
                            ) ? (
                            <td>
                              <h5 className=" my-1 fw-normal text-uppercase">
                                <button
                                  onClick={() =>
                                    togOpenModal(item?.game_id?._id)
                                  }
                                  type="button"
                                  className="third-btn fs-3"
                                >
                                  <span className="d-flex align-items-center justify-content-center text-center mt-1">
                                    Join
                                  </span>
                                </button>
                              </h5>
                            </td>
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
            {/* edit seasonal game */}
            <div>
              <EditSeasonalGame
                title="Update Seasonal Game"
                btn="Update"
                editModal={editModal}
                setEditModal={setEditModal}
                id={seasonalGameId}
              />
            </div>

            <SuccessModel
              title={'Successfully Added A Player'}
              rightBtn="Close"
              backBtn="no"
              leftBtn="Paid By Cash"
              add_success_modal={add_success_modal}
              setAdd_success_modal={setAdd_success_modal}
              goToInvoice={redirectToInvoice}
              id={id}
            />

            {
              // guardian dashboard player select modal
              <PlayerSelectForEvents
                setOpenModal={setOpenModal}
                openModal={openModal}
                playerList={playerList}
                gameId={gameId}
                userInfoData={userInfoData}
                adminInfoData={adminInfoData}
              />
            }

            {/* Delete Modal */}
            {
              <DeleteModal
                Open={deleteModal}
                close={togDeleteModal}
                id={seasonalGameId}
                handleDelete={handleDelete}
              />
            }

            {/* If table data is empty */}
            {data?.length <= 0 && (
              <div className="empty-table-dialog-container">
                <span className="">
                  {"Don't found any Seasonal Game List."}
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
              data={data}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
            />
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default SeasonalGameList;
