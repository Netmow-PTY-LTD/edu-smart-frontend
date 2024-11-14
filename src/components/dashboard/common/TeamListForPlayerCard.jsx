import LoaderSpiner from '@/components/constants/Loader/Loader';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap';
import DeleteModal from './Modals/DeleteModal';
import SelectPlayerModal from './Modals/SelectPlayerModal';
import Pagination from './Pagination';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';

const TeamListForPlayerCard = ({
  teamForPlayerIsLoading,
  tog_setSelect_modal,
  id,
  select_modal,
  allTeams,
  handleAssignTeam,
  selectPLayerError,
  selectedOptions,
  setSelectedOptions,
  teamForPlayerData,
  handleOnClick,
  modal_delete,
  tog_modal_delete,
  removeId,
  handleDelete,
  data,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  return (
    <>
      <Col className="pt-4">
        {teamForPlayerIsLoading ? (
          <LoaderSpiner />
        ) : (
          <Card>
            <CardHeader className="align-items-center d-flex">
              <div className="col-sm pe-3">
                <div className="d-flex justify-content-sm-start">
                  <h4 className="card-title mb-0 flex-grow-1 ps-2">Team</h4>
                </div>
              </div>
              <div className="col-sm-auto ">
                <div>
                  {data && data?.payment_status === 'paid' && (
                    <button
                      onClick={() => tog_setSelect_modal(id)}
                      type="button"
                      className="button px-3 py-2 m-3 text-light"
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Assign
                      Team
                    </button>
                  )}

                  <SelectPlayerModal
                    title="Team Assign"
                    labelTitle="Select Team"
                    btn="Assign"
                    orBtn={'yes'}
                    isOpen={select_modal}
                    toggle={tog_setSelect_modal}
                    allPlayersData={allTeams?.data ? allTeams?.data : []}
                    handleAssign={handleAssignTeam}
                    selectPLayerError={selectPLayerError}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    id={id}
                  />
                </div>
              </div>
            </CardHeader>

            <CardBody style={{ position: 'relative' }}>
              <div className="table-responsive table-card mb-5">
                <table className="table table-hover table-centered align-middle table-nowrap ">
                  <thead className="fs-2">
                    <tr>
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
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {teamForPlayerData?.length > 0 &&
                      teamForPlayerData
                        ?.slice(
                          currentPage * perPageData,
                          teamForPlayerData?.length -
                            currentPage * perPageData >
                            perPageData
                            ? currentPage * perPageData + perPageData
                            : teamForPlayerData?.length
                        )
                        ?.map((item, key) => (
                          <tr key={key}>
                            <td>
                              <div className="d-flex align-items-center py-4">
                                <div className="d-flex">
                                  <Link
                                    href={`/admin/team-profile/${item?._id}`}
                                    className="text-reset d-flex align-items-center"
                                  >
                                    <Image
                                      src={
                                        item?.image?.uploadedImage
                                          ? item?.image?.uploadedImage
                                          : `${userDummyImage}`
                                      }
                                      width={36}
                                      height={36}
                                      alt="User"
                                      className="avatar-lg p-3 rounded-circle"
                                    />

                                    <h5 className="fs-14 my-1 fw-medium text-uppercase">
                                      {item?.name}
                                    </h5>
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h5 className="fs-14 my-1 fw-normal text-uppercase">
                                {item?.trainer_name}
                              </h5>
                            </td>
                            <td>
                              <h5 className="fs-14 my-1 fw-normal text-uppercase">
                                {item?.manager_name}
                              </h5>
                            </td>

                            <td>
                              <div className="flex-shrink-0 badge bg-danger-subtle text-danger">
                                <button
                                  type="button"
                                  onClick={(e) => handleOnClick(item?._id)}
                                >
                                  <i className="ri-delete-bin-fill align-start me-2 text-danger"></i>
                                  Remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
                {/* Delete Modal */}
                {
                  <DeleteModal
                    Open={modal_delete}
                    close={tog_modal_delete}
                    id={removeId}
                    gid={id}
                    handleDelete={handleDelete}
                  />
                }
                {(teamForPlayerData?.length <= 0 ||
                  teamForPlayerData?.message ===
                    "Player don't any Team yet!") && (
                  <div className="empty-table-dialog-container">
                    <span className="">{"Don't found any Team."} </span>
                  </div>
                )}
              </div>
            </CardBody>
            <CardFooter>
              <Pagination
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 20,
                }}
                data={teamForPlayerData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPageData={perPageData}
              />
            </CardFooter>
          </Card>
        )}
      </Col>
    </>
  );
};

export default TeamListForPlayerCard;
