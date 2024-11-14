import React from 'react';
import Select from 'react-select';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';

const GuardianModalForm = ({ isOpen, toggle }) => {
  return (
    <div>
      {/* success modal */}
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={isOpen}
        // onClick={toggle}
        centered
      >
        <div className="modal-header m-4">
          <h5 className="fs-2 w-100">Add Guardian</h5>
          <button
            type="button"
            onClick={toggle}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <ModalBody className="fs-3 m-4 ">
          <Form id="player-form ">
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="firstnameInput" className="form-label">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="firstnameInput"
                    placeholder="Enter your firstname"
                    // onBlur={(e) => setFirst_name(e.target.value)}
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
                    placeholder="Enter your lastname"
                    // onBlur={(e) => setLast_name(e.target.value)}
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="zipcodeInput" className="form-label">
                    Email*
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="zipcodeInput"
                    // onBlur={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="zipcodeInput" className="form-label">
                    Phone(Optional)
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="zipcodeInput"
                    // onBlur={(e) => setPhone(e.target.value)}
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
                    // onBlur={(e) =>
                    //   setAddress_line_1(e.target.value)
                    // }
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
                    // onBlur={(e) =>
                    //   setAddress_line_2(e.target.value)
                    // }
                  />
                </div>
              </Col>

              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="countryInput" className="form-label">
                    Country
                  </Label>

                  <Select
                  // options={options}
                  // value={country}
                  // onChange={changeHandler}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="cityInput" className="form-label">
                    City
                  </Label>
                  <Input
                    // onBlur={(e) => setCity(e.target.value)}
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
                    // onBlur={(e) => setState(e.target.value)}
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
                    // onBlur={(e) => setZip(e.target.value)}
                    // type="text"
                    className="form-control"
                    id="zipcodeInput"
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="zipcodeInput" className="form-label">
                    Password*
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="zipcodeInput"
                    // onBlur={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* {passwordError1 && passwordError2 && (
                              <ul>
                                <li className="text-danger fs-3">
                                  *At least 8 characters long
                                </li>
                                <li className="text-danger fs-3">
                                  *Should contain number, uppercase and
                                  lowercase letter.
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
                    Confirm Password*
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="zipcodeInput"
                    // onBlur={(e) =>
                    //   setConfrim_password(e.target.value)
                    // }
                  />
                </div>
                {/* {confirmPasswordError && (
                              <span className="text-danger fs-3">
                                *{confirmPasswordError}
                              </span>
                            )} */}
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  {/* {isLoading ? (
                                <Loader />
                              ) : (
                                <button
                                //   disabled={isLoading}
                                  type="button"
                                  className="button p-3 text-light"
                                //   onClick={handleAddGuardian}
                                >
                                  Add
                                </button>
                              )} */}
                  <button
                    //   disabled={isLoading}
                    type="button"
                    className="button p-3 text-light"
                    //   onClick={handleAddGuardian}
                  >
                    Add
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GuardianModalForm;
