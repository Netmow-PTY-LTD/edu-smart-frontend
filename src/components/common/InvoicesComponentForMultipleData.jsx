/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  Card,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from 'reactstrap';
import LoaderSpiner from '../constants/Loader/LoaderSpiner';
import { userDummyImage } from '@/utils/common/data';

const InvoicesComponentForMultipleData = ({
  addressData,
  billingAddressData,
  tableData,
  printInvoice,
  payButton,
  goToPay,
  gst,
  currency,
  logoData,
  close,
  open,
  loading,
  invoice_no,
}) => {
  console.log(addressData);
  console.log(logoData);
  return (
    <>
      <Modal isOpen={open} centered fullscreen>
        <ModalHeader toggle={close} className="">
          Invoice For EMGS Fee
        </ModalHeader>
        <ModalBody className="p-5">
          {loading ? (
            <LoaderSpiner />
          ) : (
            <Row>
              <ToastContainer />
              <Col>
                <Card id="demo">
                  <div className="mb-4">
                    <img
                      src={
                        logoData
                          ? logoData
                          : logoData?.profile_image?.url
                            ? logoData?.profile_image?.url
                            : userDummyImage
                      }
                      className="card-logo card-logo-dark"
                      alt="logo dark"
                      width={'12%'}
                    />
                  </div>
                  <CardHeader className="border-bottom-dashed ">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="flex-grow-1">
                        <div className="mt-3">
                          <h6 className="text-muted text-uppercase fs-2 fw-semibold">
                            Address
                          </h6>
                          <p className="fw-medium fs-2 mb-2 text-muted">
                            {addressData?.first_name +
                              ' ' +
                              addressData?.last_name}
                          </p>
                          <p className="text-muted  mb-1">
                            {addressData?.email}
                          </p>
                          <p className="text-muted  mb-1">
                            {addressData?.phone}
                          </p>
                          <p className="text-muted  mb-1">
                            {addressData ? (
                              <>
                                {addressData?.address ||
                                  addressData?.address_line_1}{' '}
                                {addressData?.address2 ||
                                  addressData?.address_line_2}{' '}
                                {addressData?.city} {addressData?.state}{' '}
                                {addressData?.zip === 0 ? '' : addressData?.zip}{' '}
                                {addressData?.country !== 'undefined'
                                  ? addressData?.country
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
                              {billingAddressData?.address ||
                                billingAddressData?.address_line_1}{' '}
                              {billingAddressData?.address2 ||
                                billingAddressData?.address_line_2}{' '}
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
                  </CardHeader>

                  <Row className=" d-flex align-items-center justify-content-between text-center g-3 my-5">
                    <Col lg={3} xs={3}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        Invoice No
                      </p>
                      {/* <p className="mb-0 text-uppercase">
                        {invoice_no?.createdAt
                          ? `INV-${new Date(invoice_no.createdAt).getFullYear().toString().slice(-2)}${(new Date(invoice_no.createdAt).getMonth() + 1).toString().padStart(2, '0')}${new Date(invoice_no.createdAt).getDate().toString().padStart(2, '0')}-${new Date(invoice_no.createdAt).getHours().toString().padStart(2, '0')}${new Date(invoice_no.createdAt).getMinutes().toString().padStart(2, '0')}${new Date(invoice_no.createdAt).getSeconds().toString().padStart(2, '0')}`
                          : ''}
                      </p> */}
                      <p className="mb-0 text-uppercase">{invoice_no?._id}</p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        Date
                      </p>
                      <p className=" mb-0 text-uppercase">
                        <p className=" mb-0 text-uppercase">
                          {new Date().toDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </p>
                      </p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        Payment Status
                      </p>
                      <p
                        className={`badge fw-semibold text-center me-4 ${invoice_no?.application?.emgs_payment_status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
                      >
                        <span className="text-uppercase">
                          {invoice_no?.application?.emgs_payment_status ?? '-'}
                        </span>
                      </p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        INVOICE TYPE
                      </p>
                      <p className=" mb-0 text-uppercase">
                        <p className=" mb-0 text-uppercase">EMGS FEE</p>
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
                          <th scope="col">Application Details</th>
                          <th scope="col">Student</th>
                          <th scope="col">Emgs Fee</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData?.length > 0 && tableData
                          ? tableData?.map((item, key) => (
                              <tr key={key}>
                                <th scope="row" className="">
                                  {key + 1}
                                </th>

                                <td>
                                  <div className="py-4">
                                    <h3 className=" my-1 fw-normal text-uppercase">
                                      ID:{' '}
                                      {item?.application?.appId
                                        ? item?.application?.appId
                                        : item?.application?._id ?? '-'}
                                      <br />
                                      COURSE:{' '}
                                      {item?.application?.course?.name ?? '-'}
                                      <br />
                                      UNIVERSITY:{' '}
                                      {item?.application?.course?.university
                                        ?.name ?? '-'}
                                      <br />
                                      DEPARTMENT:{' '}
                                      {item?.application?.course?.department
                                        ?.name ?? '-'}
                                    </h3>
                                  </div>
                                </td>

                                <td>
                                  <h3 className=" my-1 fw-medium text-uppercase  ">
                                    {item?.student?.first_name +
                                      ' ' +
                                      item?.student?.last_name ?? '-'}
                                  </h3>
                                </td>

                                <td>
                                  <h3 className=" my-1 fw-normal text-uppercase">
                                    {item?.application?.course?.emgs_fee ?? '-'}{' '}
                                    {currency}
                                  </h3>
                                </td>
                                <td>
                                  <h3 className="my-1 fw-normal">
                                    {item?.application?.course?.emgs_fee ?? '-'}{' '}
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
                            {invoice_no?.application?.course?.emgs_fee}{' '}
                            {currency}
                          </th>
                        </tr>

                        {gst ? (
                          <tr>
                            <th>GST :</th>
                            <th className="text-end ">
                              {gst} {currency}
                            </th>
                          </tr>
                        ) : (
                          ''
                        )}

                        <tr className="border-top border-top-dashed ">
                          <th scope="row">Total Amount :</th>

                          <th className="text-end">
                            {invoice_no?.application?.course?.emgs_fee}{' '}
                            {currency}
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  <style>{`.table-row{
                            display: flex;
                            gap: 30px;
                          }

                          .tc:first-child{
                            width: 25%;
                          }
                            @media(max-width:575px){
                            .tc:first-child {
                              width: 50%;
                          }
                            }

                          `}</style>

                  <div className="border-top border-top-dashed mx-5 my-5 fs-2">
                    <div className="invoicetable">
                      <div className="table-row">
                        <div className="tc mt-3">
                          Course Fee: <br />
                          <span style={{ fontSize: '12px' }}>
                            (Payment is required after EMGS processing.)
                          </span>
                        </div>
                        <div className="tc mt-3">
                          {' '}
                          {invoice_no?.application?.course?.after_emgs_fee +
                            invoice_no?.application?.course?.emgs_fee}{' '}
                          {currency}
                        </div>
                      </div>
                      <div className="table-row">
                        <div className="tc">Emgs Fee:</div>
                        <div className="tc">
                          {' '}
                          - {invoice_no?.application?.course?.emgs_fee}{' '}
                          {currency}
                        </div>
                      </div>
                      <div className="table-row border-top border-top-dashed mt-3 fs-2">
                        <div className="tc mt-3">
                          Balance Payable: <br />
                          <span style={{ fontSize: '12px' }}>
                            (Payment is required after EMGS processing.)
                          </span>
                        </div>
                        <div className="tc mt-3">
                          {' '}
                          {invoice_no?.application?.course?.after_emgs_fee}{' '}
                          {currency}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* print and download button section */}
                <Col xl={12}>
                  <div className="d-flex align-items-center justify-content-between mb-5">
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
                      className="button px-5 py-2 no-print"
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
                    <button
                      onClick={() => close()}
                      className="d-flex justify-content-end button px-5 py-2 "
                    >
                      Close
                    </button>
                  </div>
                </Col>
              </Col>
            </Row>
          )}
        </ModalBody>
      </Modal>

      {/* </Container> */}
      {/* )} */}
      {/* </div> */}
      {/* </Layout> */}
    </>
  );
};

export default InvoicesComponentForMultipleData;
