import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const SmtpSettingsModal = ({
  addModal,
  setAddModal,
  formData,
  handleInputChange,
  errors,
  handleSubmit,
  addSmtpIsLoading,
  resetForm,
}) => {
  // eye btn state
  const [password_show, setpassword_show] = useState(false);
  return (
    <div>
      <Modal isOpen={addModal} centered>
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Add SMTP And Email Config</h5>

          <button
            type="button"
            onClick={() => resetForm()}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <ModalBody>
          <ToastContainer />
          <Form>
            <Row className="fs-3">
              <Col md={6}>
                <div className="mb-3">
                  <Label className="form-label">SMTP Host</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="smtp.mailgun.org"
                    name="smtp_host"
                    value={formData.smtp_host}
                    onChange={handleInputChange}
                  />
                  {errors.smtp_host && (
                    <div className="text-danger">{errors.smtp_host}</div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <Label className="form-label">ISMTP Port</Label>
                  <Input
                    type="number"
                    className="form-control"
                    placeholder="587"
                    name="smtp_port"
                    value={formData.smtp_port}
                    onChange={handleInputChange}
                  />
                  {errors.smtp_port && (
                    <div className="text-danger">{errors.smtp_port}</div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <Label className="form-label">Sent Email</Label>
                  <Input
                    type="email"
                    className="form-control"
                    placeholder="support@sysmail.squaddeck.app"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <Label className="form-label">Sent Form</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="SquadDeck"
                    id="CurrencyInput"
                    name="sent_from"
                    value={formData.sent_from}
                    onChange={handleInputChange}
                  />
                  {errors.sent_from && (
                    <div className="text-danger">{errors.sent_from}</div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <Label className="form-label">SMTP Username</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="support@squaddeck.app"
                    id="CurrencyInput"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <Label className="form-label">SMTP Password</Label>
                  <div className="position-relative auth-pass-inputgroupe">
                    <Input
                      type={password_show ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Enter The Password"
                      id="CurrencyInput"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      className="position-absolute end-0 top-0 pt-3 fs-2 text-decoration-none text-muted password-addon p-3"
                      type="button"
                      onClick={() => setpassword_show(!password_show)}
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <i
                        className={`${
                          password_show
                            ? 'ri-eye-off-line align-middle'
                            : 'ri-eye-fill align-middle'
                        }`}
                      ></i>
                    </button>
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                </div>
              </Col>

              <Col md={12}>
                <div className="hstack justify-content-end text-end mt-2">
                  {addSmtpIsLoading ? (
                    <Loader />
                  ) : (
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="button p-3 text-light"
                    >
                      Add
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SmtpSettingsModal;
