import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';

const EditClassModal = ({ isOpen, toggle }) => {
  const [formData, setFormData] = useState({
    classname: '',
    trainers: '',
    classstartsfrom: '',
    classendsat: '',
  });

  //  error state
  const [errors, setErrors] = useState({});

  // for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the form error
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    // Perform form validation
    const newErrors = {};

    if (!formData.classname) {
      newErrors.classname = 'Class Name is required';
    }

    // Select trainers validation
    if (
      !formData.trainers ||
      !selectedOptions ||
      selectedOptions.length === 0
    ) {
      newErrors.trainers = 'Please select at least one option';
    } else {
      newErrors.trainers = '';
    }

    if (!formData.classstartsfrom) {
      newErrors.classstartsfrom = 'Start Date is required';
    }

    if (!formData.classendsat) {
      newErrors.classendsat = 'End Date is required';
    } else {
      newErrors.classendsat = '';
    }

    // Form is valid
    if (Object.keys(newErrors).length === 0) {
      //  can submit or handle the data here

    } else {
      // Form has errors, update the errors state
      setErrors(newErrors);
    }
  };

  // handle set date
  const handleSetDate = (fieldName, dateStr) => {
    setFormData({
      ...formData,
      [fieldName]: dateStr,
    });

    setErrors({
      ...errors,
      [fieldName]: '',
    });
  };
  // select state and function
  const [selectedOptions, setSelectedOptions] = useState({ trainers: [] });

  const handleSelect = (name, selected) => {
    setFormData({
      ...formData,
      [name]: selected.map((option) => option.value).join(', '),
    });

    setSelectedOptions({
      ...selectedOptions,
      [name]: selected,
    });
    // Clear the form error for the select team
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const optionList = [
    { value: 'messi', label: 'messi' },
    { value: 'ronaldo', label: 'ronaldo' },
    { value: 'neymer', label: 'neymer' },
    { value: 'suarez', label: 'suarez' },
    { value: 'backham', label: 'backham' },
  ];

  // close button function
  const resetForm = () => {
    setFormData({
      classname: '',
      trainers: '',
      classstartsfrom: '',
      classendsat: '',
    });

    // Clear the error messages
    setErrors({});
    setSelectedOptions([]);

    toggle();
  };
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
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Update Class</h5>
          <button
            type="button"
            onClick={resetForm}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <Form id="player-form">
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="classnameInput" className="form-label">
                    Class Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="classnameInput"
                    placeholder="Enter Name"
                    name="classname"
                    value={formData.classname}
                    onChange={handleInputChange}
                  />
                  {errors.classname && (
                    <div className="text-danger">{errors.classname}</div>
                  )}
                </div>
              </Col>

              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="trainersInput" className="form-label">
                    Trainers
                  </Label>
                  <div>
                    <Select
                      options={optionList}
                      placeholder="Enter Name"
                      id="trainersInput"
                      name="trainers"
                      value={selectedOptions.trainers}
                      onChange={(selected) =>
                        handleSelect('trainers', selected)
                      }
                      isSearchable={true}
                      isMulti
                    />
                    {errors.trainers && (
                      <div className="text-danger">{errors.trainers}</div>
                    )}
                  </div>
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="classstartsfromInput" className="form-label">
                    Class Starts From
                  </Label>
                  <Flatpickr
                    className="form-control"
                    id="classstartsfromInput"
                    name="classstartsfrom"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                    value={formData.classstartsfrom}
                    onChange={(selectedDates, dateStr, instance) =>
                      handleSetDate('classstartsfrom', dateStr)
                    }
                  />
                  {errors.classstartsfrom && (
                    <div className="text-danger">{errors.classstartsfrom}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="classendsatInput" className="form-label">
                    Class Ends At
                  </Label>
                  <Flatpickr
                    className="form-control"
                    id="classendsatInput"
                    name="classendsat"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                    value={formData.classendsat}
                    onChange={(selectedDates, dateStr, instance) =>
                      handleSetDate('classendsat', dateStr)
                    }
                  />
                  {errors.classendsat && (
                    <div className="text-danger">{errors.classendsat}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="hstack gap-2 justify-content-start">
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
                  {/* <button
                    //   disabled={isLoading}
                    type="button"
                    className=" p-3 text-primary"
                    //   onClick={handleAddGuardian}
                  >
                    <i className="ri-arrow-left-line align-bottom text-muted pe-2"></i>
                    Back
                  </button> */}
                </div>
              </Col>
              <Col lg={6}>
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
                    onClick={handleSubmit}
                  >
                    Update
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

export default EditClassModal;
