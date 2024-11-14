import ClassPlayerSelectModal from '@/components/dashboard/common/Modals/ClassPlayerSelectModal';
import CustomTrainingModal from '@/components/dashboard/common/Modals/CustomTrainingModal';
import DeleteModal from '@/components/dashboard/common/Modals/DeleteModal';
import Pagination from '@/components/dashboard/common/Pagination';
import { addTrainingScheduleData } from '@/slices/dashboard/adminDashboard/reducer';
import Link from 'next/link';
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

const CustomTrainingSchedule = ({
  customData,
  tog_modal_delete,
  modal_delete,
  teamList,
  setErrors,
  errors,
  handleInputChange,
  handleSelect,
  resetCustomForm,
  selectedOptions,
  formData,
  TogCustomOpenModal,
  setCustomOpenModal,
  customOpenModal,
  userInfoData,
  forTeam,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const dispatch = useDispatch();

  //  this is for custom training schedule
  const [customTrainingScheduleModal, setCustomTrainingScheduleModal] =
    useState(false);
  const TogCustomTrainingScheduleModal = (e) => {
    e.preventDefault();

    const customInitialData = {
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
      //  can submit or handle the data here
      dispatch(addTrainingScheduleData(customInitialData));
      setCustomOpenModal(!customOpenModal);
      setCustomTrainingScheduleModal(!customTrainingScheduleModal);
      resetCustomForm();
    } else {
      // Form has errors, update the errors state
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <div className="col-sm pe-3 my-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">
                Training Schedule List
              </h4>
            </div>
          </div>
          {userInfoData?.role === 'admin' && forTeam === 'no' ? (
            <div className="col-sm-auto ">
              <div>
                <button
                  onClick={TogCustomOpenModal}
                  type="button"
                  className=" button p-3 m-3 text-light"
                >
                  <i className="ri-add-line align-bottom me-1"></i>{' '}
                  <span>Add New</span>
                </button>
                <ClassPlayerSelectModal
                  title={'Add Custom Training Schedule'}
                  label1={'Training Schedule Name'}
                  label2={'Select Team'}
                  label3={'Select Type'}
                  training={'yes'}
                  CustomRightBtn={'Custom'}
                  leftBtn={'Weekly'}
                  isOpen={customOpenModal}
                  teamList={teamList}
                  TogCustomTrainingScheduleModal={
                    TogCustomTrainingScheduleModal
                  }
                  setErrors={setErrors}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  handleSelect={handleSelect}
                  resetForm={resetCustomForm}
                  formData={formData}
                  selectedOptions={selectedOptions}
                />
                <CustomTrainingModal
                  title={'Custom Training Schedule'}
                  customTrainingScheduleModal={customTrainingScheduleModal}
                  setCustomTrainingScheduleModal={
                    setCustomTrainingScheduleModal
                  }
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
                    Training Name
                  </th>
                  <th scope="col" className="py-4">
                    Vanue
                  </th>
                  <th scope="col" className="py-4">
                    Team
                  </th>
                  <th scope="col" className="py-4">
                    Date
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
                {customData?.length > 0 &&
                  customData
                    ?.slice(
                      currentPage * perPageData,
                      customData?.length - currentPage * perPageData >
                        perPageData
                        ? currentPage * perPageData + perPageData
                        : customData?.length
                    )
                    ?.map((item, key) => (
                      <tr key={key}>
                        <td>
                          <div className="d-flex align-items-center py-4">
                            <h5 className="fs-14 my-1 fw-medium">
                              {userInfoData?.role === 'admin' ||
                              userInfoData?.role === 'guardian' ||
                              userInfoData?.role === 'player' ||
                              userInfoData?.role === 'manager' ||
                              userInfoData?.role === 'trainer' ? (
                                <Link
                                  href={
                                    userInfoData?.role === 'admin'
                                      ? `/admin/training-schedule-profile/${item?._id}`
                                      : userInfoData?.role === 'guardian'
                                        ? `/guardian/training-schedule-profile-for-guardian/${item?._id}`
                                        : userInfoData?.role === 'player'
                                          ? `/player/training-schedule-profile-for-player/${item?._id}`
                                          : userInfoData?.role === 'manager'
                                            ? `/manager/training-schedule-profile-for-manager/${item?._id}`
                                            : userInfoData?.role === 'trainer'
                                              ? `/trainer/training-schedule-profile-for-trainer/${item?._id}`
                                              : ''
                                  }
                                  className="text-reset text-uppercase"
                                >
                                  {item?.name}
                                </Link>
                              ) : (
                                <h5 className="fs-14 my-1 fw-medium text-uppercase">
                                  {item?.name}
                                </h5>
                              )}
                            </h5>
                          </div>
                        </td>

                        <td>
                          <h5 className="fs-14 my-1 fw-normal">
                            {item?.vanue}
                          </h5>
                        </td>

                        <td>
                          <h5 className="fs-14 my-1 fw-normal">
                            {item?.team?.name}
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
                                    <div onClick={''}>
                                      <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                      Edit
                                    </div>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <div
                                      type="button"
                                      onClick={tog_modal_delete}
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

          {/* Delete Modal */}
          {<DeleteModal Open={modal_delete} close={tog_modal_delete} />}

          {/* If table data is empty */}
          {customData?.length <= 0 && (
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
            data={customData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default CustomTrainingSchedule;
