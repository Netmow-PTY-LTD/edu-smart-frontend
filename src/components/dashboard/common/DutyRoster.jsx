import LoaderSpiner from '@/components/constants/Loader/Loader';
import DeleteModal from '@/components/dashboard/common/Modals/DeleteModal';
import {
  deleteSeasonalGameDutyRoster,
  getAllSeasonalGameDutyRoster,
  updateSeasonalGameDutyRoster,
} from '@/slices/dashboard/adminDashboard/Actions/seasonalGameActions';
import {
  deleteSpecialEventDutyRoster,
  getAllSpecialEventDutyRoster,
  updateSpecialEventDutyRoster,
} from '@/slices/dashboard/adminDashboard/Actions/specialEventsActions';
import {
  emptyUpdateSeasonalGameDutyRoster,
  emptyUpdateSpecialEventDutyRoster,
} from '@/slices/dashboard/adminDashboard/reducer';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import EditDutyRosterModal from './EditDutyRosterModal';
import DutyRosterModal from './Modals/AddDutyRosterModal';
import Pagination from './Pagination';

const DutyRoster = ({
  Tog_duty_rosterModal,
  duty_rosterModal,
  resetForm,
  formData,
  handleInputChange,
  handleSelect,
  handleSubmit,
  errors,
  selectedOptions,
  setSelectedOptions,
  setFormData,
  id,
  data,
  name,
  updateData,
  updateIsLoading,
  updateError,
  deleteBtn,
  loading,
  playerList,
}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const [dutyId, setDutyId] = useState('');
  const [dutyRosterUpdateData, setDutyRosterUpdateData] = useState('');

  // edit modal
  const [editModal, setEditModal] = useState(false);
  const togEditModal = (id) => {
    if (data && id) {
      const updatedData = data.length > 0 && data.filter((d) => d._id === id);

      setDutyRosterUpdateData(updatedData);
    }
    setDutyId(id);
    setEditModal(!editModal);
  };

  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  const updateDutyRosterForSeasonalGame = (e) => {
    e.preventDefault();

    let seasonalDutyRosterData = {};

    if (formData?.name_of_duty) {
      seasonalDutyRosterData = {
        ...seasonalDutyRosterData,
        name_of_duty: formData?.name_of_duty,
      };
    } else {
      seasonalDutyRosterData = {
        ...seasonalDutyRosterData,
        name_of_duty: ' ',
      };
    }
    if (dutyId) {
      seasonalDutyRosterData.id = dutyId;
    }
    if (formData?.assigned_person) {
      seasonalDutyRosterData = {
        ...seasonalDutyRosterData,
        assigned_person: formData?.assigned_person,
      };
    } else {
      seasonalDutyRosterData = {
        ...seasonalDutyRosterData,
        assigned_person: ' ',
      };
    }
    if (formData?.note) {
      seasonalDutyRosterData = {
        ...seasonalDutyRosterData,
        note: formData?.note,
      };
    } else {
      seasonalDutyRosterData = {
        ...seasonalDutyRosterData,
        note: ' ',
      };
    }

    dispatch(updateSeasonalGameDutyRoster(seasonalDutyRosterData)).then(
      (res) => {
        if (res.error) {
          toast.error('Update Failed.Try Again.');
        } else {
          toast.success('Updated Successfully');
          dispatch(getAllSeasonalGameDutyRoster(id));
          dispatch(emptyUpdateSeasonalGameDutyRoster());
          setEditModal(!editModal);
        }
      }
    );
  };

  const updateDutyRosterForSpecialEvents = (e) => {
    e.preventDefault();

    let SpecialEventsDutyRosterData = {};

    if (formData?.name_of_duty) {
      SpecialEventsDutyRosterData = {
        ...SpecialEventsDutyRosterData,
        name_of_duty: formData?.name_of_duty,
      };
    } else {
      SpecialEventsDutyRosterData = {
        ...SpecialEventsDutyRosterData,
        name_of_duty: ' ',
      };
    }
    if (dutyId) {
      SpecialEventsDutyRosterData.id = dutyId;
    }
    if (formData?.assigned_person) {
      SpecialEventsDutyRosterData = {
        ...SpecialEventsDutyRosterData,
        assigned_person: formData?.assigned_person,
      };
    } else {
      SpecialEventsDutyRosterData = {
        ...SpecialEventsDutyRosterData,
        assigned_person: ' ',
      };
    }
    if (formData?.note) {
      SpecialEventsDutyRosterData = {
        ...SpecialEventsDutyRosterData,
        note: formData?.note,
      };
    } else {
      SpecialEventsDutyRosterData = {
        ...SpecialEventsDutyRosterData,
        note: ' ',
      };
    }

    dispatch(updateSpecialEventDutyRoster(SpecialEventsDutyRosterData)).then(
      (res) => {
        if (res.error) {
          toast.error('Update Failed.Try Again.');
        } else {
          toast.success('Updated Successfully');
          dispatch(getAllSpecialEventDutyRoster(id));
          dispatch(emptyUpdateSpecialEventDutyRoster());
          setEditModal(!editModal);
        }
      }
    );
  };

  // delete profile modal state
  const [modal_delete, setmodal_delete] = useState(false);
  const tog_modal_delete = (id) => {
    setDutyId(id);
    setmodal_delete(!modal_delete);
  };

  const handleDelete = (Id) => {
    dispatch(deleteSeasonalGameDutyRoster(Id)).then(() => {
      dispatch(getAllSeasonalGameDutyRoster(id));
      tog_modal_delete();
    });
  };
  // special events duty roster delete
  const handleSpecialDutyRosterDelete = (Id) => {
    dispatch(deleteSpecialEventDutyRoster(Id)).then(() => {
      dispatch(getAllSpecialEventDutyRoster(id));
      tog_modal_delete();
    });
  };

  return (
    <>
      <ToastContainer />
      <Col>
        {loading ? (
          <LoaderSpiner />
        ) : (
          <div className="h-100">
            <Col xl={12} className="mt-5">
              <Card>
                <CardHeader className="align-items-center d-flex">
                  <div className="col-sm pe-3 ">
                    <div className="d-flex justify-content-sm-start">
                      <h4 className="card-title my-2 flex-grow-1 ps-2">
                        Duty roster
                      </h4>
                    </div>
                  </div>
                  <div className="col-sm-auto ">
                    {userInfoData?.role === 'guardian' ? (
                      ''
                    ) : userInfoData?.role === 'player' ? (
                      ''
                    ) : (
                      <div>
                        <button
                          onClick={Tog_duty_rosterModal}
                          type="button"
                          className="button p-3 m-3 text-light"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          New
                        </button>
                        {/* add duty roster modal  */}
                        <DutyRosterModal
                          isOpen={duty_rosterModal}
                          title={'Add Duty roster'}
                          Btn={'Add'}
                          resetForm={resetForm}
                          formData={formData}
                          setFormData={setFormData}
                          handleInputChange={handleInputChange}
                          handleSelect={handleSelect}
                          handleSubmit={handleSubmit}
                          errors={errors}
                          selectedOptions={selectedOptions}
                          playerList={playerList}
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardBody style={{ position: 'relative' }}>
                  <div className="table-responsive table-card mb-5 ">
                    <table className="table table-hover table-centered align-middle table-nowrap ">
                      <thead className="fs-2">
                        <tr>
                          <th scope="col" className="py-4">
                            Name of Duty
                          </th>
                          <th scope="col" className="py-4">
                            Assigned Persons
                          </th>
                          <th scope="col" className="py-4">
                            Note
                          </th>
                          {userInfoData?.role === 'guardian' ? (
                            ''
                          ) : userInfoData?.role === 'player' ? (
                            ''
                          ) : (
                            <th scope="col" className="py-4">
                              Action
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {data?.length > 0 &&
                          data
                            ?.slice(
                              currentPage * perPageData,
                              data?.length - currentPage * perPageData >
                                perPageData
                                ? currentPage * perPageData + perPageData
                                : data?.length
                            )
                            .map((item, key) => (
                              <tr key={key}>
                                <td>
                                  <div className="d-flex align-items-center py-4">
                                    <div>
                                      <h5 className="fs-14 my-1 text-reset fw-medium">
                                        {item?.name_of_duty}
                                      </h5>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  {item?.assigned_person?.length > 0 &&
                                    item?.assigned_person.map(
                                      (person, index) => (
                                        <h5
                                          key={index}
                                          className="fs-14 my-1 fw-medium text-uppercase"
                                        >
                                          {person?.first_name +
                                            ' ' +
                                            person?.last_name}
                                        </h5>
                                      )
                                    )}
                                </td>

                                <td>
                                  <h5 className="fs-14 my-1 fw-normal">
                                    {item?.note}
                                  </h5>
                                </td>
                                {userInfoData?.role === 'guardian' ? (
                                  ''
                                ) : userInfoData?.role === 'player' ? (
                                  ''
                                ) : (
                                  <td>
                                    <div className="d-flex justify-content-start">
                                      <UncontrolledDropdown
                                        className=""
                                        direction="end"
                                      >
                                        <DropdownToggle
                                          tag="a"
                                          className="text-reset ms-2"
                                          role="button"
                                        >
                                          <span className="button px-3 py-1 text-light">
                                            <i className="ri-more-fill align-middle"></i>
                                          </span>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu dropdown-menu-end ms-2">
                                          <DropdownItem>
                                            <div
                                              onClick={() =>
                                                togEditModal(item?._id)
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
                                )}
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Delete Modal */}
                  {
                    <DeleteModal
                      Open={modal_delete}
                      close={tog_modal_delete}
                      id={dutyId}
                      handleDelete={handleDelete}
                      deleteBtn={deleteBtn}
                      handleSpecialDutyRosterDelete={
                        handleSpecialDutyRosterDelete
                      }
                    />
                  }

                  {/* edit duty roster modal  */}
                  {
                    <EditDutyRosterModal
                      isOpen={editModal}
                      Btn={'Update'}
                      setEditModal={setEditModal}
                      editModal={editModal}
                      title={'Update Duty Roster'}
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleSelect={handleSelect}
                      setSelectedOptions={setSelectedOptions}
                      setFormData={setFormData}
                      updateDutyRosterForSeasonalGame={
                        updateDutyRosterForSeasonalGame
                      }
                      updateDutyRosterForSpecialEvents={
                        updateDutyRosterForSpecialEvents
                      }
                      selectedOptions={selectedOptions}
                      name={name}
                      updateData={updateData}
                      updateIsLoading={updateIsLoading}
                      updateError={updateError}
                      data={dutyRosterUpdateData[0]}
                      playerList={playerList}
                    />
                  }

                  {data?.length <= 0 && (
                    <div className="empty-table-dialog-container">
                      <span className="">
                        {"Don't found any Duty yet..... "}

                        <Link
                          href={'/admin/add-guardian'}
                          className="qoute_color text-decoration-underline"
                        ></Link>
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
            </Col>
          </div>
        )}
      </Col>
    </>
  );
};

export default DutyRoster;
