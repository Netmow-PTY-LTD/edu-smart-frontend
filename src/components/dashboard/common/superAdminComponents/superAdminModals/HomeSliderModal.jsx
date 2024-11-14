import React from 'react';
import Select from 'react-select';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';

const HomeSliderModal = ({
  openModal,
  title,
  resetForm,
  formData,
  handleInputChange,
  errors,
  handleSelect,
  handleSubmit,
  Btn,
}) => {
  const optionList = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];
  return (
    <>
      <Modal isOpen={openModal} centered={true} size="lg" >
        <div className="modal-header">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={resetForm}
            className="btn-close fs-1"
          ></button>
        </div>
        <ModalBody >
          <Form>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="introInput" className="form-label fs-3">
                    Introduction{' '}
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="introInput"
                    placeholder="Enter a name"
                    name="intro"
                    value={formData?.intro}
                    onChange={handleInputChange}
                  />
                  {errors?.intro && (
                    <div className="text-danger fs-3 my-2">{errors?.intro}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="descInput" className="form-label fs-3">
                    Short Desc
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="descInput"
                    placeholder="Enter a name"
                    name="short_desc"
                    value={formData?.short_desc}
                    onChange={handleInputChange}
                  />
                  {errors?.short_desc && (
                    <div className="text-danger fs-3 my-2">
                      {errors?.short_desc}
                    </div>
                  )}
                </div>
              </Col>

              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="offerInput" className="form-label fs-3">
                    Offer{' '}
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="offerInput"
                    placeholder="Enter a name"
                    name="offer"
                    value={formData?.offer}
                    onChange={handleInputChange}
                  />
                  {errors?.offer && (
                    <div className="text-danger fs-3 my-2">{errors?.offer}</div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="statusInput" className="form-label fs-3">
                    Status
                  </Label>
                  <Select
                    options={optionList}
                    id="statusInput"
                    name="status"
                    value={formData?.status}
                    onChange={(selected) => handleSelect('status', selected)}
                  />

                  {errors?.status && (
                    <div className="text-danger">{errors?.status}</div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="sliderCodeInput" className="form-label fs-3">
                    Slider Code{' '}
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="sliderCodeInput"
                    placeholder="Enter a name"
                    name="slider_code"
                    value={formData?.slider_code}
                    onChange={handleInputChange}
                  />
                  {errors?.slider_code && (
                    <div className="text-danger fs-3 my-2">
                      {errors?.slider_code}
                    </div>
                  )}
                </div>
              </Col>
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
                </div>
              </Col>
              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="bgImageInput" className="form-label fs-3">
                    Background Image
                  </Label>
                  <Input
                    type="file"
                    className="form-control"
                    id="bgImageInput"
                    name="bg_image"
                    onChange={handleInputChange}
                  />
                  {errors?.bg_image && (
                    <div className="text-danger fs-3 my-2">
                      {errors?.bg_image}
                    </div>
                  )}
                </div>
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end mt-3">
                  {/* {updateGameScheduleIsLoading ? (
                    <Loader />
                  ) : ( */}
                  <button
                    //   disabled={updateGameScheduleIsLoading}
                    type="button"
                    className="button p-3 text-light"
                    onClick={handleSubmit}
                  >
                    {Btn}
                  </button>
                  {/* )} */}
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default HomeSliderModal;
