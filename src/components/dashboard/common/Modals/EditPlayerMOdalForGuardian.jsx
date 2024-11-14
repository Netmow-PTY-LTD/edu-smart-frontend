/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react';
import Flatpickr from 'react-flatpickr';

import {
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from 'reactstrap';
// image
import Loader from '@/components/dashboard/common/Loader';
import {
  getAllPlayer,
  updatePlayer,
} from '@/slices/dashboard/adminDashboard/Actions/playerActions';
import { emptyUpdatePlayer } from '@/slices/dashboard/adminDashboard/reducer';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { ToastContainer, toast } from 'react-toastify';

const EditPlayerModalForGuardian = ({
  playerId,
  setEditModal,
  editModal,
  singlePlayerData,
}) => {
  const dispatch = useDispatch();
  const options = useMemo(() => countryList().getData(), []);
  const [team, setTeam] = useState('');
  const [description, setDescription] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [gender, setGender] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [address_line_1, setAddress_line_1] = useState('');
  const [address_line_2, setAddress_line_2] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState('');
  const [profileImage, setProfileImage] = useState({});

  const {
    data: updatePlayerData,
    isLoading: updatePlayerIsLoading,
    error: updatePlayerError,
  } = useSelector((state) => state.AdminDashboard.updatePlayer);

  useEffect(() => {
    if (singlePlayerData) {
      setCountry(singlePlayerData?.country);
      setProfileImage(singlePlayerData?.profile_image?.uploadedImage);
      setFirst_name(singlePlayerData?.first_name);
      setLast_name(singlePlayerData?.last_name);
      setGender(singlePlayerData?.gender);
      setDate_of_birth(singlePlayerData?.date_of_birth);
      setHeight(singlePlayerData?.height);
      setWeight(singlePlayerData?.weight);
      setCity(singlePlayerData?.city);
      setState(singlePlayerData?.state);
      setZip(singlePlayerData?.zip);
      setAddress_line_1(singlePlayerData?.address_line_1);
      setAddress_line_2(singlePlayerData?.address_line_2);
      setEmail(singlePlayerData?.email);
      setPhone(singlePlayerData?.phone);
      setDescription(singlePlayerData?.description);
    }
  }, [singlePlayerData]);

  useEffect(() => {
    if (updatePlayerData?.message && updatePlayerError === null) {
      toast.success(updatePlayerData?.message);
      dispatch(emptyUpdatePlayer());
      dispatch(getAllPlayer());
      // dispatch(getSinglePlayer(playerId));
      setEditModal(!editModal);
    }
    if (updatePlayerError) {
      toast.error(updatePlayerError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updatePlayerData?.message, updatePlayerError]);

  const changeHandler = (value) => {
    setCountry(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
      //   setPreviewImage(URL.createObjectURL(file));
    }
  };

  // edit profile handler
  const handleEditPlayer = async (e) => {
    e.preventDefault();
    let updatePlayerData = {};
    if (first_name) {
      if (last_name) {
        updatePlayerData.first_name = first_name;
      } else {
        if (singlePlayerData?.first_name?.split(' ')?.length > 2) {
          updatePlayerData.first_name =
            first_name +
            ' ' +
            singlePlayerData?.first_name?.split(' ')[1] +
            ' ' +
            singlePlayerData?.first_name?.split(' ')[2];
        } else if (singlePlayerData?.first_name?.split(' ')?.length > 1) {
          updatePlayerData.first_name =
            first_name + ' ' + singlePlayerData?.first_name?.split(' ')[1];
        } else {
          updatePlayerData.first_name = first_name;
        }
      }
    }
    if (last_name) {
      if (first_name) {
        updatePlayerData.last_name = last_name;
      } else {
        if (singlePlayerData?.last_name?.split(' ')?.length > 2) {
          updatePlayerData.last_name = last_name;
        } else if (singlePlayerData?.last_name?.split(' ')?.length > 1) {
          updatePlayerData.last_name =
            last_name + ' ' + singlePlayerData?.last_name?.split(' ')[1];
        } else {
          updatePlayerData.last_name = last_name;
        }
      }
    }
    // if (first_name) {
    //   updatePlayerData.name = first_name + ' ' + last_name;
    // }
    // if (last_name) {
    //   updatePlayerData.name = first_name + ' ' + last_name;
    // }
    if (playerId) {
      updatePlayerData.id = playerId;
    }
    if (team) {
      updatePlayerData = {
        ...updatePlayerData,
        team: team,
      };
    }

    if (gender) {
      updatePlayerData = {
        ...updatePlayerData,
        gender: gender,
      };
    }
    if (date_of_birth) {
      updatePlayerData = {
        ...updatePlayerData,
        date_of_birth: date_of_birth,
      };
    }
    if (height) {
      updatePlayerData = {
        ...updatePlayerData,
        height: height,
      };
    }
    if (weight) {
      updatePlayerData = {
        ...updatePlayerData,
        weight: weight,
      };
    }
    if (phone) {
      updatePlayerData = {
        ...updatePlayerData,
        phone: phone,
      };
    }
    if (address_line_1) {
      updatePlayerData = {
        ...updatePlayerData,
        address_line_1: address_line_1,
      };
    }
    if (address_line_2) {
      updatePlayerData = {
        ...updatePlayerData,
        address_line_2: address_line_2,
      };
    }
    if (country) {
      updatePlayerData = {
        ...updatePlayerData,
        country: country?.label,
      };
    }
    if (city) {
      updatePlayerData = {
        ...updatePlayerData,
        city: city,
      };
    }
    if (state) {
      updatePlayerData = {
        ...updatePlayerData,
        state: state,
      };
    }
    if (zip) {
      updatePlayerData = {
        ...updatePlayerData,
        zip: zip,
      };
    }
    if (description) {
      updatePlayerData = {
        ...updatePlayerData,
        description: description,
      };
    }
    if (password) {
      updatePlayerData = {
        ...updatePlayerData,
        password: password,
      };
    }
    if (profileImage) {
      updatePlayerData = {
        ...updatePlayerData,
        image: profileImage,
      };
    }

    if (email) {
      updatePlayerData = {
        ...updatePlayerData,
        email: email,
      };
    }

    const treamedData = new FormData();
    Object.entries(updatePlayerData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    dispatch(updatePlayer(treamedData)).then(() => {
      setEditModal(!editModal);
      if (playerId) {
        // dispatch(getSinglePlayer(playerId));
      }
    });

    if (updatePlayerError) {
      toast.error(updatePlayerError);
    }
  };

  return (
    <div>
      <Modal isOpen={editModal} centered size="lg" scrollable>
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Update Profile</h5>
          <button
            type="button"
            onClick={() => setEditModal(!editModal)}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <ModalBody className="fs-3">
          <Form>
            <Row>
              <ToastContainer />
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="firstnameInput"
                            className="form-label"
                          >
                            First Name
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="firstnameInput"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            onBlur={(e) => setFirst_name(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="lastnameInput" className="form-label">
                            Last Name
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="lastnameInput"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                            onBlur={(e) => setLast_name(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="genderInput" className="form-label">
                            Gender
                          </Label>
                          <select
                            id="genderInput"
                            className="form-select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            onBlur={(e) => setGender(e.target.value)}
                          >
                            <option value={gender}>{gender}</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="JoiningdatInput"
                            className="form-label"
                          >
                            Date of birth
                          </Label>
                          <Flatpickr
                            onChange={(selectedDates, dateStr) =>
                              setDate_of_birth(dateStr)
                            }
                            onBlur={(selectedDates, dateStr) =>
                              setDate_of_birth(dateStr)
                            }
                            className="form-control"
                            options={{
                              dateFormat: 'd M, Y',
                            }}
                            value={date_of_birth}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="designationInput"
                            className="form-label"
                          >
                            Height
                          </Label>
                          <Input
                            onChange={(e) => setHeight(e.target.value)}
                            onBlur={(e) => setHeight(e.target.value)}
                            onFocus={(e) => setHeight(e.target.value)}
                            type="text"
                            className="form-control"
                            id="designationInput"
                            value={height}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="designationInput"
                            className="form-label"
                          >
                            Weight
                          </Label>
                          <Input
                            onChange={(e) => setWeight(e.target.value)}
                            onBlur={(e) => setWeight(e.target.value)}
                            type="text"
                            className="form-control"
                            id="designationInput"
                            value={weight}
                          />
                        </div>
                      </Col>

                      <Col lg={3}>
                        <div className="mb-3">
                          <Label htmlFor="countryInput" className="form-label">
                            Country
                          </Label>

                          <Select
                            options={options}
                            value={options.find((p) => p.label === country)}
                            onChange={changeHandler}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label htmlFor="cityInput" className="form-label">
                            City
                          </Label>
                          <Input
                            onChange={(e) => setCity(e.target.value)}
                            onBlur={(e) => setCity(e.target.value)}
                            type="text"
                            className="form-control"
                            id="cityInput"
                            value={city}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label htmlFor="websiteInput1" className="form-label">
                            State
                          </Label>
                          <Input
                            onChange={(e) => setState(e.target.value)}
                            onBlur={(e) => setState(e.target.value)}
                            type="text"
                            className="form-control"
                            id="websiteInput1"
                            value={state}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label htmlFor="zipcodeInput" className="form-label">
                            Zip
                          </Label>
                          <Input
                            onChange={(e) => setZip(e.target.value)}
                            onBlur={(e) => setZip(e.target.value)}
                            type="number"
                            className="form-control"
                            id="zipcodeInput"
                            value={zip}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="designationInput"
                            className="form-label"
                          >
                            Address Line 1
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="designationInput"
                            value={address_line_1}
                            onChange={(e) => setAddress_line_1(e.target.value)}
                            onBlur={(e) => setAddress_line_1(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="designationInput"
                            className="form-label"
                          >
                            Address Line 2
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            value={address_line_2}
                            id="designationInput"
                            onChange={(e) => setAddress_line_2(e.target.value)}
                            onBlur={(e) => setAddress_line_2(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="zipcodeInput" className="form-label">
                            Email
                          </Label>
                          <Input
                            // disabled
                            type="email"
                            className="form-control"
                            id="zipcodeInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="passwordInput" className="form-label">
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup">
                            <Input
                              type={passwordShow ? 'text' : 'password'}
                              className="form-control"
                              id="passwordInput"
                              onChange={(e) => setPassword(e.target.value)}
                              onBlur={(e) => setPassword(e.target.value)}
                              onPaste={(e) => e.preventDefault()}
                              required
                            />
                            <button
                              className="position-absolute end-0 top-0 mt-n1 fs-2 text-decoration-none text-muted password-addon p-3"
                              type="button"
                              onClick={() => setPasswordShow(!passwordShow)}
                              style={{ backgroundColor: 'transparent' }}
                            >
                              <i
                                className={`${
                                  passwordShow
                                    ? 'ri-eye-off-line align-middle'
                                    : 'ri-eye-fill align-middle'
                                }`}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="zipcodeInput" className="form-label">
                            Phone(Optional)
                          </Label>
                          <Input
                            type="tel"
                            className="form-control"
                            id="zipcodeInput"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xl={12}>
                        <div className="mb-3">
                          <Label htmlFor="imageInput" className="form-label">
                            Image
                          </Label>
                          <Input
                            type="file"
                            className="form-control"
                            id="imageInput"
                            name="image"
                            onChange={(e) => handleImageChange(e)}
                            onBlur={(e) => handleImageChange(e)}
                          />
                        </div>
                        {profileImage && (
                          <div className="mt-3">
                            <img
                              src={
                                typeof profileImage === 'string'
                                  ? profileImage
                                  : URL.createObjectURL(
                                      new Blob([profileImage])
                                    )
                              }
                              alt="Preview"
                              style={{ maxHeight: '70px' }}
                            />
                          </div>
                        )}
                      </Col>
                      <Col lg={12}>
                        <div className="mb-3 pb-2">
                          <Label
                            htmlFor="exampleFormControlTextarea"
                            className="form-label"
                          >
                            Description
                          </Label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea"
                            value={description}
                            rows="5"
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={(e) => setDescription(e.target.value)}
                            onFocus={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                      </Col>

                      {/* {userInfoData?.role === 'admin' ? (
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="skillsInput" className="form-label">
                              Assign Into A Team
                            </Label>
                            <Select
                              options={teamList}
                              value={teamList.find((p) => p.label === team)}
                              onChange={(selectedOption) =>
                                handleTeamChange(selectedOption)
                              }
                            />
                          </div>
                        </Col>
                      ) : (
                        ''
                      )} */}

                      <Col lg={12}>
                        <div className="hstack gap-2 justify-content-end">
                          {updatePlayerIsLoading ? (
                            <Loader />
                          ) : (
                            <button
                              disabled={updatePlayerIsLoading}
                              type="button"
                              className="button p-3 text-light"
                              onClick={handleEditPlayer}
                            >
                              Update
                            </button>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditPlayerModalForGuardian;
