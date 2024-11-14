/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, Col, Modal, ModalBody, Table } from 'reactstrap';
import Loader from '../Loader';

const InvoiceModal = ({
  invoiceModal,
  setInvoiceModal,
  leftBtn,
  rightBtn,
  TogCloseSuccessModal,
  id,
  invoiceId,
  allPendingPlayers,
  removePendingPlayersHandler,
  registrationFee,
  multiPlayerPaidByCashIsLoading,
  goToInvoice,
  sendInvoiceMailIsLoading,
  sendInvoiceMail,
  setAllPendingPlayers,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  const handleClose = () => {
    setAllPendingPlayers([]);
    setInvoiceModal(!invoiceModal);
  };

  return (
    <div>
      <Modal isOpen={invoiceModal} centered size="lg" scrollable>
        <ModalBody className="text-center">
          <div className="text-end">
            <button
              type="button"
              onClick={() => handleClose()}
              className="btn-close text-end fs-1"
            ></button>
          </div>
          <div>
            <Col xl={12} className="justify-content-center">
              <Card>
                <CardBody>
                  <ToastContainer />

                  <div className="table-responsive">
                    <Table className="text-center table-nowrap align-middle scrollbar-container">
                      <thead>
                        <tr className="fs-3 text-center">
                          <th scope="col">Player Name</th>
                          <th scope="col">Player_Id</th>
                          <th scope="col">Guardian_Id</th>
                          <th scope="col">Charge_Type</th>
                          <th scope="col">Billing_Status</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allPendingPlayers?.length > 0 &&
                          allPendingPlayers
                            ?.slice(
                              currentPage * perPageData,
                              allPendingPlayers?.length -
                                currentPage * perPageData >
                                perPageData
                                ? currentPage * perPageData + perPageData
                                : allPendingPlayers?.length
                            )
                            .map((item, key) => (
                              <tr key={key}>
                                <td>
                                  <h5 className="fs-4 fw-medium text-uppercase">
                                    {item?.first_name + ' ' + item?.last_name}
                                  </h5>
                                </td>
                                <td>
                                  <h5 className="fs-4 fw-normal">
                                    {item?._id &&
                                      `PL-${item?._id.substring(
                                        item?._id.length - 8
                                      )}`}
                                  </h5>
                                </td>
                                <td>
                                  <h5 className="fs-4 fw-normal">
                                    {item?.guardian &&
                                      `GD-${item?.guardian.substring(
                                        item?.guardian.length - 8
                                      )}`}
                                  </h5>
                                </td>
                                <td>
                                  <h5 className="fs-4 fw-normal">
                                    RegistrationFee
                                  </h5>
                                </td>
                                <td>
                                  <h5 className="fs-4 fw-semibold badge bg-warning-subtle text-warning">
                                    Pending
                                  </h5>
                                </td>
                                <td>
                                  <h5 className="fs-4 fw-normal">
                                    {item?.fees}
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    type="button"
                                    onClick={() =>
                                      removePendingPlayersHandler(item?._id)
                                    }
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                    className="fs-2 fw-normal"
                                  >
                                    <i className="ri-close-line text-bg-danger"></i>
                                  </h5>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                {allPendingPlayers?.length <= 0 && (
                  <div className="fs-3 my-3 text-nowrap text-danger">
                    You don't have any Data yet.
                  </div>
                )}
                {/* <CardFooter>
                  <Pagination
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 20,
                    }}
                    data={allPendingPlayers}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                  />
                </CardFooter> */}
              </Card>
            </Col>
            <Col xl={12}>
              <div className="border-top border-top-dashed mx-4">
                <Table
                  className="table table-borderless table-nowrap align-middle mb-0 ms-auto"
                  style={{ width: '250px' }}
                >
                  <tbody>
                    {allPendingPlayers?.length > 0 &&
                      Array.isArray(allPendingPlayers) && (
                        <>
                          <tr>
                            <td className="fs-3">Sub Total :</td>
                            <td className="text-end fs-3">
                              {allPendingPlayers.reduce(
                                (total, item) =>
                                  total + parseInt(item?.fees, 10),
                                0
                              )}{' '}
                              USD
                            </td>
                          </tr>
                          <tr>
                            <td className="fs-3">GST (1 %) :</td>
                            <td className="text-end fs-3">
                              {(
                                allPendingPlayers.reduce(
                                  (total, item) =>
                                    total + (parseInt(item?.fees, 10) * 1 || 0),
                                  0
                                ) * 0.01
                              ).toFixed(2)}{' '}
                              USD
                            </td>
                          </tr>
                          <tr>
                            <td className="fs-3">Charges :</td>
                            <td className="text-end fs-3">
                              {allPendingPlayers?.length} USD
                            </td>
                          </tr>
                          <tr className="border-top border-top-dashed fs-2">
                            <th scope="row">Total Amount :</th>
                            <th className="text-end">
                              {(
                                allPendingPlayers
                                  .map((total) => total?.fees * 1.01)
                                  .reduce((total, item) => total + item, 0) +
                                allPendingPlayers?.length
                              ).toFixed(2)}
                              USD
                            </th>
                          </tr>
                        </>
                      )}
                  </tbody>
                </Table>
              </div>
            </Col>

            {/* <h4 className="mb-3 mt-4 fs-1 qoute_color ">
              Invoice ID :{' '}
              <span className="text-decoration-underline">
                {invoiceId && `INV-${invoiceId?.substring(0, 8)}`}
              </span>
            </h4> */}
            <div className="hstack gap-3 justify-content-center fs-2 py-3 ">
              {leftBtn === 'Paid By Cash' && multiPlayerPaidByCashIsLoading ? (
                <Loader />
              ) : (
                <button onClick={goToInvoice} className="button text-light p-3">
                  {leftBtn}
                </button>
              )}

              {sendInvoiceMailIsLoading ? (
                <Loader />
              ) : (
                <button
                  disabled={sendInvoiceMailIsLoading}
                  onClick={sendInvoiceMail}
                  className="button text-light p-3"
                >
                  {rightBtn}
                </button>
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default InvoiceModal;
