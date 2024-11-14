import Image from 'next/image';
import React from 'react';
import { Card, CardHeader, Col, Container, Row, Table } from 'reactstrap';
import { default as logoDark } from '../../../../public/logo-share/sd_logo.png';
import DashBoardLayout from '../layout/index';

const InvoicesComponent = ({
  addressData,
  billingAddressData,
  tableData,
  generatePDF,
  printInvoice,
  payButton,
  goToPay,
  charges_type,
  subtotal,
  gst,
  total,
  currency,
  gstPercent,
  logoData,
  sdFee,
}) => {
  return (
    <>
      <DashBoardLayout>
        <div id="pageContent" className="page-content">
          <Container fluid>
            <Row id="row" className="justify-content-center">
              <Col xxl={10}>
                <Card id="demo" className="d-flex p-5">
                  <div className="mb-4">
                    {logoData?.business_setting?.logo ? (
                      <Image
                        src={logoData?.business_setting?.logo?.secure_url}
                        className="card-logo card-logo-dark"
                        alt="logo dark"
                        height={40}
                        width={80}
                      />
                    ) : (
                      <Image
                        src={logoDark}
                        className="card-logo card-logo-dark"
                        alt="logo dark"
                        height={40}
                      />
                    )}
                  </div>
                  <CardHeader className="border-bottom-dashed ">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="flex-grow-1">
                        <div className="mt-3">
                          <h6 className="text-muted text-uppercase fs-2 fw-bold">
                            Address
                          </h6>
                          <p className="text-muted mb-1 fw-medium text-uppercase">
                            {billingAddressData?.first_name +
                              ' ' +
                              billingAddressData?.last_name}
                          </p>
                          <p className="text-muted  mb-0">
                            {billingAddressData?.email}
                          </p>
                          <p className="text-muted  mb-0">
                            {billingAddressData?.phone}
                          </p>
                          <p className="text-muted  mb-1">
                            {billingAddressData?.city}{' '}
                            {billingAddressData?.state}{' '}
                            {billingAddressData?.zip === 0
                              ? ''
                              : billingAddressData?.zip}{' '}
                            {billingAddressData?.country !== 'undefined'
                              ? billingAddressData?.country
                              : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-1">
                        <h2 className="text-muted text-uppercase  fw-semibold mb-3">
                          Billing Address
                        </h2>
                        <p className="text-muted  mb-1 fw-medium text-uppercase">
                          {addressData?.data?.first_name +
                            ' ' +
                            addressData?.data?.last_name}
                        </p>
                        <p className="text-muted  mb-1">
                          {addressData?.data?.email}
                        </p>
                        <p className="text-muted  mb-1">
                          {addressData?.data?.phone}
                        </p>
                        <p className="text-muted  mb-1">
                          {addressData ? (
                            <>
                              {addressData?.data?.city}{' '}
                              {addressData?.data?.state}{' '}
                              {addressData?.zip === 0 ? '' : addressData?.zip}{' '}
                              {addressData?.data?.country !== 'undefined'
                                ? addressData?.data?.country
                                : ''}
                            </>
                          ) : (
                            ''
                          )}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <Row
                    xxl={12}
                    className="d-flex align-items-center justify-content-between g-3 my-5 "
                  >
                    <Col lg={3} xs={3}>
                      <p className="text-muted text-center mb-2 text-uppercase fw-semibold">
                        Invoice No
                      </p>
                      <p className="mb-0 text-center">
                        {billingAddressData?._id
                          ? `INV-${billingAddressData?._id.substring(16, 24)}`
                          : ''}
                      </p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted text-center  mb-2 text-uppercase fw-semibold">
                        Date
                      </p>
                      <p className="text-center mb-0 text-uppercase">
                        <p className=" mb-0 text-uppercase">
                          {new Date().toDateString()}
                        </p>
                      </p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted text-center mb-2 text-uppercase fw-semibold">
                        Payment Status
                      </p>
                      <p className=" mb-0 text-center text-success fw-semibold">
                        <span className="text-center text-uppercase">paid</span>
                      </p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted text-center mb-2 text-uppercase fw-semibold">
                        TOTAL AMOUNT
                      </p>
                      <p className=" mb-0 text-center text-uppercase fw-bold text-muted">
                        {total} {currency}
                      </p>
                    </Col>
                  </Row>

                  <div className="table-responsive my-5 ">
                    <Table className="table-borderles text-center  align-middle mb-0">
                      <thead>
                        <tr className="text-center ">
                          <th scope="col">SL</th>
                          {tableData?.event_name || tableData?.name ? (
                            <th scope="col">Event Name</th>
                          ) : (
                            ''
                          )}
                          <th scope="col">Charge Type</th>
                          {charges_type === 'Product Purchase Fee' ? (
                            <th scope="col">SKU</th>
                          ) : (
                            <th scope="col">Guardian Name</th>
                          )}
                          {charges_type === 'Product Purchase Fee' ? (
                            <th scope="col">Product</th>
                          ) : (
                            <th scope="col">Player Name</th>
                          )}
                          {charges_type === 'Product Purchase Fee' ? (
                            <th scope="col">QNT</th>
                          ) : (
                            ''
                          )}
                          <th scope="col">Billing Status</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData ? (
                          <tr>
                            <th scope="row" className="">
                              {1}
                            </th>
                            {tableData?.name || tableData?.event_name ? (
                              <td>
                                <div className="py-4">
                                  <h5 className="my-1 fw-medium">
                                    <h5 className="my-1 fw-normal text-uppercase fs-3">
                                      {tableData?.name || tableData?.event_name}
                                    </h5>
                                  </h5>
                                </div>
                              </td>
                            ) : (
                              ''
                            )}
                            <td>
                              <h5 className="my-1 fw-normal text-uppercase fs-3">
                                {typeof tableData === 'object' &&
                                  tableData !== null && (
                                    <span className="qoute_color fw-medium">
                                      {charges_type || 'Default Charge Type'}
                                    </span>
                                  )}
                              </h5>
                            </td>
                            {charges_type === 'Product Purchase Fee' ? (
                              <td>
                                <div className="py-4">
                                  <h5 className="my-1 fw-medium">
                                    <h5 className="my-1 fw-normal text-uppercase fs-3">
                                      {tableData?.product?.sku_code}
                                    </h5>
                                  </h5>
                                </div>
                              </td>
                            ) : (
                              <td>
                                <h5 className="my-1 fw-normal text-uppercase fs-3">
                                  {tableData?.guardian_id
                                    ? tableData?.guardian_id?.first_name +
                                      ' ' +
                                      tableData?.guardian_id?.last_name
                                    : tableData?.guardian?._id
                                      ? tableData?.guardian?.first_name +
                                        ' ' +
                                        tableData?.guardian?.last_name
                                      : tableData?.user?.guardian
                                        ? tableData?.user?.guardian
                                            ?.first_name +
                                          ' ' +
                                          tableData?.user?.guardian?.last_name
                                        : billingAddressData?.role !== 'player'
                                          ? billingAddressData?.first_name +
                                            ' ' +
                                            billingAddressData?.last_name
                                          : ''}
                                </h5>
                              </td>
                            )}
                            {charges_type === 'Product Purchase Fee' ? (
                              <td>
                                <div className="py-4">
                                  <h5 className="my-1 fw-medium">
                                    <h5 className="my-1 fw-normal text-uppercase fs-3">
                                      {tableData?.product?.title}
                                    </h5>
                                  </h5>
                                </div>
                              </td>
                            ) : (
                              <td>
                                <h5 className="my-1 fw-normal text-uppercase fs-3">
                                  {tableData?.role === 'player'
                                    ? tableData?.first_name +
                                      ' ' +
                                      tableData?.last_name
                                    : tableData?.user?.role === 'player'
                                      ? tableData?.user?.first_name +
                                        ' ' +
                                        tableData?.user?.last_name
                                      : billingAddressData?.role === 'player'
                                        ? billingAddressData?.first_name +
                                          ' ' +
                                          billingAddressData?.last_name
                                        : ''}
                                </h5>
                              </td>
                            )}

                            {charges_type === 'Product Purchase Fee' ? (
                              <td>
                                <div className="py-4">
                                  <h5 className="my-1 fw-medium">
                                    <h5 className="my-1 fw-normal text-uppercase fs-3">
                                      {tableData?.quantity}
                                    </h5>
                                  </h5>
                                </div>
                              </td>
                            ) : (
                              ''
                            )}

                            <td>
                              <h5
                                className={` my-1 fw-semibold badge bg-success-subtle text-success fs-3`}
                              >
                                PAID
                              </h5>
                            </td>
                            <td>
                              <h5 className=" my-1 fw-normal fs-3">
                                {tableData && addressData ? (
                                  <>
                                    {tableData?.fees ||
                                      tableData?.event_id?.fees ||
                                      tableData?.amount ||
                                      tableData?.total}{' '}
                                    {currency}
                                  </>
                                ) : (
                                  ''
                                )}
                              </h5>
                            </td>
                          </tr>
                        ) : (
                          ''
                        )}
                      </tbody>
                    </Table>
                  </div>

                  <div className="border-top border-top-dashed  my-5 fs-2">
                    <Table
                      className="table table-borderless table-nowrap align-middle mb-0 ms-auto"
                      style={{ width: '250px' }}
                    >
                      <tbody>
                        <tr>
                          <th className="">Sub Total :</th>
                          <th className="text-end ">
                            {subtotal} {currency}
                          </th>
                        </tr>

                        <tr>
                          <th className="">SD Fee :</th>
                          <th className="text-end ">
                            {sdFee} {currency}
                          </th>
                        </tr>

                        <tr>
                          <th className="">GST ({gstPercent}%) :</th>
                          <th className="text-end ">
                            {gst} {currency}
                          </th>
                        </tr>

                        <tr className="border-top border-top-dashed ">
                          <th scope="row">Total Amount :</th>

                          <th className="text-end">
                            {total} {currency}
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Card>

                <Col xl={12}>
                  <div id="payNOwDiv">
                    {payButton === 'yes' ? (
                      <button
                        onClick={goToPay}
                        className="button text-light px-3 p-2 me-3 no-print"
                      >
                        <i className="ri-bank-card-fill align-bottom me-1"></i>
                        Pay Now
                      </button>
                    ) : (
                      ''
                    )}

                    <button
                      onClick={printInvoice}
                      className="button text-light px-3 p-2 me-3 no-print"
                    >
                      <i className="ri-printer-line align-bottom me-2"></i>{' '}
                      Print
                    </button>

                    {/* <button
                      onClick={generatePDF}
                      className="button text-light px-3 p-2 me-3 no-print"
                    >
                      <i className="ri-download-2-line align-bottom me-2"></i>
                      Download
                    </button> */}
                  </div>
                </Col>
              </Col>
            </Row>
          </Container>
        </div>
      </DashBoardLayout>
    </>
  );
};

export default InvoicesComponent;
