import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap';
import Pagination from './Pagination';

const AdminInvoice = ({ title, invoices }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  return (
    <>
      <Col xl={12}>
        <Card id="pendingchargestable" className="pb-4">
          <CardHeader className="align-items-center d-flex ">
            <div className="col-sm pe-3 py-3">
              <div className="d-flex justify-content-sm-start">
                <h4 className="card-title mb-0 flex-grow-1 ps-2">{title}</h4>
              </div>
            </div>
          </CardHeader>

          <CardBody style={{ position: 'relative' }}>
            <div className="table-responsive table-card mb-5 ">
              <table className="table table-centeredd table-nowrap">
                <thead>
                  <tr>
                    <th scope="col" className="py-4">
                      #
                    </th>
                    <th scope="col" className="py-4">
                      Invoice No
                    </th>
                    <th scope="col" className="py-4 text-center">
                      Billing From
                    </th>

                    <th scope="col" className="py-4">
                      Billing To
                    </th>

                    <th scope="col" className="py-4">
                      Last Payment Date
                    </th>

                    <th scope="col" className="py-4">
                      Paid At
                    </th>

                    <th scope="col" className="py-4">
                      Status
                    </th>

                    <th scope="col" className="py-4">
                      Amount
                    </th>

                    <th scope="col" className="py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices?.length > 0 &&
                    invoices
                      ?.slice(
                        currentPage * perPageData,
                        invoices?.length - currentPage * perPageData >
                          perPageData
                          ? currentPage * perPageData + perPageData
                          : invoices?.length
                      )
                      .map((invoice, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{invoice?.invoice_number}</td>
                          <td>
                            <div className="text-center">
                              {invoice?.billing_from}
                            </div>
                          </td>
                          <td>{invoice?.billing_to}</td>
                          <td>{invoice?.last_payment_date}</td>
                          <td>
                            {invoice?.paid_at &&
                              invoice?.paid_at !== null &&
                              invoice?.paid_at}
                          </td>
                          <td>
                            <span
                              className={`badge text-uppercase ${title === 'Paid Charges List' || invoice?.status === 'paid' ? 'text-success bg-success-subtle' : 'text-danger bg-danger-subtle'}`}
                            >
                              {title === 'Paid Charges List'
                                ? 'paid'
                                : invoice?.status}
                            </span>
                          </td>
                          <td>
                            {title === 'Pending Charges List'
                              ? invoice?.charges &&
                                invoice?.charges
                                  .filter((inv) => inv?.status === 'unpaid')
                                  .reduce(
                                    (acc, curr) =>
                                      acc +
                                      parseFloat(curr?.fee + curr?.gst_amount),
                                    0
                                  )
                                  .toFixed(2)
                              : invoice?.charges
                                  ?.reduce(
                                    (acc, curr) =>
                                      acc +
                                      parseFloat(curr?.fee + curr?.gst_amount),
                                    0
                                  )
                                  .toFixed(2)}
                            {invoices?.currency}
                          </td>
                          <td>
                            <Link
                              className="button text-white px-2  py-1"
                              href={`${title === 'Pending Charges List' ? `/admin/charges/pending-charges/${invoice?._id}` : `/admin/charges/paid-charges/${invoice?._id}`}`}
                              id="chargesviews"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {/* if table has n data  */}
            {invoices.length <= 0 && (
              <div
                // style={{ position: 'relative', height: '440px' }}
                className="empty-table-dialog-container"
              >
                <span className="">{"Don't found any Charges List."} </span>
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
              data={invoices}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
            />
          </CardFooter>
        </Card>
      </Col>
    </>
  );
};
export default AdminInvoice;
