import React from 'react';
import { Card, CardBody, Modal, ModalBody } from 'reactstrap';

const InvoiceDetailsForSAdmin = ({ openModal, setOpenModal }) => {
  return (
    <>
      <Modal isOpen={openModal} centered={true} size="xl">
        <div className="modal-header">
          <h5 className="fs-2 w-100">VIEW Details</h5>
          <button
            type="button"
            onClick={() => setOpenModal(!openModal)}
            className="btn-close fs-1"
          ></button>
        </div>
        <ModalBody>
          <Card>
            <CardBody style={{ position: 'relative' }}>
              <div className="table-responsive table-card mb-5">
                <table className="table table-hover table-centered align-middle table-nowrap ">
                  <thead className="fs-2">
                    <tr>
                      <th scope="col" className="py-4">
                        SN
                      </th>
                      <th scope="col" className="py-4">
                        PDF/PAY
                      </th>
                      <th scope="col" className="py-4">
                        Package Name
                      </th>
                      <th scope="col" className="py-4">
                        Invoice No
                      </th>
                      <th scope="col" className="py-4">
                        Order No
                      </th>
                      <th scope="col" className="py-4">
                        Type
                      </th>
                      <th scope="col" className="py-4">
                        Status
                      </th>
                      <th scope="col" className="py-4">
                        Recurring
                      </th>
                      <th scope="col" className="py-4">
                        Start Date
                      </th>
                      <th scope="col" className="py-4">
                        End Date
                      </th>
                      <th scope="col" className="py-4">
                        Billing
                      </th>
                      <th scope="col" className="py-4">
                        Payment Method
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {data?.length > 0 &&
                        data?.map((item, key) => ( */}
                    <tr style={{ cursor: 'pointer' }} key={'key'}>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">{'key' + 1}</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-medium text-uppercase">
                          Enterprise
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          December 14, 2023, 11:47 am
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">CS-57555 </h5>
                      </td>

                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          Shannon McDermid
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          centralstarsbasketball
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">Basketball</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          simonmayers24@gmail.com
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">042322929111</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">Australia</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">Australia</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">Australia</h5>
                      </td>
                    </tr>
                    {/* ))} */}
                  </tbody>
                </table>
              </div>

              {'data'?.length <= 0 && (
                <div className="empty-table-dialog-container">
                  <span className="">{"Don't found any Data. "}</span>
                </div>
              )}
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
};

export default InvoiceDetailsForSAdmin;
