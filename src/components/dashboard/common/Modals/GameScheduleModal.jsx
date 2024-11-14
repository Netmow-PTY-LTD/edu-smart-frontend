/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import {
  add_game_shcedule,
  get_all_game_shcedule,
} from '@/slices/dashboard/adminDashboard/Actions/game_scheduleActions';
import { emptyGameSchedule } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const GameScheduleModalForm = ({
  isOpen,
  toggle,
  title,
  btn,
  backBtn,
  set_sponsor_modal,
}) => {
  const [fieldCount, setFieldCount] = useState(0);
  const [date, setDate] = useState([
    {
      id: 0,
    },
  ]);

  // api setup with redux
  const dispatch = useDispatch();
  const [hostTeamList, setHostTeamList] = useState([]);
  const [guestTeamList, setGuestTeamList] = useState([]);
  const [selectedHostTeam, setSelectedHostTeam] = useState('');
  const [selectedGuestTeam, setSelectedGuestTeam] = useState('');
  const [selectOption, setSelectOption] = useState('');
  //  error state
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    host_team_name: '',
    host_team_id: '',
    description: '',
    external_team: '',
    guest_team_name: '',
    guest_team_id: '',
    status: '',
    title: '',
    vanue: '',
    game_name: '',
    date: [],
    image: '',
  });

  const { data, isLoading, error } = useSelector(
    (state) => state.AdminDashboard.addGame_schedule
  );

  useEffect(() => {
    dispatch(emptyGameSchedule());
  }, [dispatch]);

  useEffect(() => {
    if (data?.message && error === null) {
      toast.success(data?.message);
      setTimeout(() => {
        dispatch(get_all_game_shcedule());
        resetForm();
        dispatch(emptyGameSchedule());
      }, 500);
    }
    if (error) {
      toast.error(error);
    }
  }, [data]);

  // get all team list
  const allTeams = useSelector((state) => state.AdminDashboard.addNewTeam);

  useEffect(() => {
    dispatch(getAllTeam());
  }, [dispatch]);

  useEffect(() => {
    if (allTeams?.data?.length > 0) {
      const mappedData = allTeams?.data?.map((teams) => ({
        label: teams.name,
        value: { host_team_name: teams.name, host_team_id: teams._id },
      }));

      setHostTeamList(mappedData);
    }
  }, [allTeams]);

  useEffect(() => {
    if (selectedHostTeam && allTeams?.data?.length > 0) {
      const filteredData = allTeams?.data?.filter(
        (f) => f?._id !== selectedHostTeam
      );

      const mappedData = filteredData?.map((teams) => ({
        label: teams.name,
        value: { guest_team_name: teams.name, guest_team_id: teams._id },
      }));
      setGuestTeamList(mappedData);
    }
  }, [selectedHostTeam, allTeams]);

  useEffect(() => {
    if (allTeams?.data?.length > 0) {
      const mappedData = allTeams?.data?.map((teams) => ({
        label: teams.name,
        value: { guest_team_name: teams.name, guest_team_id: teams._id },
      }));

      setGuestTeamList(mappedData);
    }
  }, [allTeams]);

  useEffect(() => {
    if (selectedGuestTeam && guestTeamList?.length > 0) {
      const filteredData = allTeams?.data?.filter(
        (f) => f?._id !== selectedGuestTeam
      );
      const mappedData = filteredData?.map((teams) => ({
        label: teams.name,
        value: { host_team_name: teams.name, host_team_id: teams._id },
      }));
      setHostTeamList(mappedData);
    }
  }, [selectedGuestTeam, allTeams]);

  // for input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Update the form data
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear the form error
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleTitleChange = (e, index) => {
    const { value } = e.target;

    setDate((prevScheduleName) =>
      prevScheduleName.map((sche) =>
        sche.id === index ? { ...sche, name: value } : sche
      )
    );
  };

  const handleNewDate = (name, value, index) => {
    if (name === 'date') {
      const formattedDate = new Date(value[0]).toDateString();
      const dateObject = date?.filter((d) => {
        if (d.id === index) {
          d.date = formattedDate;
        }
        return d;
      });

      setDate(dateObject);
    } else {
      const dateObject = date?.filter((d) => {
        if (d.id === index) {
          if (name === 'start_time') {
            d.start_time = value;
          }
          if (name === 'end_time') {
            d.end_time = value;
          }
        }
        return d;
      });

      setDate(dateObject);
    }
  };

  // select state and function
  const [selectedOption, setSelectedOption] = useState({
    host_team_name: null,
    status: null,
    guest_team_name: null,
  });

  const handleSelect = (name, selected) => {
    if (
      (name === 'selectOption' && selected?.value === 'external') ||
      (name === 'selectOption' && selected?.value === 'internal')
    ) {
      setSelectOption({
        [name]: selected.value,
      });
    }

    if (
      name !== 'host_team_name' &&
      name !== 'host_team_id' &&
      name !== 'guest_team_name' &&
      name !== 'guest_team_id'
    ) {
      setFormData({
        ...formData,
        [name]: selected ? selected.value : '',
      });
    } else {
      setFormData({
        ...formData,
        host_team_name: selected ? selected.value?.host_team_name : '',
        host_team_id: selected ? selected.value?.host_team_id : '',
        guest_team_name: selected ? selected.value?.guest_team_name : '',
        guest_team_id: selected ? selected.value?.guest_team_id : '',
      });

      if (name === 'host_team_name') {
        setSelectedHostTeam(selected.value?.host_team_id);
        setFormData({
          ...formData,
          host_team_name: selected ? selected.value?.host_team_name : '',
          host_team_id: selected ? selected.value?.host_team_id : '',
        });
      }
      if (name === 'guest_team_name') {
        setSelectedGuestTeam(selected.value?.guest_team_id);
        setFormData({
          ...formData,
          guest_team_name: selected ? selected.value?.guest_team_name : '',
          guest_team_id: selected ? selected.value?.guest_team_id : '',
        });
      }
    }

    setSelectedOption({
      ...selectedOption,
      [name]: selected,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const optionList = [
    { value: 'active', label: 'active' },
    { value: 'inactive', label: 'inactive' },
  ];

  const handleTeamGameScheduleSubmit = (e) => {
    e.preventDefault();

    let gameScheduleAllData = {
      host_team_name: formData.host_team_name,
      host_team_id: formData.host_team_id,
      status: formData.status,
      vanue: formData.vanue,
      game_name: formData.game_name,
      date: date,
      image: formData.image,
      description: formData.description,
    };

    if (formData?.external_team) {
      gameScheduleAllData = {
        ...gameScheduleAllData,
        external_team: formData.external_team,
      };
    }

    if (
      !formData?.external_team &&
      formData?.guest_team_name &&
      formData?.guest_team_id
    ) {
      gameScheduleAllData = {
        ...gameScheduleAllData,
        guest_team_name: formData.guest_team_name,
        guest_team_id: formData.guest_team_id,
      };
    }

    const treamedData = new FormData();
    Object.entries(gameScheduleAllData).forEach(([key, value]) => {
      if (key === 'date') {
        treamedData.append(key, JSON.stringify(value));
      } else {
        treamedData.append(key, value);
      }
    });

    // Perform form validation
    const newErrors = {};

    // for the game schedule
    if (!formData.host_team_name) {
      newErrors.host_team_name = 'Team Is Required';
    }

    if (!formData.guest_team_name && !formData.external_team) {
      newErrors.guest_team_name = 'Opponent Team Is Required';
      newErrors.external_team = 'Opponent Team Is Required';
    }

    if (!formData.status) {
      newErrors.status = 'Please select Status';
    }

    // Check if Venue is empty
    if (!formData.vanue) {
      newErrors.vanue = 'Venue is required';
    }

    // Check if Game Name is empty
    if (!formData.game_name) {
      newErrors.game_name = 'Game Name is required';
    }

    // Check if Date is empty
    // if (!formData.date) {
    //   newErrors.date = 'Date is required';
    // }

    // File input validation
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    // Form is valid
    if (Object.keys(newErrors).length === 0) {
      dispatch(add_game_shcedule(treamedData));
    } else {
      setErrors(newErrors);
    }
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setFieldCount(fieldCount + 1);
    const allDateObject = [
      ...date,
      {
        id: fieldCount + 1,
        date: '',
        start_time: '',
        end_time: '',
        name: '',
      },
    ];
    setDate(allDateObject);
  };

  const handleRemoveField = (e) => {
    e.preventDefault();
    if (fieldCount > 0) {
      setFieldCount(fieldCount - 1);
      const newArray = date.slice(0, date.length - 1);
      setDate(newArray);
    }
  };

  const renderFields = () => {
    const fields = [];
    for (let i = 0; i < fieldCount + 1; i++) {
      fields.push(
        <React.Fragment key={i}>
          <div className="d-flex align-items-center justify-content-center text-danger my-3">
            *Date, Start time And End time Is Required*
          </div>
          <Col xxl={12}>
            <div className="mb-3">
              <Label htmlFor={`titleInput${i}`} className="form-label">
                Title
              </Label>
              <Input
                type="text"
                className="form-control"
                id={`titleInput${i}`}
                name={`title${i}`}
                value={date?.title}
                placeholder="Enter a title"
                onChange={(e) => handleTitleChange(e, i)}
              />
            </div>
          </Col>
          <Col xxl={4}>
            <div className="mb-3">
              <Label htmlFor={`dateInput${i}`} className="form-label">
                Date
              </Label>
              <Flatpickr
                className="form-control"
                id={`dateInput${i}`}
                name={`date${i}`}
                options={{
                  dateFormat: 'd M, Y',
                }}
                value={formData?.date && formData.date[i]?.date}
                // onChange={(selectedDates, value, instance) =>
                //   handleSetDate('date', value)
                // }
                onChange={(value) => handleNewDate('date', value, i)}
              />
              {errors.date && <div className="text-danger">{errors.date}</div>}
            </div>
          </Col>
          <Col xxl={4} className="mb-2">
            <div>
              <Label htmlFor={`startTimeInput${i}`} className="form-label">
                Starts Time
              </Label>
              <input
                // disabled={!formData?.date}
                className="form-control"
                type="time"
                id={`startTimeInput${i}`}
                name={`start_time${i}`}
                value={date[i]?.start_time}
                // onChange={(e) => handleSetDate('start_time', e.target.value)}
                onChange={(e) => handleNewDate('start_time', e.target.value, i)}
              />
              {errors.start_time && (
                <div className="text-danger">{errors.start_time}</div>
              )}
            </div>
          </Col>
          <Col xxl={4} className="mb-2">
            <div>
              <Label htmlFor={`endTimeInput${i}`} className="form-label">
                End Time
              </Label>
              <input
                // disabled={!formData?.date}
                className="form-control"
                type="time"
                id={`endTimeInput${i}`}
                name={`end_time${i}`}
                value={date[i]?.end_time}
                // onChange={(e) => handleSetDate('end_time', e.target.value)}
                onChange={(e) => handleNewDate('end_time', e.target.value, i)}
              />
              {errors.end_time && (
                <div className="text-danger">{errors.end_time}</div>
              )}
            </div>
          </Col>
        </React.Fragment>
      );
    }
    return fields;
  };

  // close button function
  const resetForm = () => {
    setFormData({
      host_team_name: '',
      host_team_id: '',
      description: '',
      external_team: '',
      guest_team_name: '',
      guest_team_id: '',
      status: '',
      vanue: '',
      game_name: '',
      date: [{ date: '', start_time: '', end_time: '' }],

      image: '',
    });
    setSelectOption({});
    setDate([
      {
        id: 0,
      },
    ]);

    // Clear the error messages
    setErrors({});
    setSelectedOption({
      host_team_name: null,
      status: null,
      guest_team_name: null,
    });

    toggle();
  };

  const selectList = [
    {
      value: 'external',
      label: 'external',
    },
    { value: 'internal', label: 'internal' },
  ];

  return (
    <div>
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={isOpen}
        centered
        size="lg"
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
          <Form id="player-form">
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="host_team_nameInput" className="form-label">
                    Select Team
                  </Label>
                  <span className="text-danger">*</span>

                  <Select
                    options={hostTeamList}
                    id="host_team_nameInput"
                    name="host_team_name"
                    value={selectedOption.host_team_name}
                    onChange={(selected) =>
                      handleSelect('host_team_name', selected)
                    }
                  />

                  {errors.host_team_name && (
                    <div className="text-danger">{errors.host_team_name}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="selecoptionInput" className="form-label">
                    Opponent's Team
                  </Label>
                  <span className="text-danger">*</span>

                  <Select
                    options={selectList}
                    id="selecoption"
                    name="selectOption"
                    onChange={(selected) =>
                      handleSelect('selectOption', selected)
                    }
                  />

                  {selectOption?.selectOption === 'internal' ? (
                    <Select
                      className="mt-2"
                      options={guestTeamList}
                      id="guest_team_nameInput"
                      name="guest_team_name"
                      value={selectedOption.guest_team_name}
                      onChange={(selected) =>
                        handleSelect('guest_team_name', selected)
                      }
                    />
                  ) : selectOption?.selectOption === 'external' ? (
                    <Input
                      type="text"
                      className="form-control mt-2"
                      name="external_team"
                      placeholder="Please Input Team Name"
                      value={formData?.external_team}
                      onChange={handleInputChange}
                    />
                  ) : (
                    ''
                  )}

                  {errors.guest_team_name && errors.external_team && (
                    <div className="text-danger">
                      {errors.guest_team_name || errors.external_team}
                    </div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="vanueInput" className="form-label">
                    Vanue
                  </Label>
                  <span className="text-danger">*</span>

                  <Input
                    type="text"
                    className="form-control"
                    id="vanueInput"
                    name="vanue"
                    value={formData.vanue}
                    onChange={handleInputChange}
                  />
                  {errors.vanue && (
                    <div className="text-danger">{errors.vanue}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="game_nameInput" className="form-label">
                    Game Name
                  </Label>
                  <span className="text-danger">*</span>

                  <Input
                    type="text"
                    className="form-control"
                    id="game_nameInput"
                    name="game_name"
                    value={formData.game_name}
                    onChange={handleInputChange}
                  />
                  {errors.game_name && (
                    <div className="text-danger">{errors.game_name}</div>
                  )}
                </div>
              </Col>

              {renderFields()}
              <Col xxl={12}>
                <div className="d-flex align-items-center justify-content-center gap-5 my-3">
                  <button
                    className="badge bg-success-subtle px-2 fs-4 text-success"
                    onClick={handleAddField}
                  >
                    Add Date Field
                  </button>
                  <button
                    className="badge bg-danger-subtle px-2 fs-4 text-danger"
                    onClick={handleRemoveField}
                  >
                    Remove Date Field
                  </button>
                </div>
              </Col>

              <Col lg={12}>
                <div className="mb-3 pb-2">
                  <Label htmlFor="descriptionTextarea" className="form-label">
                    Description
                  </Label>
                  <span className="text-danger">*</span>
                  <textarea
                    className="form-control"
                    name="description"
                    id="descriptionTextarea"
                    rows="5"
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
              </Col>

              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="imageInput" className="form-label">
                    Image{' '}
                    <small className="mb-2 fs-10 text-danger">
                      (Max. 500px X 500px, Max. 2MB, valid exts: png, jpg, jpeg)
                    </small>
                  </Label>
                  <Input
                    type="file"
                    className="form-control"
                    id="imageInput"
                    name="image"
                    onChange={handleInputChange}
                  />

                  {formData?.image && (
                    <div>
                      <img
                        style={{
                          maxHeight: '70px',
                          marginTop: '10px',
                        }}
                        src={
                          formData?.image &&
                          URL.createObjectURL(formData?.image)
                        }
                        alt="img"
                      />
                    </div>
                  )}
                  {errors.image && (
                    <div className="text-danger">{errors.image}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="statusInput" className="form-label">
                    Status
                  </Label>
                  <span className="text-danger">*</span>
                  <Select
                    options={optionList}
                    id="statusInput"
                    name="status"
                    value={selectedOption.status}
                    onChange={(selected) => handleSelect('status', selected)}
                  />

                  {errors.status && (
                    <div className="text-danger">{errors.status}</div>
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
                <div className="hstack gap-2 justify-content-end mt-3">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={isLoading}
                      type="button"
                      className="button p-3 text-light"
                      onClick={handleTeamGameScheduleSubmit}
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

export default GameScheduleModalForm;
