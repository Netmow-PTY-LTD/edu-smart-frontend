import { teamDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
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
import EditGameScheduleModal from './Modals/EditGameScheduleModal';
import GameScheduleModalForm from './Modals/GameScheduleModal';
import Pagination from './Pagination';

const GameScheduleList = ({
  gameScheduleData,
  Tog_game_ScheduleModal,
  game_ScheduleModal,
  TogEditGameSchedule,
  tog_modal_delete,
  setEditGameSchedule,
  editGameSchedule,
  gameId,
  hostTeamList,
  guestTeamList,
  modal_delete,
  handleDelete,
  userInfoData,
  forTeam,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  return (
    <>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <div className="col-sm pe-3 my-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">
                Game Schedule
              </h4>
            </div>
          </div>
          {userInfoData?.role === 'admin' && forTeam === 'no' ? (
            <div className="col-sm-auto ">
              <div>
                <button
                  onClick={Tog_game_ScheduleModal}
                  type="button"
                  className="button p-3 m-3 text-light"
                >
                  <i className="ri-add-line align-bottom me-1"></i> Add New
                </button>
              </div>
            </div>
          ) : (
            ''
          )}

          {/* add game schedule modal */}
          <GameScheduleModalForm
            title={'Game Schedule'}
            btn={'Add'}
            isOpen={game_ScheduleModal}
            toggle={Tog_game_ScheduleModal}
          />
        </CardHeader>

        <CardBody
          style={{ position: 'relative' }}
          className="table-card-body-container"
        >
          <div className="table-responsive table-card mb-5">
            <table className="table table-hover table-centered align-middle table-nowrap ">
              <thead className="fs-2">
                <tr>
                  {/* <th scope="col" className="py-4">
                    Image
                  </th> */}
                  <th scope="col" className="py-4">
                    Team
                  </th>
                  <th scope="col" className="py-4">
                    Opponent's
                  </th>
                  <th scope="col" className="py-4">
                    Game Name
                  </th>
                  <th scope="col" className="py-4">
                    Date
                  </th>

                  {userInfoData?.role === 'admin' && forTeam === 'no' ? (
                    <th scope="col" className="py-4">
                      Action
                    </th>
                  ) : (
                    ''
                  )}
                </tr>
              </thead>
              <tbody>
                {gameScheduleData?.length > 0 &&
                  gameScheduleData
                    ?.slice(
                      currentPage * perPageData,
                      gameScheduleData?.length - currentPage * perPageData >
                        perPageData
                        ? currentPage * perPageData + perPageData
                        : gameScheduleData?.length
                    )
                    .map((item, key) => (
                      <tr key={key}>
                        <td>
                          <div className="d-flex align-items-center py-0">
                            <div className="flex-shrink-0 me-4">
                              {userInfoData?.role === 'admin' ||
                              userInfoData?.role === 'guardian' ||
                              userInfoData?.role === 'player' ||
                              userInfoData?.role === 'manager' ||
                              userInfoData?.role === 'trainer' ? (
                                <Link
                                  href={
                                    userInfoData?.role === 'admin'
                                      ? `/admin/game-schedule-profile/${item?._id}`
                                      : userInfoData?.role === 'guardian'
                                        ? `/guardian/game-schedule-profile-for-guardian/${item?._id}`
                                        : userInfoData?.role === 'player'
                                          ? `/player/game-schedule-profile-for-player/${item?._id}`
                                          : userInfoData?.role === 'manager'
                                            ? `/manager/game-schedule-profile-for-manager/${item?._id}`
                                            : userInfoData?.role === 'trainer'
                                              ? `/trainer/game-schedule-profile-for-trainer/${item?._id}`
                                              : ''
                                  }
                                  className="text-reset"
                                >
                                  <Image
                                    src={
                                      item?.image
                                        ? item?.image?.uploadedImage
                                        : `${teamDummyImage}`
                                    }
                                    height={500}
                                    width={500}
                                    alt="User"
                                    className="avatar-md rounded-circle"
                                  />
                                </Link>
                              ) : (
                                <Image
                                  src={
                                    item?.image
                                      ? item?.image?.uploadedImage
                                      : `${teamDummyImage}`
                                  }
                                  height={500}
                                  width={500}
                                  alt="User"
                                  className="avatar-md rounded-circle"
                                />
                              )}
                            </div>
                            <h5 className="fs-14 my-1 fw-medium">
                              {userInfoData?.role === 'admin' ||
                              userInfoData?.role === 'guardian' ||
                              userInfoData?.role === 'player' ||
                              userInfoData?.role === 'manager' ||
                              userInfoData?.role === 'trainer' ? (
                                <Link
                                  href={
                                    userInfoData?.role === 'admin'
                                      ? `/admin/game-schedule-profile/${item?._id}`
                                      : userInfoData?.role === 'guardian'
                                        ? `/guardian/game-schedule-profile-for-guardian/${item?._id}`
                                        : userInfoData?.role === 'player'
                                          ? `/player/game-schedule-profile-for-player/${item?._id}`
                                          : userInfoData?.role === 'manager'
                                            ? `/manager/game-schedule-profile-for-manager/${item?._id}`
                                            : userInfoData?.role === 'trainer'
                                              ? `/trainer/game-schedule-profile-for-trainer/${item?._id}`
                                              : ''
                                  }
                                  className="text-reset text-uppercase"
                                >
                                  <h5 className="fs-14 my-1 fw-medium">
                                    {item?.host_team_name}
                                  </h5>
                                </Link>
                              ) : (
                                <h5 className="fs-14 my-1 fw-medium text-uppercase">
                                  {item?.host_team_name}
                                </h5>
                              )}
                            </h5>
                          </div>
                        </td>

                        <td>
                          <h5 className="fs-14 my-1 fw-normal text-uppercase">
                            {item?.guest_team_id?.name
                              ? item?.guest_team_id?.name
                              : item?.external_team}
                          </h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal text-uppercase">
                            {item?.game_name}
                          </h5>
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
                                )))}
                        </td>

                        {userInfoData?.role === 'admin' && forTeam === 'no' ? (
                          <td>
                            <div className="d-flex p-4 justify-content-start">
                              <UncontrolledDropdown
                                className="me-2"
                                direction="end"
                              >
                                <DropdownToggle
                                  tag="a"
                                  className="text-reset "
                                  role="button"
                                >
                                  <span className="button px-3 py-1 text-light">
                                    <i className="ri-more-fill align-middle"></i>
                                  </span>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>
                                    <div
                                      onClick={() =>
                                        TogEditGameSchedule(item?._id)
                                      }
                                    >
                                      <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                      Edit
                                    </div>
                                  </DropdownItem>

                                  <DropdownItem>
                                    <div
                                      type="button"
                                      onClick={() =>
                                        tog_modal_delete(item?._id)
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
                        ) : (
                          ''
                        )}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* edit modal */}
          <div>
            <EditGameScheduleModal
              setEditGameSchedule={setEditGameSchedule}
              editGameSchedule={editGameSchedule}
              id={gameId}
              hostTeamList={hostTeamList}
              guestTeamList={guestTeamList}
              title={'Edit Game Schedule'}
            />
          </div>
          {/* Delete Modal */}
          {
            <DeleteModal
              Open={modal_delete}
              close={tog_modal_delete}
              id={gameId}
              handleDelete={handleDelete}
            />
          }

          {/* If table data is empty */}
          {gameScheduleData?.length <= 0 && (
            <div className="empty-table-dialog-container">
              <span className="">{"Don't found any Game Schedule."}</span>
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
            data={gameScheduleData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default GameScheduleList;
