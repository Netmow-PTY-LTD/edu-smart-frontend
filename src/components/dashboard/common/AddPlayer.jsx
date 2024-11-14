import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { ToastContainer } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from 'reactstrap';
import progileBg from '../../../../public/assets/images/profile_bg.jpg';
import dummyImg from '../../../../public/assets/images/users/user-dummy-img.jpg';
import Layout from '../layout';
import Loader from './Loader';
import MultiRouteWrapper from './onBoarding/MultiRouteWrapper';

const AddPlayer = ({
  previewImage,
  showFirstName,
  showLastName,
  setShowFirstName,
  setShowLastName,
  setFirst_name,
  setLast_name,
  setDate_of_birth,
  setHeight,
  setAddress_line_1,
  setAddress_line_2,
  setCity,
  setConfirmPasswordShow,
  confirm_password,
  setConfirm_password,
  setGender,
  setWeight,
  setCountry,
  setProfileImage,
  setPreviewImage,
  setState,
  country,
  setZip,
  setEmail,
  setPhone,
  setDescription,
  password,
  passwordShow,
  setPassword,
  setPasswordShow,
  passwordError,
  setPasswordError,
  confirmPasswordShow,
  confirmPasswordError,
  setConfirmPasswordError,
  teamList,
  setTeam,
  registrationFee,
  isLoading,
  handleSubmit,
  jerseyNumber,
  setJerseyNumber,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [{ run, steps }] = useState({
    run: true,
    steps: [
      {
        content: <h2></h2>,
        target: 'addplayer',
      },
      {
        title: <h2>Add Player</h2>,
        content: <p></p>,
        target: '#addplayer',
        placement: 'right',
      },
      {
        title: <h2>Upload Profile Image</h2>,
        content: <p></p>,
        target: '#profileimage',
        placement: 'right',
      },
      {
        title: <h2>Personal Details</h2>,
        content: <p></p>,
        target: '#player-form',
        placement: 'left',
      },
      {
        title: <h2>Click To Add</h2>,
        content: <p></p>,
        target: '#addbtn',
        placement: 'left',
      },
    ],
  });

  const { data } = useSelector((state) => state.AdminDashboard.userInfo);

  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (value) => {
    setCountry(value ? value : '');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    // Validate password length
    if (name === 'password') {
      setPassword(value);
      if (value === '') {
        setPasswordError('Please enter a password');
      } else if (value.length < 4) {
        setPasswordError('Password must be at least 4 characters long');
      } else {
        setPasswordError('');
      }
    }

    if (name === 'confirmPassword') {
      setConfirm_password(value);
      if (value === '') {
        setConfirmPasswordError('Please enter a password');
      } else if (value !== password) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }
  };

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n5 mt-n5">
            <div className="profile-wid-bg profile-setting-img">
              <Image src={progileBg} className="profile-wid-img" alt="" />
            </div>
          </div>
          <Row>
            <Col xxl={3}>
              <Card className="mt-n5 mb-4">
                <CardBody className="p-4 my-5">
                  <div id="profileimage" className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      <Image
                        src={previewImage ? previewImage : dummyImg}
                        width={60}
                        height={60}
                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        alt="user-profile"
                      />
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        <Input
                          name="image"
                          id="profile-img-file-input"
                          type="file"
                          className="profile-img-file-input"
                          onChange={handleImageChange}
                        />
                        <Label
                          htmlFor="profile-img-file-input"
                          className="profile-photo-edit avatar-xs"
                        >
                          <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill"></i>
                          </span>
                        </Label>
                      </div>
                    </div>
                    <div className="mb-2 fs-10 text-danger">
                      (Max. 300px X 300px, Max. 2MB, valid exts: png, jpg, jpeg)
                    </div>
                    <h5 className="fs-16 mb-1">{`${showFirstName} ${showLastName}`}</h5>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xxl={9}>
              <ToastContainer />
              <Card className="mt-xxl-n5">
                <CardHeader className="card-title">Personal Details</CardHeader>
                <CardBody className="px-5 py-4">
                  <Form id="player-form">
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="firstnameInput"
                            className="form-label"
                          >
                            First Name
                          </Label>
                          <span className="text-danger">*</span>
                          <Input
                            type="text"
                            className="form-control"
                            id="firstnameInput"
                            placeholder="Enter your firstname"
                            onChange={(e) => setShowFirstName(e.target.value)}
                            onInput={(e) => setFirst_name(e.target.value)}
                            required
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="lastnameInput" className="form-label">
                            Last Name
                          </Label>
                          <span className="text-danger">*</span>

                          <Input
                            type="text"
                            className="form-control"
                            id="lastnameInput"
                            placeholder="Enter your lastname"
                            onChange={(e) => setShowLastName(e.target.value)}
                            onInput={(e) => setLast_name(e.target.value)}
                            required
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="skillsInput" className="form-label">
                            Gender
                          </Label>
                          <select
                            className="form-select"
                            onInput={(e) => setGender(e.target.value)}
                          >
                            <option value="">Select</option>
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
                            onInput={(e) => setDate_of_birth(e.target?.value)}
                            onChange={(e) => setDate_of_birth(e.target?.value)}
                            className="form-control"
                            options={{
                              dateFormat: 'd M, Y',
                              maxDate: new Date(),
                            }}
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
                              onInput={(e) =>
                                setHeight(e.target.value.toString() + ' CM')
                              }
                              type="number"
                              id="heightInput"
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
                              onInput={(e) =>
                                setWeight(e.target.value.toString() + ' KG')
                              }
                              type="number"
                              id="weightInput"
                            />
                            <span className="input-group-text fs-12">KG</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="address1Input" className="form-label">
                            Address Line 1
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="address1Input"
                            onInput={(e) => setAddress_line_1(e.target.value)}
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
                            id="designationInput"
                            onInput={(e) => setAddress_line_2(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label htmlFor="cityInput" className="form-label">
                            City
                          </Label>
                          <Input
                            onInput={(e) => setCity(e.target.value)}
                            type="text"
                            className="form-control"
                            id="cityInput"
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label htmlFor="websiteInput1" className="form-label">
                            State
                          </Label>
                          <Input
                            onInput={(e) => setState(e.target.value)}
                            type="text"
                            className="form-control"
                            id="websiteInput1"
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label htmlFor="zipcodeInput" className="form-label">
                            Zip
                          </Label>
                          <Input
                            onInput={(e) => setZip(e.target.value)}
                            type="number"
                            className="form-control"
                            id="zipcodeInput"
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
                            value={country}
                            onChange={changeHandler}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="emailInput" className="form-label">
                            Email
                          </Label>
                          <span className="text-danger">*</span>

                          <Input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            onInput={(e) => setEmail(e.target.value)}
                            required
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
                            onInput={(e) => setPhone(e.target.value)}
                          />
                        </div>
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
                            rows="5"
                            onInput={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="passwordInput" className="form-label">
                            Password
                          </Label>
                          <span className="text-danger">*</span>

                          <div className="position-relative auth-pass-inputgroup">
                            <Input
                              type={passwordShow ? 'text' : 'password'}
                              className="form-control"
                              id="passwordInput"
                              name="password"
                              value={password}
                              onChange={handlePasswordInputChange}
                              onPaste={(e) => e.preventDefault()}
                              required
                              autoComplete="off"
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
                            {passwordError && (
                              <p className="text-danger fs-12 mt-2">
                                {passwordError}
                              </p>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="confirmPasswordInput"
                            className="form-label"
                          >
                            Confirm Password
                          </Label>

                          <span className="text-danger">*</span>

                          <div className="position-relative auth-pass-inputgroup">
                            <Input
                              type={confirmPasswordShow ? 'text' : 'password'}
                              className="form-control"
                              id="confirmPasswordInput"
                              name="confirmPassword"
                              // onChange={(e) =>
                              //   setConfirm_password(e.target.value)
                              // }
                              onChange={handlePasswordInputChange}
                              required
                            />
                            <button
                              className="position-absolute end-0 top-0 mt-n1 fs-2 text-decoration-none text-muted password-addon p-4"
                              type="button"
                              onClick={() =>
                                setConfirmPasswordShow(!confirmPasswordShow)
                              }
                              style={{ backgroundColor: 'transparent' }}
                            >
                              <i
                                className={`${
                                  confirmPasswordShow
                                    ? 'ri-eye-off-line align-middle'
                                    : 'ri-eye-fill align-middle'
                                }`}
                              ></i>
                            </button>
                          </div>
                        </div>
                        {confirmPasswordError && (
                          <span className="text-danger fs-3">
                            *{confirmPasswordError}
                          </span>
                        )}
                      </Col>

                      {/* {data?.role === 'admin' ? (
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="skillsInput" className="form-label">
                              Assign Into A Team
                            </Label>
                            <select
                              className="form-select"
                              onInput={(e) => setTeam(e.target.value)}
                            >
                              {[
                                { label: 'Please Select', value: '' },
                                ...teamList,
                              ].map((team, i) => (
                                <option key={i} value={team?.value}>
                                  {team?.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                      ) : (
                        ''
                      )} */}

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
                                required
                              />
                            </div>
                          </div>
                        </Col>
                      )}

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="skillsInput" className="form-label">
                            Fees
                          </Label>
                          <div>
                            <span className="badge fs-14 p-3 fee-badge">
                              REGISTRATION FEE (
                              {registrationFee?.data?.currency}{' '}
                              {registrationFee?.data?.player_registration_fee})
                            </span>
                          </div>
                        </div>
                      </Col>

                      <Col lg={12}>
                        <div className="hstack gap-2 justify-content-end">
                          {isLoading ? (
                            <Loader />
                          ) : (
                            <button
                              id="addbtn"
                              disabled={isLoading}
                              type="button"
                              className="button p-3 text-light"
                              onClick={handleSubmit}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {router.query.addplayer === 'true' ? (
            <MultiRouteWrapper run={run} steps={steps} />
          ) : (
            ''
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default AddPlayer;
