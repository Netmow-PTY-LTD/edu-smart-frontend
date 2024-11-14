import {
  addCustomTrainingSchedule,
  getAllCustomTrainingSchedule,
} from '@/slices/dashboard/adminDashboard/Actions/customTrainingScheduleActions';
import {
  emptyaddCustomTrainingScheduleData,
  emptyaddTrainingScheduleData,
} from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const CustomTrainingModal = ({
  customTrainingScheduleModal,
  setCustomTrainingScheduleModal,
  title,
  resetCustomForm,
}) => {
  const [fieldCount, setFieldCount] = useState(0);
  const [date, setDate] = useState([
    {
      id: 0,
    },
  ]);
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
    data: customData,
    isLoading: customIsLoading,
    error: customError,
  } = useSelector((state) => state.AdminDashboard.addCustomTrainingSchedule);

  useEffect(() => {
    if (customData?.message && customError === null) {
      toast.success(customData?.message);
      dispatch(getAllCustomTrainingSchedule());
      dispatch(emptyaddCustomTrainingScheduleData());
      dispatch(emptyaddTrainingScheduleData());
      setTimeout(() => {
        resetForm();
        // resetCustomForm();
      }, 1000);
    }
    if (customError) {
      toast.error(customError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customData]);

  const [formData, setFormData] = useState({
    status: '',
    vanue: '',
    title: '',
    start_time: '',
    end_time: '',
    date: [{ date: '', start_time: '', end_time: '' }],
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
  const [selectedOptions, setSelectedOptions] = useState({
    status: null,
  });

  const handleSelect = (name, selected) => {
    const selectedValue = selected ? selected.value : '';

    setFormData({
      ...formData,
      [name]: selectedValue,
    });

    setSelectedOptions({
      ...selectedOptions,
      [name]: selected,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const optionList = [
    { value: 'open', label: 'open' },
    { value: 'closed', label: 'closed' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const customTrainingAllData = {
      name: formData?.name,
      team: formData?.team,
      status: formData?.status,
      vanue: formData?.vanue,
      date: date,
    };

    // Perform form validation
    const newErrors = {};

    // Select status validation
    if (!formData.status || !selectedOptions || selectedOptions.length === 0) {
      newErrors.status = 'Please select at least one option';
    }

    // if (!formData.date) {
    //   newErrors.date = ' Date is required';
    // }

    if (!formData.vanue) {
      newErrors.vanue = 'Vanue is required';
    }

    // Form is valid
    if (Object.keys(newErrors).length === 0) {
      dispatch(addCustomTrainingSchedule(customTrainingAllData));
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
                value={date[i]?.date}
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
      status: '',
      vanue: '',
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
    setSelectedOptions({
      status: null,
    });
    setFieldCount(0);
    setCustomTrainingScheduleModal(!customTrainingScheduleModal);
    // resetCustomForm();
  };

  return (
    <div>
      {/* success modal */}
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={customTrainingScheduleModal}
        centered
        scrollable
        size="lg"
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={() => resetForm()}
            className="btn-close fs-1"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          <Form id="player-form">
            <Col>
              <Row>
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
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="vanueInput" className="form-label">
                      Vanue
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

                <Col lg={12} className="mt-5">
                  <div className="hstack gap-2 justify-content-center mb-5">
                    {customIsLoading ? (
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

export default CustomTrainingModal;
