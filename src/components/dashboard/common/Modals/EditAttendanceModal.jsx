import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Col, Form, Input, Modal, ModalBody, Row } from 'reactstrap';

const EditAttendanceModal = ({ isOpen, toggle, title, btn, backBtn }) => {
  // add player modal
  const [edit_attendanceModal, setEdit_attendanceModal] = useState(false);
  const Tog_edit_attendanceModal = () => {
    setEdit_attendanceModal(!edit_attendanceModal);
  };

  return (
    <div>
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={isOpen}
        // onClick={toggle}
        centered
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={toggle}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <Form id="player-form">
            <Row>
              <div className="table-responsive table-card mb-5">
                <table className="table table-hover table-centered align-middle table-nowrap ">
                  <thead className="fs-2">
                    <tr>
                      <th scope="col" className="py-4">
                        Player name
                      </th>
                      <th scope="col" className="py-4">
                        Date
                      </th>
                      <th scope="col" className="py-4">
                        Attendance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {('' || [])?.map((item, key) => (
                      <tr key={key}>
                        <td>
                          <div className="d-flex align-items-center py-4">
                            <div>
                              <Link
                                href="/admin/player-profile"
                                className="text-reset me-3"
                              >
                                <Image
                                  src={''}
                                  alt="User"
                                  className="avatar-lg rounded-circle"
                                />
                              </Link>
                            </div>
                            <Link href="" className="text-reset me-3">
                              <h5 className="fs-14 my-1 fw-normal">
                                Bobby Davis
                              </h5>
                            </Link>
                          </div>
                        </td>

                        <td>
                          <h5 className="fs-14 my-1 fw-normal">
                            {' '}
                            25 Aug, 2023
                          </h5>
                        </td>

                        <td>
                          <div className="form-check form-switch form-switch-right form-switch-md me-4">
                            <Input
                              className="form-check-input code-switcher"
                              type="checkbox"
                            />
                          </div>
                          <h5 className="fs-3 fw-semibold badge bg-light-subtle text-success ">
                            Present
                          </h5>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Col lg={12}>
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
                    //   onClick={handleAddGuardian}
                    onClick={toggle}
                  >
                    {btn}
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

export default EditAttendanceModal;
