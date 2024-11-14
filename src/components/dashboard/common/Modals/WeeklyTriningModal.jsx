import {
  addWeeklyTrainingSchedule,
  getAllWeeklyTrainingSchedule,
} from '@/slices/dashboard/adminDashboard/Actions/weeklyTrainingScheduleActions';
import { emptyaddWeeklyTrainingScheduleData } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const WeeklyTriningModal = ({
  weeklyScheduleModal,
  setWeeklyScheduleModal,
}) => {
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.AdminDashboard.trainingScheduleData
  );
  useEffect(() => {
    if (typeof data === 'object' && data !== null) {
      const name = data?.data?.trainingschedule;
      const team = data?.data?.addteams?.id;

      setFormData((prevFormData) => ({
        ...prevFormData,
        name: name,
        team: team,
      }));
    } else {
      //
    }
  }, [data]);

  const {
    data: weeklyData,
    isLoading: weeklyIsLoading,
    error: weeklyError,
  } = useSelector((state) => state.AdminDashboard.addWeeklyTrainingSchedule);

  useEffect(() => {
    if (weeklyData?.message && weeklyError === null) {
      toast.success(weeklyData?.message);
      dispatch(getAllWeeklyTrainingSchedule());
      dispatch(emptyaddWeeklyTrainingScheduleData());
      setTimeout(() => {
        resetForm();
      }, 1000);
    }
    if (weeklyError) {
      toast.error(weeklyError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeklyData]);

  const [formData, setFormData] = useState({
    status: '',
    vanue: '',
    from: '',
    date: '',
    to: '',
    day: '',
  });

  //  error state
  const [errors, setErrors] = useState({});

  // for input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const weeklyTrainingAllData = {
      name: formData?.name,
      team: formData?.team,
      day: formData?.day,
      status: formData?.status,
      vanue: formData?.vanue,
      date: [
        {
          date: formData?.date,
          starts_time: formData?.from,
          end_time: formData?.to,
        },
      ],
    };



    // Perform form validation
    const newErrors = {};

    // Select status validation
    if (!formData.status || !selectedOptions || selectedOptions.length === 0) {
      newErrors.status = 'Please select at least one option';
    }
    // Select day validation
    if (!formData.day || !selectedOptions || selectedOptions.length === 0) {
      newErrors.day = 'Please select a Day First';
    }

    if (!formData.vanue) {
      newErrors.vanue = 'Vanue is required';
    }

    // start from
    if (!formData.from || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(formData.from)) {
      newErrors.from = 'Please enter a valid time in HH:MM format';
    }

    // end to
    if (!formData.to || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(formData.to)) {
      newErrors.to = 'Please enter a valid time in HH:MM format';
    }

    // Form is valid

    if (Object.keys(newErrors).length === 0) {
      dispatch(addWeeklyTrainingSchedule(weeklyTrainingAllData));
    } else {
      setErrors(newErrors);
    }
  };

  // select state and function
  const [selectedOptions, setSelectedOptions] = useState({
    status: [],
    day: [],
  });

  const handleSelect = (name, selected) => {
    const selectedValue = selected ? selected.label : ''; // Assuming the selected value has a 'label' property

    setFormData({
      ...formData,
      [name]: selectedValue,
    });

    setSelectedOptions({
      ...selectedOptions,
      [name]: selectedValue,
    });

    setSelectedOptions(selectedValue); // Update the input field value

    // Clear the form error for the select team
    setErrors({
      ...errors,
      [name]: '',
    });
  };

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

  // close button function
  const resetForm = () => {
    setFormData({
      status: '',
      vanue: '',
      from: '',
      date: '',
      to: '',
      day: '',
    });

    // Clear the error messages
    setErrors({});
    setSelectedOptions({
      status: [],
      day: [],
    });

    setWeeklyScheduleModal(!weeklyScheduleModal);
  };

  return (
    <div>
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={weeklyScheduleModal}
        centered
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Weekly Training Schedule</h5>
          <button
            type="button"
            onClick={resetForm}
            className="btn-close fs-1"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          <Form id="player-form">
            <Col>
              <Col xl={8} className="align-middle mx-auto">
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
                  {errors.day && (
                    <div className="text-danger">{errors.day}</div>
                  )}
                </div>
              </Col>
              <Row className="mb-5">
                {/* <h3  className="text-danger">
                    {item.Day}
                  </h3> */}

                <Col xl={4}>
                  <div className="mb-3">
                    <Label htmlFor="statusInput" className="form-label">
                      Status
                    </Label>
                    <div>
                      <Select
                        options={optionList}
                        id="statusInput"
                        name="status"
                        value={selectedOptions.status}
                        onChange={(selected) =>
                          handleSelect('status', selected)
                        }
                      ></Select>
                    </div>
                    {errors.status && (
                      <div className="text-danger">{errors.status}</div>
                    )}
                  </div>
                </Col>
                <Col lg={8}>
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
                  {errors.vanue && (
                    <div className="text-danger">{errors.vanue}</div>
                  )}
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
                    {errors.date && (
                      <div className="text-danger">{errors.date}</div>
                    )}
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
                      name="from"
                      value={formData.from}
                      onChange={handleInputChange}
                      style={{
                        padding: '.6rem',
                        fontSize: '1.7rem',
                        border: '1px solid #ccc',
                      }}
                    />
                    {errors.from && (
                      <div className="text-danger">{errors.from}</div>
                    )}
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
                      name="to"
                      value={formData.to}
                      onChange={handleInputChange}
                      style={{
                        padding: '.6rem',
                        fontSize: '1.7rem',
                        border: '1px solid #ccc',
                      }}
                    />
                    {errors.to && (
                      <div className="text-danger">{errors.to}</div>
                    )}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-center">
                    {weeklyIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="button p-3 text-light"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default WeeklyTriningModal;
