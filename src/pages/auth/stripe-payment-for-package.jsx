import StripeForm from '@/components/dashboard/common/StripeForm';
import {
  getSubdomain,
  login,
  registration,
} from '@/slices/dashboard/adminDashboard/Actions/authActions';
import {
  emptyLogin,
  emptyRegistration,
} from '@/slices/dashboard/adminDashboard/reducer';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Input, Label } from 'reactstrap';

const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

const StripePaymentForPackage = ({
  activeTab,
  toggleTab,
  loading,
  setErrorMessage,
  setLoading,
  errorMessage,
  formData,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const {
    data: registrationWithPackageData,
    isLoading: registrationWithPackageIsLoading,
    error: registrationWithPackageError,
  } = useSelector((state) => state.AdminDashboard.registration);

  const {
    data: loginData,
    isLoading: loginIsLoading,
    error: loginError,
  } = useSelector((state) => state.AdminDashboard.login);

  const { data: subdomainData } = useSelector(
    (state) => state.AdminDashboard.getSubdomain
  );

  useEffect(() => {
    if (loginData?.token) {
      localStorage.setItem('token', loginData?.token);
      dispatch(
        getSubdomain({
          authorization: loginData?.token,
        })
      );
    }
  }, [loginData.token, dispatch]);

  useEffect(() => {
    if (
      subdomainData?.subdomain &&
      typeof window !== 'undefined' &&
      loginData?.token
    ) {
      if (loginData?.token) {
        localStorage.setItem('token', loginData?.token);
      }
      if (appEnvironment === 'development') {
        if (loginData.role && loginData?.role === 'admin') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.localhost:3000/admin?token=${loginData.token}`
          );
        }
      } else {
        if (loginData.role && loginData?.role === 'admin') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.${process.env.NEXT_PUBLIC_REDIRECT_URL}/admin?token=${loginData.token}`
          );
        }
      }

      dispatch(emptyLogin());
    }
  }, [dispatch, loginData.role, loginData.token, subdomainData?.subdomain]);

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
        console.log(error?.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        const firstCard =
          paymentIntent?.payment_method_types &&
          paymentIntent.payment_method_types[0];

        let transactionData = {
          ...formData,
          country: formData?.country?.label,
          player_registration_fee: formData?.reg_fee,
          sports_category:
            formData?.sports_category === 'other'
              ? formData?.other_sports
              : formData?.sports_category,
        };

        try {
          await dispatch(registration(transactionData)).then((res) => {
            if (res.error) {
              toast.error(registrationWithPackageError);
              dispatch(emptyRegistration());
            } else {
              dispatch(
                login({
                  email: transactionData?.email,
                  password: transactionData?.password,
                })
              );
              toast.success(registrationWithPackageData?.message);
              dispatch(emptyRegistration());
              toggleTab(activeTab + 1);
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
  };

  return (
    <>
      <ToastContainer />
      <div>
        <h5 className="mb-2 fs-3">Payment Selection</h5>
        <p className="text-muted fs-3 mb-4">
          Please select and enter your billing information
        </p>
      </div>

      <Col xxl={6}>
        <div>
          <div className="form-check card-radio ">
            <Input
              id="paymentMethod02"
              name="paymentMethod"
              type="radio"
              className="form-check-input"
              defaultChecked
            />
            <Label className="form-check-label p-4" htmlFor="paymentMethod02">
              <span className="fs-16 text-muted me-2">
                <i className="ri-bank-card-fill align-bottom "></i>
              </span>
              <span className="fs-14 text-wrap">Stripe Payment</span>
            </Label>
          </div>
        </div>
      </Col>

      <StripeForm
        stripePayHandler={stripePayHandler}
        stripe={stripe}
        errorMessage={registrationWithPackageError || errorMessage}
        loading={registrationWithPackageIsLoading}
      />
    </>
  );
};

export default StripePaymentForPackage;
