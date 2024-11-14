import React, { useState } from 'react';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import CloseSuccessModal from './CloseSuccessModal';

const ChangePasswordModal = ({ isOpen, toggle }) => {
  // all input state
  const [password, setPassword] = useState('');
  const [confrim_password, setConfrim_password] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError1, setPasswordError1] = useState('');
  const [passwordError2, setPasswordError2] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // for eye button
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  // close success modal
  const [close_successModal, setClose_successModal] = useState(false);
  const Tog_close_successModal = () => {
    setClose_successModal(!close_successModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordError1('');
    setPasswordError2('');
    setConfirmPasswordError('');

    let isValidPassword = true;

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!password) {
      setPasswordError('Please enter a password.');
      isValidPassword = false;
    } else if (password.length < 8) {
      setPasswordError1('At least 8 characters long');
      isValidPassword = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError2(
        'Should contain number, uppercase, and lowercase letter.'
      );
      isValidPassword = false;
    } else {
      // All conditions are met, clear error messages
      setPasswordError('');
      setPasswordError1('');
      setPasswordError2('');
    }

    if (!confrim_password) {
      setConfirmPasswordError('Please enter confirm password.');
      isValidPassword = false;
    } else if (!passwordRegex.test(confrim_password)) {
      setConfirmPasswordError("Confirm password does't matched");
    }

    if (password !== confrim_password) {
      setConfirmPasswordError("Confirm password does't matched");
      isValidPassword = false;
    }

    if (isValidPassword) {
      // Handle form submission logic here
      // You can make an API call to update the password
      // and then show the success modal
      // Example: UpdatePasswordAPI(password);
      Tog_close_successModal();

      // Clear the input fields after successful submission
      setPassword('');
      setConfrim_password('');
    }

    // for api with redux
    // if (isValidPassword) {
    //   dispatch(addGuardian(guardianData));
    //   if (data?.message && error === null) {
    //     toast.success(data?.message);
    //     document.getElementById('guardian-form').reset();
    //   }
    //   if (error) {
    //     toast.error(error);
    //   }
    // }
  };

  return (
    <div>
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={isOpen}
        centered
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Change Password</h5>
          <button
            type="button"
            onClick={(e) => {
              setPassword('');
              setConfrim_password('');
              setPasswordError('');
              setPasswordError1('');
              setPasswordError2('');
              setConfirmPasswordError('');
              toggle();
            }}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            {/* {(setPassword(''), setConfrim_password(''))} */}
          </button>
        </div>

        <ModalBody className="fs-3 m-1">
          <Form id="player-form">
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="passwordInput" className="form-label">
                    Password*
                  </Label>
                  <div className="position-relative auth-pass-inputgroup">
                    <Input
                      type={passwordShow ? 'text' : 'password'}
                      className="form-control"
                      id="passwordInput"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onPaste={(e) => e.preventDefault()}
                      required
                    />
                    <button
                      className="position-absolute end-0 top-0 fs-2 text-decoration-none text-muted password-addon p-3"
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
                {passwordError && (
                  <ul>
                    <li className="text-danger fs-3 ms-n4">
                      * Please enter a password.
                    </li>
                  </ul>
                )}
                {passwordError1 && (
                  <ul>
                    <li className="text-danger fs-3 ms-n4">
                      * At least 8 characters long
                    </li>
                  </ul>
                )}
                {passwordError2 && (
                  <ul>
                    <li className="text-danger fs-3 ms-n4">
                      * Should contain number, uppercase and lowercase letter.
                    </li>
                  </ul>
                )}
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="confirmPasswordInput" className="form-label">
                    Confirm Password*
                  </Label>
                  <div className="position-relative auth-pass-inputgroup">
                    <Input
                      type={confirmPasswordShow ? 'text' : 'password'}
                      className="form-control"
                      id="confirmPasswordInput"
                      value={confrim_password}
                      onPaste={(e) => e.preventDefault()}
                      onChange={(e) => setConfrim_password(e.target.value)}
                      required
                    />
                    <button
                      className="position-absolute end-0 top-0 fs-2 text-decoration-none text-muted password-addon p-3"
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
                    * {confirmPasswordError}
                  </span>
                )}
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end mt-3">
                  <button
                    type="button"
                    className="button p-3 text-light"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <CloseSuccessModal
                    title="Successfully Password Changed"
                    isOpen={close_successModal}
                    toggle={Tog_close_successModal}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
