/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import LoaderSpiner from '@/components/constants/Loader/Loader';
import {
  getAllManager,
  getSingleManager,
  updateManager,
} from '@/slices/dashboard/adminDashboard/Actions/managerActions';
import { emptyUpdateManager } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const EditManagerModal = ({ setModalEdit, modalEdit, id }) => {
  // for eye button
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirm_passwordShow, setconfirm_passwordShow] = useState(false);
  const [errors, setErrors] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  // redux setup
  const dispatch = useDispatch();
  const { data: singleManagerData, isLoading: singleManagerIsLoading } =
    useSelector((state) => state.AdminDashboard.singleManager);

  useEffect(() => {
    if (id) {
      dispatch(getSingleManager({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singleManagerData) {
      setFormData({
        first_name: singleManagerData?.first_name,
        last_name: singleManagerData?.last_name,
        gender: singleManagerData?.gender,
        date_of_birth: singleManagerData?.date_of_birth,
        email: singleManagerData?.email,
        phone: singleManagerData?.phone,
        status: singleManagerData?.status,
      });
    }
  }, [singleManagerData]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        singleManagerData?.profile_image &&
        typeof singleManagerData?.profile_image === 'object' &&
        singleManagerData?.profile_image?.uploadedImage
      ) {
        try {
          const response = await fetch(
            singleManagerData?.profile_image?.uploadedImage
          );
          const blob = await response.blob();
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
          const newData = {
            ...singleManagerData,
            image: file,
          };
          setFormData(newData);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    };

    fetchData();
  }, [singleManagerData]);

  const {
    data: updateManagerData,
    isLoading: updateManagerIsLoading,
    error: updateManagerError,
  } = useSelector((state) => state.AdminDashboard.updateManager);

  useEffect(() => {
    dispatch(emptyUpdateManager());
  }, [dispatch]);

  useEffect(() => {
    if (updateManagerData?.message && updateManagerError === null) {
      toast.success(updateManagerData?.message);
      dispatch(emptyUpdateManager());
      dispatch(getSingleManager({ id }));
      dispatch(getAllManager());
      handleClose();
    }
  }, [dispatch, updateManagerData?.message, updateManagerError]);

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

  //console.log(errors);

  // handle date of birth change
  const handledate_of_birthChange = (selectedDates, dateStr) => {
    setFormData({
      ...formData,
      date_of_birth: dateStr,
    });
  };

  // submit form data handler
  const handleEditManager = (e) => {
    e.preventDefault();
    let managerData = {};
    if (formData?.first_name) {
      if (formData?.last_name) {
        managerData.first_name = formData?.first_name;
      } else {
        if (singleManagerData?.first_name?.split(' ')?.length > 2) {
          managerData.first_name =
            formData?.first_name +
            ' ' +
            singleManagerData?.first_name?.split(' ')[1] +
            ' ' +
            singleManagerData?.first_name?.split(' ')[2];
        } else if (singleManagerData?.first_name?.split(' ')?.length > 1) {
          managerData.first_name =
            formData?.first_name +
            ' ' +
            singleManagerData?.first_name?.split(' ')[1];
        } else {
          managerData.first_name = formData?.first_name;
        }
      }
    } else {
      managerData = {
        ...managerData,
        first_name: ' ',
      };
    }

    if (formData?.last_name) {
      if (formData?.first_name) {
        managerData.last_name = formData?.last_name;
      } else {
        if (singleManagerData?.last_name?.split(' ')?.length > 2) {
          managerData.last_name = formData?.last_name;
        } else if (singleManagerData?.last_name?.split(' ')?.length > 1) {
          managerData.last_name =
            formData?.last_name +
            ' ' +
            singleManagerData?.last_name?.split(' ')[1];
        } else {
          managerData.last_name = formData?.last_name;
        }
      }
    } else {
      managerData = {
        ...managerData,
        last_name: ' ',
      };
    }

    if (id) {
      managerData.id = id;
    }

    if (formData?.phone) {
      managerData = {
        ...managerData,
        phone: formData?.phone,
      };
    } else {
      managerData = {
        ...managerData,
        phone: ' ',
      };
    }

    if (formData?.gender) {
      managerData = {
        ...managerData,
        gender: formData?.gender,
      };
    } else {
      managerData = {
        ...managerData,
        gender: ' ',
      };
    }

    if (formData?.date_of_birth) {
      managerData = {
        ...managerData,
        date_of_birth: formData?.date_of_birth,
      };
    } else {
      managerData = {
        ...managerData,
        date_of_birth: ' ',
      };
    }

    if (formData?.image) {
      managerData = {
        ...managerData,
        image: formData?.image,
      };
    } else {
      managerData = {
        ...managerData,
        image: ' ',
      };
    }

    if (formData?.password) {
      managerData = {
        ...managerData,
        password: formData?.password,
      };
    } else if (!formData?.password) {
      managerData = {
        ...managerData,
      };
    }

    if (formData?.password?.length < 4) {
      toast.error('Password must be at least 4 characters long');
      return;
    }

    if (formData?.confirm_password) {
      managerData = {
        ...managerData,
        confirm_password: formData?.confirm_password,
      };
    } else if (!formData?.confirm_password) {
      managerData = {
        ...managerData,
      };
    }

    // if (formData?.username) {
    //   managerData = {
    //     ...managerData,
    //     username: formData?.username,
    //   };
    // }

    if (formData?.status) {
      managerData = {
        ...managerData,
        status: formData?.status,
      };
    } else {
      managerData = {
        ...managerData,
        status: ' ',
      };
    }

    if (formData?.email) {
      managerData = {
        ...managerData,
        email: formData?.email,
      };
    } else {
      managerData = {
        ...managerData,
        email: ' ',
      };
    }

    const treamedData = new FormData();
    Object.entries(managerData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    if (
      managerData?.first_name ||
      managerData?.last_name ||
      managerData?.phone ||
      managerData?.gender ||
      managerData?.date_of_birth ||
      managerData?.image ||
      managerData?.password ||
      managerData?.confirm_password ||
      // managerData?.username ||
      managerData?.status
    )
      if (formData.password !== formData.confirm_password) {
        setErrors('Passwords do not match');
      }
    if (formData.password === formData.confirm_password) {
      setErrors('');
    }
    {
      dispatch(updateManager(treamedData));
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
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Edit Manager</h5>
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
          {singleManagerIsLoading ? (
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
                      value={formData?.first_name}
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
                      onChange={handleInputChange}
                    >
                      <option value={formData?.gender}>
                        {formData?.gender}
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
                      Image ({' '}
                      <small className="mb-2 fs-10 text-danger">
                        (Max. 300px X 300px, Max. 2MB, valid exts: png, jpg,
                        jpeg)
                      </small>
                      )
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
                      {/* {errors && <div className="text-danger">{errors}</div>} */}
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
                {/* 
              <Col lg={6}>
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
                        {formData?.status}
                      </option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end mt-3">
                    {updateManagerIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        disabled={updateManagerIsLoading}
                        type="button"
                        className="button p-3 text-light"
                        onClick={handleEditManager}
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

export default EditManagerModal;
