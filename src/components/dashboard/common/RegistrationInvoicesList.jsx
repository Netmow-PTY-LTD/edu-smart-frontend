import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap';
import SuccessModel from './Modals/SuccessModel';
import Pagination from './Pagination';

const RegistrationInvoicesList = ({
  invoiceData,
  goToInvoice,
  paidByCashIsLoading,
  id,
  file_modal,
  setFile_modal,
  Tog_add_success_modal,
  redirectToInvoice,
  setAdd_success_modal,
  add_success_modal,
  userInfoData,
  subscription,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  return (
    <>
      <Col xl={12}>
        <Card>
          <CardHeader className="align-items-center d-flex ">
            <div className="col-sm pe-3 ">
              <div className="d-flex justify-content-sm-start">
                <h4 className="card-title my-2 flex-grow-1 ps-2">
                  Registration Invoice
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
                      Player Name
                    </th>
                    {subscription ? (
                      <th scope="col" className="py-4">
                        Guardian
                      </th>
                    ) : (
                      ''
                    )}
                    {subscription ? (
                      <th scope="col" className="py-4">
                        Email
                      </th>
                    ) : (
                      ''
                    )}

                    <th scope="col" className="py-4">
                      Amount
                    </th>
                    {/* <th scope="col" className="py-4">
                      Method
                    </th> */}
                    <th scope="col" className="py-4">
                      Status
                    </th>
                    {subscription ? (
                      <th scope="col" className="py-4">
                        Joining Date
                      </th>
                    ) : (
                      ''
                    )}

                    <th scope="col" className="py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* for  single data */}
                  {invoiceData?._id && (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center py-4">
                          <div>
                            <h5 className="fs-14 my-1 fw-medium text-capitalize">
                              {invoiceData?.user?.first_name +
                                ' ' +
                                invoiceData?.user?.last_name}
                            </h5>
                          </div>
                        </div>
                      </td>

                      <td>
                        <h5 className="fs-14 my-1 fw-medium">
                          {(
                            (parseFloat(invoiceData.amount) +
                              parseFloat(invoiceData.sd_fee || 0)) *
                            (1 + parseFloat(invoiceData.gst || 0) / 100)
                          ).toFixed(2)}{' '}
                          {invoiceData.currency}
                        </h5>
                      </td>

                      {/* <td>
                        <h5 className="fs-14 my-1 fw-medium text-uppercase">
                          {userInfoData?.role === 'admin' ? 'Cash' : 'Stripe'}
                        </h5>
                      </td> */}
                      <td>
                        <h5
                          className={`fs-14 my-1 fw-medium text-uppercase badge ${invoiceData?.bill_status === 'paid' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}
                        >
                          {invoiceData?.bill_status}
                        </h5>
                      </td>
                      {/* <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {new Date(invoiceData?.joining_date).toDateString()}
                        </h5>
                      </td> */}
                      {userInfoData?.role === 'admin' &&
                      invoiceData?.bill_status === 'unpaid' ? (
                        <td>
                          <button
                            type="button"
                            onClick={() => setFile_modal(!file_modal)}
                            className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                          >
                            Pay Now
                          </button>
                        </td>
                      ) : userInfoData?.role === 'guardian' &&
                        invoiceData?.bill_status === 'unpaid' ? (
                        <td>
                          <button
                            type="button"
                            onClick={() => setFile_modal(!file_modal)}
                            className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                          >
                            Pay Now
                          </button>
                        </td>
                      ) : userInfoData?.role === 'player' &&
                        invoiceData?.bill_status === 'unpaid' ? (
                        <td>
                          <button
                            type="button"
                            onClick={() => setFile_modal(!file_modal)}
                            className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                          >
                            Pay Now
                          </button>
                        </td>
                      ) : (
                        <td>
                          <Link
                            href={
                              userInfoData?.role === 'admin'
                                ? `/admin/single-player-paid-by-cash-invoice/${invoiceData?.user?._id}`
                                : userInfoData?.role === 'guardian'
                                  ? `/guardian/player-registration-fee-invoice/${invoiceData?.user?._id}`
                                  : userInfoData?.role === 'player' &&
                                      invoiceData?.bill_status === 'paid'
                                    ? `/player/player-registration-fee-invoice/${invoiceData?.user?._id}`
                                    : ''
                            }
                            type="button"
                            className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                          >
                            View
                          </Link>
                        </td>
                      )}
                    </tr>
                  )}

                  {/* for multiple data */}
                  {invoiceData?.length > 0 &&
                    invoiceData
                      ?.slice(
                        currentPage * perPageData,
                        invoiceData?.length - currentPage * perPageData >
                          perPageData
                          ? currentPage * perPageData + perPageData
                          : invoiceData?.length
                      )
                      .map((items, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center py-4">
                              <div>
                                <h5 className="fs-14 my-1 fw-medium text-uppercase">
                                  {/* <Link
                            href="/admin/invoices"
                            className="badge bg-info-subtle text-info"
                          > */}
                                  {items?.user?.first_name +
                                    ' ' +
                                    items?.user?.last_name}
                                  {/* </Link> */}
                                </h5>
                              </div>
                            </div>
                          </td>
                          {subscription ? (
                            <td>
                              <h5 className="fs-14 my-1 fw-medium text-uppercase">
                                {items?.user?.guardian
                                  ? items?.user?.guardian?.first_name +
                                    items?.user?.guardian?.last_name
                                  : ''}
                              </h5>
                            </td>
                          ) : (
                            ''
                          )}
                          {subscription ? (
                            <td>
                              <h5 className="fs-14 my-1 fw-normal">
                                {items?.user?.email}
                              </h5>
                            </td>
                          ) : (
                            ''
                          )}
                          <td>
                            <h5 className="fs-14 my-1 fw-semibold text-success">
                              {(
                                (parseFloat(items.amount) +
                                  parseFloat(items.sd_fee || 0)) *
                                (1 + parseFloat(items.gst || 0) / 100)
                              ).toFixed(2)}{' '}
                              {items.currency}
                            </h5>
                          </td>

                          {/* <td>
                            <h5 className="fs-14 my-1 fw-medium text-uppercase">
                              Cash
                            </h5>
                          </td> */}
                          <td>
                            <h5
                              className={`fs-14 my-1 fw-medium text-uppercase badge ${items?.bill_status === 'paid' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}
                            >
                              {items?.bill_status}
                            </h5>
                          </td>
                          {/* <td>
                          <h5 className="fs-14 my-1 fw-medium text-uppercase">
                            {items?.role}
                          </h5>
                        </td> */}
                          {subscription ? (
                            <td>
                              <h5 className="fs-14 my-1 fw-normal">
                                {new Date(items?.createdAt).toDateString()}
                              </h5>
                            </td>
                          ) : (
                            ''
                          )}

                          {userInfoData?.role === 'admin' &&
                          items?.bill_status === 'unpaid' ? (
                            <td>
                              <button
                                type="button"
                                onClick={() =>
                                  Tog_add_success_modal(items?.user?._id)
                                }
                                className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                              >
                                Pay Now
                              </button>
                            </td>
                          ) : userInfoData?.role === 'guardian' &&
                            items?.bill_status === 'unpaid' ? (
                            <td>
                              <button
                                type="button"
                                onClick={() => goToInvoice(items?.user?._id)}
                                className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                              >
                                Pay Now
                              </button>
                            </td>
                          ) : (
                            <td>
                              <Link
                                href={
                                  userInfoData?.role === 'admin'
                                    ? `/admin/single-player-paid-by-cash-invoice/${items?.user?._id}`
                                    : userInfoData?.role === 'guardian'
                                      ? `/guardian/player-registration-fee-invoice/${items?.user?._id}`
                                      : ''
                                }
                                type="button"
                                className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                              >
                                View
                              </Link>
                            </td>
                          )}
                        </tr>
                      ))}
                </tbody>
              </table>
              {invoiceData?.length <= 0 && (
                <div className="empty-table-dialog-container">
                  <span className="">{"Don't found any Data. "}</span>
                </div>
              )}
            </div>
          </CardBody>
          {userInfoData?.role === 'admin' && invoiceData?._id ? (
            <SuccessModel
              title={'Successfully Added A Player'}
              rightBtn="Close"
              backBtn="no"
              leftBtn="Paid By Cash"
              add_success_modal={file_modal}
              setAdd_success_modal={setFile_modal}
              goToInvoice={goToInvoice}
              id={id}
              paidByCashIsLoading={paidByCashIsLoading}
            />
          ) : userInfoData?.role === 'admin' && invoiceData?.length > 0 ? (
            <SuccessModel
              title={'Successfully Added A Player'}
              rightBtn="Close"
              backBtn="no"
              leftBtn="Paid By Cash"
              add_success_modal={add_success_modal}
              setAdd_success_modal={setAdd_success_modal}
              goToInvoice={goToInvoice}
              id={id}
              paidByCashIsLoading={paidByCashIsLoading}
            />
          ) : userInfoData?.role === 'guardian' &&
            invoiceData?.bill_status === 'unpaid' ? (
            <SuccessModel
              title={'Player Registration Fee'}
              secondTitle={'For Payment Please Click Pay Now Button'}
              leftBtn={'Pay Now'}
              rightBtn={'Close'}
              backBtn={'no'}
              id={id}
              add_success_modal={file_modal}
              setAdd_success_modal={setFile_modal}
              goToInvoice={goToInvoice}
            />
          ) : userInfoData?.role === 'player' &&
            invoiceData?.bill_status === 'unpaid' ? (
            <SuccessModel
              add_success_modal={file_modal}
              setAdd_success_modal={setFile_modal}
              leftBtn={'Pay Now'}
              rightBtn={'Close'}
              backBtn={'no'}
              id={id}
              goToInvoice={goToInvoice}
              title={'Player Registration Fee'}
              secondTitle={'For Payment Please Click Pay Now Button'}
            />
          ) : userInfoData?.role === 'guardian' ? (
            <SuccessModel
              title={'Player Registration Fee'}
              secondTitle={'For Payment Please Click Pay Now Button'}
              rightBtn="Close"
              backBtn="no"
              leftBtn="Pay Now"
              add_success_modal={add_success_modal}
              setAdd_success_modal={setAdd_success_modal}
              goToInvoice={redirectToInvoice}
              id={id}
              paidByCashIsLoading={paidByCashIsLoading}
            />
          ) : (
            // <SuccessModel
            //   title={'Successfully Added A Player'}
            //   rightBtn="Close"
            //   backBtn="no"
            //   leftBtn="Paid By Cash"
            //   add_success_modal={add_success_modal}
            //   setAdd_success_modal={setAdd_success_modal}
            //   goToInvoice={goToInvoice}
            //   id={id}
            //   paidByCashIsLoading={paidByCashIsLoading}
            // />
            ''
          )}

          <CardFooter>
            <Pagination
              style={{
                position: 'absolute',
                bottom: 0,
                right: 20,
              }}
              data={invoiceData}
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

export default RegistrationInvoicesList;
