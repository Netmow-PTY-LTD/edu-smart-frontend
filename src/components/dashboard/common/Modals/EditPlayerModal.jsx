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
import LoaderSpiner from '@/components/constants/Loader/Loader';
import Loader from '@/components/dashboard/common/Loader';
import { emptyUpdatePlayer } from '@/slices/dashboard/adminDashboard/reducer';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { ToastContainer } from 'react-toastify';

const EditPlayerModal = ({
  playerId,
  setEditModal,
  editModal,
  singlePlayerData,
  handleEditPlayer,
  setCountry,
  setProfileImage,
  setFirst_name,
  setLast_name,
  setGender,
  setDate_of_birth,
  setHeight,
  setWeight,
  setCity,
  setState,
  setZip,
  setAddress_line_1,
  setAddress_line_2,
  setEmail,
  setPhone,
  setDescription,
  password,
  setPassword,
  setPasswordShow,
  setJerseyNumber,
  first_name,
  last_name,
  gender,
  date_of_birth,
  height,
  weight,
  country,
  city,
  state,
  zip,
  address_line_1,
  address_line_2,
  email,
  passwordShow,
  phone,
  profileImage,
  description,
  updatePlayerIsLoading,
  jerseyNumber,
  setConfirm_password,
  setConfirm_password_show,
  confirm_password_show,
}) => {
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emptyUpdatePlayer());
  }, [dispatch]);

  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    if (singlePlayerData) {
      setCountry({
        label: singlePlayerData?.country,
        value: singlePlayerData?.country,
      });
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
      setJerseyNumber(singlePlayerData?.jersey_number || '');
    }
  }, [
    setAddress_line_1,
    setAddress_line_2,
    setCity,
    setCountry,
    setDate_of_birth,
    setDescription,
    setEmail,
    setFirst_name,
    setGender,
    setHeight,
    setLast_name,
    setPhone,
    setProfileImage,
    setState,
    setWeight,
    setZip,
    singlePlayerData,
    setJerseyNumber,
  ]);
  const changeHandler = (value) => {
    setCountry(value);
  };

  const { data } = useSelector((state) => state.AdminDashboard.userInfo);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    // Password validation
    if (name === 'password') {
      setPassword(value);
      if (value === '') {
        setPasswordError('*Please enter a password.');
      } else if (value.length < 4) {
        setPasswordError('*Password must be at least 4 characters long.');
      } else {
        setPasswordError(''); // Clear error if password is valid
      }
    }

    // Confirm Password validation
    if (name === 'confirmPassword') {
      setConfirm_password(value);
      if (value === '') {
        setConfirmPasswordError('*Please confirm your password.');
      } else if (password !== value) {
        setConfirmPasswordError('*Passwords do not match.');
      } else {
        setConfirmPasswordError(''); // Clear error if passwords match
      }
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
          {updatePlayerIsLoading ? (
            <LoaderSpiner />
          ) : (
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
                            <Label
                              htmlFor="lastnameInput"
                              className="form-label"
                            >
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
                                maxDate: new Date(),
                              }}
                              value={date_of_birth}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="heightInput" className="form-label">
                              Height
                            </Label>
                            <div className="input-group">
                              <Input
                                onChange={(e) =>
                                  setHeight(e.target.value.toString() + ' CM')
                                }
                                onBlur={(e) =>
                                  setHeight(e.target.value.toString() + ' CM')
                                }
                                onFocus={(e) =>
                                  setHeight(e.target.value.toString() + ' CM')
                                }
                                type="number"
                                className="form-control"
                                id="heightInput"
                                value={
                                  height
                                    ? height.replace(/[^0-9.]/g, '').trim()
                                    : ''
                                }
                              />
                              <span className="input-group-text fs-12">CM</span>
                            </div>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="weightInput" className="form-label">
                              Weight
                            </Label>
                            <div className="input-group">
                              <Input
                                onChange={(e) =>
                                  setWeight(e.target.value.toString() + ' KG')
                                }
                                onBlur={(e) =>
                                  setWeight(e.target.value.toString() + ' KG')
                                }
                                type="text"
                                className="form-control"
                                id="weightInput"
                                value={
                                  weight
                                    ? weight.replace(/[^0-9.]/g, '').trim()
                                    : ''
                                }
                              />
                              <span className="input-group-text fs-12">KG</span>
                            </div>
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="address1Input"
                              className="form-label"
                            >
                              Address Line 1
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="address1Input"
                              value={address_line_1}
                              onChange={(e) =>
                                setAddress_line_1(e.target.value)
                              }
                              onBlur={(e) => setAddress_line_1(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="address2Input"
                              className="form-label"
                            >
                              Address Line 2
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              value={address_line_2}
                              id="address2Input"
                              onChange={(e) =>
                                setAddress_line_2(e.target.value)
                              }
                              onBlur={(e) => setAddress_line_2(e.target.value)}
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
                            <Label
                              htmlFor="websiteInput1"
                              className="form-label"
                            >
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
                            <Label
                              htmlFor="zipcodeInput"
                              className="form-label"
                            >
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

                        <Col lg={3}>
                          <div className="mb-3">
                            <Label
                              htmlFor="countryInput"
                              className="form-label"
                            >
                              Country
                            </Label>

                            <Select
                              options={options}
                              value={options?.find(
                                (p) => p.label === country?.label
                              )}
                              onChange={changeHandler}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="passwordInput"
                              className="form-label"
                            >
                              Password
                            </Label>
                            <div className="position-relative auth-pass-inputgroup">
                              <Input
                                type={passwordShow ? 'text' : 'password'}
                                className="form-control"
                                id="passwordInput"
                                name="password"
                                onChange={handlePasswordChange}
                                onBlur={handlePasswordChange}
                                onPaste={(e) => e.preventDefault()}
                                required
                              />
                              <button
                                className="position-absolute end-0 top-0 mt-n1 fs-2 text-decoration-none text-muted password-addon p-4"
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
                            {passwordError && (
                              <p className="text-danger fs-12 mt-2">
                                {passwordError}
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="confirmpasswordInput"
                              className="form-label"
                            >
                              Confirm Password
                            </Label>
                            <div className="position-relative auth-pass-inputgroup">
                              <Input
                                type={
                                  confirm_password_show ? 'text' : 'password'
                                }
                                className="form-control"
                                id="confirmpasswordInput"
                                name="confirmPassword"
                                // onChange={(e) =>
                                //   setConfirm_password(e.target.value)
                                // }
                                onChange={handlePasswordChange}
                                onBlur={handlePasswordChange}
                                // onBlur={(e) =>
                                //   setConfirm_password(e.target.value)
                                // }
                                onPaste={(e) => e.preventDefault()}
                                required
                              />
                              <button
                                className="position-absolute end-0 top-0 mt-n1 fs-2 text-decoration-none text-muted password-addon p-4"
                                type="button"
                                onClick={() =>
                                  setConfirm_password_show(
                                    !confirm_password_show
                                  )
                                }
                                style={{ backgroundColor: 'transparent' }}
                              >
                                <i
                                  className={`${
                                    confirm_password_show
                                      ? 'ri-eye-off-line align-middle'
                                      : 'ri-eye-fill align-middle'
                                  }`}
                                ></i>
                              </button>
                              {confirmPasswordError && (
                                <p className="text-danger fs-12 mt-2">
                                  {confirmPasswordError}
                                </p>
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="emailInput" className="form-label">
                              Email
                            </Label>
                            <Input
                              // disabled
                              type="email"
                              className="form-control"
                              id="emailInput"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onBlur={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="phoneInput" className="form-label">
                              Phone(Optional)
                            </Label>
                            <Input
                              type="tel"
                              className="form-control"
                              id="phoneInput"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              onBlur={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </Col>

                        {data?.role === 'admin' && (
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="jerseyNumberInput"
                                className="form-label"
                              >
                                Jersey Number
                              </Label>
                              <div>
                                <Input
                                  type={'text'}
                                  className="form-control"
                                  id="jerseyNumberInput"
                                  onChange={(e) =>
                                    setJerseyNumber(e.target.value)
                                  }
                                  value={jerseyNumber}
                                />
                              </div>
                            </div>
                          </Col>
                        )}

                        <Col xl={6}>
                          <div className="mb-3">
                            <Label htmlFor="imageInput" className="form-label">
                              Image{' '}
                              <small className="fs-10 text-danger">
                                (Max. 300px X 300px, Max. 2MB, valid exts: png,
                                jpg, jpeg)
                              </small>
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
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditPlayerModal;
