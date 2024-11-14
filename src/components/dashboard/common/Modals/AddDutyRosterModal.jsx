import React from 'react';
import Select from 'react-select';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';

const DutyRosterModal = ({
  isOpen,
  title,
  Btn,
  resetForm,
  formData,
  handleInputChange,
  handleSelect,
  handleSubmit,
  errors,
  selectedOptions,
  playerList,
  setFormData,
}) => {
  return (
    <Modal isOpen={isOpen} centered={true}>
      <div className="modal-header ">
        <h5 className="fs-2 w-100">{title}</h5>
        <button
          type="button"
          onClick={() => resetForm()}
          className="btn-close fs-1"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <ModalBody className="">
        <Form id="player-form">
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Label htmlFor="nameInput" className="form-label fs-3">
                  Name of Duty
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  placeholder="Enter a name"
                  name="name_of_duty"
                  onChange={handleInputChange}
                />
                {errors?.name_of_duty && (
                  <div className="text-danger fs-3">{errors?.name_of_duty}</div>
                )}
              </div>
            </Col>
            <Col xl={6}>
              <div className="mb-3">
                <Label htmlFor="personInput" className="form-label fs-3">
                  Assigned Persons
                </Label>
                <div>
                  <Select
                    options={playerList}
                    className="fs-4"
                    placeholder="Enter Name"
                    id="personInput"
                    name="assigned_person"
                    onChange={(selected) =>
                      handleSelect('assigned_person', selected)
                    }
                    isSearchable={true}
                    isMulti
                  />
                  {errors?.assigned_person && (
                    <div className="text-danger fs-3">
                      {errors?.assigned_person}
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <div className="mb-3 pb-2">
                <Label
                  htmlFor="descriptionTextarea"
                  className="form-label fs-3"
                >
                  Note
                </Label>
                <textarea
                  className="form-control"
                  name="note"
                  id="descriptionTextarea"
                  rows="5"
                  onChange={handleInputChange}
                ></textarea>
                {errors?.note && (
                  <div className="text-danger fs-3">{errors?.note}</div>
                )}
              </div>
            </Col>
          </Row>
        </Form>
        <div className="d-flex gap-4 justify-content-center mt-4 mb-4">
          <button
            type="button"
            className="button text-light fs-2 p-3"
            data-bs-dismiss="modal"
            onClick={handleSubmit}
          >
            {Btn}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DutyRosterModal;
