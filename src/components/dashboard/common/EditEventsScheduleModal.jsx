import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from './Loader';

const EditEventsScheduleModal = ({
  openModal,
  closeModal,
  submitBtn,
  scheduleData,
  scheduleId,
  title,
  handleSubmitSchedule,
  setFormData,
  formData,
  handleSetDate,
  errors,
}) => {
  const dispatch = useDispatch();
  const [singleScheduleData, setSingleScheduleData] = useState(null);

  const {
    data: updateEventScheduleData,
    isLoading: updateEventScheduleIsLoading,
    error: updateEventScheduleError,
  } = useSelector((state) => state.CommonApi.updateEventSchedule);

  useEffect(() => {
    const matchedData =
      scheduleData?.length > 0 &&
      scheduleData.filter((schedule) => schedule?._id === scheduleId);
    setSingleScheduleData(matchedData);
    setFormData(matchedData[0]);
  }, [scheduleData, scheduleId, setFormData]);

  return (
    <Modal isOpen={openModal} centered={true} size="xl" scrollable>
      <div className="modal-header ">
        <h5 className="fs-2 w-100">{title}</h5>
        <button
          type="button"
          onClick={() => closeModal()}
          className="btn-close fs-1"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <ModalBody className="">
        <ToastContainer />
        <Form id="player-form">
          {
            // singleScheduleData
          }
          <Row key={'index'} className="border bg-body mb-5">
            <Col xxl={12}>
              <div className="mb-3">
                <Label htmlFor="titleInput" className="form-label">
                  Title
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="titleInput"
                  name="name"
                  value={formData?.name}
                  placeholder="Enter a title"
                  onChange={(e) => handleSetDate('name', e)}
                  //   onChange={(e) => setFormData({ name: e.target.value })}
                />
                {errors?.name && (
                  <div className="text-danger fs-3 mt-2">{errors?.name}</div>
                )}
              </div>
            </Col>
            <Col xxl={4}>
              <div className="mb-3">
                <Label htmlFor="dateInput" className="form-label">
                  Date
                </Label>
                <Flatpickr
                  className="form-control "
                  id="dateInput"
                  name="date"
                  placeholder="Choose a Date"
                  options={{
                    dateFormat: 'd M, Y',
                  }}
                  value={formData?.date}
                  onChange={(fieldValue) => handleSetDate('date', fieldValue)}
                />
                {errors?.date && (
                  <div className="text-danger fs-3 mt-2">{errors?.date}</div>
                )}
              </div>
            </Col>
            <Col xxl={4} className=" mb-3">
              <div>
                <Label htmlFor="startTimeInput" className="form-label">
                  Starts Time
                </Label>
                <input
                  className="form-control"
                  type="time"
                  id="startTimeInput"
                  name="start_time"
                  value={formData?.start_time}
                  onChange={(e) => handleSetDate('start_time', e.target.value)}
                />
                {errors?.start_time && (
                  <div className="text-danger fs-3 mt-2">
                    {errors?.start_time}
                  </div>
                )}
              </div>
            </Col>
            <Col xxl={4} className="mb-3">
              <div>
                <Label htmlFor="endTimeInput" className="form-label">
                  End Time
                </Label>
                <input
                  className="form-control"
                  type="time"
                  id="endTimeInput"
                  name="end_time"
                  value={formData?.end_time}
                  onChange={(e) => handleSetDate('end_time', e.target.value)}
                />
                {errors?.end_time && (
                  <div className="text-danger fs-3 mt-2">
                    {errors?.end_time}
                  </div>
                )}
              </div>
            </Col>

            {/* <Col
              xxl={1}
              className="d-flex justify-content-center align-items-center "
            >
              <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeDateHandler(item?.id);
                  }}
                className=" close-btn fs-2 p-3 mt-3"
              >
                <i className="ri-delete-bin-6-fill"></i>
                Remove
              </button>
            </Col> */}
          </Row>
          {/* <Row>
            <Col xxl={12}>
              <div className="d-flex align-items-center justify-content-center gap-5 my-3">
                <button
                  className="badge bg-success-subtle px-2 fs-2 text-success"
                  onClick={handleAddField}
                >
                  Add Date Field
                </button>
              </div>
            </Col>
          </Row> */}
        </Form>
        <div className="d-flex gap-4 justify-content-center mt-4 mb-4">
          {updateEventScheduleIsLoading ? (
            <Loader />
          ) : (
            <button
              disabled={updateEventScheduleIsLoading}
              type="button"
              className="button text-light fs-2 p-3"
              data-bs-dismiss="modal"
              onClick={(e) => handleSubmitSchedule(e)}
            >
              {submitBtn}
            </button>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EditEventsScheduleModal;
