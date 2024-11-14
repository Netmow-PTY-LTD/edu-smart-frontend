/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import { getAllSeasonalGame } from '@/slices/dashboard/adminDashboard/Actions/seasonalGameActions';
import { getAllSpecialEvents } from '@/slices/dashboard/adminDashboard/Actions/specialEventsActions';
import {
  getAllSponsors,
  updateSponsor,
} from '@/slices/dashboard/adminDashboard/Actions/sponsorsActions';
import { emptyUpdateSponsors } from '@/slices/dashboard/adminDashboard/reducer';
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

const EditSponsorsModal = ({
  id,
  setEditModal,
  editModal,
  singleSponsorData,
}) => {
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

  const [description, setDescription] = useState('');
  const [isClient, setIsClient] = useState(false);

  const { data, isLoading, error } = useSelector(
    (state) => state.AdminDashboard.updateSponsor
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (singleSponsorData) {
      setFormData({
        name: singleSponsorData?.name,
        website: singleSponsorData?.website,
        title: singleSponsorData?.title,
        sponsoring_name: singleSponsorData?.sponsoring_name,
        sponsoring_id: singleSponsorData?.sponsoring_id,
        start_date: singleSponsorData?.start_date,
        end_date: singleSponsorData?.end_date,
        // description: singleSponsorData?.description,
        // image: singleSponsorData?.logo?.uploadedImage,
        // background_image: singleSponsorData?.background_image?.uploadedImage,
      });

      setDescription(singleSponsorData?.description);

      const fetchAndConvertImage = async (imageProp, fileName) => {
        if (
          singleSponsorData?._id &&
          singleSponsorData?.[imageProp] &&
          typeof singleSponsorData?.[imageProp] === 'object' &&
          singleSponsorData?.[imageProp].uploadedImage
        ) {
          try {
            const response = await fetch(
              singleSponsorData?.[imageProp].uploadedImage
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
          const imageFile = await fetchAndConvertImage('logo', 'logo');
          const background_imageFile = await fetchAndConvertImage(
            'background_image',
            'background_image'
          );
          setFormData((prevState) => ({
            ...prevState,
            logo: imageFile,
            background_image: background_imageFile,
          }));
        } catch (error) {
          console.error('Error updating form data:', error);
        }
      };

      updateFormData();
    }
  }, [singleSponsorData]);

  useEffect(() => {
    if (data?.message && error === null) {
      toast.success(data?.message);
      dispatch(emptyUpdateSponsors());
      dispatch(getAllSponsors());
      resetForm();
    }
    if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.message, dispatch, error]);

  // close button function
  const resetForm = () => {
    setEditModal(!editModal);
  };

  // get all team / events list
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
  const [teamList, setTeamList] = useState([]);
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
  };

  const handleSponsorSubmit = (e) => {
    e.preventDefault();
    let sponsorsData = {};

    if (formData?.name) {
      sponsorsData = {
        ...sponsorsData,
        name: formData?.name,
      };
    } else {
      sponsorsData = {
        ...sponsorsData,
        name: ' ',
      };
    }

    if (formData?.website) {
      sponsorsData = {
        ...sponsorsData,
        website: formData?.website,
      };
    } else {
      sponsorsData = {
        ...sponsorsData,
        website: ' ',
      };
    }

    if (id) {
      sponsorsData.id = id;
    }

    if (formData?.logo) {
      sponsorsData = {
        ...sponsorsData,
        logo: formData?.logo,
      };
    } else {
      sponsorsData = {
        ...sponsorsData,
        logo: ' ',
      };
    }

    if (formData?.background_image) {
      sponsorsData = {
        ...sponsorsData,
        background_image: formData?.background_image,
      };
    } else {
      sponsorsData = {
        ...sponsorsData,
        background_image: ' ',
      };
    }

    if (formData?.title) {
      sponsorsData = {
        ...sponsorsData,
        title: formData?.title,
      };
    } else {
      sponsorsData = {
        ...sponsorsData,
        title: ' ',
      };
    }

    if (formData?.sponsoring_name) {
      sponsorsData = {
        ...sponsorsData,
        sponsoring_name:
          selectedOption?.sponsoring?.label || formData?.sponsoring_name,
      };
    } else {
      sponsorsData = {
        ...sponsorsData,
        sponsoring_name: ' ',
      };
    }

    if (formData?.sponsoring_id) {
      sponsorsData = {
        ...sponsorsData,
        sponsoring_id: formData?.sponsoring_id,
      };
    } else {
      sponsorsData = {
        ...sponsorsData,
        sponsoring_id: ' ',
      };
    }

    if (formData?.start_date) {
      sponsorsData = {
        ...sponsorsData,
        start_date: formData?.start_date,
      };
    } else {
      sponsorsData = {
        ...sponsorsData,
        start_date: ' ',
      };
    }

    if (formData?.end_date) {
      sponsorsData = {
        ...sponsorsData,
        end_date: formData?.end_date,
      };
    } else {
      sponsorsData = {
        ...sponsorsData,
        end_date: ' ',
      };
    }

    if (description) {
      sponsorsData = {
        ...sponsorsData,
        description: description,
      };
    } else {
      sponsorsData = {
        ...sponsorsData,
        description: ' ',
      };
    }

    const treamedData = new FormData();
    Object.entries(sponsorsData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    if (
      sponsorsData?.name ||
      sponsorsData?.website ||
      sponsorsData?.logo ||
      sponsorsData?.sponsoring_name ||
      sponsorsData?.sponsoring_id ||
      sponsorsData?.start_date ||
      sponsorsData?.end_date ||
      sponsorsData?.description
    ) {
      dispatch(updateSponsor(treamedData));
    }
  };

  console.log(formData?.start_date);

  return (
    <div>
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={editModal}
        centered
        size="lg"
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Update Sponsor</h5>

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
                    value={formData?.name}
                    onChange={handleInputChange}
                  />
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
                    value={formData?.website}
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
                  {formData?.logo && (
                    <div>
                      <img
                        className="mt-2"
                        src={
                          typeof formData.logo === 'string'
                            ? formData.logo
                            : URL.createObjectURL(formData.logo)
                        }
                        alt="logo"
                        style={{ maxHeight: '70px' }}
                      />
                    </div>
                  )}
                </div>
              </Col>

              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="BackgroundImageInput" className="form-label">
                    Background Image{' '}
                    <small className="mb-2 fs-10 text-danger d-block">
                      (Max. 500px X 500px, Max. 2MB, valid exts: png, jpg, jpeg)
                    </small>
                  </Label>
                  <Input
                    name="background_image"
                    id="BackgroundImageInput"
                    type="file"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                  {formData?.background_image && (
                    <div>
                      <img
                        className="mt-2"
                        src={
                          typeof formData.background_image === 'string'
                            ? formData.background_image
                            : URL.createObjectURL(formData.background_image)
                        }
                        alt="background image"
                        style={{ maxHeight: '70px' }}
                      />
                    </div>
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
                      name="sponsoring_name"
                      value={teamList.find(
                        (c) => c.value === formData?.sponsoring_id
                      )}
                      onChange={(selected) =>
                        handleSelect('sponsoring_name', selected)
                      }
                      isSearchable={true}
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
                    value={formData?.description}
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

export default EditSponsorsModal;
