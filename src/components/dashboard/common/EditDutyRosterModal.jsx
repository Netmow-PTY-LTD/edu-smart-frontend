import { getAllSeasonalGameDutyRoster } from '@/slices/dashboard/adminDashboard/Actions/seasonalGameActions';
import { emptyUpdateSeasonalGameDutyRoster } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';

const EditDutyRosterModal = ({
  Btn,
  formData,
  handleInputChange,
  //   handleSelect,
  setSelectedOptions,
  setFormData,
  selectedOptions,
  setEditModal,
  editModal,
  updateDutyRosterForSeasonalGame,
  updateDutyRosterForSpecialEvents,
  name,
  updateData,
  updateIsLoading,
  updateError,
  data,
  playerList,
}) => {
  const dispatch = useDispatch();



  useEffect(() => {
    if (data?._id) {
      setFormData({
        name_of_duty: data?.name_of_duty,
        assigned_person: data?.assigned_person,
        note: data?.note,
      });
    }
  }, [
    data?._id,
    data?.assigned_person,
    data?.name_of_duty,
    data?.note,
    setFormData,
  ]);

  useEffect(() => {
    if (updateData?.message && updateError === null) {
      dispatch(getAllSeasonalGameDutyRoster());
      dispatch(emptyUpdateSeasonalGameDutyRoster());
    }
  }, [dispatch, updateData?.message, updateError]);

  const handleSelect = (name, selected) => {
    setFormData({
      ...formData,
      [name]: selected.map((pl) => pl?.value),
    });

    setSelectedOptions({
      ...selectedOptions,
      [name]: selected,
    });
  };

  const closeModal = () => {
    setEditModal(!editModal);
  };



  return (
    <Modal isOpen={editModal} centered={true}>
      <div className="modal-header ">
        <h5 className="fs-2 w-100">Update Duty Roster</h5>
        <button
          type="button"
          onClick={() => closeModal()}
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
                  value={formData?.name_of_duty}
                  onChange={handleInputChange}
                />
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
                    value={
                      formData?.assigned_person?.length > 0 &&
                      formData?.assigned_person[0]?._id
                        ? playerList.filter((p) =>
                            formData?.assigned_person.some(
                              (asp) => asp._id === p.value
                            )
                          )
                        : formData?.assigned_person?.label
                    }
                    onChange={(selected) =>
                      handleSelect('assigned_person', selected)
                    }
                    isSearchable={true}
                    isMulti
                  />
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
                  value={formData?.note}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </Col>
          </Row>
        </Form>
        <div className="d-flex gap-4 justify-content-center mt-4 mb-4">
          {name === 'Update Seasonal Game Duty Roster' ? (
            <button
              type="button"
              className="button text-light fs-2 p-3"
              data-bs-dismiss="modal"
              onClick={updateDutyRosterForSeasonalGame}
            >
              {Btn}
            </button>
          ) : (
            <button
              type="button"
              className="button text-light fs-2 p-3"
              data-bs-dismiss="modal"
              onClick={updateDutyRosterForSpecialEvents}
            >
              {Btn}
            </button>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EditDutyRosterModal;
