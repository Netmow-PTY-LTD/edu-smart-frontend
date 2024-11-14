/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../../Loader';
import { ToastContainer } from 'react-toastify';

const TestimonialModal = ({
  openModal,
  title,
  resetForm,
  formData,
  handleInputChange,
  errors,
  handleSubmit,
  Btn,
  handleSelect,
  isLoading,
}) => {
  return (
    <>
      <Modal isOpen={openModal} centered={true} size="lg" scrollable>
        <div className="modal-header">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={resetForm}
            className="btn-close fs-1"
          ></button>
        </div>
        <ModalBody>
          <ToastContainer />
          <Form>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="nameInput" className="form-label fs-3">
                    Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    placeholder="Enter a name"
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                  />
                  {errors?.name && (
                    <div className="text-danger fs-3 my-2">{errors?.name}</div>
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="addressInput" className="form-label fs-3">
                    Designation
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="addressInput"
                    placeholder="Enter a name"
                    name="address"
                    value={formData?.address}
                    onChange={handleInputChange}
                  />
                  {errors?.address && (
                    <div className="text-danger fs-3 my-2">
                      {errors?.address}
                    </div>
                  )}
                </div>
              </Col>

              {/* <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="dateInput" className="form-label">
                    Date
                  </Label>
                  <Flatpickr
                    value={formData?.date}
                    onChange={(selected) => handleSelect('date', selected)}
                    placeholder="Enter Date"
                    className="form-control"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                  />
                  {errors?.date && (
                    <div className="text-danger fs-3 my-2">{errors?.date}</div>
                  )}
                </div>
              </Col> */}

              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="imageInput" className="form-label fs-3">
                    Image
                  </Label>
                  <Input
                    type="file"
                    className="form-control"
                    id="imageInput"
                    name="image"
                    onChange={handleInputChange}
                  />
                  {errors?.image && (
                    <div className="text-danger fs-3 my-2">{errors?.image}</div>
                  )}
                  {formData?.image && (
                    <div>
                      <img
                        style={{
                          maxHeight: '70px',
                          marginTop: '10px',
                        }}
                        src={
                          typeof formData.image === 'string'
                            ? formData.image
                            : URL.createObjectURL(new Blob([formData.image]))
                        }
                        alt="img"
                      />
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="commentInput" className="form-label fs-3">
                    Comment
                  </Label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows={5}
                    id="commentInput"
                    placeholder="Enter Comment"
                    name="comment"
                    value={formData?.comment}
                    onChange={handleInputChange}
                  />
                  {errors?.comment && (
                    <div className="text-danger fs-3 my-2">
                      {errors?.comment}
                    </div>
                  )}
                </div>
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end mt-3">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={isLoading}
                      type="button"
                      className="button p-3 text-light fs-4"
                      onClick={handleSubmit}
                    >
                      {Btn}
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TestimonialModal;
