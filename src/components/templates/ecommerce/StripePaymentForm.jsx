import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';
import { allPaymentSettings } from '@/slices/dashboard/commonApi/Actions/invoiceActions';
import { shoppingStripePaymentAction } from '@/slices/home/actions/clientProductAction';

const StripePaymentForm = ({ formData, total, userInfoId }) => {
  const dispatch = useDispatch();

  const {
    data: stripeKeyData,
    isLoading: isLoadingStripeKey,
    error: stripeKeyError,
  } = useSelector((state) => state.CommonApi.allPaymentSettings);

  const {
    data: stripePaymentData,
    isLoading: isStripePaymentLoading,
    error: stripePaymentError,
  } = useSelector((state) => state.Home.shoppingStripePayment);

  useEffect(() => {
    if (userInfoId) {
      dispatch(allPaymentSettings(userInfoId));
    }
  }, [dispatch, userInfoId]);

  useEffect(() => {
    if (formData && total) {
      dispatch(
        shoppingStripePaymentAction({
          price: total,
          first_name: formData?.first_name,
          last_name: formData?.last_name,
          address: formData?.country,
          subdomain: formData?.subdomain,
        })
      );
    }
  }, [dispatch, formData, total]);

  const stripePromise = stripeKeyData
    ? loadStripe(stripeKeyData?.stripeSettings?.stripe_key)
    : null;

  const options = stripePaymentData?.clientSecret
    ? { clientSecret: stripePaymentData?.clientSecret }
    : null;

  if (isLoadingStripeKey || isStripePaymentLoading) {
    return <div>Loading...</div>;
  }

  if (stripeKeyError || stripePaymentError) {
    return <div>Error: {stripeKeyError || stripePaymentError}</div>;
  }

  return (
    <div>
      {stripePromise && options ? (
        <Elements stripe={stripePromise} options={options}>
          <StripeCheckoutForm formData={formData} />
        </Elements>
      ) : (
        <div>Unable to load payment form. Please try again later.</div>
      )}
    </div>
  );
};

export default StripePaymentForm;
