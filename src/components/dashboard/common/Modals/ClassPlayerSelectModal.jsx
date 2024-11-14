import React from 'react';
import Select from 'react-select';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';

const ClassPlayerSelectModal = ({
  title,
  isOpen,
  training,
  label1,
  label2,
  teamList,
  label3,
  leftBtn,
  CustomRightBtn,
  TogWeeklyScheduleModal,
  errors,
  handleInputChange,
  handleSelect,
  resetForm,
  formData,
  selectedOptions,
  TogCustomTrainingScheduleModal,
  required,
}) => {
  return (
    <div>
      {/* success modal */}
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={isOpen}
        centered
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={resetForm}
            className="btn-close fs-1"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <Form id="player-form">
            <Row>
              {training === 'yes' ? (
                <Col lg={12}>
                  <div className="mb-3">
                    <Label
                      htmlFor="trainingscheduleInput"
                      className="form-label"
                    >
                      {label1}
                    </Label>
                    {required && <span className="text-danger">*</span>}
                    <Input
                      type="text"
                      className="form-control"
                      id="trainingscheduleInput"
                      placeholder="Enter Name"
                      name="trainingschedule"
                      value={formData?.trainingschedule}
                      onChange={handleInputChange}
                    />
                    {errors?.trainingschedule && (
                      <div className="text-danger">
                        {errors?.trainingschedule}
                      </div>
                    )}
                  </div>
                </Col>
              ) : (
                <Col xl={12}>
                  <div className="mb-5">
                    <Label htmlFor="addteamsInput" className="form-label">
                      {label1}
                    </Label>
                    <div>
                      <Select
                        options={teamList}
                        placeholder="Add Teams"
                        id="addteamsInput"
                        name="addteams"
                        value={selectedOptions?.addteams}
                        onChange={(selected) =>
                          handleSelect('addteams', selected)
                        }
                        // isSearchable={true}
                        // isMulti
                      />
                      {errors?.addteams && (
                        <div className="text-danger">{errors.addteams}</div>
                      )}
                    </div>
                  </div>
                </Col>
              )}

              {training === 'yes' ? (
                <Col xl={12}>
                  <div className="mb-5">
                    <Label htmlFor="addteamsInput" className="form-label">
                      {label2}
                    </Label>
                    {required && <span className="text-danger">*</span>}

                    <div>
                      <Select
                        options={teamList}
                        placeholder="Add Teams"
                        id="addteamsInput"
                        name="addteams"
                        value={selectedOptions?.addteams}
                        onChange={(selected) =>
                          handleSelect('addteams', selected)
                        }
                        isSearchable={true}
                        // isMulti
                      />
                      {errors?.addteams && (
                        <div className="text-danger">{errors?.addteams}</div>
                      )}
                    </div>
                  </div>
                </Col>
              ) : (
                <Col xl={12}>
                  <div className="mb-5">
                    <Label htmlFor="addplayersInput" className="form-label">
                      {label2}
                    </Label>
                    <div>
                      <Select
                        options={teamList}
                        placeholder="Add Players"
                        id="addplayersInput"
                        name="addplayers"
                        value={selectedOptions?.addplayers}
                        onChange={(selected) =>
                          handleSelect('addplayers', selected)
                        }
                        isSearchable={true}
                        isMulti
                      />
                      {errors?.addplayers && (
                        <div className="text-danger">{errors?.addplayers}</div>
                      )}
                    </div>
                  </div>
                </Col>
              )}

              <Col lg={6}>
                <p>{label3}</p>
                <div className="hstack gap-2 justify-content-start">
                  {leftBtn ? (
                    <button
                      type="button"
                      onClick={TogWeeklyScheduleModal}
                      className="button p-3 text-light"
                    >
                      {leftBtn}
                    </button>
                  ) : (
                    ''
                  )}

                  {CustomRightBtn ? (
                    <button
                      type="button"
                      onClick={TogCustomTrainingScheduleModal}
                      className="button p-3 text-light"
                    >
                      {CustomRightBtn}
                    </button>
                  ) : (
                    ''
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

export default ClassPlayerSelectModal;
