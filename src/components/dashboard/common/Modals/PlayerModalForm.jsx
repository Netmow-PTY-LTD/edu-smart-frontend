/* eslint-disable @next/next/no-img-element */
import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import { addPlayerForGuardian } from '@/slices/dashboard/adminDashboard/Actions/playerActions';
import { getRegistrationFee } from '@/slices/dashboard/adminDashboard/Actions/registrationActions';
import { emptyAddPlayerForGuardian } from '@/slices/dashboard/adminDashboard/reducer';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const PlayerModalForm = ({ addNewPlayerModal, TogAll, id }) => {
  const dispatch = useDispatch();
  // navigate
  const router = useRouter();

  // get all team list
  const allTeams = useSelector((state) => state.AdminDashboard.addNewTeam);
  useEffect(() => {
    dispatch(getAllTeam());
  }, [dispatch]);

  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    if (allTeams?.data?.length > 0) {
      const mappedData = allTeams.data.map((teams) => ({
        label: teams.name,
        value: teams._id,
      }));

      setTeamList(mappedData);
    }
  }, [allTeams]);

  // redux setup
  const { data, isLoading, error } = useSelector(
    (state) => state.AdminDashboard.addPlayerForGuardian
  );

  useEffect(() => {
    dispatch(emptyAddPlayerForGuardian());
  }, [dispatch]);

  useEffect(() => {
    if (data?._id && error === null) {
      dispatch(emptyAddPlayerForGuardian());
      router.push(`/admin/player-profile/${data?._id}`);
    }
    if (error) {
      toast.error(error);
    }
  }, [data?._id, dispatch, error, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [team, setTeam] = useState('');
  const [description, setDescription] = useState('');
  // const [fees, setFees] = useState('');
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
  const [passwordError, setPasswordError] = useState('');
  const [passwordError1, setPasswordError1] = useState('');
  const [passwordError2, setPasswordError2] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState('');

  // for eye button
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [profileImage, setProfileImage] = useState({});
  const options = useMemo(() => countryList().getData(), []);

  const registrationFee = useSelector(
    (state) => state.AdminDashboard.registrationFee
  );

  useEffect(() => {
    dispatch(getRegistrationFee());
  }, [dispatch]);

  const changeHandler = (value) => {
    setCountry(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
    }
  };

  const handleAddGuardian = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordError1('');
    setPasswordError2('');
    setConfirmPasswordError('');
    const PlayerData = {
      team,
      fees: registrationFee?.data?.player_registration_fee,
      first_name,
      last_name,
      gender,
      date_of_birth,
      height,
      weight,
      phone,
      email,
      address_line_1,
      address_line_2,
      country: country?.label,
      city,
      state,
      zip,
      description,
      password,
      confirm_password,
      jerseyNumber,
      id,
      image: profileImage,
    };

    const finalData = new FormData();
    Object.entries(PlayerData).forEach(([key, value]) => {
      finalData.append(key, value);
    });

    let isValidPassword = true;

    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!password) {
      setPasswordError('Please a confirm password.');
      isValidPassword = false;
    }
    // else if (!passwordRegex.test(password)) {
    //   setPasswordError1('');
    //   setPasswordError1('At least 8 characters long');
    //   setPasswordError2(
    //     'Should contain number, uppercase and lowercase letter.'
    //   );
    //   isValidPassword = false;
    // }

    if (!confirm_password) {
      setConfirmPasswordError('Please enter confirm password.');
      isValidPassword = false;
    }
    // else if (!passwordRegex.test(confirm_password)) {
    //   setConfirmPasswordError("Confirm password does't matched");
    // }

    if (password !== confirm_password) {
      setConfirmPasswordError("Confirm password doesn't match");
      isValidPassword = false;
    }

    if (isValidPassword) {
      dispatch(addPlayerForGuardian(finalData));
    }
  };

  return (
    <div>
      {/* success modal */}
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={addNewPlayerModal}
        centered
        size="lg"
        scrollable
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Add Player</h5>
          <button
            type="button"
            onClick={TogAll}
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
                  <Label htmlFor="firstnameInput" className="form-label">
                    First Name
                  </Label>
                  <span className="text-danger">*</span>
                  <Input
                    type="text"
                    className="form-control"
                    id="firstnameInput"
                    placeholder="Enter your firstname"
                    onBlur={(e) => setFirst_name(e.target.value)}
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
                    onBlur={(e) => setLast_name(e.target.value)}
                    onInput={(e) => setLast_name(e.target.value)}
                    required
                  />
                </div>
              </Col>
              <Col xl={12} className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="lastnameInput" className="form-label">
                    Image
                  </label>
                  <span className="text-danger">*</span>

                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    onInput={handleImageChange}
                    className="form-control"
                    required
                  />
                  {profileImage?.name ? (
                    <div>
                      <img
                        className="mt-3"
                        src={
                          typeof profileImage === 'string'
                            ? profileImage
                            : URL.createObjectURL(profileImage)
                        }
                        alt="img"
                        style={{ maxHeight: '70px' }}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="skillsInput" className="form-label">
                    Gender
                  </Label>
                  <select
                    className="form-select"
                    onBlur={(e) => setGender(e.target.value)}
                    onInput={(e) => setGender(e.target.value)}
                  >
                    <option>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="JoiningdatInput" className="form-label">
                    Date of birth
                  </Label>
                  <Flatpickr
                    onBlur={(e) => setDate_of_birth(e.target.value)}
                    onInput={(e) => setDate_of_birth(e.target.value)}
                    className="form-control"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="zipcodeInput" className="form-label">
                    Email
                  </Label>
                  <span className="text-danger">*</span>

                  <Input
                    type="email"
                    className="form-control"
                    id="zipcodeInput"
                    onBlur={(e) => setEmail(e.target.value)}
                    onInput={(e) => setEmail(e.target.value)}
                    required
                  />
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
                    onBlur={(e) => setPhone(e.target.value)}
                    onInput={(e) => setPhone(e.target.value)}
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="designationInput" className="form-label">
                    Height
                  </Label>
                  <Input
                    onBlur={(e) => setHeight(e.target.value)}
                    onInput={(e) => setHeight(e.target.value)}
                    type="number && text"
                    className="form-control"
                    id="designationInput"
                    placeholder="exm: 5feet 9inch or 172CM"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="designationInput" className="form-label">
                    Weight
                  </Label>
                  <Input
                    onBlur={(e) => setWeight(e.target.value)}
                    onInput={(e) => setWeight(e.target.value)}
                    type="text && number"
                    className="form-control"
                    id="designationInput"
                    placeholder="exm: 5feet 9inch or 172CM"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="designationInput" className="form-label">
                    Address Line 1
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="designationInput"
                    onBlur={(e) => setAddress_line_1(e.target.value)}
                    onInput={(e) => setAddress_line_1(e.target.value)}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="designationInput" className="form-label">
                    Address Line 2
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="designationInput"
                    onBlur={(e) => setAddress_line_2(e.target.value)}
                    onInput={(e) => setAddress_line_2(e.target.value)}
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
                    onInput={changeHandler}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="cityInput" className="form-label">
                    City
                  </Label>
                  <Input
                    onBlur={(e) => setCity(e.target.value)}
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
                    onBlur={(e) => setState(e.target.value)}
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
                    onBlur={(e) => setZip(e.target.value)}
                    onInput={(e) => setZip(e.target.value)}
                    type="number"
                    className="form-control"
                    id="zipcodeInput"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="descriptionInput" className="form-label">
                    Description
                  </Label>
                  <Input
                    onBlur={(e) => setDescription(e.target.value)}
                    onInput={(e) => setDescription(e.target.value)}
                    type="textarea"
                    className="form-control"
                    id="descriptionInput"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="zipcodeInput" className="form-label">
                    Password
                  </Label>
                  <span className="text-danger">*</span>

                  <div className="position-relative auth-pass-inputgroup">
                    <Input
                      type={passwordShow ? 'text' : 'password'}
                      className="form-control"
                      id="passwordInput"
                      onChange={(e) => setPassword(e.target.value)}
                      onInput={(e) => setPassword(e.target.value)}
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
                {/* <ul className="ps-1">
                  <li className="text-black fs-3">
                    *At least 8 characters long
                  </li>
                  <li className="text-black fs-3">
                    *Should contain number, a uppercase and a lowercase letter.
                  </li>
                </ul> */}
                {/* {passwordError1 && passwordError2 && (
                  <ul>
                    <li className="text-danger fs-3">
                      *At least 8 characters long
                    </li>
                    <li className="text-danger fs-3">
                      *Should contain number, uppercase and lowercase letter.
                    </li>
                  </ul>
                )}
                {passwordError && (
                  <ul>
                    <li className="text-danger fs-3">
                      *Please enter a password.
                    </li>
                  </ul>
                )} */}
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="zipcodeInput" className="form-label">
                    Confirm Password
                  </Label>
                  <span className="text-danger">*</span>

                  <div className="position-relative auth-pass-inputgroup">
                    <Input
                      type={confirmPasswordShow ? 'text' : 'password'}
                      className="form-control"
                      id="zipcodeInput"
                      onChange={(e) => setConfirm_password(e.target.value)}
                    />
                    <button
                      className="position-absolute end-0 top-0 mt-n1 fs-2 text-decoration-none text-muted password-addon p-3"
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
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="jerseyNumberInput" className="form-label">
                    Jersey Number
                  </Label>
                  <div>
                    <Input
                      type={'text'}
                      className="form-control"
                      id="jerseyNumberInput"
                      onChange={(e) => setJerseyNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </Col>
              {/* <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="skillsInput" className="form-label">
                    Assign Into A Team
                  </Label>
                  <select
                    className="form-select"
                    onBlur={(e) => setTeam(e.target.value)}
                  >
                    {[{ label: 'Please Select', value: '' }, ...teamList].map(
                      (team, i) => (
                        <option key={i} value={team.value}>
                          {team.label}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </Col> */}

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={isLoading}
                      type="button"
                      className="button p-3 text-light"
                      onClick={handleAddGuardian}
                      // onClick={Tog_add_success_modal}
                    >
                      Add
                    </button>
                  )}
                  {/* <SuccessModel
                            title="Successfully added a new Player"
                            secondTitle="Transaction ID: 4df432ewdsa"
                            rightBtn="Add Into A New Team"
                            leftBtn="Add Into A Existing Team"
                            isOpen={add_success_modal}
                            toggle={Tog_add_success_modal}
                          /> */}
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PlayerModalForm;
