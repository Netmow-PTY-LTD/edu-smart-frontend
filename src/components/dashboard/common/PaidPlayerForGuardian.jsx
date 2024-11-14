import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import Pagination from './Pagination';

const PaidPlayerForGuardian = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  return (
    <>
      <Card>
        <CardHeader className="d-flex align-items-center">
          <div className="col-sm pe-3 my-3">
            <h4 className="card-title mb-0 flex-grow-1 ps-2">Paid Invoices</h4>
          </div>
          <div className="col-sm-auto ">
            {/* <button type="button" className="button p-3 m-3 text-light">
              Export
            </button> */}
          </div>
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
                    Total
                  </th>
                  <th scope="col" className="py-4">
                    Processing Fee
                  </th>
                  <th scope="col" className="py-4">
                    GST(%)
                  </th>
                  <th scope="col" className="py-4">
                    GST
                  </th>
                  <th scope="col" className="py-4">
                    Payable
                  </th>
                  <th scope="col" className="py-4">
                    Method
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
                        <h5 className="fs-14 my-3 fw-normal">$ 200.00</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-3 fw-normal"> $ 7.00</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-3 fw-normal">1%</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-3 fw-normal">$ 2.00</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-3 fw-normal">$ 208.00</h5>
                      </td>

                      <td>
                        <h5 className="fs-14 my-3 fw-normal">Stripe</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-3 fw-normal">Pending</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-3 fw-normal">21 Jun 2023</h5>
                      </td>

                      <td>
                        <h5 className="my-3">
                          <Link href={''} className="third-btn fw-normal fs-2">
                            Download
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
                <span className="">{"Don't found any Paid List."} </span>
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Pagination
            style={{
              position: 'absolute',
              bottom: 0,
              right: 20,
            }}
            data={''}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default PaidPlayerForGuardian;
