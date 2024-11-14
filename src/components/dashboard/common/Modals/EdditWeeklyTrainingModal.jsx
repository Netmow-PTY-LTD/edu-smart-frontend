import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import {
  getAllWeeklyTrainingSchedule,
  updateWeeklyTrainingSchedule,
} from '@/slices/dashboard/adminDashboard/Actions/weeklyTrainingScheduleActions';
import { emptyUpdateWeeklyTrainingSchedule } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const EdditWeeklyTrainingModal = ({
  editModal,
  setEditModal,
  title,
  btn,
  id,
}) => {
  const dispatch = useDispatch();

  const {
    data: updateWeeklyTrainingData,
    isLoading: updateWeeklyTrainingIsLoading,
    error: updateWeeklyTrainingError,
  } = useSelector((state) => state.AdminDashboard.updateWeeklyTrainingSchedule);

  useEffect(() => {
    dispatch(emptyUpdateWeeklyTrainingSchedule());
  }, [dispatch]);

  //   close button function
  const resetForm = () => {
    setFormData({
      name: '',
      vanue: '',
      date: '',
      starts: '',
      ends: '',
    });

    setSelectedOptions({
      addteams: [],
      status: [],
      day: [],
    });

    setEditModal(!editModal);
  };

  useEffect(() => {
    if (
      updateWeeklyTrainingData?.message &&
      updateWeeklyTrainingError === null
    ) {
      toast.success(updateWeeklyTrainingData?.message);
      dispatch(emptyUpdateWeeklyTrainingSchedule());
      dispatch(getAllWeeklyTrainingSchedule());
      resetForm();
    }
    if (updateWeeklyTrainingError) {
      toast.error(updateWeeklyTrainingError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateWeeklyTrainingData?.message, updateWeeklyTrainingError]);

  // get all team list
  const allTeams = useSelector((state) => state.AdminDashboard.addNewTeam);
  useEffect(() => {
    dispatch(getAllTeam());
  }, [dispatch]);
  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    if (allTeams?.data?.length > 0) {
      const mappedData = allTeams?.data.map((teams) => ({
        label: teams.name,
        value: teams._id,
      }));

      setTeamList(mappedData);
    }
  }, [allTeams]);

  const [formData, setFormData] = useState({
    name: '',
    vanue: '',
    date: '',
    starts: '',
    ends: '',
  });

  // for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // select state and function
  const [selectedOptions, setSelectedOptions] = useState({
    addteams: [],
    status: [],
    day: [],
  });

  const handleSelect = (name, selected) => {
    {
      name === 'addteams'
        ? setFormData({
            ...formData,
            [name]: { id: selected.value, name: selected.label },
          })
        : setFormData({
            ...formData,
            [name]: selected.value,
          });
    }

    setSelectedOptions({
      ...selectedOptions,
      [name]: selected,
    });
  };

  const handleSetDate = (fieldName, dateStr) => {
    setFormData({
      ...formData,
      [fieldName]: dateStr,
    });
  };

  const listData = [
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
  ];

  const optionList = [
    { value: 'open', label: 'open' },
    { value: 'closed', label: 'closed' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let weeklyTrainingData = {};

    // Log form data for debugging


    if (formData?.name) {
      weeklyTrainingData = { ...weeklyTrainingData, name: formData?.name };
    }
    if (formData?.day) {
      weeklyTrainingData = { ...weeklyTrainingData, day: formData?.day };
    }
    if (formData?.vanue) {
      weeklyTrainingData = { ...weeklyTrainingData, vanue: formData?.vanue };
    }
    if (formData?.date) {
      weeklyTrainingData = {
        ...weeklyTrainingData,
        date: [
          {
            date: formData?.date,
            starts_time: formData?.starts,
            end_time: formData?.ends,
          },
        ],
      };
    }

    // if (formData?.starts) {
    //   weeklyTrainingData = { ...weeklyTrainingData, starts: formData?.starts };
    // }
    // if (formData?.ends) {
    //   weeklyTrainingData = { ...weeklyTrainingData, ends: formData?.ends };
    // }
    if (formData?.addteams) {
      weeklyTrainingData = {
        ...weeklyTrainingData,
        addteams: formData?.addteams,
      };
    }
    if (formData?.status) {
      weeklyTrainingData = { ...weeklyTrainingData, status: formData?.status };
    }

    const mainData = { ...weeklyTrainingData, id };


    dispatch(updateWeeklyTrainingSchedule(mainData))
      .then(() => {
        toast.success(updateWeeklyTrainingData?.message);
      })
      .catch((error) => {
        console.error('Dispatch error:', error);
      });
  };

  return (
    <div>
      {/* success modal */}
      <Modal isOpen={editModal}>
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={resetForm}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          <Form>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="trainingscheduleInput" className="form-label">
                    Training Schedule Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="trainingscheduleInput"
                    placeholder="Enter Name"
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
              <Col xl={12}>
                <div className="mb-5">
                  <Label htmlFor="addteamsInput" className="form-label">
                    Select Team
                  </Label>
                  <div>
                    <Select
                      options={teamList}
                      placeholder="Add Teams"
                      id="addteamsInput"
                      name="addteams"
                      value={selectedOptions?.addteams}
                      onChange={(selected) =>
                        handleSelect('addteams', selected)
                      }
                      isSearchable={true}
                      // isMulti
                    />
                  </div>
                </div>
              </Col>
              <Col xl={4} className="align-middle mx-auto">
                <div className="mb-3">
                  <Label htmlFor="dayInput" className="form-label text-danger">
                    *Select Day
                  </Label>
                  <div>
                    <Select
                      options={listData}
                      id="dayInput"
                      name="day"
                      value={selectedOptions.day}
                      onChange={(selected) => handleSelect('day', selected)}
                    ></Select>
                  </div>
                </div>
              </Col>
              <Col xl={4}>
                <div className="mb-3">
                  <Label htmlFor="statusInput" className="form-label">
                    Status
                  </Label>
                  <div>
                    <Select
                      options={optionList}
                      id="statusInput"
                      value={selectedOptions?.status}
                      name="status"
                      onChange={(selected) => handleSelect('status', selected)}
                    ></Select>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="vanueInput" className="form-label">
                    vanue
                  </Label>
                  <Input
                    type="text"
                    id="vanueInput"
                    className="form-control"
                    name="vanue"
                    value={formData.vanue}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="dateInput" className="form-label">
                    Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    id="dateInput"
                    name="date"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                    value={formData.date}
                    onChange={(selectedDates, dateStr, instance) =>
                      handleSetDate('date', dateStr)
                    }
                  />
                </div>
              </Col>
              <Col xxl={4} className=" mb-2">
                <div>
                  <Label htmlFor="fromInput" className="form-label">
                    Starts Time
                  </Label>
                  <input
                    disabled={!formData?.date}
                    className="form-control"
                    type="time"
                    id="fromInput"
                    name="starts"
                    value={formData.starts}
                    onChange={handleInputChange}
                    style={{
                      padding: '.6rem',
                      fontSize: '1.7rem',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
              </Col>
              <Col xxl={4} className=" mb-2">
                <div>
                  <Label htmlFor="toInput" className="form-label">
                    End Time
                  </Label>
                  <input
                    disabled={!formData?.date}
                    className="form-control"
                    type="time"
                    id="toInput"
                    name="ends"
                    value={formData.ends}
                    onChange={handleInputChange}
                    style={{
                      padding: '.6rem',
                      fontSize: '1.7rem',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
              </Col>
              <Col lg={12} className="mt-5">
                <div className="hstack gap-2 justify-content-center mb-5">
                  {updateWeeklyTrainingIsLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={updateWeeklyTrainingIsLoading}
                      type="button"
                      onClick={handleSubmit}
                      className="button p-3 text-light"
                    >
                      {btn}
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EdditWeeklyTrainingModal;
