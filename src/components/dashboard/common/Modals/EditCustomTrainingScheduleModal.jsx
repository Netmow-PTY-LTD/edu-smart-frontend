import LoaderSpiner from '@/components/constants/Loader/Loader';
import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import {
  getAllCustomTrainingSchedule,
  updateCustomTrainingSchedule,
} from '@/slices/dashboard/adminDashboard/Actions/customTrainingScheduleActions';
import { emptyUpdateCustomTrainingSchedule } from '@/slices/dashboard/adminDashboard/reducer';
import { singleTrainingSchedule } from '@/slices/dashboard/commonApi/Actions/eventsActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const EditCustomTrainingScheduleModal = ({
  editModal,
  setEditModal,
  title,
  btn,
  id,
}) => {
  const [fieldCount, setFieldCount] = useState(20);
  const [date, setDate] = useState([]);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    date: [],
    vanue: '',
    status: '',
    team: '',
  });

  const {
    data: singleTrainingScheduleData,
    isLoading: singleTrainingScheduleIsLoading,
  } = useSelector((state) => state.CommonApi.singleTrainingSchedule);

  useEffect(() => {
    if (id) {
      dispatch(singleTrainingSchedule(id));
    }
  }, [dispatch, id]);

  const {
    data: updateCustomTrainingData,
    isLoading: updateCustomTrainingIsLoading,
    error: updateCustomTrainingError,
  } = useSelector((state) => state.AdminDashboard.updateCustomTrainingSchedule);

  useEffect(() => {
    dispatch(emptyUpdateCustomTrainingSchedule());
  }, [dispatch]);

  useEffect(() => {
    if (
      updateCustomTrainingData?.message &&
      updateCustomTrainingError === null
    ) {
      toast.success(updateCustomTrainingData?.message);
      dispatch(emptyUpdateCustomTrainingSchedule());
      dispatch(getAllCustomTrainingSchedule());
      resetForm();
    }
    if (updateCustomTrainingError) {
      toast.error(updateCustomTrainingError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateCustomTrainingData?.message, updateCustomTrainingError]);

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

  useEffect(() => {
    if (singleTrainingScheduleData && singleTrainingScheduleData[0]?._id) {
      const newDateId =
        singleTrainingScheduleData[0]?.date.length > 0 &&
        singleTrainingScheduleData[0]?.date.map((item, index) => ({
          ...item,
          id: index,
        }));

      setFormData({
        name: singleTrainingScheduleData[0]?.name,
        vanue: singleTrainingScheduleData[0]?.vanue,
        date: newDateId,
        status: singleTrainingScheduleData[0]?.status,
        team: singleTrainingScheduleData[0]?.team,
      });
      setDate(newDateId);
    }
  }, [singleTrainingScheduleData]);

  // for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTitleChange = (e, index) => {
    const { value } = e.target;

    setDate((prevScheduleName) =>
      prevScheduleName.map((sche) =>
        sche.id === index ? { ...sche, name: value } : sche
      )
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      date: prevFormData?.date.map((sche) =>
        sche.id === index ? { ...sche, name: value } : sche
      ),
    }));
  };

  const handleSetDate = (fieldName, dateStr, id) => {
    if (fieldName === 'date') {
      const formattedDate = new Date(dateStr[0]).toDateString();
      const dateObject = formData?.date?.filter((d) => {
        if (d.id === id) {
          d.date = formattedDate;
        }
        return d;
      });
      setDate(dateObject);
      setFormData({
        ...formData,
        date: dateObject,
      });
    } else {
      const dateObject = formData?.date?.filter((d) => {
        if (d.id === id) {
          if (fieldName === 'start_time') {
            d.start_time = dateStr;
          }
          if (fieldName === 'end_time') {
            d.end_time = dateStr;
          }
        }
        return d;
      });
      setDate(dateObject);
      setFormData({
        ...formData,
        date: dateObject,
      });
    }
  };

  // select state and function
  const [selectedOptions, setSelectedOptions] = useState({
    addteams: null,
    status: null,
  });

  const handleSelect = (name, selected) => {
    {
      name === 'status'
        ? setFormData({
            ...formData,
            [name]: selected.value,
          })
        : setFormData({
            ...formData,
            [name]: { id: selected.value, name: selected.label },
          });
    }

    setSelectedOptions({
      ...selectedOptions,
      [name]: selected,
    });
  };

  const optionList = [
    { value: 'open', label: 'open' },
    { value: 'closed', label: 'closed' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let customTrainingData = {};

    if (formData?.name) {
      customTrainingData = {
        ...customTrainingData,
        name: formData?.name,
      };
    } else {
      customTrainingData = {
        ...customTrainingData,
        name: ' ',
      };
    }

    // if (date?.length > 0) {
    //   customTrainingData = {
    //     ...customTrainingData,
    //     date: date,
    //   };
    // } else if (date?.length === 0) {
    //   customTrainingData = {
    //     ...customTrainingData,
    //   };
    // }

    if (formData?.vanue) {
      customTrainingData = {
        ...customTrainingData,
        vanue: formData?.vanue,
      };
    } else {
      customTrainingData = {
        ...customTrainingData,
        vanue: ' ',
      };
    }

    if (formData?.team) {
      customTrainingData = {
        ...customTrainingData,
        team: formData?.team?.id,
      };
    } else {
      customTrainingData = {
        ...customTrainingData,
        team: ' ',
      };
    }

    if (formData?.status) {
      customTrainingData = {
        ...customTrainingData,
        status: formData?.status,
      };
    } else {
      customTrainingData = {
        ...customTrainingData,
        status: ' ',
      };
    }

    const mainData = { ...customTrainingData, id };

    if (
      customTrainingData?.name ||
      customTrainingData?.vanue ||
      customTrainingData?.date ||
      customTrainingData?.status ||
      customTrainingData?.team
    ) {
      dispatch(updateCustomTrainingSchedule(mainData));
    }
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setFieldCount(fieldCount + 1);
    const allDateObject = [
      ...formData.date,
      {
        id: fieldCount + 1,
        date: '',
        start_time: '',
        end_time: '',
      },
    ];
    setDate(allDateObject);
    setFormData({
      ...formData,
      date: allDateObject,
    });
  };
  const removeDateHandler = (id) => {
    if (id !== undefined && formData.date.length > 1) {
      const updatedDates = formData.date.filter((d) => d.id !== Number(id));
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: updatedDates,
      }));
      setDate(updatedDates);
    }
  };
  //   close button function
  const resetForm = () => {
    setEditModal(!editModal);
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
        scrollable
        size="lg"
      >
        <div className="modal-header">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={() => resetForm()}
            className="btn-close fs-1"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          {singleTrainingScheduleIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Form>
              <Row>
                <Col lg={12}>
                  <div className="mb-3">
                    <Label
                      htmlFor="trainingscheduleInput"
                      className="form-label"
                    >
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
                        name="team"
                        value={teamList.find(
                          (p) => p.label === formData?.team?.name
                        )}
                        onChange={(selected) => handleSelect('team', selected)}
                        isSearchable={true}
                        // isMulti
                      />
                    </div>
                  </div>
                </Col>

                {/* {formData?.date &&
                  formData?.date?.length > 0 &&
                  formData?.date.map((item, index) => (
                    <Row key={index} className="align-items-end">
                      <Col xxl={12}>
                        <div className="mb-3">
                          <Label htmlFor="titleInput" className="form-label">
                            Title
                          </Label>
                          <Input
                            disabled
                            type="text"
                            className="form-control"
                            id="titleInput"
                            name="name"
                            value={item?.name}
                            placeholder="Enter a title"
                            onChange={(e) => handleTitleChange(e, item?.id)}
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="dateInput" className="form-label">
                            Date
                          </Label>
                          <Flatpickr
                            disabled
                            className="form-control bg-body"
                            id="dateInput"
                            name="date"
                            options={{
                               dateFormat: 'd M, Y',
                            }}
                            value={item?.date}
                            onChange={(dateStr) =>
                              handleSetDate('date', dateStr, item.id)
                            }
                          />
                        </div>
                      </Col>
                      <Col xxl={4} className=" mb-3">
                        <div>
                          <Label
                            htmlFor="startTimeInput"
                            className="form-label"
                          >
                            Starts Time
                          </Label>
                          <input
                            disabled
                            className="form-control"
                            type="time"
                            id="startTimeInput"
                            name="start_time"
                            value={item?.start_time}
                            onChange={(e) =>
                              handleSetDate(
                                'start_time',
                                e.target.value,
                                item.id
                              )
                            }
                          />
                        </div>
                      </Col>
                      <Col xxl={4} className="mb-3">
                        <div>
                          <Label htmlFor="endTimeInput" className="form-label">
                            End Time
                          </Label>
                          <input
                            disabled
                            className="form-control"
                            type="time"
                            id="endTimeInput"
                            name="end_time"
                            value={item?.end_time}
                            onChange={(e) =>
                              handleSetDate('end_time', e.target.value, item.id)
                            }
                          />
                        </div>
                      </Col>
                      <Col xxl={1}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeDateHandler(item?.id);
                          }}
                          className="close-btn px-4 py-3 mb-3"
                        >
                          <i className="ri-delete-bin-6-fill "></i>
                          Remove
                        </button>
                      </Col>
                    </Row>
                  ))} */}

                {/* <Row>
                  <Col xxl={12}>
                    <div className="d-flex align-items-center justify-content-center gap-5 my-3">
                      <button
                        className="badge bg-success-subtle px-2 fs-4 text-success"
                        onClick={handleAddField}
                      >
                        Add Date Field
                      </button>
                    </div>
                  </Col>
                </Row> */}

                <Col xl={6}>
                  <div className="mb-3">
                    <Label htmlFor="statusInput" className="form-label">
                      Status
                    </Label>
                    <div>
                      <Select
                        options={optionList}
                        id="statusInput"
                        value={optionList.find(
                          (p) => p.label === formData?.status
                        )}
                        name="status"
                        onChange={(selected) =>
                          handleSelect('status', selected)
                        }
                      ></Select>
                    </div>
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
                </Col>

                <Col lg={12} className="mt-5">
                  <div className="hstack gap-2 justify-content-center mb-5">
                    {updateCustomTrainingIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        disabled={updateCustomTrainingIsLoading}
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
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditCustomTrainingScheduleModal;
