import React, { useState } from 'react';
import { Col, Form, Input, Label, Modal, ModalBody } from 'reactstrap';

const AddPaymentSettingsModal = ({
  addModal,
  resetForm,
  handleInputChange,
  handleSubmit,
  label1,
  placeholder1,
  label2,
  placeholder2,
  name1,
  value1,
  name2,
  value2,
  errors1,
  errors2,
}) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  return (
    <Modal
      isOpen={addModal}
      role="dialog"
      autoFocus={true}
      centered
      id="addAddressModal"
    >
      <div className="modal-header ">
        <h5 className="fs-2 w-100">Add Payment Details</h5>
        <button
          type="button"
          onClick={(e) => {
            resetForm();
          }}
          className="btn-close fs-1"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <ModalBody>
        <Form>
          <Col md={12}>
            <div className="mb-5 mt-3">
              <Label className="form-label pb-2 fs-3">{label1}</Label>
              <div className="position-relative">
                <Input
                  type={passwordShow ? 'text' : 'password'}
                  className="form-control rounded-3"
                  placeholder={placeholder1}
                  name={name1}
                  value={value1}
                  onChange={handleInputChange}
                />
                <button
                  className="position-absolute end-0 top-0 mt-2 me-3 fs-2 text-decoration-none text-muted password-addon "
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
              {{ errors1 } && <div className="text-danger fs-3">{errors1}</div>}
            </div>
          </Col>
          <Col md={12}>
            <div className="mb-4">
              <Label className="form-label pb-2 fs-3">{label2}</Label>
              <div className="position-relative">
                <Input
                  type={confirmPasswordShow ? 'text' : 'password'}
                  className="form-control rounded-3"
                  placeholder={placeholder2}
                  name={name2}
                  value={value2}
                  onChange={handleInputChange}
                />
                <button
                  className="position-absolute end-0 top-0 mt-2 me-3 fs-2 text-decoration-none text-muted password-addon "
                  type="button"
                  onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
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
              {errors2 && <div className="text-danger fs-3">{errors2}</div>}
            </div>
          </Col>

          <Col md={12}>
            <div className="text-end mt-2">
              <button
                onClick={handleSubmit}
                type="button"
                className="button p-3 text-light fs-3"
              >
                ADD
              </button>
            </div>
          </Col>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddPaymentSettingsModal;
