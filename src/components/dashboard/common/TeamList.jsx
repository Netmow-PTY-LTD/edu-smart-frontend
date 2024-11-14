import DeleteModal from '@/components/dashboard/common/Modals/DeleteModal';
import SelectPlayerModal from '@/components/dashboard/common/Modals/SelectPlayerModal';
import TeamModalForm from '@/components/dashboard/common/Modals/TeamModalForm';
import Pagination from '@/components/dashboard/common/Pagination';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
import MultiRouteWrapper from './onBoarding/MultiRouteWrapper';
import ImportData from './ImportData';

const TeamList = ({
  teamImg,
  teamData,
  tog_setSelect_modal,
  Tog_edit_profileModal,
  handleClickModalTeamDelete,
  modalTeamDelete,
  togModalTeamDelete,
  removeTeamID,
  handleDeleteTeam,
  allTrainer,
  allManager,
  edit_profileModal,
  setEdit_profileModal,
  singleTeamData,
  singleTeamIsLoading,
  editId,
  managerList,
  trainerList,
  select_modal,
  data,
  handleAssign,
  selectPLayerError,
  selectedOptions,
  setSelectedOptions,
  toggleModal,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const [{ run, steps }] = useState({
    run: true,
    steps: [
      {
        content: <h2></h2>,
        target: 'teamsmanagement',
      },
      {
        title: <h2>Team Management</h2>,
        content: <p></p>,
        target: '#addteam',
        placement: 'right',
      },
      {
        title: <h2>Add New Team </h2>,
        content: <p></p>,
        target: '#addnewteambtn',
        placement: 'left',
      },
      {
        title: <h2>Team Details</h2>,
        content: <p></p>,
        target: '#dropdowntoggle',
        placement: 'left',
      },
      {
        title: <h2>Individual Team</h2>,
        content: <p></p>,
        target: '#singleiteamid',
        placement: 'bottom',
      },
      {
        target: 'singleiteamid',
        next: `/admin/team-profile/${'66b49476299e72f45f7964b0'}?manageteam=true`,
      },
    ],
  });

  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  // {
  //   teamData?.map((item, key) => {
  //     const id = item[0]?._id ? `singleiteamid-${item[0]._id}` : undefined;

  //     return (
  //       <tr id={id} key={key}>
  //         {/* Other <td> elements go here */}
  //       </tr>
  //     );
  //   });
  // }

  return (
    <>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <div className="col-sm pe-3 my-4">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">Teams</h4>
            </div>
          </div>
          {userInfoData?.role === 'admin' ? (
            <ImportData toggleModal={toggleModal} exportCSVData={teamData} />
          ) : (
            ''
          )}
          {userInfoData?.role === 'admin' ? (
            <div className="col-sm-auto ">
              <div id="addnewteambtn">
                <Link
                  href={'/admin/add-new-team'}
                  type="button"
                  className="button p-3 m-3 text-light"
                >
                  <i className="ri-add-line align-bottom me-1"></i> Add New
                </Link>
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
                  {/* <th scope="col" className="py-4">
                    Image
                  </th> */}
                  <th scope="col" className="py-4">
                    Name
                  </th>
                  <th scope="col" className="py-4">
                    Trainer
                  </th>
                  <th scope="col" className="py-4">
                    Manager
                  </th>

                  <th scope="col" className="py-4">
                    Players
                  </th>

                  {userInfoData?.role === 'admin' ? (
                    <th scope="col" className="py-4">
                      Action
                    </th>
                  ) : (
                    ''
                  )}
                </tr>
              </thead>
              {/* {teamIsLoading ? (
                              <LoaderSpiner />
                            ) : ( */}
              <tbody>
                {teamData?.length > 0 &&
                  teamData
                    ?.slice(
                      currentPage * perPageData,
                      teamData?.length - currentPage * perPageData > perPageData
                        ? currentPage * perPageData + perPageData
                        : teamData?.length
                    )
                    ?.map((item, key) => (
                      <tr id={`${key === 0 ? 'singleiteamid' : ''}`} key={key}>
                        <td>
                          <div className="d-flex align-items-center py-0">
                            <div className="flex-shrink-0 me-4">
                              <Link
                                href={
                                  userInfoData?.role === 'admin'
                                    ? `/admin/team-profile/${item?._id}`
                                    : userInfoData?.role === 'guardian'
                                      ? `/guardian/team-profile-for-guardian/${item?._id}`
                                      : userInfoData?.role === 'player'
                                        ? `/player/teams-profile-for-player/${item?._id}`
                                        : userInfoData?.role === 'manager'
                                          ? `/manager/teams-profile-for-manager/${item?._id}`
                                          : userInfoData?.role === 'trainer'
                                            ? `/trainer/teams-profile-for-trainer/${item?._id}`
                                            : {}
                                }
                                className="text-reset"
                              >
                                <Image
                                  src={
                                    item?.image?.uploadedImage
                                      ? item?.image?.uploadedImage
                                      : `${userDummyImage}`
                                  }
                                  alt="User"
                                  className="avatar-lg p-3 rounded-circle"
                                  width={36}
                                  height={36}
                                />
                              </Link>
                            </div>
                            <h5 className="fs-14 my-1 fw-medium text-uppercase">
                              <Link
                                href={
                                  userInfoData?.role === 'admin'
                                    ? `/admin/team-profile/${item?._id}`
                                    : userInfoData?.role === 'guardian'
                                      ? `/guardian/team-profile-for-guardian/${item?._id}`
                                      : userInfoData?.role === 'player'
                                        ? `/player/teams-profile-for-player/${item?._id}`
                                        : userInfoData?.role === 'manager'
                                          ? `/manager/teams-profile-for-manager/${item?._id}`
                                          : userInfoData?.role === 'trainer'
                                            ? `/trainer/teams-profile-for-trainer/${item?._id}`
                                            : {}
                                }
                                className="text-reset"
                              >
                                {item?.name}
                              </Link>
                            </h5>
                          </div>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal text-uppercase">
                            {item?.trainer
                              ? item?.trainer?.first_name +
                                ' ' +
                                item?.trainer?.last_name
                              : ''}
                          </h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal text-uppercase">
                            {item?.manager
                              ? item?.manager?.first_name +
                                ' ' +
                                item?.manager?.last_name
                              : ''}
                          </h5>
                        </td>

                        <td>
                          <h5 className="fs-14 my-1 fw-normal">
                            {item?.player ? item?.player.length : '0'}
                          </h5>
                        </td>
                        {userInfoData?.role === 'admin' ? (
                          <td id="dropdowntoggle">
                            <div className="d-flex justify-content-start">
                              <UncontrolledDropdown
                                className="me-2"
                                direction="end"
                              >
                                <DropdownToggle tag="a" className="text-reset">
                                  <span className="button px-3 py-1 text-light">
                                    <i className="ri-more-fill align-middle"></i>
                                  </span>
                                </DropdownToggle>
                                <DropdownMenu className="me-4">
                                  <DropdownItem id="dropdowntoggleitems">
                                    <Link
                                      href={`/admin/team-profile/${item?._id}`}
                                    >
                                      <i className="ri-eye-line align-start me-2 text-muted"></i>
                                      Squad View
                                    </Link>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <div
                                      onClick={() =>
                                        tog_setSelect_modal(item?._id)
                                      }
                                    >
                                      <i className="ri-file-add-line align-bottom me-2 text-muted"></i>
                                      Assign Player
                                    </div>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <div
                                      onClick={() =>
                                        Tog_edit_profileModal(item?._id)
                                      }
                                    >
                                      <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                      Edit
                                    </div>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <div
                                      onClick={() =>
                                        handleClickModalTeamDelete(item?._id)
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
              {/* )} */}
            </table>
          </div>
          {/* delete team */}
          <div>
            {router.query.manageteam === 'true' ? (
              <MultiRouteWrapper run={run} steps={steps} />
            ) : (
              ''
            )}

            {
              <DeleteModal
                Open={modalTeamDelete}
                close={togModalTeamDelete}
                id={removeTeamID}
                handleDelete={handleDeleteTeam}
              />
            }
          </div>

          {/* edit team */}
          <div>
            <TeamModalForm
              allTrainer={allTrainer}
              allManager={allManager}
              title="Edit Team"
              edit_profileModal={edit_profileModal}
              setEdit_profileModal={setEdit_profileModal}
              singleTeamData={singleTeamData}
              singleTeamIsLoading={singleTeamIsLoading}
              id={editId}
              managerList={managerList}
              trainerList={trainerList}
            />
          </div>
          {/* assign player Modal */}
          {
            <SelectPlayerModal
              title={'Assign Player'}
              btn={'Add'}
              labelTitle={'Select Player'}
              orBtn={'yes'}
              isOpen={select_modal}
              toggle={tog_setSelect_modal}
              allPlayersData={data?.length > 0 ? data : []}
              handleAssign={handleAssign}
              selectPLayerError={selectPLayerError}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          }
          {teamData?.length <= 0 && (
            <div className="empty-table-dialog-container">
              <span className="">{"Don't found any Team."} </span>
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
            data={teamData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default TeamList;
