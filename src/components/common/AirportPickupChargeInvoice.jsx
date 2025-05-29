/* eslint-disable @next/next/no-img-element */
import {
  useSslCommerzPaymentIntendMutation,
  useSslCommerzSettingsQuery,
  useStripePaymentIntendMutation,
  useStripeSettingsQuery,
} from '@/slice/services/common/paymentService';
import { useCustomData } from '@/utils/common/data/customeData';
import Image from 'next/image';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
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

const AirportPickupChargeInvoice = ({
  addressData,
  billingAddressData,
  tableData,
  printInvoice,
  currency,
  logoData,
  close,
  open,
  loading,
  invoice_no,
}) => {
  const [sslCommerzPaymentIntend] = useSslCommerzPaymentIntendMutation();
  const customData = useCustomData();
  const { data: stripeSettings } = useStripeSettingsQuery();
  const { data: sslCommerzSettings } = useSslCommerzSettingsQuery();

  const sslCommerzPaymentHandler = async () => {
    const price = invoice_no?.application?.airport_pickup_charge;
    const application_id = invoice_no?.application?._id;
    const course_id = invoice_no?.application?.course?._id;
    const report_id = invoice_no?._id;

    const faild_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/${customData?.paneltext}/application-invoices?payment_status=failed&report_id=${report_id}`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/${customData?.paneltext}/application-invoices?payment_status=faild&report_id=${report_id}`;
    const success_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/${customData?.paneltext}/application-invoices?payment_status=success&report_id=${report_id}`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/${customData?.paneltext}/application-invoices?payment_status=success&report_id=${report_id}`;
    const cancel_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/${customData?.paneltext}/application-invoices?payment_status=cancel&report_id=${report_id}`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/${customData?.paneltext}/application-invoices?payment_status=cancel&report_id=${report_id}`;

    const currency = 'MYR';
    const transaction_reason = 'application_airport_pickup_charge';
    const payment_method = 'sslcommerz';

    try {
      const response = await sslCommerzPaymentIntend({
        price,
        faild_url,
        success_url,
        cancel_url,
        course_id,
        currency,
        application_id,
        transaction_reason,
        payment_method,
      }).unwrap();

      if (response.success && response?.data?.gatewayPageURL) {
        window.location.href = response?.data?.gatewayPageURL;
      } else {
        toast.error('Payment failed');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const [stripePaymentIntend] = useStripePaymentIntendMutation();

  const stripePaymentHandler = async () => {
    const price = invoice_no?.application?.airport_pickup_charge;
    const application_id = invoice_no?.application?._id;
    const course_id = invoice_no?.application?.course?._id;
    const report_id = invoice_no?._id;

    const faild_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/${customData?.paneltext}/application-invoices?payment_status=failed&report_id=${report_id}`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/${customData?.paneltext}/application-invoices?payment_status=failed&report_id=${report_id}`;

    const success_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/${customData?.paneltext}/application-invoices?payment_status=success&report_id=${report_id}`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/${customData?.paneltext}/application-invoices?payment_status=success&report_id=${report_id}`;

    const cancel_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/${customData?.paneltext}/application-invoices?payment_status=cancel&report_id=${report_id}`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/${customData?.paneltext}/application-invoices?payment_status=cancel&report_id=${report_id}`;

    const currency = 'MYR';
    const transaction_reason = 'application_airport_pickup_charge';
    const payment_method = 'stripe'; // ✅ Set this to 'stripe'

    try {
      const response = await stripePaymentIntend({
        price,
        faild_url,
        success_url,
        cancel_url,
        course_id,
        currency,
        application_id,
        transaction_reason,
        payment_method,
      }).unwrap();

      // If using redirect to Stripe Checkout
      if (response?.success && response?.data?.gatewayPageURL) {
        window.location.href = response.data.gatewayPageURL;
      } else {
        toast.error('Unable to initiate Stripe payment');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Modal isOpen={open} centered fullscreen>
        <ModalHeader toggle={close} className="">
          Invoice For Airport Pickup Charge
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
                                {(addressData?.address ||
                                  addressData?.address_line_1) && (
                                  <>
                                    {addressData?.address ||
                                      addressData?.address_line_1}
                                    <br />
                                  </>
                                )}

                                {(addressData?.address2 ||
                                  addressData?.address_line_2) && (
                                  <>
                                    {addressData?.address2 ||
                                      addressData?.address_line_2}
                                    <br />
                                  </>
                                )}

                                {addressData?.city && <>{addressData?.city} </>}

                                {addressData?.state && (
                                  <>{addressData?.state} </>
                                )}

                                {addressData?.zip !== 0 && addressData?.zip && (
                                  <>{addressData?.zip}</>
                                )}

                                {addressData?.country &&
                                  addressData?.country !== 'undefined' && (
                                    <>{addressData?.country}</>
                                  )}
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
                              {(billingAddressData?.address ||
                                billingAddressData?.address_line_1) && (
                                <>
                                  {billingAddressData?.address ||
                                    billingAddressData?.address_line_1}
                                  <br />
                                </>
                              )}

                              {(billingAddressData?.address2 ||
                                billingAddressData?.address_line_2) && (
                                <>
                                  {billingAddressData?.address2 ||
                                    billingAddressData?.address_line_2}
                                  <br />
                                </>
                              )}

                              {billingAddressData?.city && (
                                <>{billingAddressData?.city} </>
                              )}

                              {billingAddressData?.state && (
                                <>{billingAddressData?.state} </>
                              )}

                              {billingAddressData?.zip !== 0 &&
                                billingAddressData?.zip && (
                                  <>{billingAddressData?.zip} </>
                                )}

                              {billingAddressData?.country &&
                                billingAddressData?.country !== 'undefined' && (
                                  <>{billingAddressData?.country}</>
                                )}
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
                      <p className="mb-0 text-uppercase">
                        {invoice_no?._id?.slice(0, -2)}
                      </p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        Date
                      </p>
                      <p className=" mb-0 text-uppercase">
                        <p className="mb-0 text-uppercase">
                          {invoice_no?.application
                            ?.airport_pickup_charge_payment_status === 'paid'
                            ? new Date(
                                invoice_no?.application?.airport_pickup_charge_payment_date
                              ).toDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })
                            : new Date().toDateString('en-GB', {
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
                        className={`badge fw-semibold text-center me-4 ${invoice_no?.application?.airport_pickup_charge_payment_status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
                      >
                        <span className="text-uppercase">
                          {invoice_no?.application
                            ?.airport_pickup_charge_payment_status ?? '-'}
                        </span>
                      </p>
                    </Col>
                    <Col lg={3} xs={3}>
                      <p className="text-muted  mb-2 text-uppercase fw-semibold">
                        INVOICE TYPE
                      </p>
                      <p className=" mb-0 text-uppercase">
                        <p className=" mb-0 text-uppercase">
                          Airport Pickup Charge
                        </p>
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
                          <th scope="col">Charge Fee</th>
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
                                    {item?.application?.airport_pickup_charge ??
                                      '0.00'}{' '}
                                    {currency}
                                  </h3>
                                </td>
                                <td>
                                  <h3 className="my-1 fw-normal">
                                    {item?.application?.airport_pickup_charge ??
                                      '0.00'}{' '}
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
                            {invoice_no?.application?.airport_pickup_charge ??
                              '0.00'}{' '}
                            {currency}
                          </th>
                        </tr>

                        <tr className="border-top border-top-dashed ">
                          <th scope="row">Total Amount :</th>

                          <th className="text-end">
                            {invoice_no?.application?.airport_pickup_charge ??
                              '0.00'}{' '}
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

                  {(customData?.paneltext === 'agent' ||
                    customData?.paneltext === 'student') &&
                    invoice_no?.application
                      ?.airport_pickup_charge_payment_status === 'pending' && (
                      // <div className="border-top border-top-dashed mx-5 my-5 fs-2">
                      //   <button
                      //     onClick={sslCommerzPaymentHandler}
                      //     className="d-flex justify-content-end button mt-5 px-5 py-2"
                      //   >
                      //     Pay Pickup Charge
                      //   </button>
                      // </div>
                      <>
                        <div className="d-flex gap-2">
                          {sslCommerzSettings?.data.status === 'active' && (
                            <button
                              onClick={sslCommerzPaymentHandler}
                              className="d-flex justify-content-end button mt-5 px-5 py-2"
                            >
                              <i className="ri-bank-card-fill me-1"></i> Pay BY
                              SSLCOMMERZE
                            </button>
                          )}
                          {stripeSettings?.data.status === 'active' && (
                            <button
                              onClick={stripePaymentHandler}
                              className="d-flex justify-content-end button mt-5 px-5 py-2"
                            >
                              <i className="ri-bank-card-fill me-1"></i> Pay BY
                              STRIPE
                            </button>
                          )}
                        </div>
                      </>
                    )}
                </Card>

                <Col xl={12}>
                  <div className="d-flex align-items-center justify-content-between mb-5">
                    <button
                      onClick={printInvoice}
                      className="button px-5 py-2 no-print"
                      id="invoiceprintbtn"
                    >
                      <i className="ri-printer-line align-bottom me-2"></i>{' '}
                      Print
                    </button>

                    <button
                      onClick={close}
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
    </>
  );
};

export default AirportPickupChargeInvoice;
