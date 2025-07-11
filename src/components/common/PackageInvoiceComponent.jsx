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
import moment from 'moment';

const PackageInvoiceComponent = ({
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
  logoData,
  close,
  open,
  loading,
  payment_status,
  invoice_no,
  payment_method,
  paymentData,
}) => {
  return (
    <>
      {/* <Layout> */}
      {/* <div className="page-content"> */}
      {/* { (
            <LoaderSpiner />
          ) : ( */}
      {/* <Container fluid> */}
      {/* <BreadCrumb title={' Invoice'} pagetitle={'Pages'} /> */}
      <Modal isOpen={open} centered fullscreen>
        <ToastContainer />
        <ModalHeader toggle={close} className="">
          Inovice
        </ModalHeader>
        <ModalBody className="p-5">
          <Row>
            <Col>
              {loading ? (
                <LoaderSpiner />
              ) : (
                <Card id="demo">
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
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logoData}
                        className="card-logo card-logo-dark"
                        alt="logo dark"
                        // height={10}
                        width={'12%'}
                      />
                    )}
                  </div>
                  <CardHeader className="border-bottom-dashed ">
                    <div className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-2 gap-md-0 mb-4 w-100">
                      <div className="flex-grow-1">
                        <div className="mt-3">
                          <h6 className="text-muted text-uppercase fs-2 fw-semibold">
                            Address
                          </h6>
                          <p className="fw-medium fs-2 mb-2 text-muted">
                            {addressData?.role === 'admin'
                              ? addressData?.organisation_name
                              : addressData?.first_name +
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

                  <Row className="text-center gap-2 gap-md-0 g-3 my-5">
                    <Col md={3} xs={12}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        Invoice No
                      </p>
                      <p className="mb-0 text-uppercase">{invoice_no?._id}</p>
                    </Col>
                    <Col md={3} xs={12}>
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
                    <Col md={3} xs={12}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        Payment Status
                      </p>
                      <p
                        className={`badge fw-semibold text-center me-4 ${payment_status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
                      >
                        <span className="text-uppercase">
                          {payment_status ?? '-'}
                        </span>
                      </p>
                    </Col>
                    <Col md={3} xs={12}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        Payment Method
                      </p>
                      <p className="mb-0 text-uppercase fw-medium text-primary">
                        {payment_method}
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
                          <th scope="col">Package Name</th>
                          <th scope="col">Package Duration</th>
                          <th scope="col" className="text-capitalize">
                            {invoice_no?.subscription_type} Duration
                          </th>
                          <th scope="col">Coupon</th>
                          <th scope="col">Package Price</th>
                          <th scope="col">Total Price</th>
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
                                      {item?.agent_package?.package?.name
                                        ? item?.agent_package?.package?.name
                                        : '-'}
                                    </h3>
                                  </div>
                                </td>

                                <td>
                                  <h3 className="my-1 fw-medium text-uppercase d-flex flex-column justify-content-center w-100">
                                    {moment(
                                      item?.agent_package?.start_date
                                    ).format('ddd MMM D, YYYY') +
                                      ' - ' +
                                      moment(
                                        item?.agent_package?.end_date
                                      ).format('ddd MMM D, YYYY')}

                                    <div className="d-flex justify-content-center mt-2 w-100">
                                      {item?.agent_package
                                        ?.previous_package_carry_days && (
                                        <small className="badge bg-secondary-subtle text-secondary d-flex justify-content-center">
                                          {item?.agent_package
                                            ?.previous_package_carry_days
                                            ? `Carry Forward ${item?.agent_package?.previous_package_carry_days} days`
                                            : '-'}
                                        </small>
                                      )}
                                    </div>
                                  </h3>
                                </td>

                                <td>
                                  <h3 className="fw-normal text-capitalize d-flex align-items-center justify-content-center">
                                    {item?.coupon_package_duration
                                      ? item?.coupon_package_duration
                                          .split('_')
                                          .join(' ')
                                      : item?.agent_package?.package_duration
                                        ? item?.agent_package?.package_duration
                                            .split('_')
                                            .join(' ')
                                        : '-'}{' '}
                                    <small className="ms-2 badge bg-secondary-subtle text-secondary">
                                      {item?.subscription_type
                                        ? `${item?.subscription_type}`
                                        : '-'}
                                    </small>
                                  </h3>
                                </td>
                                <td>
                                  <h3 className="my-1 fw-normal d-flex align-items-center justify-content-center">
                                    {item?.coupon ? (
                                      <>
                                        {item?.coupon?._id
                                          ? item?.coupon?.code
                                          : '-'}
                                        <small className="ms-2 badge bg-secondary-subtle text-secondary">
                                          {item?.coupon?.discount_percentage
                                            ? `${item?.coupon?.discount_percentage}%`
                                            : '-'}
                                        </small>
                                      </>
                                    ) : (
                                      '-'
                                    )}
                                  </h3>
                                </td>

                                <td>
                                  <h3 className=" my-1 fw-normal text-uppercase">
                                    {item?.agent_package?.package?.price != null
                                      ? (
                                          item?.agent_package?.package?.price ||
                                          0
                                        )?.toFixed(2)
                                      : '-'}{' '}
                                    {currency}
                                  </h3>
                                </td>

                                <td>
                                  <h3 className="my-1 fw-normal">
                                    {item?.total_package_amount?.toFixed(2)}{' '}
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
                            {subtotal?.toFixed(2)} {currency}
                          </th>
                        </tr>

                        <tr className="border-top border-top-dashed">
                          <th scope="row">Discount :</th>
                          <th className="text-end">
                            {paymentData?.discount?.toFixed(2)} {currency}
                          </th>
                        </tr>

                        <tr className="border-top border-top-dashed ">
                          <th scope="row">Total Amount :</th>
                          <th className="text-end">
                            {total?.toFixed(2)} {currency}
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Card>
              )}
              {/* print and download button section */}
              <Col xl={12}>
                <div className="d-flex align-items-center justify-content-between my-5">
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
                    <i className="ri-printer-line align-bottom me-2"></i> Print
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
                    className="d-flex justify-content-end btn btn-danger px-5 py-2 "
                  >
                    Close
                  </button>
                </div>
              </Col>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      {/* </Container> */}
      {/* )} */}
      {/* </div> */}
      {/* </Layout> */}
    </>
  );
};

export default PackageInvoiceComponent;
