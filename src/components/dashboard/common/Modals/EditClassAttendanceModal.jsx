import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import {
  getAllClassAttendence,
  updateClassAttendance,
} from '@/slices/dashboard/adminDashboard/Actions/classAttendaceActions';
import { getAllPlayer } from '@/slices/dashboard/adminDashboard/Actions/playerActions';
import { getAllTrainer } from '@/slices/dashboard/adminDashboard/Actions/trainerActions';
import { emptyUpdateClassAttendance } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const EditClassAttendanceModal = ({ id, setEditModal, editModal }) => {
  // api setup with redux
  const dispatch = useDispatch();

  const {
    data: updateClassAttendanceData,
    isLoading: updateClassAttendanceIsLoading,
    error: updateClassAttendanceError,
  } = useSelector((state) => state.AdminDashboard.updateClassAttendance);

  useEffect(() => {
    if (
      updateClassAttendanceData?.message &&
      updateClassAttendanceError === null
    ) {
      toast.success(updateClassAttendanceData?.message);
      dispatch(emptyUpdateClassAttendance());
      dispatch(getAllClassAttendence());
      resetForm();
    }
    if (updateClassAttendanceError) {
      toast.error(updateClassAttendanceError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    updateClassAttendanceData?.message,
    updateClassAttendanceError,
  ]);

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

    setSelectedOption({
      trainers: [],
      team_name: [],
      players: [],
    });

    setEditModal(!editModal);
  };

  const [formData, setFormData] = useState({
    name: '',
    trainers: '',
    class_starts: '',
    class_ends: '',
    team_id: '',
    team_name: '',
    players: '',
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

  // handle set date
  const handleSetDate = (fieldName, dateStr) => {
    setFormData({
      ...formData,
      [fieldName]: dateStr,
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let classAttendanceData = {};

    if (formData?.name) {
      classAttendanceData = {
        ...classAttendanceData,
        name: formData?.name,
      };
    }
    if (formData?.trainers) {
      classAttendanceData = {
        ...classAttendanceData,
        trainers: formData?.trainers,
      };
    }

    if (formData?.class_starts) {
      classAttendanceData = {
        ...classAttendanceData,
        class_starts: formData?.class_starts,
      };
    }
    if (formData?.class_ends) {
      classAttendanceData = {
        ...classAttendanceData,
        class_ends: formData?.class_ends,
      };
    }
    if (formData?.team_id) {
      classAttendanceData = {
        ...classAttendanceData,
        team_id: formData?.team_id,
      };
    }
    if (formData?.team_name) {
      classAttendanceData = {
        ...classAttendanceData,
        team_name: formData?.team_name,
      };
    }
    if (formData?.players) {
      classAttendanceData = {
        ...classAttendanceData,
        players: formData?.players,
      };
    }

    const mainData = { ...classAttendanceData, id };

    dispatch(updateClassAttendance(mainData))
      .then(() => {
        toast.success(updateClassAttendanceData?.message);
      })
      .catch((error) => {
        console.error('Dispatch error:', error);
      });
  };

  return (
    <div>
      {/* success modal */}
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={editModal}
        centered
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Edit Class Attendance</h5>
          <button
            type="button"
            onClick={() => setEditModal(!editModal)}
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
                </div>
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  {updateClassAttendanceIsLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={updateClassAttendanceIsLoading}
                      type="button"
                      className="button p-3 text-light"
                      onClick={handleSubmit}
                    >
                      Update
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

export default EditClassAttendanceModal;
