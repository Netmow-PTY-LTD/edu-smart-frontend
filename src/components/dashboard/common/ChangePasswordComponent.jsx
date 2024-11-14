import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, Col, Form, Input, Label, Row } from 'reactstrap';
import Loader from './Loader';

const ChangePasswordComponent = ({
  setFormData,
  formData,
  setErrors,
  errors,
  handleSubmit,
  isLoading,
}) => {
  // for eye button
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirm_passwordShow, setconfirm_passwordShow] = useState(false);

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

  return (
    <>
      <Card>
        <Col lg={12} className="d-flex justify-content-center ">
          <div>
            <div className="mt-5">
              <h5 className="fs-1 fw-bold">Change Password</h5>
              <p className="text-danger fs-3 ">All Fields Are Required*</p>
            </div>
          </div>
        </Col>
        <CardBody className="p-5">
          <ToastContainer />
          <Form>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="passwordInput" className="form-label">
                    New Password
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
                  <div className="text-danger">{errors.password}</div>
                )}
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="confirm_passwordInput" className="form-label">
                    New Confirm Password
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

              <Col lg={12}>
                <div className="hstack mt-3 justify-content-end">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={isLoading}
                      type="button"
                      className="button p-4 text-light"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default ChangePasswordComponent;
