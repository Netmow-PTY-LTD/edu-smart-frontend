import Image from 'next/image';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardHeader, Col, Container, Row, Table } from 'reactstrap';
import { default as logoDark } from '../../../../public/logo-share/sd_logo.png';
import Layout from '../layout';
import BreadCrumb from './BreadCrumb';

const InvoicesComponentForMultipleData = ({
  addressData,
  billingAddressData,
  tableData,
  generatePDF,
  printInvoice,
  payButton,
  goToPay,
  chargesType,
  invoice,
  superAdmin,
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
      <Layout>
        <div className="page-content">
          {/* { (
            <LoaderSpiner />
          ) : ( */}
          <Container fluid>
            <BreadCrumb title={' Invoice'} pagetitle={'Pages'} />
            <Row className=" justify-content-center">
              <ToastContainer />
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
                          <h6 className="text-muted text-uppercase fs-2 fw-semibold">
                            Address
                          </h6>
                          <p className="text-muted  mb-1 fw-medium ">
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
                            {billingAddressData ? (
                              <>
                                {billingAddressData?.address}{' '}
                                {billingAddressData?.city}{' '}
                                {billingAddressData?.state}{' '}
                                {billingAddressData?.zip === 0
                                  ? ''
                                  : billingAddressData?.zip}{' '}
                                {billingAddressData?.country !== 'undefined'
                                  ? billingAddressData?.country
                                  : ''}
                              </>
                            ) : (
                              ''
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-1">
                        <h2 className="text-muted text-uppercase  fw-bold mb-3">
                          Billing Address
                        </h2>
                        <p className="fw-medium fs-2 mb-2 text-muted">
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
                              {addressData?.data?.address}{' '}
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

                  <Row className=" d-flex align-items-center justify-content-between text-center g-3 my-5">
                    <Col lg={3} xs={3}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        Invoice No
                      </p>
                      <p className="mb-0">
                        {billingAddressData?._id
                          ? `INV-${billingAddressData?._id.substring(16, 24)}`
                          : invoice}
                      </p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        Date
                      </p>
                      <p className=" mb-0 text-uppercase">
                        <p className=" mb-0 text-uppercase">
                          {new Date().toDateString()}{' '}
                          {/* {new Date().toLocaleTimeString()} */}
                        </p>
                      </p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        Payment Status
                      </p>
                      <p
                        className={`${superAdmin ? 'bg-warning-subtle text-warning' : 'text-success'} badge  fw-semibold text-center me-4`}
                      >
                        <span className="text-uppercase">
                          {superAdmin ? 'pending' : 'paid'}
                        </span>
                      </p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        TOTAL AMOUNT
                      </p>
                      <p className=" mb-0 text-uppercase fw-medium ">
                        {total} {currency}
                      </p>
                    </Col>
                  </Row>

                  <div
                    className="table-responsive"
                    style={{
                      height: 'calc(100% - 555px)',
                      overflow: 'auto',
                    }}
                  >
                    <Table className="table-borderles text-center align-middle mb-5">
                      <thead>
                        <tr className=" text-center">
                          <th scope="col">SL</th>
                          {chargesType === 'Seasonal Game Fees' ? (
                            <th scope="col">Event Name</th>
                          ) : (
                            ''
                          )}
                          <th scope="col">Charge Type</th>
                          <th scope="col">Guardian Name</th>
                          <th scope="col">Player Name</th>
                          <th scope="col">Billing Status</th>
                          <th scope="col">GST(%)</th>
                          <th scope="col">Amount</th>
                          <th scope="col">GST Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData?.length > 0 && tableData
                          ? tableData?.map((item, key) => (
                              <tr key={key}>
                                <th scope="row" className="">
                                  {key + 1}
                                </th>

                                {chargesType === 'Seasonal Game Fees' ? (
                                  <td>
                                    <div className="py-4">
                                      <h3 className=" my-1 fw-normal text-uppercase">
                                        {item?.event_name || item?.name}
                                      </h3>
                                    </div>
                                  </td>
                                ) : (
                                  ''
                                )}
                                <td>
                                  <h3 className=" my-1 fw-medium text-uppercase qoute_color ">
                                    {chargesType
                                      ? chargesType
                                      : item?.charge_type}
                                  </h3>
                                </td>
                                <td>
                                  <h3 className=" my-1 fw-normal text-uppercase">
                                    {item?.user?.guardian?.role === 'guardian'
                                      ? item?.user?.guardian?.first_name +
                                        ' ' +
                                        item?.user?.guardian?.last_name
                                      : item?.user?.role === 'guardian'
                                        ? item?.user?.first_name +
                                          ' ' +
                                          item?.user?.last_name
                                        : item?.guardian
                                          ? item?.guardian?.first_name +
                                            ' ' +
                                            item?.guardian?.last_name
                                          : ''}
                                  </h3>
                                </td>
                                <td>
                                  <h3 className=" my-1 fw-normal text-uppercase">
                                    {item?.user?.player?.role === 'player'
                                      ? item?.user?.player?.first_name +
                                        ' ' +
                                        item?.user?.player?.last_name
                                      : item?.user?.role === 'player'
                                        ? item?.user?.first_name +
                                          ' ' +
                                          item?.user?.last_name
                                        : item?.role === 'player'
                                          ? item?.first_name +
                                            ' ' +
                                            item?.last_name
                                          : ''}
                                  </h3>
                                </td>

                                <td>
                                  <h3
                                    className={`${superAdmin ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success'} my-1 fw-semibold badge text-uppercase`}
                                  >
                                    {superAdmin ? 'pending' : 'paid'}
                                  </h3>
                                </td>
                                <td>
                                  <h3 className=" my-1 fw-normal">
                                    {item?.gst} {'%'}
                                  </h3>
                                </td>
                                <td>
                                  <h3 className=" my-1 fw-normal">
                                    {item?.amount || item?.fees || item?.fee}{' '}
                                    {currency}
                                  </h3>
                                </td>
                                <td>
                                  <h3 className=" my-1 fw-normal">
                                    {(item?.amount * item?.gst) / 100 ||
                                      (item?.fees * item?.gst) / 100 ||
                                      (item?.fee * item?.gst) / 100}{' '}
                                    {currency}
                                  </h3>
                                </td>
                              </tr>
                            ))
                          : ''}
                      </tbody>
                    </Table>
                  </div>

                  <div className="border-top border-top-dashed mx-5 my-5 fs-2">
                    <Table
                      className="table table-borderless table-nowrap align-middle mb-0 ms-auto"
                      style={{ width: '250px' }}
                    >
                      <tbody id="invoicetotalsections">
                        <tr>
                          <th className="">Sub Total :</th>
                          <th className="text-end ">
                            {subtotal} {currency}
                          </th>
                        </tr>
                        {superAdmin || payButton === 'no' ? (
                          ''
                        ) : (
                          <tr>
                            <th className="">SD Fee :</th>
                            <th className="text-end ">
                              {sdFee} {currency}
                            </th>
                          </tr>
                        )}
                        <tr>
                          <th className="">GST ({gstPercent}%) :</th>
                          <th className="text-end ">
                            {' '}
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

                {/* print and download button section */}
                <Col xl={12}>
                  <div>
                    {payButton === 'yes' ? (
                      <button
                        onClick={goToPay}
                        className="button text-light px-3 p-2 me-3 no-print"
                        id="invoicepaynow"
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
                      id="invoiceprintbtn"
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
          {/* )} */}
        </div>
      </Layout>
    </>
  );
};

export default InvoicesComponentForMultipleData;
