import { singleSeasonalGame } from '@/slices/dashboard/adminDashboard/Actions/seasonalGameActions';
import { singleSpecialEvents } from '@/slices/dashboard/adminDashboard/Actions/specialEventsActions';
import {
  singleGameSchedule,
  singleTrainingSchedule,
} from '@/slices/dashboard/commonApi/Actions/eventsActions';
import {
  addEventSchedule,
  deleteEventSchedule,
  updateEventSchedule,
} from '@/slices/dashboard/commonApi/Actions/eventsSchduleActions';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
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
import EditEventsScheduleModal from './EditEventsScheduleModal';
import DeleteModal from './Modals/DeleteModal';
import Pagination from './Pagination';

const EventsSchedule = ({ eventsData, eventsId, eventsName }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const [scheduleId, setScheduleId] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    start_time: '',
    end_time: '',
  });

  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  // add modal
  const [addModal, setAddModal] = useState(false);
  const togAddModal = () => {
    setFormData({});
    setErrors({});
    setAddModal(!addModal);
  };
  // edit modal
  const [editModal, setEditModal] = useState(false);
  const togEditModal = (id) => {
    setScheduleId(id);
    setEditModal(!editModal);
  };

  // delete profile modal state
  const [modal_delete, setmodal_delete] = useState(false);
  const tog_modal_delete = (id) => {
    setScheduleId(id);
    setmodal_delete(!modal_delete);
  };

  // handle set date
  const handleSetDate = (fieldName, fieldValue) => {
    let updatedValue;

    if (fieldName === 'date') {
      updatedValue = new Date(fieldValue[0]).toDateString();
    } else if (fieldName === 'name') {
      updatedValue = fieldValue.target.value;
    } else if (['start_time', 'end_time'].includes(fieldName)) {
      updatedValue = fieldValue;
    } else {
      return;
    }

    setFormData({
      ...formData,
      [fieldName]: updatedValue,
    });

    setErrors({
      ...errors,
      [fieldName]: '',
    });
  };

  const handleAddShedule = (e) => {
    e.preventDefault();

    const addedData = {
      name: formData?.name,
      date: formData?.date,
      start_time: formData?.start_time,
      end_time: formData?.end_time,
      event_id: eventsId,
      event_name: eventsName,
    };

    console.log(addedData);

    const newErrors = {};

    if (!formData?.name) {
      newErrors.name = 'Title is required';
    }

    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData?.start_time) {
      newErrors.start_time = 'Start Time is required';
    }

    if (!formData?.end_time) {
      newErrors.end_time = 'End Time is required';
    }

    if (Object.keys(newErrors).length === 0) {
      dispatch(addEventSchedule(addedData)).then((res) => {
        if (res.error) {
          toast.error('Something Went Wrong.Please Try Again');
        } else {
          {
            eventsName === 'SeasonalGame'
              ? dispatch(singleSeasonalGame(eventsId))
              : eventsName === 'TrainingSchedule'
                ? dispatch(singleTrainingSchedule(eventsId))
                : eventsName === 'game schedule'
                  ? dispatch(singleGameSchedule(eventsId))
                  : eventsName === 'SpecialEvent'
                    ? dispatch(singleSpecialEvents(eventsId))
                    : '';
          }
          toast.success('Schedule Added Successfully');
          togAddModal();
        }
      });
    } else {
      setErrors(newErrors);
    }
  };
  const handleUpdateShedule = (e) => {
    e.preventDefault();

    const updatedData = {
      id: scheduleId,
      name: formData?.name,
      date: formData?.date,
      start_time: formData?.start_time,
      end_time: formData?.end_time,
    };

    dispatch(updateEventSchedule(updatedData)).then((res) => {
      if (res.error) {
        toast.error('Something Went Wrong.Please Try Again');
      } else {
        {
          eventsName === 'SeasonalGame'
            ? dispatch(singleSeasonalGame(eventsId))
            : eventsName === 'TrainingSchedule'
              ? dispatch(singleTrainingSchedule(eventsId))
              : eventsName === 'game schedule'
                ? dispatch(singleGameSchedule(eventsId))
                : eventsName === 'SpecialEvent'
                  ? dispatch(singleSpecialEvents(eventsId))
                  : '';
        }
        toast.success('Schedule Update Successfully');
        togEditModal();
      }
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteEventSchedule(id));
    {
      eventsName === 'SeasonalGame'
        ? dispatch(singleSeasonalGame(eventsId))
        : eventsName === 'TrainingSchedule'
          ? dispatch(singleTrainingSchedule(eventsId))
          : eventsName === 'game schedule'
            ? dispatch(singleGameSchedule(eventsId))
            : eventsName === 'SpecialEvent'
              ? dispatch(singleSpecialEvents(eventsId))
              : '';
    }
    tog_modal_delete();
  };

  console.log(formData);

  return (
    <>
      <ToastContainer />
      <Col>
        {/* {
        loading'? (
          <LoaderSpiner />
        ) : ( */}

        <div className="h-100">
          <Col xl={12} className="mt-5">
            <Card>
              <CardHeader className="align-items-center d-flex">
                <div className="col-sm pe-3 ">
                  <div className="d-flex justify-content-sm-start">
                    <h4 className="card-title my-2 flex-grow-1 ps-2">
                      Manage Events Schedule
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
                        onClick={(e) => togAddModal(e)}
                        type="button"
                        className="button p-3 m-3 text-light"
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                        New
                      </button>
                      <EditEventsScheduleModal
                        openModal={addModal}
                        closeModal={togAddModal}
                        submitBtn={'Add'}
                        title={'Add Events Schedule'}
                        scheduleData={eventsData?.schedule}
                        scheduleId={scheduleId}
                        handleSubmitSchedule={handleAddShedule}
                        setFormData={setFormData}
                        formData={formData}
                        handleSetDate={handleSetDate}
                        errors={errors}
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
                          SN
                        </th>
                        <th scope="col" className="py-4">
                          Schedule Name
                        </th>
                        <th scope="col" className="py-4">
                          Date
                        </th>
                        <th scope="col" className="py-4">
                          Start Time
                        </th>
                        <th scope="col" className="py-4">
                          End Time
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
                      {eventsData?.schedule?.length > 0 &&
                        eventsData?.schedule
                          ?.slice(
                            currentPage * perPageData,
                            eventsData?.schedule?.length -
                              currentPage * perPageData >
                              perPageData
                              ? currentPage * perPageData + perPageData
                              : eventsData?.schedule?.length
                          )
                          .map((item, key) => (
                            <tr key={key}>
                              <td>
                                <h5 className="fs-14 my-1 text-reset fw-medium">
                                  {key + 1}.
                                </h5>
                              </td>
                              <td>
                                <h5 className="fs-14 my-1 text-reset fw-medium text-uppercase">
                                  {item?.name}
                                </h5>
                              </td>
                              <td>
                                <div className="d-flex align-items-center py-4">
                                  <div>
                                    <h5 className="fs-14 my-1 text-reset fw-medium">
                                      {
                                        <h5 className="fs-14 my-1 fw-normal">
                                          {`${new Date(item?.date).toLocaleDateString()}`}
                                        </h5>
                                      }
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <h5
                                  key={'index'}
                                  className="fs-14 my-1 fw-medium text-uppercase"
                                >
                                  {
                                    <h5 className="fs-14 my-1 fw-normal">
                                      {` ${new Date(
                                        `2000-01-01T${item?.start_time}:00`
                                      ).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                      })} `}
                                    </h5>
                                  }
                                </h5>
                              </td>

                              <td>
                                <h5 className="fs-14 my-1 fw-normal">
                                  {
                                    <h5 className="fs-14 my-1 fw-normal">
                                      {`  ${new Date(
                                        `2000-01-01T${item?.end_time}:00`
                                      ).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                      })}`}
                                    </h5>
                                  }
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
                    deleteBtn={'Delete'}
                    id={scheduleId}
                    handleDelete={handleDelete}
                  />
                }

                {/* edit modal  */}
                {
                  <EditEventsScheduleModal
                    openModal={editModal}
                    closeModal={togEditModal}
                    submitBtn={'Update'}
                    scheduleData={eventsData?.schedule}
                    scheduleId={scheduleId}
                    title={'Add Events Schedule'}
                    handleSubmitSchedule={handleUpdateShedule}
                    setFormData={setFormData}
                    formData={formData}
                    handleSetDate={handleSetDate}
                  />
                }

                {eventsData?.schedule?.length <= 0 && (
                  <div className="empty-table-dialog-container">
                    <span>{"Don't found any Data yet..... "}</span>
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
                  data={'data'}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  perPageData={perPageData}
                />
              </CardFooter>
            </Card>
          </Col>
        </div>
        {/* )} */}
      </Col>
    </>
  );
};

export default EventsSchedule;
