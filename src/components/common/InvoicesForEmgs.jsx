/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Card,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import LoaderSpiner from '../constants/Loader/LoaderSpiner';
import { userDummyImage } from '@/utils/common/data';
import {
  useSslCommerzPaymentIntendMutation,
  useSslCommerzSettingsQuery,
  useStripePaymentIntendMutation,
  useStripeSettingsQuery,
} from '@/slice/services/common/paymentService';
import { useCustomData } from '@/utils/common/data/customeData';
import { useRouter } from 'next/router';
import { useUpdateApplicationStatusMutation } from '@/slice/services/public/application/applicationServiceNew';

const InvoicesForEmgs = ({
  open,
  close,
  goToPay,
  gst,
  logoData,
  loading,
  dataDetails,
  addressData,
}) => {
  const router = useRouter();
  const customeData = useCustomData();

  const address = addressData;
  const billing = dataDetails?.student;
  const currency = 'MYR';
  const paymentStatus = dataDetails?.emgs_payment_status;

  const payButton =
    (customeData.paneltext === 'agent' ||
      customeData.paneltext === 'student') &&
    paymentStatus === 'pending'
      ? 'yes'
      : '';

  const CourseFee =
    dataDetails?.tuition_fee_amount + dataDetails?.emgs_fee_amount || 0;
  const emgsFee = dataDetails?.emgs_fee_amount || 0;
  const afterEmgsFee = dataDetails?.emgs_fee_amount || 0;
  const tuitionFee = dataDetails?.tuition_fee_amount;
  const customData = useCustomData();

  const printInvoice = () => {
    window.print();
  };

  const { data: stripeSettings } = useStripeSettingsQuery();
  const { data: sslCommerzSettings } = useSslCommerzSettingsQuery();

  const [sslCommerzPaymentIntend] = useSslCommerzPaymentIntendMutation();
  const sslCommerzPaymentHandler = async () => {
    const price = emgsFee;
    const application_id = dataDetails?._id;
    const course_id = dataDetails?.course?._id;
    const report_id = dataDetails?._id;

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
    const transaction_reason = 'application_emgs';
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
    const price = emgsFee;
    const application_id = dataDetails?._id;
    const course_id = dataDetails?.course?._id;
    const report_id = dataDetails?._id;

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
    const transaction_reason = 'application_emgs';
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

  const [
    updateApplicationStatus,
    {
      data: updateApplicationStatusData,
      isLoading: updateApplicationStatusIsLoading,
    },
  ] = useUpdateApplicationStatusMutation();

  useEffect(() => {
    const requestToCreateApplication = async (
      transaction_id,
      application_id,
      payment_method
    ) => {
      try {
        updateApplicationStatus({
          status: 'paid',
          transaction_id,
          application_id,
          transaction_reason: 'application_emgs',
          payment_method: payment_method,
        });
      } catch (error) {
        //
      }
    };

    if (
      router?.query?.payment_status === 'success' &&
      router?.query?.transaction_id
    ) {
      const transaction_id = router?.query?.transaction_id;
      const application_id = router?.query?.application_id;
      const payment_method = router?.query?.payment_method;
      requestToCreateApplication(
        transaction_id,
        application_id,
        payment_method
      );
    }
  }, [router, updateApplicationStatus]);

  return (
    <Modal isOpen={open} centered fullscreen>
      <ModalHeader toggle={close}>Invoice For EMGS Fee</ModalHeader>
      <ModalBody className="p-5">
        {loading ? (
          <LoaderSpiner />
        ) : (
          <Row>
            <ToastContainer />
            <Col>
              <Card id="demo">
                {/* Logo */}
                <div className="mb-4">
                  <img
                    src={
                      logoData?.profile_image?.url
                        ? logoData.profile_image.url
                        : logoData || userDummyImage
                    }
                    alt="logo"
                    width={'12%'}
                  />
                </div>

                {/* Address Section */}
                <CardHeader className="border-bottom-dashed">
                  <div className="d-flex justify-content-between flex-column flex-md-row gap-2 gap-md-0 mb-4 w-100">
                    <div>
                      <h6 className="text-muted text-uppercase fs-2 fw-semibold">
                        Address
                      </h6>
                      <p className="fw-medium fs-2 text-muted">
                        {address?.first_name} {address?.last_name}
                      </p>
                      <p className="text-muted">{address?.email}</p>
                      <p className="text-muted">{address?.phone}</p>
                      <p className="text-muted">
                        {(address?.address || address?.address_line_1) + ' '}{' '}
                        <br />
                        {(address?.address2 || address?.address_line_2) +
                          ' '}{' '}
                        <br />
                        {address?.city} {address?.state}{' '}
                        {address?.zip !== 0 ? address?.zip : ''}{' '}
                        {address?.country !== 'undefined'
                          ? address?.country
                          : ''}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-muted text-uppercase fw-bold mb-3">
                        Billing Address
                      </h2>
                      <p className="text-muted">
                        {billing?.first_name} {billing?.last_name}
                      </p>
                      <p className="text-muted">{billing?.email}</p>
                      <p className="text-muted">{billing?.phone}</p>
                      <p className="text-muted">
                        {(billing?.address || billing?.address_line_1) + ' '}
                        {(billing?.address2 || billing?.address_line_2) +
                          ' '}{' '}
                        <br />
                        {billing?.city} {billing?.state}{' '}
                        {billing?.zip !== 0 ? billing?.zip : ''}{' '}
                        {billing?.country !== 'undefined'
                          ? billing?.country
                          : ''}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* PRINTABLE INLINE HEADER */}
                <div
                  className="d-none d-print-block border p-3 mb-4"
                  style={{
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <strong>Invoice No:</strong> {dataDetails?.appId}-EMGS
                  </div>
                  <div>
                    <strong>Date:</strong> {new Date().toDateString()}
                  </div>
                  <div>
                    <strong>Payment Status:</strong>{' '}
                    <span
                      style={{
                        padding: '2px 10px',
                        borderRadius: '4px',
                        backgroundColor:
                          dataDetails?.emgs_payment_status === 'pending'
                            ? '#ffc107'
                            : '#dc3545',
                        color: '#fff',
                        textTransform: 'capitalize',
                      }}
                    >
                      {dataDetails?.emgs_payment_status ?? '-'}
                    </span>
                  </div>
                  <div>
                    <strong>Invoice Type:</strong> EMGS FEE
                  </div>
                </div>

                {/* Invoice Info */}
                <Row className="text-center g-3 my-5 d-print-none">
                  <Col lg={3}>
                    <p className="text-muted fw-semibold">Invoice No</p>
                    <p className="mb-0">{dataDetails?.appId + '-EMGS'}</p>
                  </Col>
                  <Col lg={3}>
                    <p className="text-muted fw-semibold">Date</p>
                    <p className="mb-0">{new Date().toDateString()}</p>
                  </Col>
                  <Col lg={3}>
                    <p className="text-muted fw-semibold">Payment Status</p>
                    <p className="fw-semibold">
                      <span
                        className={`badge ${
                          dataDetails?.emgs_payment_status === 'pending'
                            ? 'bg-warning text-white'
                            : dataDetails?.emgs_payment_status === 'paid'
                              ? 'bg-success text-white'
                              : 'bg-danger text-white'
                        }`}
                        style={{
                          textTransform: 'capitalize',
                          fontSize: '13px',
                          padding: '8px 14px',
                          borderRadius: '6px',
                        }}
                      >
                        {dataDetails?.emgs_payment_status ?? '-'}
                      </span>
                    </p>
                  </Col>
                  <Col lg={3}>
                    <p className="text-muted fw-semibold">Invoice Type</p>
                    <p className="mb-0">EMGS FEE</p>
                  </Col>
                </Row>

                {/* Table */}
                <div
                  className="table-responsive"
                  style={{ maxHeight: '350px', overflow: 'auto' }}
                >
                  <Table className="text-center align-middle mb-5">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Application Details</th>
                        <th>Student</th>
                        <th>Emgs Fee</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          ID: {dataDetails?.appId || dataDetails?._id}
                          <br />
                          COURSE: {dataDetails?.course?.name} <br />
                        </td>
                        <td>
                          {dataDetails?.student?.first_name}{' '}
                          {dataDetails?.student?.last_name}
                        </td>
                        <td>
                          {dataDetails?.emgs_fee_amount} {currency}
                        </td>
                        <td>
                          {dataDetails?.emgs_fee_amount} {currency}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                {/* Totals */}
                <div className="border-top border-top-dashed mx-5 my-5 fs-2">
                  <Table
                    className="table table-borderless table-nowrap align-middle mb-0 ms-auto"
                    style={{ width: '250px' }}
                  >
                    <tbody>
                      <tr>
                        <th>Sub Total :</th>
                        <th className="text-end">
                          {emgsFee} {currency}
                        </th>
                      </tr>
                      {gst && (
                        <tr>
                          <th>GST :</th>
                          <th className="text-end">
                            {gst} {currency}
                          </th>
                        </tr>
                      )}
                      <tr className="border-top border-top-dashed">
                        <th>Total Amount :</th>
                        <th className="text-end">
                          {emgsFee} {currency}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                {/* Final Breakdown */}
                <div className="border-top border-top-dashed mx-5 my-5 fs-2">
                  <div className="d-flex justify-content-between mt-3">
                    <div>Course Fee:</div>
                    <div>
                      {CourseFee} {currency}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <div>Emgs Fee:</div>
                    <div>
                      - {emgsFee} {currency}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-top-dashed mt-3 pt-3">
                    <div>
                      Balance Payable:
                      <div style={{ fontSize: '12px' }}>
                        (Payment is required after EMGS processing.)
                      </div>
                    </div>
                    <div>
                      {tuitionFee} {currency}
                    </div>
                  </div>
                </div>

                <Col xl={12} className="d-print-none">
                  <div className="d-flex justify-content-between mb-5">
                    {payButton === 'yes' && (
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
                    <button
                      onClick={printInvoice}
                      className="d-flex justify-content-end button mt-5 px-5 py-2"
                    >
                      <i className="ri-printer-fill me-1"></i> Print Invoice
                    </button>
                  </div>
                </Col>
              </Card>
            </Col>
          </Row>
        )}
      </ModalBody>
    </Modal>
  );
};

export default InvoicesForEmgs;
