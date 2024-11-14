/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-constant-condition */
import LoaderSpiner from '@/components/constants/Loader/Loader';
import {
  getAllSpecialEvents,
  singleSpecialEvents,
  updateSpecialEvents,
} from '@/slices/dashboard/adminDashboard/Actions/specialEventsActions';
import { emptyUpdateSpecialEvents } from '@/slices/dashboard/adminDashboard/reducer';
import { eventsVisibleToTeamName } from '@/slices/dashboard/commonApi/Actions/teamActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const EditEventsModal = ({ id, teamList, editEvents, setEditEvents }) => {
  const [fieldCount, setFieldCount] = useState(20);
  const [date, setDate] = useState([]);
  // api setup for event game with redux
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    event_name: '',
    event_vanue: '',
    image: '',
    description: '',
    date: [],
    starts_time: '',
    end_time: '',
    notification: '',
    options: [],
    visible_to: null,
  });

  const { data: singleEventsData, isLoading: singleEventsIsLoading } =
    useSelector((state) => state.AdminDashboard.singleSpecialEvents);

  const { data: allTeamNameDataForThisEvent } = useSelector(
    (state) => state.CommonApi.eventsVisibleToTeamName
  );

  useEffect(() => {
    if (id) {
      dispatch(singleSpecialEvents(id));
    }
  }, [dispatch, id]);

  const {
    data: updateSpecialData,
    isLoading: updateSpecialIsLoading,
    error: updateSpecialError,
  } = useSelector((state) => state.AdminDashboard.updateSpecialEvents);

  useEffect(() => {
    dispatch(emptyUpdateSpecialEvents());
  }, [dispatch]);

  useEffect(() => {
    if (updateSpecialData?.message && updateSpecialError === null) {
      toast.success(updateSpecialData?.message);
      dispatch(emptyUpdateSpecialEvents());
      dispatch(getAllSpecialEvents());
      dispatch(singleSpecialEvents(id));
      setEditEvents(!editEvents);
    }
    if (updateSpecialError) {
      toast.error(updateSpecialError);
    }
  }, [
    dispatch,
    editEvents,
    id,
    setEditEvents,
    updateSpecialData?.message,
    updateSpecialError,
  ]);

  const resetForm = () => {
    setEditEvents(!editEvents);
  };

  useEffect(() => {
    if (
      singleEventsData?.visible_to &&
      Array.isArray(singleEventsData?.visible_to)
    ) {
      const visibleToObject = {
        team: singleEventsData?.visible_to,
      };

      dispatch(eventsVisibleToTeamName(visibleToObject));
    }
  }, [dispatch, singleEventsData?.visible_to]);

  useEffect(() => {
    if (singleEventsData?._id) {
      const newDateId =
        singleEventsData?.date?.length > 0 &&
        singleEventsData?.date.map((item, index) => ({
          ...item,
          id: index,
        }));

      setFormData({
        event_name: singleEventsData?.event_name,
        event_vanue: singleEventsData?.event_vanue,
        description: singleEventsData?.description,
        date: newDateId,
        notification: singleEventsData?.notification,
        options: singleEventsData?.options,
        visible_to: singleEventsData?.visible_to,
      });

      setDate(newDateId);

      const fetchAndConvertImage = async (imageProp, fileName) => {
        if (
          singleEventsData?._id &&
          singleEventsData?.[imageProp] &&
          typeof singleEventsData?.[imageProp] === 'object' &&
          singleEventsData?.[imageProp].uploadedImage
        ) {
          try {
            const response = await fetch(
              singleEventsData?.[imageProp].uploadedImage
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
  }, [singleEventsData]);

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
    options: null,
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
        visible_to:
          selected?.length > 0 && selected.map((option) => option?.value),
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

    if (selected && name === 'options') {
      setSelectedOption({
        ...selectedOption,
        options: [selected.value],
      });
      setFormData({
        ...formData,
        options: selected
          ? selected?.length > 0 && selected.map((option) => option.value)
          : [selected.value],
      });
    }
  };

  const customList = [
    { value: 'RVSP', label: 'RVSP' },
    { value: 'Comments', label: 'Comments' },
    { value: 'Duty Roster', label: 'Duty Roster' },
    { value: 'Attendance', label: 'Attendance' },
  ];

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
    let specialEventsAllData = {};

    if (formData?.event_name) {
      specialEventsAllData = {
        ...specialEventsAllData,
        event_name: formData?.event_name,
      };
    } else {
      specialEventsAllData = {
        ...specialEventsAllData,
        event_name: ' ',
      };
    }

    if (formData?.event_vanue) {
      specialEventsAllData = {
        ...specialEventsAllData,
        event_vanue: formData?.event_vanue,
      };
    } else {
      specialEventsAllData = {
        ...specialEventsAllData,
        event_vanue: ' ',
      };
    }

    if (id) {
      specialEventsAllData.id = id;
    }

    if (formData.image) {
      specialEventsAllData = {
        ...specialEventsAllData,
        image: formData.image,
      };
    } else {
      specialEventsAllData = {
        ...specialEventsAllData,
        image: ' ',
      };
    }

    if (formData?.description) {
      specialEventsAllData = {
        ...specialEventsAllData,
        description: formData?.description,
      };
    } else {
      specialEventsAllData = {
        ...specialEventsAllData,
        description: ' ',
      };
    }

    // if (date.length > 0) {
    //   specialEventsAllData = {
    //     ...specialEventsAllData,
    //     date: date,
    //   };
    // } else if (date.length === 0) {
    //   specialEventsAllData = {
    //     ...specialEventsAllData,
    //   };
    // }

    if (formData?.notification) {
      specialEventsAllData = {
        ...specialEventsAllData,
        notification: formData?.notification,
      };
    } else {
      specialEventsAllData = {
        ...specialEventsAllData,
        notification: ' ',
      };
    }

    if (formData?.options?.length > 0) {
      specialEventsAllData = {
        ...specialEventsAllData,
        options: formData?.options,
      };
    } else if (formData?.options?.length === 0) {
      specialEventsAllData = {
        ...specialEventsAllData,
        options: ' ',
      };
    }

    if (selectedOption?.visible_to?.length > 0) {
      specialEventsAllData = {
        ...specialEventsAllData,
        visible_to:
          selectedOption?.visible_to === 'Custom'
            ? []
            : selectedOption?.visible_to,
      };
    } else if (selectedOption?.visible_to?.length === 0) {
      specialEventsAllData = {
        ...specialEventsAllData,
        visible_to: [],
      };
    }

    const treamedData = new FormData();
    Object.entries(specialEventsAllData).forEach(([key, value]) => {
      if (key === 'visible_to' || key === 'options' || key === 'date') {
        treamedData.append(key, JSON.stringify(value));
      } else {
        treamedData.append(key, value);
      }
    });

    if (
      specialEventsAllData?.event_name ||
      specialEventsAllData?.event_vanue ||
      specialEventsAllData?.image ||
      specialEventsAllData?.description ||
      specialEventsAllData?.date ||
      specialEventsAllData?.notification ||
      specialEventsAllData?.options ||
      specialEventsAllData?.visible_to
    ) {
      dispatch(updateSpecialEvents(treamedData)).then((res) => {
        if (res.error && updateSpecialError) {
          toast.error(updateSpecialError);
        }
      });
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
        isOpen={editEvents}
        centered
        scrollable
        size="lg"
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Update Special Event</h5>
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

          {singleEventsIsLoading ? (
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
                      name="event_name"
                      value={formData.event_name}
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
                      name="event_vanue"
                      value={formData.event_vanue}
                      onChange={handleInputChange}
                    />
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

                <Col lg={12}>
                  <div className="mb-3 pb-2">
                    <Label htmlFor="descriptionTextarea" className="form-label">
                      Description
                    </Label>
                    <textarea
                      className="form-control"
                      name="description"
                      id="descriptionTextarea"
                      rows="5"
                      onChange={handleInputChange}
                      value={formData?.description}
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
                      name="image"
                      id="imageInput"
                      type="file"
                      className="form-control"
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

                <Col xl={6}>
                  <div className="mb-3">
                    <Label htmlFor="optionsInput" className="form-label">
                      Options
                    </Label>
                    <div>
                      <Select
                        options={customList}
                        id="optionsInput"
                        name="options"
                        value={
                          Array.isArray(formData?.options)
                            ? customList.filter((p) =>
                                formData?.options.includes(p.value)
                              )
                            : formData?.options &&
                                formData?.options[0] &&
                                typeof formData?.options[0] === 'string'
                              ? customList.find(
                                  (p) => p.value === formData.options[0]
                                )
                              : null
                        }
                        onChange={(selected) =>
                          handleSelect('options', selected)
                        }
                        isSearchable
                        isMulti
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
                          (p) => p.value === formData?.notification
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
                    {updateSpecialIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        disabled={updateSpecialIsLoading}
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
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditEventsModal;
