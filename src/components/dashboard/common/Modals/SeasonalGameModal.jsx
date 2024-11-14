/* eslint-disable @next/next/no-img-element */
import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import {
  addSeasonalGame,
  getAllSeasonalGame,
} from '@/slices/dashboard/adminDashboard/Actions/seasonalGameActions';
import { emptySeasonalGame } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const SeasonalGameModalForm = ({
  isOpen,
  toggle,
  title,
  btn,
  backBtn,
  specialEvents,
  setEvent_modal,
}) => {
  const [fieldCount, setFieldCount] = useState(0);
  const [date, setDate] = useState([
    {
      id: 0,
    },
  ]);

  // api setup for event game with redux
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state) => state.AdminDashboard.addSeasonalGame
  );

  useEffect(() => {
    dispatch(emptySeasonalGame());
  }, [dispatch]);

  useEffect(() => {
    if (data?.message && error === null) {
      toast.success(data?.message);
      setTimeout(() => {
        resetForm();
        dispatch(getAllSeasonalGame());
        dispatch(emptySeasonalGame());
      }, 500);
    }
    if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // get all team list
  const allTeams = useSelector((state) => state.AdminDashboard.addNewTeam);
  useEffect(() => {
    dispatch(getAllTeam());
  }, [dispatch]);
  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    if (allTeams?.data.length > 0 && allTeams?.data) {
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
    image: '',
    title: '',
    description: '',
    date: [],
    notification: '',
    fees: '',
    visible_to: [],
    start_time: '',
    end_time: '',
  });

  //  error state
  const [errors, setErrors] = useState({});

  // for input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

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
    notification: null,
    visible_to: [],
  });

  const handleSelect = (name, selected) => {
    if (selected.value === 'Custom') {
      //
    } else {
      setFormData({
        ...formData,
        [name]: selected.value,
      });
    }

    if (selected.value === 'Custom' || name === 'visible_to') {
      setSelectedOption({
        ...selectedOption,
        visible_to: [selected.value],
      });
      setFormData({
        ...formData,
        visible_to: selected
          ? selected?.length > 0 && selected.map((option) => option.value)
          : [selected.value],
      });
    }

    if (selected.value === 'All Members' && name === 'visible_to') {
      setSelectedOption({
        ...selectedOption,
        visible_to: [selected.value],
      });
      setFormData({
        ...formData,
        visible_to: selected ? [selected.value] : '',
      });
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

  const notification = [
    {
      value: 'Push Notification And Email',
      label: 'Push Notification And Email',
    },
    { value: 'None', label: 'None' },
  ];

  const allMebmers = [
    {
      value: 'All Members',
      label: 'All Members',
    },
    { value: 'Custom', label: 'Custom' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const seasonalGameAllData = {
      name: formData.name,
      vanue: formData.vanue,
      image: formData.image,
      // title: scheduleName,
      date: date,
      notification: formData.notification,
      visible_to: formData.visible_to,
      fees: formData.fees,
      description: formData.description,
    };

    const treamedData = new FormData();
    Object.entries(seasonalGameAllData).forEach(([key, value]) => {
      if (key === 'visible_to' || key === 'date') {
        treamedData.append(key, JSON.stringify(value));
      } else {
        treamedData.append(key, value);
      }
    });

    // Perform form validation
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Event Name is required';
    }

    if (!formData.vanue) {
      newErrors.vanue = 'Event Vanue is required';
    }

    // File input validation
    // if (!formData.image) {
    //   newErrors.image = 'Please select a file';
    // }

    // if (formData.date.length === 0) {
    //   newErrors.date = 'Date is required & Must select starts and end time ';
    // }

    // Select notification validation
    if (
      !formData.notification ||
      !selectedOption ||
      selectedOption.length === 0
    ) {
      newErrors.notification = 'Please select at least one option';
    }

    // Select allmembers validation
    if (
      !formData.visible_to ||
      !selectedOption ||
      selectedOption.length === 0 ||
      formData.visible_to.length === 0
    ) {
      newErrors.visible_to = 'Select is required';
    }

    // Select fees validation
    if (!formData.fees) {
      newErrors.fees = 'Fees is required';
    }
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    // Form is valid
    if (Object.keys(newErrors).length === 0) {
      dispatch(addSeasonalGame(treamedData));
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
                value={formData?.date[i]?.date}
                placeholder="Choose a Date"
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
                // disabled={!formData?.date || formData.date.length === 0}
                className="form-control"
                type="time"
                id={`startTimeInput${i}`}
                name={`start_time${i}`}
                value={date[i]?.start_time}
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
      name: '',
      vanue: '',
      image: '',
      description: '',
      date: '',
      notification: '',
      visible_to: [],
      fees: '',
      start_time: '',
      end_time: '',
    });
    // Empty the date state

    setDate([
      {
        id: 0,
      },
    ]);

    // Clear the error messages
    setErrors({});
    setSelectedOption({
      notification: null,
      visible_to: [],
    });

    toggle();
  };

  return (
    <div>
      {/* success modal */}
      <Modal
        className=""
        id="addeventsmodalform"
        tabIndex="-1"
        isOpen={isOpen}
        centered
        size="lg"
        scrollable
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={() => resetForm()}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          <Form id="seasonalGame-form">
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="nameInput" className="form-label">
                    Event Name
                  </Label>
                  <span className="text-danger">*</span>
                  <Input
                    type="text"
                    id="nameInput"
                    className="form-control"
                    name="name"
                    placeholder="Enter Event Name"
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
                  <Label htmlFor="vanueInput" className="form-label">
                    Event Vanue
                  </Label>
                  <span className="text-danger">*</span>

                  <Input
                    type="text"
                    id="vanueInput"
                    className="form-control"
                    name="vanue"
                    value={formData.vanue}
                    placeholder="Enter Event Venue"
                    onChange={handleInputChange}
                  />
                  {errors.vanue && (
                    <div className="text-danger">{errors.vanue}</div>
                  )}
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
                    placeholder="Enter Event Description"
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
              </Col>

              <Col xl={12}>
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
                          typeof formData?.image === 'string'
                            ? formData?.image
                            : URL.createObjectURL(new Blob([formData?.image]))
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

              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="feesInput" className="form-label">
                    Fees
                  </Label>
                  <span className="text-danger">*</span>
                  <div>
                    <input
                      type="number"
                      id="feesInput"
                      className="form-control"
                      name="fees"
                      placeholder="Enter Event Fees"
                      value={formData.fees}
                      onChange={handleInputChange}
                    />
                    {errors.fees && (
                      <div className="text-danger">{errors.fees}</div>
                    )}
                  </div>
                </div>
              </Col>

              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="notificationInput" className="form-label">
                    Notification
                  </Label>
                  <span className="text-danger">*</span>
                  <div>
                    <Select
                      options={notification}
                      id="notificationInput"
                      name="notification"
                      value={selectedOption.notification}
                      onChange={(selected) =>
                        handleSelect('notification', selected)
                      }
                    />
                    {errors.notification && (
                      <div className="text-danger">{errors.notification}</div>
                    )}
                  </div>
                </div>
              </Col>

              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="allMebmersInput" className="form-label">
                    Visible To
                  </Label>
                  <span className="text-danger">*</span>

                  <div>
                    <Select
                      options={allMebmers}
                      placeholder="Please Select"
                      id="allMebmersInput"
                      name="visible_to"
                      className="mb-3"
                      onChange={(selected) =>
                        handleSelect('visible_to', selected)
                      }
                    />

                    <Select
                      options={teamList}
                      placeholder="Please Choose a Team"
                      name="visible_to"
                      onChange={(selected) =>
                        handleSelect('visible_to', selected)
                      }
                      isDisabled={
                        selectedOption.visible_to?.value === 'All Members' ||
                        selectedOption.visible_to?.length === 0
                      }
                      isSearchable
                      isMulti
                    />

                    {errors.visible_to && (
                      <div className="text-danger">{errors.visible_to}</div>
                    )}
                  </div>
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
                      id="eventssubmitbtn"
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

export default SeasonalGameModalForm;
