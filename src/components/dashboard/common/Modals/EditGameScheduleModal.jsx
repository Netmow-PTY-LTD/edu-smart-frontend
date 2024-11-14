/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import LoaderSpiner from '@/components/constants/Loader/Loader';
import {
  get_all_game_shcedule,
  updateGameSchedule,
} from '@/slices/dashboard/adminDashboard/Actions/game_scheduleActions';
import { emptyUpdateGameSchedule } from '@/slices/dashboard/adminDashboard/reducer';
import { singleGameSchedule } from '@/slices/dashboard/commonApi/Actions/eventsActions';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const EditGameScheduleModal = ({
  title,
  setEditGameSchedule,
  editGameSchedule,
  id,
  hostTeamList,
  guestTeamList,
}) => {
  const [fieldCount, setFieldCount] = useState(20);
  const [date, setDate] = useState([]);
  // api setup with redux
  const dispatch = useDispatch();

  const [selectedHostTeam, setSelectedHostTeam] = useState('');
  const [selectedGuestTeam, setSelectedGuestTeam] = useState('');
  const [options, setOptions] = useState([]);
  const [selectOption, setSelectOption] = useState('');

  const [formData, setFormData] = useState({
    host_team_name: '',
    host_team_id: '',
    description: '',
    external_team: '',
    guest_team_name: '',
    guest_team_id: '',
    status: '',
    vanue: '',
    game_name: '',
    date: [],
    image: null,
  });

  const {
    data: singleGameScheduleData,
    isLoading: singleGameScheduleIsLoading,
  } = useSelector((state) => state.CommonApi.singleGameSchedule);

  useEffect(() => {
    if (id) {
      dispatch(singleGameSchedule(id));
    }
  }, [dispatch, id]);

  const {
    data: updateGameScheduleData,
    isLoading: updateGameScheduleIsLoading,
    error: updateGameScheduleError,
  } = useSelector((state) => state.AdminDashboard.updateGameSchedule);

  useEffect(() => {
    dispatch(emptyUpdateGameSchedule());
  }, [dispatch]);

  useEffect(() => {
    if (updateGameScheduleData?.message && updateGameScheduleError === null) {
      toast.success(updateGameScheduleData?.message);
      dispatch(get_all_game_shcedule());
      dispatch(emptyUpdateGameSchedule());
      resetForm();
    }
    if (updateGameScheduleError) {
      toast.error(updateGameScheduleError);
    }
  }, [dispatch, updateGameScheduleData?.message, updateGameScheduleError]);

  useEffect(() => {
    if (singleGameScheduleData?._id) {
      const newDateId =
        singleGameScheduleData?.date?.length > 0 &&
        singleGameScheduleData?.date?.map((item, index) => ({
          ...item,
          id: index,
        }));

      setFormData({
        host_team_name: singleGameScheduleData?.host_team_name,
        host_team_id: singleGameScheduleData?.host_team_id?._id,
        description: singleGameScheduleData?.description,
        external_team: singleGameScheduleData?.external_team,
        guest_team_name: singleGameScheduleData?.guest_team_name,
        guest_team_id: singleGameScheduleData?.guest_team_id?._id,
        status: singleGameScheduleData?.status,
        date: newDateId,
        vanue: singleGameScheduleData?.vanue,
        game_name: singleGameScheduleData?.game_name,
        selectOption:
          singleGameScheduleData.external_team?.trim() !== ''
            ? 'external'
            : 'internal',
        // image: imageFile,
      });
      setDate(newDateId);
      setSelectOption({
        host_team_name: singleGameScheduleData?.host_team_name,
        host_team_id: singleGameScheduleData?.host_team_id?._id,
        external_team: singleGameScheduleData?.external_team,
        guest_team_name: singleGameScheduleData?.guest_team_name,
        guest_team_id: singleGameScheduleData?.guest_team_id?._id,
      });

      const fetchAndConvertImage = async (imageProp, fileName) => {
        if (
          singleGameScheduleData?._id &&
          singleGameScheduleData?.[imageProp] &&
          typeof singleGameScheduleData?.[imageProp] === 'object' &&
          singleGameScheduleData?.[imageProp].uploadedImage
        ) {
          try {
            const response = await fetch(
              singleGameScheduleData?.[imageProp].uploadedImage
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

      const selectList = [
        {
          value: singleGameScheduleData?.external_team
            ? 'external'
            : 'external',
          label: singleGameScheduleData?.external_team
            ? 'external'
            : 'external',
        },
        {
          value: singleGameScheduleData?.guest_team_name
            ? 'internal'
            : 'internal',
          label: singleGameScheduleData?.guest_team_name
            ? 'internal'
            : 'internal',
        },
      ];
      setOptions(selectList);
      updateFormData();
    }
  }, [singleGameScheduleData]);

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
      setFormData({
        ...formData,
        [name]: selected ? selected.value : '',
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
  };

  const optionList = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const editGameScheduleHandler = (e) => {
    e.preventDefault();

    let gameScheduleData = {};

    if (formData?.host_team_name) {
      gameScheduleData = {
        ...gameScheduleData,
        host_team_name: formData?.host_team_name,
      };
    } else {
      gameScheduleData = {
        ...gameScheduleData,
        host_team_name: ' ',
      };
    }

    if (formData?.host_team_id) {
      gameScheduleData = {
        ...gameScheduleData,
        host_team_id: formData?.host_team_id,
      };
    } else {
      gameScheduleData = {
        ...gameScheduleData,
        host_team_id: ' ',
      };
    }
    // if (formData?.guest_team_name) {
    //   gameScheduleData = {
    //     ...gameScheduleData,
    //     guest_team_name: formData?.guest_team_name,
    //   };
    // } else {
    //   gameScheduleData = {
    //     ...gameScheduleData,
    //     guest_team_name: ' ',
    //   };
    // }
    // if (formData?.guest_team_id) {
    //   gameScheduleData = {
    //     ...gameScheduleData,
    //     guest_team_id: formData?.guest_team_id,
    //   };
    // } else {
    //   gameScheduleData = {
    //     ...gameScheduleData,
    //     guest_team_id: null,
    //   };
    // }

    if (id) {
      gameScheduleData.id = id;
    }

    if (formData?.game_name) {
      gameScheduleData = {
        ...gameScheduleData,
        game_name: formData?.game_name,
      };
    } else {
      gameScheduleData = {
        ...gameScheduleData,
        game_name: ' ',
      };
    }

    if (formData?.vanue) {
      gameScheduleData = {
        ...gameScheduleData,
        vanue: formData?.vanue,
      };
    } else {
      gameScheduleData = {
        ...gameScheduleData,
        vanue: ' ',
      };
    }

    // if (date.length > 0) {
    //   gameScheduleData = {
    //     ...gameScheduleData,
    //     date: date,
    //   };
    // } else if (date.length === 0) {
    //   gameScheduleData = {
    //     ...gameScheduleData,
    //   };
    // }

    if (formData?.status) {
      gameScheduleData = {
        ...gameScheduleData,
        status: formData?.status,
      };
    } else {
      gameScheduleData = {
        ...gameScheduleData,
        status: ' ',
      };
    }

    if (formData?.description) {
      gameScheduleData = {
        ...gameScheduleData,
        description: formData?.description,
      };
    } else {
      gameScheduleData = {
        ...gameScheduleData,
        description: ' ',
      };
    }

    if (formData?.image) {
      gameScheduleData = {
        ...gameScheduleData,
        image: formData?.image,
      };
    } else {
      gameScheduleData = {
        ...gameScheduleData,
        image: ' ',
      };
    }

    if (formData?.selectOption === 'external') {
      gameScheduleData = {
        ...gameScheduleData,
        external_team: formData?.external_team,
      };
    } else {
      gameScheduleData = {
        ...gameScheduleData,
        external_team: ' ',
      };
    }

    if (formData?.selectOption === 'internal') {
      gameScheduleData = {
        ...gameScheduleData,
        guest_team_name: formData?.guest_team_name,
        guest_team_id: formData?.guest_team_id,
      };
    } else {
      gameScheduleData = {
        ...gameScheduleData,
        guest_team_name: ' ',
        guest_team_id: null,
      };
    }

    const treamedData = new FormData();
    Object.entries(gameScheduleData).forEach(([key, value]) => {
      if (key === 'visible_to' || key === 'date') {
        treamedData.append(key, JSON.stringify(value));
      } else {
        treamedData.append(key, value);
      }
    });

    if (
      gameScheduleData?.host_team_name ||
      gameScheduleData?.host_team_id ||
      gameScheduleData?.guest_team_name ||
      gameScheduleData?.guest_team_id ||
      gameScheduleData?.game_name ||
      gameScheduleData?.vanue ||
      gameScheduleData?.date ||
      gameScheduleData?.status ||
      gameScheduleData?.description ||
      gameScheduleData?.image
    ) {
      dispatch(updateGameSchedule(treamedData));

      if (updateGameScheduleError) {
        toast.error(updateGameScheduleError);
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

  // close button function
  const resetForm = () => {
    setEditGameSchedule(!editGameSchedule);
  };

  return (
    <div>
      <Modal
        className=""
        id="success-Payment"
        isOpen={editGameSchedule}
        centered
        scrollable
        size="lg"
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>

          <button
            type="button"
            onClick={() => setEditGameSchedule(!editGameSchedule)}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          {singleGameScheduleIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Form id="player-form">
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="host_team_nameInput" className="form-label">
                      Select Team
                    </Label>
                    <Select
                      options={hostTeamList}
                      id="host_team_nameInput"
                      name="host_team_name"
                      value={hostTeamList?.find(
                        (p) => p.label === formData?.host_team_name
                      )}
                      onChange={(selected) =>
                        handleSelect('host_team_name', selected)
                      }
                    />
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="guest_team_nameInput"
                      className="form-label"
                    >
                      Opponent's Team
                    </Label>
                    <Select
                      options={options}
                      id="selecoption"
                      name="selectOption"
                      value={options?.find(
                        (p) => p.label === formData?.selectOption
                      )}
                      onChange={(selected) =>
                        handleSelect('selectOption', selected)
                      }
                    />

                    {formData?.selectOption === 'internal' ? (
                      <Select
                        className="mt-2"
                        options={guestTeamList}
                        id="guest_team_nameInput"
                        name="guest_team_name"
                        value={guestTeamList?.find(
                          (p) => p.label === formData?.guest_team_name
                        )}
                        onChange={(selected) =>
                          handleSelect('guest_team_name', selected)
                        }
                      />
                    ) : formData?.selectOption === 'external' ? (
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
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="vanueInput" className="form-label">
                      Vanue
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="vanueInput"
                      name="vanue"
                      value={formData.vanue}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="game_nameInput" className="form-label">
                      Game Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="game_nameInput"
                      name="game_name"
                      value={formData.game_name}
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

                <Col xl={6}>
                  <div className="mb-3">
                    <Label htmlFor="imageInput" className="form-label">
                      Image{' '}
                      <small className="mb-2 fs-10 text-danger">
                        (Max. 300px X 300px, Max. 2MB, valid exts: png, jpg,
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

                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="statusInput" className="form-label">
                      Status
                    </Label>
                    <Select
                      options={optionList}
                      id="statusInput"
                      name="status"
                      value={optionList.find(
                        (p) => p.value === formData?.status
                      )}
                      onChange={(selected) => handleSelect('status', selected)}
                    />
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end mt-3">
                    {updateGameScheduleIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        disabled={updateGameScheduleIsLoading}
                        type="button"
                        className="button p-3 text-light"
                        onClick={editGameScheduleHandler}
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

export default EditGameScheduleModal;
