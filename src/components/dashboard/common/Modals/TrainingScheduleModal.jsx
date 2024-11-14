/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

const TrainingScheduleModal = ({ isOpen, toggle, title, Btn, secondTitle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered={true}>
      <ModalHeader className="fs-1" toggle={toggle}>
        <h4 className="fs-1">{title}</h4>
        <p className="text-muted fs-3">{secondTitle}</p>
      </ModalHeader>
      <ModalBody className="">
        <Form id="player-form">
          <Col>
            <Col xl={12}>
              <Card>
                <CardHeader className="align-items-center d-flex">
                  <div className="col-sm pe-3 ">
                    <div className="d-flex justify-content-sm-start">
                      <h4 className="card-title my-2 ms-n2 flex-grow-1">
                        Weekly
                      </h4>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="table-responsive table-card mb-5">
                    <table className="table table-hover table-centered align-middle table-nowrap ms-n3 ">
                      <thead className="fs-3">
                        <tr>
                          <th scope="col" className="py-4">
                            Day
                          </th>
                          <th scope="col" className="py-4">
                            Status
                          </th>
                          <th scope="col" className="py-4">
                            Vanue
                          </th>
                          <th scope="col" className="py-4">
                            From
                          </th>
                          <th scope="col" className="py-4">
                            To
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {('' || []).map((item, key) => (
                          <tr key={'key'}>
                            <td>
                              <h5 className="fs-12 my-1 fw-medium">Saturday</h5>
                            </td>
                            <td>
                              <h5 className="fs-12 my-1 fw-normal badge bg-success-subtle text-success">
                                Open
                              </h5>
                            </td>
                            <td>
                              <h5 className="fs-12 my-1 fw-normal">
                                Dummy Sports Ground
                              </h5>
                            </td>
                            <td>
                              <h5 className="fs-12 my-1 fw-normal">12:00 am</h5>
                            </td>
                            <td>
                              <h5 className="fs-12 my-1 fw-normal">02:00 pm</h5>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* if no data found */}
                  {''?.length <= 0 && (
                    <div className="empty-table-dialog-container">
                      <span className="fs-2">
                        Don't found any Training yet.
                      </span>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>

            {/* Custom training schedule */}
            <Col xl={12}>
              <Card>
                <CardHeader className="align-items-center d-flex">
                  <div className="col-sm pe-3 ">
                    <div className="d-flex justify-content-sm-start">
                      <h4 className="card-title my-2 ms-n2 flex-grow-1">
                        Custom
                      </h4>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="table-responsive table-card mb-5">
                    <table className="table table-hover table-centered align-middle table-nowrap ms-n3 ">
                      <thead className="fs-3">
                        <tr>
                          <th scope="col" className="py-4">
                            Day
                          </th>
                          <th scope="col" className="py-4">
                            Status
                          </th>
                          <th scope="col" className="py-4">
                            Vanue
                          </th>
                          <th scope="col" className="py-4">
                            From
                          </th>
                          <th scope="col" className="py-4">
                            To
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {('' || []).map((item, key) => (
                          <tr key={'key'}>
                            <td>
                              <h5 className="fs-12 my-1 fw-medium">Saturday</h5>
                            </td>
                            <td>
                              <h5 className="fs-12 my-1 fw-normal badge bg-success-subtle text-success">
                                Open
                              </h5>
                            </td>
                            <td>
                              <h5 className="fs-12 my-1 fw-normal">
                                Dummy Sports Ground
                              </h5>
                            </td>
                            <td>
                              <h5 className="fs-12 my-1 fw-normal">12:00 am</h5>
                            </td>
                            <td>
                              <h5 className="fs-12 my-1 fw-normal">02:00 pm</h5>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* if no data found */}
                  {''?.length <= 0 && (
                    <div className="empty-table-dialog-container">
                      <span className="fs-2">
                        Don't found any Training yet.
                      </span>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Col>
        </Form>

        {/* add button */}
        <div>
          <button
            className="text-primary fw-semibold fs-2 p-3"
            data-bs-dismiss="modal"
            onClick={toggle}
          >
            <i className="ri-close"></i>
            {Btn}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default TrainingScheduleModal;
