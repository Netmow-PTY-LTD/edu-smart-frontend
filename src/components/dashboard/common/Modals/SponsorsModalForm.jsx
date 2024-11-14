/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import { getAllSeasonalGame } from '@/slices/dashboard/adminDashboard/Actions/seasonalGameActions';
import { getAllSpecialEvents } from '@/slices/dashboard/adminDashboard/Actions/specialEventsActions';
import {
  addSponsors,
  getAllSponsors,
} from '@/slices/dashboard/adminDashboard/Actions/sponsorsActions';
import { emptySponsorsForAdmin } from '@/slices/dashboard/adminDashboard/reducer';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const SponsorsModalForm = ({
  isOpen,
  setSponsors_modal,
  sponsors_modal,
  title,
  btn,
}) => {
  const [image, setImage] = useState({});
  const [backgroundImage, setbackgroundImage] = useState({});
  const [description, setDescription] = useState('');
  const [isClient, setIsClient] = useState(false);
  // api setup with redux
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    logo: null,
    background_image: null,
    title: '',
    sponsoring_name: '',
    sponsoring_id: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  //  error state
  const [errors, setErrors] = useState({});

  const { data, isLoading, error } = useSelector(
    (state) => state.AdminDashboard.addSponsors
  );

  useEffect(() => {
    dispatch(emptySponsorsForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  // close button function
  const resetForm = () => {
    setFormData({
      name: '',
      website: '',
      image: null,
      background_image: null,
      title: '',
      sponsoring_name: '',
      sponsoring_id: '',
      start_date: '',
      end_date: '',
      description: '',
    });

    // Clear the error messages
    setErrors({});
    setSelectedOption({
      sponsoring: null,
    });

    setSponsors_modal(!sponsors_modal);
  };

  useEffect(() => {
    const resetAllData = () => {
      setFormData({
        name: '',
        website: '',
        image: null,
        background_image: null,
        sponsoring_name: '',
        sponsoring_id: '',
        start_date: '',
        end_date: '',
        description: '',
      });

      // Clear the error messages
      setErrors({});
      setSelectedOption({
        sponsoring: null,
      });
      setSponsors_modal(false);
    };

    if (data?.message && error === null) {
      toast.success(data?.message);

      setTimeout(() => {
        resetAllData();
        dispatch(getAllSponsors());
        dispatch(emptySponsorsForAdmin());
      }, 500);
    }
    if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // get all team / events list
  const [teamList, setTeamList] = useState([]);
  const allTeams = useSelector((state) => state.AdminDashboard.addNewTeam);
  const allSeasonalGames = useSelector(
    (state) => state.AdminDashboard.seasonalGame
  );
  const allSpecialEvents = useSelector(
    (state) => state.AdminDashboard.specialEvents
  );

  useEffect(() => {
    dispatch(getAllTeam());
    dispatch(getAllSeasonalGame());
    dispatch(getAllSpecialEvents());
  }, [dispatch]);

  useEffect(() => {
    if (allTeams?.data?.length > 0) {
      const mappedData = allTeams?.data.map((teams) => ({
        label: teams.name,
        value: teams._id,
      }));
      setTeamList((prevTeamList) => {
        const newData = [...prevTeamList];
        mappedData.forEach((item) => {
          if (
            !newData.some((existingItem) => existingItem.value === item.value)
          ) {
            newData.push(item);
          }
        });
        return newData;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTeams]);
  useEffect(() => {
    if (allSeasonalGames?.data?.length > 0) {
      const mappedData = allSeasonalGames?.data.map((teams) => ({
        label: teams.name,
        value: teams._id,
      }));
      setTeamList((prevTeamList) => {
        const newData = [...prevTeamList];
        mappedData.forEach((item) => {
          if (
            !newData.some((existingItem) => existingItem.value === item.value)
          ) {
            newData.push(item);
          }
        });
        return newData;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSeasonalGames]);

  useEffect(() => {
    if (allSpecialEvents?.data?.length > 0) {
      const mappedData = allSpecialEvents?.data.map((teams) => ({
        label: teams.event_name,
        value: teams._id,
      }));

      setTeamList((prevTeamList) => {
        const newData = [...prevTeamList];
        mappedData.forEach((item) => {
          if (
            !newData.some((existingItem) => existingItem.value === item.value)
          ) {
            newData.push(item);
          }
        });
        return newData;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSpecialEvents]);

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
    sponsoring: null,
  });

  const handleSelect = (name, selected) => {
    const selectedValue = selected?.label;
    const selectedId = selected?.value;
    setFormData({
      ...formData,
      [name]: selectedValue,
      sponsoring_id: selectedId,
    });

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setErrors({
        ...errors,
        image: '',
      });
    }
  };

  const handleSponsorSubmit = (e) => {
    e.preventDefault();

    const sponsorsData = {
      name: formData.name,
      website: formData.website,
      logo: formData?.logo,
      background_image: formData?.background_image,
      title: formData?.title,
      sponsoring_name: selectedOption?.sponsoring?.label,
      sponsoring_id: formData?.sponsoring_id,
      start_date: formData.start_date,
      end_date: formData.end_date,
      description: description,
    };

    // Perform form validation
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.logo) {
      newErrors.logo = 'Image is required';
    }

    // Form is valid
    if (Object.values(newErrors).every((error) => !error)) {
      const treamedData = new FormData();
      Object.entries(sponsorsData).forEach(([key, value]) => {
        treamedData.append(key, value);
      });

      dispatch(addSponsors(treamedData));
    } else {
      setErrors(newErrors);
    }
  };

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
                  <Label htmlFor="nameInput" className="form-label">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="nameInput"
                    className="form-control"
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
                  <Label htmlFor="websiteInput" className="form-label">
                    Website
                  </Label>
                  <Input
                    type="text"
                    id="websiteInput"
                    className="form-control"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>

              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="logoInput" className="form-label">
                    Logo{' '}
                    <small className="mb-2 fs-10 text-danger d-block">
                      (Max. 150px X 150px, Max. 2MB, valid exts: png, jpg, jpeg)
                    </small>
                  </Label>
                  <Input
                    name="logo"
                    id="logoInput"
                    type="file"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                  {errors.logo && (
                    <div className="text-danger">{errors.logo}</div>
                  )}

                  {formData?.logo ? (
                    <div>
                      <img
                        className="mt-3"
                        src={
                          formData?.logo
                            ? URL.createObjectURL(new Blob([formData?.logo]))
                            : ''
                        }
                        style={{ maxHeight: '70px' }}
                        alt=""
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Col>

              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="backgroundImageInput" className="form-label">
                    Background Image{' '}
                    <small className="mb-2 fs-10 text-danger d-block">
                      (Max. 500px X 500px, Max. 2MB, valid exts: png, jpg, jpeg)
                    </small>
                  </Label>
                  <Input
                    name="background_image"
                    id="backgroundImageInput"
                    type="file"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                  {errors.background_image && (
                    <div className="text-danger">{errors.background_image}</div>
                  )}

                  {formData?.background_image ? (
                    <div>
                      <img
                        className="mt-3"
                        src={
                          formData?.background_image
                            ? URL.createObjectURL(
                                new Blob([formData?.background_image])
                              )
                            : ''
                        }
                        style={{ maxHeight: '70px' }}
                        alt=""
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="nameInput" className="form-label">
                    Title
                  </Label>
                  <Input
                    type="text"
                    id="nameInput"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                  {errors.title && (
                    <div className="text-danger">{errors.title}</div>
                  )}
                </div>
              </Col>

              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="sponsoringinput" className="form-label">
                    Sponsoring Team/Event
                  </Label>
                  <div>
                    <Select
                      options={teamList}
                      id="sponsoringinput"
                      name="sponsoring"
                      value={selectedOption.sponsoring}
                      onChange={(selected) =>
                        handleSelect('sponsoring', selected)
                      }
                      isSearchable={true}
                      // isMulti
                    />
                  </div>
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="start_dateInput" className="form-label">
                    Start Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    id="start_dateInput"
                    name="start_date"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                    value={formData.start_date}
                    onChange={(selectedDates, dateStr, instance) =>
                      handleSetDate('start_date', dateStr)
                    }
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="dateOfBirthInput" className="form-label">
                    End Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                    value={formData.end_date}
                    name="end_date"
                    onChange={(selectedDates, dateStr, instance) =>
                      handleSetDate('end_date', dateStr)
                    }
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div className="mb-3 pb-2">
                  <Label htmlFor="descriptionTextarea" className="form-label">
                    Description
                  </Label>
                  {/* <textarea
                    className="form-control"
                    name="description"
                    id="descriptionTextarea"
                    rows="5"
                    onChange={handleInputChange}
                  ></textarea> */}
                  {isClient && (
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                    />
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
                      onClick={handleSponsorSubmit}
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

export default SponsorsModalForm;
