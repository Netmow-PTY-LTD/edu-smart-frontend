import ClassPlayerSelectModal from '@/components/dashboard/common/Modals/ClassPlayerSelectModal';
import DeleteModal from '@/components/dashboard/common/Modals/DeleteModal';
import WeeklyTriningModal from '@/components/dashboard/common/Modals/WeeklyTriningModal';
import Pagination from '@/components/dashboard/common/Pagination';
import { addTrainingScheduleData } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

const WeeklyTrainingSchedule = ({
  tog_modal_delete,
  modal_delete,
  weeklyData,
  teamList,
  setTrainingScheduleModal,
  trainingScheduleModal,
  TogTrainingScheduleModal,
  setErrors,
  errors,
  handleInputChange,
  handleSelect,
  resetForm,
  selectedOptions,
  formData,
  userInfoData,
  forTeam,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const dispatch = useDispatch();

  //  this is for custom weekly schedule
  const [weeklyScheduleModal, setWeeklyScheduleModal] = useState(false);
  const TogWeeklyScheduleModal = (e) => {
    e.preventDefault();

    const weeklyInitialData = {
      trainingschedule: formData.trainingschedule,
      addteams: formData.addteams,
    };
    // Perform form validation
    const newErrors = {};

    if (!formData.trainingschedule) {
      newErrors.trainingschedule = 'Training Schedule Name is required';
    }

    // Select addteams validation
    if (!selectedOptions.addteams || selectedOptions.addteams.length === 0) {
      newErrors.addteams = 'Please select at least one option for teams';
    }

    // Form is valid
    if (Object.keys(newErrors).length === 0) {
      dispatch(addTrainingScheduleData(weeklyInitialData));
      setTrainingScheduleModal(!trainingScheduleModal);
      setWeeklyScheduleModal(!weeklyScheduleModal);
      resetForm();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <div className="col-sm pe-3 my-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">
                Weekly Training Schedule List
              </h4>
            </div>
          </div>

          {userInfoData?.role === 'admin' && forTeam === 'no' ? (
            <div className="col-sm-auto ">
              <div>
                <button
                  onClick={TogTrainingScheduleModal}
                  type="button"
                  className="button p-3 m-3 text-light"
                >
                  <i className="ri-add-line align-bottom me-1"></i> Add New
                </button>
                <ClassPlayerSelectModal
                  title={'Add Training Schedule'}
                  label1={'Training Schedule Name'}
                  label2={'Select Team'}
                  label3={'Select Type'}
                  CustomRightBtn={'Custom'}
                  leftBtn={'Weekly'}
                  training={'yes'}
                  teamList={teamList}
                  isOpen={trainingScheduleModal}
                  TogWeeklyScheduleModal={TogWeeklyScheduleModal}
                  setErrors={setErrors}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  handleSelect={handleSelect}
                  resetForm={resetForm}
                  formData={formData}
                  selectedOptions={selectedOptions}
                />
                {/* weekly modal */}
                <WeeklyTriningModal
                  weeklyScheduleModal={weeklyScheduleModal}
                  setWeeklyScheduleModal={setWeeklyScheduleModal}
                />
              </div>
            </div>
          ) : userInfoData?.role === 'player' ? (
            ''
          ) : (
            ''
          )}
        </CardHeader>
        <CardBody style={{ position: 'relative' }}>
          <div className="table-responsive table-card mb-5">
            <table className="table table-hover table-centered align-middle table-nowrap ">
              <thead className="fs-2">
                <tr>
                  <th scope="col" className="py-4">
                    Training Name
                  </th>
                  <th scope="col" className="py-4">
                    Vanue
                  </th>
                  <th scope="col" className="py-4">
                    Team
                  </th>
                  <th scope="col" className="py-4">
                    Day
                  </th>
                  <th scope="col" className="py-4">
                    Time
                  </th>
                  <th scope="col" className="py-4">
                    Status
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
                {((weeklyData?.length > 0 && weeklyData) || [])
                  ?.slice(
                    currentPage * perPageData,
                    weeklyData?.length - currentPage * perPageData > perPageData
                      ? currentPage * perPageData + perPageData
                      : weeklyData?.length
                  )
                  .map((item, key) => (
                    <tr key={key}>
                      <td>
                        <div className="d-flex align-items-center py-4">
                          <h5 className="fs-14 my-1 fw-medium">{item?.name}</h5>
                        </div>
                      </td>

                      <td>
                        <h5 className="fs-14 my-1 fw-normal">{item?.vanue}</h5>
                      </td>

                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.team?.name}
                        </h5>
                      </td>

                      <td>
                        <h5 className="fs-14 my-1 fw-normal">{item?.day}</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal bgsuc">
                          {item?.from}-{item?.to}
                        </h5>
                      </td>
                      <td>
                        <h5
                          className={`fs-14 my-1 fw-normal ${
                            item?.status === 'open'
                              ? 'text-success badge bg-success-subtle'
                              : 'text-danger badge bg-danger-subtle'
                          }`}
                        >
                          {item?.status}
                        </h5>
                      </td>
                      {userInfoData?.role === 'admin' && forTeam === 'no' ? (
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
                                  <div>
                                    <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                    Edit
                                  </div>
                                </DropdownItem>
                                <DropdownItem>
                                  <div type="button" onClick={tog_modal_delete}>
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

          {/* Delete Modal */}
          {<DeleteModal Open={modal_delete} close={tog_modal_delete} />}

          {/* If table data is empty */}
          {weeklyData?.length <= 0 && (
            <div className="empty-table-dialog-container">
              <span className="">
                {"Don't found any Training Schedule List."}
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
            data={weeklyData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default WeeklyTrainingSchedule;
