/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  addTrainer,
  getAllTrainer,
} from '@/slices/dashboard/adminDashboard/Actions/trainerActions';
import { emptyTrainer } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const TrainerModalForm = ({
  isOpen,
  title,
  btn,
  setAddTrainerModal,
  addTrainerModal,
}) => {
  // redux setup
  const dispatch = useDispatch();
  const {
    data: trainerData,
    isLoading: trainerIsLoading,
    error: trainerError,
  } = useSelector((state) => state.AdminDashboard.addTrainer);

  useEffect(() => {
    dispatch(emptyTrainer());
  }, [dispatch]);

  useEffect(() => {
    if (trainerData?.message && trainerError === null) {
      toast.success('Trainer added successfully.');
      setTimeout(() => {
        handleClose();
        dispatch(getAllTrainer());
        dispatch(emptyTrainer());
      }, 500);
    }
    if (trainerError) {
      toast.error(trainerError);
    }
  }, [trainerData]);

  // all state

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    username: '',
    status: '',
    image: '',
  });
  // for eye button
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirm_passwordShow, setconfirm_passwordShow] = useState(false);
  const [date_of_birth, setDate_of_birth] = useState('');

  //  error state
  const [errors, setErrors] = useState({});

  // for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });

    let fieldError = '';

    // Validate password length
    if (name === 'password') {
      if (!value) {
        fieldError = 'Password is required';
      } else if (value.length < 4) {
        fieldError = 'Password must be at least 4 characters long';
      }

      // Validate password match if confirm_password is already filled
      if (formData.confirm_password && value !== formData.confirm_password) {
        setErrors({
          ...errors,
          confirm_password: 'Password does not match',
        });
      } else {
        setErrors({
          ...errors,
          confirm_password: '', // Clear confirm_password error if they match
        });
      }
    }

    // Validate confirm password
    if (name === 'confirm_password') {
      if (!value) {
        fieldError = 'Confirm Password is required';
      } else if (value !== formData.password) {
        fieldError = 'Passwords do not match';
      }
    }

    // Clear any previous errors for the current field and set new ones if applicable
    setErrors({
      ...errors,
      [name]: fieldError,
    });

    // // clear the form error
    // setErrors({
    //   ...errors,
    //   [name]: '',
    // });
  };

  // image validation function
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

    setErrors({
      ...errors,
      image: '',
    });
  };

  // submit form data handler
  const handleTrainerSubmit = (e) => {
    e.preventDefault();

    // for trainer
    const trainerAllData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      gender: formData.gender,
      date_of_birth: date_of_birth,
      email: formData.email,
      phone: formData.phone,
      image: formData.image,
      password: formData.password,
      confirm_password: formData.confirm_password,
      username: formData.username,
      status: formData.status,
    };

    const treamedData = new FormData();
    Object.entries(trainerAllData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    // Perform form validation
    const newErrors = {};

    if (!formData.first_name) {
      newErrors.first_name = 'First Name is required';
    }

    if (!formData.last_name) {
      newErrors.last_name = 'Last Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Confirm Password is required';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      dispatch(addTrainer(treamedData));
    } else {
      setErrors(newErrors);
    }
  };

  const handleClose = () => {
    setFormData({
      first_name: '',
      last_name: '',
      gender: '',
      email: '',
      phone: '',
      image: null,
      password: '',
      confirm_password: '',
      username: '',
      status: '',
    });

    // Clear the error messages
    setErrors({
      first_name: '',
      last_name: '',
      gender: '',
      email: '',
      phone: '',
      image: '',
      password: '',
      confirm_password: '',
      username: '',
      status: '',
    });

    // toggle();
    setAddTrainerModal(!addTrainerModal);
  };

  return (
    <div>
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={addTrainerModal}
        centered
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={() => handleClose()}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          <Form id="trainer-form">
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="first_nameInput" className="form-label">
                    First Name
                  </Label>
                  <span className="text-danger">*</span>

                  <Input
                    type="text"
                    className="form-control"
                    id="first_nameInput"
                    name="first_name"
                    placeholder="Enter your first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                  />
                  {errors.first_name && (
                    <div className="text-danger">{errors.first_name}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="last_nameInput" className="form-label">
                    Last Name
                  </Label>
                  <span className="text-danger">*</span>

                  <Input
                    type="text"
                    className="form-control"
                    id="last_nameInput"
                    name="last_name"
                    placeholder="Enter your first_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                  />
                  {errors.last_name && (
                    <div className="text-danger">{errors.last_name}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="genderInput" className="form-label">
                    Gender
                  </Label>
                  <select
                    className="form-select"
                    id="genderInput"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="date_of_birthInput" className="form-label">
                    Date of Birth
                  </Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: 'd M, Y',
                      maxDate: new Date(),
                    }}
                    value={date_of_birth}
                    onInput={(e) => setDate_of_birth(e.target?.value)}
                    onChange={(e) => setDate_of_birth(e.target?.value)}
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
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="phoneInput" className="form-label">
                    Phone (Optional)
                  </Label>
                  <Input
                    type="tel"
                    className="form-control"
                    id="phoneInput"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                  />
                </div>
              </Col>

              <Col xl={12} className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="imageInput" className="form-label">
                    Image{' '}
                    <small className="mb-2 fs-10 text-danger">
                      (Max. 300px X 300px, Max. 2MB, valid exts: png, jpg, jpeg)
                    </small>
                  </label>
                  <Input
                    name="image"
                    id="profile-img-file-input"
                    type="file"
                    className="profile-img-file-input"
                    onChange={handleImageChange}
                    onInput={handleImageChange}
                  />
                  {formData?.image && (
                    <div>
                      <img
                        className="mt-3"
                        src={
                          formData?.image
                            ? URL.createObjectURL(new Blob([formData?.image]))
                            : ''
                        }
                        style={{ maxHeight: '70px' }}
                        alt="img"
                      />
                    </div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-2">
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
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onInput={handleInputChange}
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
                </div>
                {errors.password && (
                  <div className="text-danger fs-12">{errors.password}</div>
                )}
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="confirm_passwordInput" className="form-label">
                    Confirm Password
                  </Label>
                  <span className="text-danger">*</span>

                  <div className="position-relative auth-pass-inputgroup">
                    <Input
                      type={confirm_passwordShow ? 'text' : 'password'}
                      className="form-control"
                      id="confirm_passwordInput"
                      name="confirm_password"
                      placeholder="Confirm your password"
                      value={formData.confirm_password}
                      onChange={handleInputChange}
                      onInput={handleInputChange}
                      onPaste={(e) => e.preventDefault()}
                      required
                    />
                    <button
                      className="position-absolute end-0 top-0 mt-n1 fs-2 text-decoration-none text-muted password-addon p-4"
                      type="button"
                      onClick={() =>
                        setconfirm_passwordShow(!confirm_passwordShow)
                      }
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <i
                        className={`${
                          confirm_passwordShow
                            ? 'ri-eye-off-line align-middle'
                            : 'ri-eye-fill align-middle'
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                {errors.confirm_password && (
                  <div className="text-danger">{errors.confirm_password}</div>
                )}
              </Col>

              {/* <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="usernameInput" className="form-label">
                    Username
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="usernameInput"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                  />
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </div>
              </Col> */}

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="statusInput" className="form-label">
                    Status
                  </Label>
                  <select
                    className="form-select"
                    id="statusInput"
                    name="status"
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  {errors.status && (
                    <div className="text-danger">{errors.status}</div>
                  )}
                </div>
              </Col>

              {title === 'Add Trainer' ? (
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end mt-3">
                    {trainerIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        disabled={trainerIsLoading}
                        type="button"
                        className="button p-3 text-light"
                        onClick={handleTrainerSubmit}
                      >
                        {btn}
                      </button>
                    )}
                  </div>
                </Col>
              ) : (
                ''
              )}
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TrainerModalForm;
