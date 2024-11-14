/* eslint-disable react-hooks/exhaustive-deps */
import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import {
  addClassAttendance,
  getAllClassAttendence,
} from '@/slices/dashboard/adminDashboard/Actions/classAttendaceActions';
import { getAllPlayer } from '@/slices/dashboard/adminDashboard/Actions/playerActions';
import { getAllTrainer } from '@/slices/dashboard/adminDashboard/Actions/trainerActions';
import { emptyClass } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const ClassAttendanceModalForm = ({
  isOpen,
  toggle,
  title,
  btn,
  backBtn,
  setClass_modal,
  class_modal,
}) => {
  // api setup with redux
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state) => state.AdminDashboard.addClassAttendance
  );

  // get all trainer list
  const allTrainer = useSelector((state) => state.AdminDashboard.trainer);
  useEffect(() => {
    dispatch(getAllTrainer());
  }, [dispatch]);
  const [trainerList, setTrainerList] = useState([]);
  useEffect(() => {
    if (allTrainer.data?.length > 0) {
      const mappedData = allTrainer.data.map((trainer) => ({
        label: trainer.name,
        value: trainer.email,
      }));

      setTrainerList(mappedData);
    }
  }, [allTrainer]);

  // get all team list
  const allTeams = useSelector((state) => state.AdminDashboard.addNewTeam);
  useEffect(() => {
    dispatch(getAllTeam());
  }, [dispatch]);
  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    if (allTeams?.data?.length > 0) {
      const mappedData = allTeams.data.map((teams) => ({
        label: teams.name,
        value: { team_name: teams.name, team_id: teams._id },
      }));

      setTeamList(mappedData);
    }
  }, [allTeams]);

  // get all player list
  const allPlayer = useSelector((state) => state.AdminDashboard.player);
  useEffect(() => {
    dispatch(getAllPlayer());
  }, [dispatch]);
  const [playerList, setPlayerList] = useState([]);
  useEffect(() => {
    if (allPlayer.data?.length > 0) {
      const mappedData = allPlayer.data.map((player) => ({
        label: player.name,
        value: player.email,
      }));

      setPlayerList(mappedData);
    }
  }, [allPlayer]);

  useEffect(() => {
    dispatch(emptyClass());
  }, [dispatch]);

  // close button function
  const resetForm = () => {
    setFormData({
      name: '',
      trainers: '',
      class_starts: '',
      class_ends: '',
      team_name: '',
      players: '',
    });

    // Clear the error messages
    setErrors({});
    setSelectedOption({
      trainers: [],
      team_name: [],
      players: [],
    });

    // toggle();
    setClass_modal(!class_modal);
  };

  useEffect(() => {
    const handleCloseForm = () => {
      setFormData({
        name: '',
        trainers: '',
        class_starts: '',
        class_ends: '',
        team_name: '',
        players: '',
      });

      // Clear the error messages
      setErrors({});
      setSelectedOption({
        trainers: [],
        team_name: [],
        players: [],
      });

      setClass_modal(false);
    };

    if (data?.message && error === null) {
      toast.success(data?.message);

      setTimeout(() => {
        handleCloseForm();
        dispatch(getAllClassAttendence());
        dispatch(emptyClass());
      }, 500);
    }
    if (error) {
      toast.error(error);
    }
  }, [data]);

  const [formData, setFormData] = useState({
    name: '',
    trainers: '',
    class_starts: '',
    class_ends: '',
    team_id: '',
    team_name: '',
    players: '',
  });

  //  error state
  const [errors, setErrors] = useState({});

  // for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the form error
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // handle set date
  const handleSetDate = (fieldName, dateStr) => {
    setFormData({
      ...formData,
      [fieldName]: dateStr,
    });

    setErrors({
      ...errors,
      [fieldName]: '',
    });
  };

  // select state and function
  const [selectedOption, setSelectedOption] = useState({
    trainers: null,
    team_name: null,
    players: null,
  });

  const handleSelect = (name, selected) => {
    if (name !== 'team_name' && name !== 'team_id') {
      setFormData({
        ...formData,
        [name]: selected ? selected.value : '',
      });
    } else {

      setFormData({
        ...formData,
        team_name: selected ? selected.value?.team_name : '',
        team_id: selected ? selected.value?.team_id : '',
      });
    }

    setSelectedOption({
      ...selectedOption,
      [name]: selected,
    });

    // Clear the form error for the select team
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    // Perform form validation
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Class Name is required';
    }

    // Select trainers validation
    if (!formData.trainers || !selectedOption || selectedOption.length === 0) {
      newErrors.trainers = 'Please select at least one option';
    }

    if (!formData.class_starts) {
      newErrors.class_starts = 'Start Date is required';
    }

    if (!formData.class_ends) {
      newErrors.class_ends = 'End Date is required';
    }

    if (
      !formData.team_name ||
      !formData.team_name ||
      formData.team_name.length === 0
    ) {
      newErrors.team_name =
        'Please select at least one option for opponents team';
    }

    if (
      !formData.players ||
      !formData.players ||
      formData.players.length === 0
    ) {
      newErrors.players =
        'Please select at least one option for opponents team';
    }

    // Form is valid
    if (Object.keys(newErrors).length === 0) {
      //  can submit or handle the data here
      dispatch(addClassAttendance(formData));

    } else {
      // Form has errors, update the errors state
      setErrors(newErrors);
    }
  };

  return (
    <div>
      {/* success modal */}
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={isOpen}
        // onClick={toggle}
        centered
      >
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
          <Form id="classAttendance-form">
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="nameInput" className="form-label">
                    Class Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="traineresInput" className="form-label">
                    Trainers
                  </Label>
                  <Select
                    options={trainerList}
                    id="trainersInput"
                    name="trainers"
                    value={selectedOption.trainers}
                    onChange={(selected) => handleSelect('trainers', selected)}
                  />

                  {errors.trainers && (
                    <div className="text-danger">{errors.trainers}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="class_startsInput" className="form-label">
                    Class Starts From
                  </Label>
                  <Flatpickr
                    className="form-control"
                    id="class_startsInput"
                    name="class_starts"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                    value={formData.class_starts}
                    onChange={(selectedDates, dateStr, instance) =>
                      handleSetDate('class_starts', dateStr)
                    }
                  />
                  {errors.class_starts && (
                    <div className="text-danger">{errors.class_starts}</div>
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="dateOfBirthInput" className="form-label">
                    Class Ends At
                  </Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                    value={formData.class_ends}
                    name="class_ends"
                    onChange={(selectedDates, dateStr, instance) =>
                      handleSetDate('class_ends', dateStr)
                    }
                  />
                  {errors.class_ends && (
                    <div className="text-danger">{errors.class_ends}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="teamsInput" className="form-label">
                    Assign Teams
                  </Label>
                  <Select
                    options={teamList}
                    id="teamsInput"
                    name="team_name"
                    value={selectedOption.team_name}
                    onChange={(selected) => handleSelect('team_name', selected)}
                  />

                  {errors.team_name && (
                    <div className="text-danger">{errors.team_name}</div>
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="playersInput" className="form-label">
                    Assign Players
                  </Label>
                  <Select
                    options={playerList}
                    id="playersInput"
                    name="players"
                    value={selectedOption.players}
                    onChange={(selected) => handleSelect('players', selected)}
                  />

                  {errors.players && (
                    <div className="text-danger">{errors.players}</div>
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="hstack gap-2 justify-content-start">
                  {/* {isLoading ? (
                                <Loader />
                              ) : (
                                <button
                                //   disabled={isLoading}
                                  type="button"
                                  className="button p-3 text-light"
                                //   onClick={handleAddGuardian}
                                >
                                  Add
                                </button>
                              )} */}
                  {backBtn ? (
                    <button
                      //   disabled={isLoading}
                      type="button"
                      className=" p-3 text-primary"
                      //   onClick={handleAddGuardian}
                      onClick={toggle}
                    >
                      <i className="ri-arrow-left-line align-bottom text-muted pe-2"></i>
                      {backBtn}
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={isLoading}
                      type="button"
                      className="button p-3 text-light"
                      onClick={handleSubmit}
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

export default ClassAttendanceModalForm;
