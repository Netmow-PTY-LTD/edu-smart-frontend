import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import Pagination from './Pagination';

const InvoicesList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  return (
    <>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <div className="col-sm pe-3 ">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title my-2 flex-grow-1 ps-2">
                Invoices List
              </h4>
            </div>
          </div>
        </CardHeader>
        <CardBody
          style={{ position: 'relative' }}
          className="table-card-body-container"
        >
          <div className="table-responsive table-card mb-5">
            <table className="table table-hover table-centered align-middle table-nowrap ">
              <thead className="fs-2">
                <tr>
                  <th scope="col" className="py-4">
                    ID
                  </th>
                  <th scope="col" className="py-4">
                    Amount
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {''?.length > 0 &&
                  ''
                    ?.slice(
                      currentPage * perPageData,
                      ''?.length - currentPage * perPageData > perPageData
                        ? currentPage * perPageData + perPageData
                        : ''?.length
                    )
                    .map((item, key) => (
                      <tr key={key}>
                        <td>
                          <div className="d-flex align-items-center py-4">
                            <div>
                              <h5 className="fs-14 my-1 fw-medium">
                                <Link
                                  href="/admin/invoices"
                                  className="badge bg-info-subtle text-info"
                                >
                                  543534
                                </Link>
                              </h5>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">120.00</h5>
                        </td>

                        <td>
                          <h5 className="fs-14 my-1 fw-normal"> Stripe</h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal badge bg-success-subtle text-success">
                            Paid
                          </h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal"> 17 Apr 2023</h5>
                        </td>
                        <td>
                          <Link
                            href={'/admin/invoices'}
                            className="fs-14 my-1 fw-normal badge bg-info-subtle text-info"
                          >
                            Download
                          </Link>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {''?.length <= 0 && (
            <div className="empty-table-dialog-container">
              <span className="">{"Don't found any Invoices yet..... "}</span>
            </div>
          )}
        </CardBody>
        <CardFooter>
          <Pagination
            style={{
              position: 'absolute',
              bottom: 0,
              right: 20,
            }}
            data={'data'}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default InvoicesList;
