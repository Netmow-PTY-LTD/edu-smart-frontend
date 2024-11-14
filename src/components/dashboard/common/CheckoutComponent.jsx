import { stripePayment } from '@/slices/dashboard/adminDashboard/Actions/paymentActions';
import { Elements } from '@stripe/react-stripe-js';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import GuardianCheckOutPage from './GuardianCheckOutPage';
import OrderSummary from './OrderSummary';

const CheckoutComponent = ({
  eventId,
  player_id,
  guardian_id,
  invoice_type,
  address,
  stripePromise,
  userInfoData,
  invoiceName,
  subTotal,
  charges,
  gst,
  total,
  gstPercent,
  currency,
  adminInfoData,
  sslcommerzeInit,
}) => {
  const dispatch = useDispatch();

  const {
    data: stripePaymentData,
    isLoading: stripePaymentIsLoading,
    error: stripePaymentError,
  } = useSelector((state) => state.AdminDashboard.stripePayment);

  useEffect(() => {
    dispatch(
      stripePayment({
        price: total,
        id: userInfoData?._id,
        address: address,
        currency: currency,
        gst: gst,
      })
    );
  }, [address, currency, dispatch, gst, total, userInfoData?._id]);

  const options = {
    clientSecret: stripePaymentData?.clientSecret,
  };



  return (
    <>
      <Row>
        {adminInfoData?.country === 'Bangladesh' &&
        adminInfoData?.currency === 'BDT' ? (
          <Col xl={8}>
            <Link
              href={
                sslcommerzeInit.gatewayPageURL
                  ? sslcommerzeInit.gatewayPageURL
                  : ''
              }
              // target="_blank"
              rel="noopener noreferrer"
            >
              Click here to proceed to payment
            </Link>
          </Col>
        ) : options?.clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <GuardianCheckOutPage
              event_id={eventId || ''}
              player_id={player_id}
              guardian_id={guardian_id}
              invoice_type={invoice_type}
              invoiceName={invoiceName}
            />
          </Elements>
        ) : (
          ''
        )}

        <Col xl={4}>
          <OrderSummary
            name={userInfoData?.first_name + ' ' + userInfoData?.last_name}
            subTotal={subTotal}
            charges={charges}
            gst={gst}
            total={total}
            gstPercent={gstPercent}
            currency={currency}
          />
        </Col>
      </Row>
    </>
  );
};

export default CheckoutComponent;
