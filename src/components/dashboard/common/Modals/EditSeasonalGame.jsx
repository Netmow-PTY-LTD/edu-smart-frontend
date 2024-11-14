/* eslint-disable @next/next/no-img-element */
import LoaderSpiner from '@/components/constants/Loader/Loader';
import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import {
  getAllSeasonalGame,
  singleSeasonalGame,
  updateSeasonalGame,
} from '@/slices/dashboard/adminDashboard/Actions/seasonalGameActions';
import { emptyUpdateSeasonalGame } from '@/slices/dashboard/adminDashboard/reducer';
import { eventsVisibleToTeamName } from '@/slices/dashboard/commonApi/Actions/teamActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const EditSeasonalGame = ({ editModal, setEditModal, title, btn, id }) => {
  // api setup for event game with redux
  const dispatch = useDispatch();
  const [fieldCount, setFieldCount] = useState(20);
  const [date, setDate] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    vanue: '',
    image: '',
    description: '',
    date: [],
    notification: '',
    fees: '',
    visible_to: null,
    start_time: '',
    end_time: '',
  });

  const {
    data: singleSeasonalGameData,
    isLoading: singleSeasonalGameIsLoading,
  } = useSelector((state) => state.AdminDashboard.singleSeasonalGame);

  useEffect(() => {
    if (id) {
      dispatch(singleSeasonalGame(id));
    }
  }, [dispatch, id]);

  const {
    data: updateSeasonalGameData,
    isLoading: updateSeasonalGameIsLoading,
    error: updateSeasonalGameError,
  } = useSelector((state) => state.AdminDashboard.updateSeasonalGame);

  const { data: allTeamNameDataForThisEvent } = useSelector(
    (state) => state.CommonApi.eventsVisibleToTeamName
  );

  useEffect(() => {
    dispatch(emptyUpdateSeasonalGame());
  }, [dispatch]);

  useEffect(() => {
    if (updateSeasonalGameData?.message && updateSeasonalGameError === null) {
      toast.success(updateSeasonalGameData?.message);
      dispatch(emptyUpdateSeasonalGame());
      dispatch(getAllSeasonalGame());
      dispatch(singleSeasonalGame(id));
      setEditModal(!editModal);
    }
    if (updateSeasonalGameError) {
      toast.error(updateSeasonalGameError);
    }
  }, [
    dispatch,
    editModal,
    id,
    setEditModal,
    updateSeasonalGameData?.message,
    updateSeasonalGameError,
  ]);

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

  useEffect(() => {
    if (
      singleSeasonalGameData?.visible_to &&
      Array.isArray(singleSeasonalGameData?.visible_to)
    ) {
      const visibleToObject = {
        team: singleSeasonalGameData?.visible_to,
      };

      dispatch(eventsVisibleToTeamName(visibleToObject));
    }
  }, [dispatch, singleSeasonalGameData?.visible_to]);

  useEffect(() => {
    if (singleSeasonalGameData?._id) {
      const newDateId =
        singleSeasonalGameData?.date?.length > 0 &&
        singleSeasonalGameData?.date.map((item, index) => ({
          ...item,
          id: index,
        }));

      setFormData({
        name: singleSeasonalGameData?.name,
        vanue: singleSeasonalGameData?.vanue,
        description: singleSeasonalGameData?.description,
        date: newDateId,
        notification: singleSeasonalGameData?.notification,
        fees: singleSeasonalGameData?.fees,
        visible_to: singleSeasonalGameData?.visible_to,
      });

      setDate(newDateId);

      const fetchAndConvertImage = async (imageProp, fileName) => {
        if (
          singleSeasonalGameData?._id &&
          singleSeasonalGameData?.[imageProp] &&
          typeof singleSeasonalGameData?.[imageProp] === 'object' &&
          singleSeasonalGameData?.[imageProp].uploadedImage
        ) {
          try {
            const response = await fetch(
              singleSeasonalGameData?.[imageProp].uploadedImage
            );
            const blob = await response.blob();
            const file = new File([blob], `${fileName}.jpg`, {
              type: 'image/jpeg',
            });
            return file;
          } catch (error) {
            console.error('Error fetching and converting image:', error);
            return null;
          }
        }
      };

      const updateFormData = async () => {
        try {
          const imageFile = await fetchAndConvertImage('image', 'image');
          setFormData((prevState) => ({
            ...prevState,
            image: imageFile,
          }));
        } catch (error) {
          console.error('Error updating form data:', error);
        }
      };

      updateFormData();
    }
  }, [singleSeasonalGameData]);

  useEffect(() => {
    if (
      allTeamNameDataForThisEvent.length > 0 &&
      Array.isArray(allTeamNameDataForThisEvent)
    ) {
      const totalTeams = allTeamNameDataForThisEvent.map((t) => ({
        label: t.name,
        value: t._id,
      }));

      setFormData({
        ...formData,
        visible_to: totalTeams,
      });
    } else {
      setFormData({
        ...formData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTeamNameDataForThisEvent]);

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

  // handle set date
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
  const [selectedOption, setSelectedOption] = useState({
    notification: null,
    visible_to: null,
  });

  const handleSelect = (name, selected) => {
    if (selected.value === 'Custom' && name === 'visible_to') {
      setSelectedOption({
        ...selectedOption,
        [name]: selected.value,
      });
      setFormData({
        ...formData,
        [name]: selected.value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: selected.value,
      });
    }

    if (selected.length > 0 && name === 'visible_to') {
      setSelectedOption({
        ...selectedOption,
        visible_to: selected
          ? selected?.length > 0 && selected.map((option) => option?.value)
          : [selected.value],
      });
      setFormData({
        ...formData,
        visible_to: selected
          ? selected?.length > 0 && selected.map((option) => option?.value)
          : [selected.value],
      });
    } else if (selected.length === 0) {
      setSelectedOption({
        ...selectedOption,
        visible_to: selected?.length > 0 ? [selected.value] : ['All Members'],
      });

      setFormData({
        ...formData,
        visible_to: selected?.length > 0 ? [selected.value] : ['All Members'],
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
  };

  const notification = [
    {
      value: 'push notification and email',
      label: 'push notification and email',
    },
    { value: 'none', label: 'none' },
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
    let seasonalGameAllData = {};
    if (formData?.name) {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        name: formData?.name,
      };
    } else {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        name: ' ',
      };
    }

    if (formData?.vanue) {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        vanue: formData?.vanue,
      };
    } else {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        vanue: ' ',
      };
    }

    if (formData?.image) {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        image: formData?.image,
      };
    } else {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        image: ' ',
      };
    }

    if (id) {
      seasonalGameAllData.id = id;
    }

    if (formData?.description) {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        description: formData?.description,
      };
    } else {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        description: ' ',
      };
    }

    // if (date.length > 0) {
    //   seasonalGameAllData = {
    //     ...seasonalGameAllData,
    //     date: date,
    //   };
    // } else if (date.length === 0) {
    //   seasonalGameAllData = {
    //     ...seasonalGameAllData,
    //   };
    // }

    if (formData?.fees) {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        fees: formData?.fees,
      };
    } else {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        fees: ' ',
      };
    }

    if (formData?.notification) {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        notification: formData?.notification,
      };
    } else {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        notification: ' ',
      };
    }

    if (selectedOption?.visible_to?.length > 0) {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        visible_to:
          selectedOption?.visible_to === 'Custom'
            ? []
            : selectedOption?.visible_to,
      };
    } else if (selectedOption?.visible_to?.length === 0) {
      seasonalGameAllData = {
        ...seasonalGameAllData,
        visible_to: [],
      };
    }

    const treamedData = new FormData();
    Object.entries(seasonalGameAllData).forEach(([key, value]) => {
      if (key === 'visible_to' || key === 'date') {
        treamedData.append(key, JSON.stringify(value));
      } else {
        treamedData.append(key, value);
      }
    });

    if (
      seasonalGameAllData?.name ||
      seasonalGameAllData?.vanue ||
      seasonalGameAllData?.image ||
      seasonalGameAllData?.description ||
      seasonalGameAllData?.date ||
      seasonalGameAllData?.fees ||
      seasonalGameAllData?.notification ||
      seasonalGameAllData?.visible_to
    ) {
      dispatch(updateSeasonalGame(treamedData));

      if (updateSeasonalGameError) {
        toast.error(updateSeasonalGameError);
      }
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

  return (
    <div>
      {/* success modal */}
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={editModal}
        centered
        size="lg"
        scrollable
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={() => setEditModal(!editModal)}
            className="btn-close fs-1"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          {singleSeasonalGameIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Form id="seasonalGame-form">
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="nameInput" className="form-label">
                      Event Name
                    </Label>
                    <Input
                      type="text"
                      id="nameInput"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="vanueInput" className="form-label">
                      Event Vanue
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
                <Col lg={12}>
                  <div className="mb-3 pb-2">
                    <Label htmlFor="descriptionTextarea" className="form-label">
                      Description
                    </Label>
                    <textarea
                      className="form-control"
                      name="description"
                      id="descriptionTextarea"
                      value={formData.description}
                      rows="5"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </Col>

                <Col xl={12}>
                  <div className="mb-3">
                    <Label htmlFor="imageInput" className="form-label">
                      Image{' '}
                      <small className="mb-2 fs-10 text-danger">
                        (Max. 500px X 500px, Max. 2MB, valid exts: png, jpg,
                        jpeg)
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
                            typeof formData.image === 'string'
                              ? formData.image
                              : URL.createObjectURL(new Blob([formData.image]))
                          }
                          alt="img"
                        />
                      </div>
                    )}
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
                            disabled={true}
                            className="form-control bg-body"
                            id="dateInput"
                            name="date"
                            placeholder="Choose a Date"
                            options={{
                               dateFormat: 'd M, Y',
                            }}
                            value={item?.date}
                            onChange={(dateStr) =>
                              handleSetDate('date', dateStr, item?.id)
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
                              handleSetDate(
                                'end_time',
                                e.target.value,
                                item?.id
                              )
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
                          <i className="ri-delete-bin-6-fill"></i>
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
                    <Label htmlFor="feesInput" className="form-label">
                      Fees
                    </Label>
                    <div>
                      <input
                        type="text"
                        id="feesInput"
                        className="form-control"
                        value={formData.fees}
                        name="fees"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="mb-3">
                    <Label htmlFor="notificationInput" className="form-label">
                      Notification
                    </Label>
                    <div>
                      <Select
                        options={notification}
                        id="notificationInput"
                        name="notification"
                        value={notification.find(
                          (p) => p.label === formData?.notification
                        )}
                        onChange={(selected) =>
                          handleSelect('notification', selected)
                        }
                      />
                    </div>
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="mb-3">
                    <Label htmlFor="allMebmersInput" className="form-label">
                      Visible To
                    </Label>
                    <div>
                      <Select
                        options={allMebmers}
                        id="allMebmersInput"
                        name="visible_to"
                        placeholder={'Please Select'}
                        value={
                          formData?.visible_to &&
                          formData?.visible_to[0] === 'All Members'
                            ? allMebmers.find(
                                (m) => m.label === formData?.visible_to[0]
                              )
                            : Array.isArray(formData?.visible_to) &&
                                formData?.visible_to[0]?.value
                              ? allMebmers.find((m) => m.label === 'Custom')
                              : allMebmers.find((m) => m.label === 'Custom')
                        }
                        className="mb-3"
                        onChange={(selected) =>
                          handleSelect('visible_to', selected)
                        }
                      />

                      <Select
                        options={teamList}
                        value={
                          formData?.visible_to &&
                          formData?.visible_to[0] === 'All Members'
                            ? ''
                            : formData?.visible_to?.length > 0 &&
                              Array.isArray(formData?.visible_to) &&
                              formData?.visible_to[0]?.value &&
                              formData?.visible_to
                        }
                        name="visible_to"
                        placeholder="Please Choose a Team"
                        onChange={(selected) =>
                          handleSelect('visible_to', selected)
                        }
                        isDisabled={
                          formData?.visible_to &&
                          formData?.visible_to[0] === 'All Members'
                        }
                        isMulti
                      />
                    </div>
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    {updateSeasonalGameIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        disabled={updateSeasonalGameIsLoading}
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
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditSeasonalGame;
