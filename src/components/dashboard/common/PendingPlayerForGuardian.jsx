import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const PendingPlayerForGuardian = () => {
  return (
    <>
      <Card>
        <CardHeader className="d-flex align-items-center ">
          <div className="col-sm pe-3">
            <h4 className="card-title flex-grow-1 ps-2 my-3">
              Pending Invoices
            </h4>
          </div>
          {/* <div className="col-sm-auto ">
            <button type="button" className="button p-3 m-3 text-light">
              Pay All
            </button>
          </div> */}
        </CardHeader>

        <CardBody>
          <div className="table-responsive table-card mb-5 ">
            <table className="table table-centered table-nowrap">
              <thead>
                <tr>
                  <th scope="col" className="py-4">
                    Invoice No
                  </th>
                  <th scope="col" className="py-4">
                    Player Name
                  </th>
                  <th scope="col" className="py-4">
                    Pay to
                  </th>
                  <th scope="col" className="py-4">
                    Fees
                  </th>
                  <th scope="col" className="py-4">
                    Status
                  </th>
                  <th scope="col" className="py-4">
                    Date
                  </th>
                  <th scope="col" className="py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {''?.length > 0 &&
                  Array.isArray('') &&
                  ''.map((item, key) => (
                    <tr key={key}>
                      <td>
                        <h5 className="my-3">
                          <Link href={''} className="fs-3 close-btn ">
                            <span>OD#123456</span>
                          </Link>
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-3 fw-normal">Jhon Doe</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-3 fw-normal">
                          Winter Season 2023
                        </h5>
                      </td>

                      <td>
                        <h5 className="fs-14 my-3 fw-normal">$ 200.00</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-3 fw-normal">
                          {/* <span
                        className={` text-uppercase me-2 ${
                          item?.payment_status &&
                          item?.payment_status === 'paid'
                            ? 'text-success badge bg-success-subtle'
                            : 'text-danger badge bg-danger-subtle'
                        } `}
                      >
                        {item?.payment_status ? item?.payment_status : 'unpaid'}
                      </span> */}
                          pending
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-3 fw-normal">21 Jun 2023</h5>
                      </td>

                      <td>
                        <h5 className="my-3">
                          <Link href={''} className="third-btn fw-normal fs-2">
                            Pay
                          </Link>
                        </h5>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* if table has n data  */}
            {''?.length <= 0 && (
              <div className="empty-table-dialog-container">
                <span className="">{"Don't found any Pending  List."} </span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default PendingPlayerForGuardian;
