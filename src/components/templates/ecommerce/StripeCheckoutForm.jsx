import StripeForm from '@/components/dashboard/common/StripeForm';
import {
  createOrderAction,
  getAllCartItemsAction,
} from '@/slices/home/actions/clientProductAction';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const StripeCheckoutForm = ({ formData }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  const stripePayHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setErrorMessage('Stripe is not initialized.');
      return;
    }
    setLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error?.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        const firstCard =
          paymentIntent?.payment_method_types &&
          paymentIntent.payment_method_types[0];

        // let transactionData = {
        //   formData,
        //   subdomain,
        //   payment_method: firstCard,
        // };

        try {
          dispatch(createOrderAction(formData)).then((res) => {
            if (!res.error) {
              toast.success('Order created successfully');
              dispatch(getAllCartItemsAction());
              router.push('/ecommerce/products');
            } else {
              toast.error('Failed to create order');
            }
          });
        } catch (dispatchError) {
          setErrorMessage(dispatchError?.message);
        }
      } else {
        setErrorMessage('Unexpected State');
      }
    } catch (error) {
      setErrorMessage(error?.message);
    }

    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <StripeForm
        stripePayHandler={stripePayHandler}
        stripe={stripe}
        loading={loading}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default StripeCheckoutForm;
