/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import LoaderSpiner from '@/components/constants/Loader/Loader';
import {
  getAllTrainer,
  getSingleTrainer,
  updateTrainer,
} from '@/slices/dashboard/adminDashboard/Actions/trainerActions';
import { emptyUpdateTrainer } from '@/slices/dashboard/adminDashboard/reducer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const EditTrainerModal = ({ setModalEdit, modalEdit, id }) => {
  // for eye button
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirm_passwordShow, setconfirm_passwordShow] = useState(false);
  const [errors, setErrors] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // navigate
  const router = useRouter();
  // redux setup
  const dispatch = useDispatch();

  const { data: singleTrainerData, isLoading: singleTrainerIsLoading } =
    useSelector((state) => state.AdminDashboard.singleTrainer);
  useEffect(() => {
    if (id) {
      dispatch(getSingleTrainer({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singleTrainerData) {
      setFormData({
        first_name: singleTrainerData?.first_name,
        last_name: singleTrainerData?.last_name,
        gender: singleTrainerData?.gender,
        date_of_birth: singleTrainerData?.date_of_birth,
        email: singleTrainerData?.email,
        phone: singleTrainerData?.phone,
        status: singleTrainerData?.status,
      });
    }
  }, [singleTrainerData]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        singleTrainerData?.profile_image &&
        typeof singleTrainerData?.profile_image === 'object' &&
        singleTrainerData?.profile_image?.uploadedImage
      ) {
        try {
          const response = await fetch(
            singleTrainerData?.profile_image?.uploadedImage
          );
          const blob = await response.blob();
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
          const newData = {
            ...singleTrainerData,
            image: file,
          };
          setFormData(newData);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    };

    fetchData();
  }, [singleTrainerData]);

  const {
    data: updateTrainerData,
    isLoading: updateTrainerIsLoading,
    error: updateTrainerError,
  } = useSelector((state) => state.AdminDashboard.updateTrainer);

  useEffect(() => {
    dispatch(emptyUpdateTrainer());
  }, [dispatch]);

  useEffect(() => {
    if (updateTrainerData?.message && updateTrainerError === null) {
      toast.success(updateTrainerData?.message);
      dispatch(emptyUpdateTrainer());
      dispatch(getSingleTrainer({ id }));
      dispatch(getAllTrainer());
      handleClose();
    }
  }, [dispatch, updateTrainerData?.message, updateTrainerError]);

  const handleClose = () => {
    setModalEdit(!modalEdit);
  };

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    phone: '',
    image: null,
    password: '',
    confirm_password: '',
    username: '',
    status: '',
  });

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

    // Validate password length
    if (name === 'password') {
      if (!value) {
        setPasswordError('Password is required');
      } else if (value.length < 4) {
        setPasswordError('Password must be at least 4 characters long');
      } else {
        setPasswordError('');
      }

      // Validate password match if confirm_password is already filled
      if (formData.confirm_password && value !== formData.confirm_password) {
        setConfirmPasswordError('Password does not match');
      } else {
        setConfirmPasswordError('');
      }
    }

    // Validate confirm password
    if (name === 'confirm_password') {
      if (!value) {
        setConfirmPasswordError('Confirm Password is required');
      } else if (value !== formData.password) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }
  };

  // handle date of birth change
  const handledate_of_birthChange = (selectedDates, dateStr) => {
    setFormData({
      ...formData,
      date_of_birth: dateStr,
    });
  };

  // submit form data handler
  const handleEditTrainer = (e) => {
    e.preventDefault();

    let trainerData = {};
    if (formData?.first_name) {
      if (formData?.last_name) {
        trainerData.first_name = formData?.first_name;
      } else {
        if (singleTrainerData?.first_name?.split(' ')?.length > 2) {
          trainerData.first_name =
            formData?.first_name +
            ' ' +
            singleTrainerData?.first_name?.split(' ')[1] +
            ' ' +
            singleTrainerData?.first_name?.split(' ')[2];
        } else if (singleTrainerData?.first_name?.split(' ')?.length > 1) {
          trainerData.first_name =
            formData?.first_name +
            ' ' +
            singleTrainerData?.first_name?.split(' ')[1];
        } else {
          trainerData.first_name = formData?.first_name;
        }
      }
    } else {
      trainerData = {
        ...trainerData,
        first_name: ' ',
      };
    }

    if (formData?.last_name) {
      if (formData?.first_name) {
        trainerData.last_name = formData?.last_name;
      } else {
        if (singleTrainerData?.last_name?.split(' ')?.length > 2) {
          trainerData.last_name = formData?.last_name;
        } else if (singleTrainerData?.last_name?.split(' ')?.length > 1) {
          trainerData.last_name =
            formData?.last_name +
            ' ' +
            singleTrainerData?.last_name?.split(' ')[1];
        } else {
          trainerData.last_name = formData?.last_name;
        }
      }
    } else {
      trainerData = {
        ...trainerData,
        last_name: ' ',
      };
    }

    if (id) {
      trainerData.id = id;
    }

    if (formData?.phone) {
      trainerData = {
        ...trainerData,
        phone: formData?.phone,
      };
    } else {
      trainerData = {
        ...trainerData,
        phone: ' ',
      };
    }

    if (formData?.gender) {
      trainerData = {
        ...trainerData,
        gender: formData?.gender,
      };
    } else {
      trainerData = {
        ...trainerData,
        gender: ' ',
      };
    }

    if (formData?.date_of_birth) {
      trainerData = {
        ...trainerData,
        date_of_birth: formData?.date_of_birth,
      };
    } else {
      trainerData = {
        ...trainerData,
        date_of_birth: ' ',
      };
    }

    if (formData?.image) {
      trainerData = {
        ...trainerData,
        image: formData?.image,
      };
    } else {
      trainerData = {
        ...trainerData,
        image: ' ',
      };
    }

    if (formData?.password) {
      trainerData = {
        ...trainerData,
        password: formData?.password,
      };
    } else if (!formData?.password) {
      trainerData = {
        ...trainerData,
      };
    }

    if (formData?.password?.length < 4) {
      toast.error('Password must be at least 4 characters long');
      return;
    }

    if (formData?.confirm_password) {
      trainerData = {
        ...trainerData,
        confirm_password: formData?.confirm_password,
      };
    } else if (!formData?.confirm_password) {
      trainerData = {
        ...trainerData,
      };
    }

    // if (formData?.username) {
    //   trainerData = {
    //     ...trainerData,
    //     username: formData?.username,
    //   };
    // }

    if (formData?.status) {
      trainerData = {
        ...trainerData,
        status: formData?.status,
      };
    } else {
      trainerData = {
        ...trainerData,
        status: ' ',
      };
    }

    if (formData?.email) {
      trainerData = {
        ...trainerData,
        email: formData?.email,
      };
    } else {
      trainerData = {
        ...trainerData,
        email: ' ',
      };
    }

    const treamedData = new FormData();
    Object.entries(trainerData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    if (
      trainerData?.first_name ||
      trainerData?.last_name ||
      trainerData?.phone ||
      trainerData?.gender ||
      trainerData?.date_of_birth ||
      trainerData?.image ||
      trainerData?.password ||
      trainerData?.confirm_password ||
      // trainerData?.username ||
      trainerData?.status
    ) {
      dispatch(updateTrainer(treamedData));
    }
  };

  return (
    <div>
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={modalEdit}
        centered
        size="lg"
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Edit Trainer</h5>
          <button
            type="button"
            onClick={handleClose}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          {singleTrainerIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Form id="trainer-form">
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="first_nameInput" className="form-label">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="first_nameInput"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="last_nameInput" className="form-label">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="last_nameInput"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
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
                    >
                      <option value="">
                        {singleTrainerData?.gender && singleTrainerData?.gender
                          ? `Selected : ${singleTrainerData?.gender}`
                          : 'Select'}
                      </option>
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
                      value={formData.date_of_birth}
                      onChange={handledate_of_birthChange}
                    />
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
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
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
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>

                <Col xl={12} className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="imageInput" className="form-label">
                      Image
                      <small className="mb-2 fs-10 text-danger">
                        (Max. 300px X 300px, Max. 2MB, valid exts: png, jpg,
                        jpeg)
                      </small>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="imageInput"
                      name="image"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                    {formData?.image && (
                      <div>
                        <img
                          src={
                            typeof formData?.image === 'string'
                              ? formData?.profile_image?.uploadedImage
                              : URL.createObjectURL(new Blob([formData?.image]))
                          }
                          alt="img"
                          style={{ maxHeight: '70px' }}
                        />
                      </div>
                    )}
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
                      {passwordError && (
                        <div className="text-danger fs-12">{passwordError}</div>
                      )}
                    </div>
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="confirm_passwordInput"
                      className="form-label"
                    >
                      Confirm Password
                    </Label>

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
                      {errors && <div className="text-danger">{errors}</div>}

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
                      {confirmPasswordError && (
                        <div className="text-danger fs-12">
                          {confirmPasswordError}
                        </div>
                      )}
                    </div>
                  </div>
                </Col>

                {/* <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="usernameInput" className="form-label">
                    Username
                  </Label>
                  <Input
                    disabled
                    type="text"
                    className="form-control"
                    id="usernameInput"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                  />
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
                      <option value={formData?.status}>
                        {formData?.status ? formData?.status : 'Select'}
                      </option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end mt-3">
                    {updateTrainerIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        disabled={updateTrainerIsLoading}
                        type="button"
                        className="button p-3 text-light"
                        onClick={handleEditTrainer}
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

export default EditTrainerModal;
