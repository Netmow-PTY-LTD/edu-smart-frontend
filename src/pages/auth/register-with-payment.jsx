import OrderSummary from '@/components/dashboard/common/OrderSummary';
import {
  getSubdomain,
  login,
  registration,
} from '@/slices/dashboard/adminDashboard/Actions/authActions';
import { getSuperAdminCurrencyAndGst } from '@/slices/dashboard/adminDashboard/Actions/currencySettingsActions';
import { emptyLogin } from '@/slices/dashboard/adminDashboard/reducer';
import { allPaymentSettings } from '@/slices/dashboard/commonApi/Actions/invoiceActions';
import { getSuperAdminInfo } from '@/slices/dashboard/superAdminDashboard/superAdminActions/settingsActions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Card, Col, Row } from 'reactstrap';
import RegisterCheckOutForm from './register-check-out-form';

const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

const RegisterWithPayment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [price, setPrice] = useState();
  const [gst, setGst] = useState();
  const [total, setTotal] = useState();
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const myCoupon = 'SquadDeck2024';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    gender: '',
    organisation_name: '',
    subdomain: '',
    sports_category: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    package: '',
    reg_fee: '',
    terms: false,
  });

  const { data: superAdminInfo } = useSelector(
    (state) => state.SuperAdminDashboard.getSuperAdminInfo
  );

  const { isLoading: registrationIsLoading } = useSelector(
    (state) => state.AdminDashboard.registration
  );

  const { data: stripeKeyData } = useSelector(
    (state) => state.CommonApi.allPaymentSettings
  );

  const { data: gstAndCurrencyData } = useSelector(
    (state) => state.AdminDashboard.getSuperAdminCurrencyAndGst
  );

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

  useEffect(() => {
    setPrice(router?.query?.price);
    setGst(
      parseFloat(
        (parseFloat(router?.query?.price) * gstAndCurrencyData?.gst
          ? gstAndCurrencyData?.gst
          : 0) / 100
      ).toFixed(2)
    );
    setTotal(
      parseFloat(
        parseFloat(router?.query?.price) +
          parseFloat(
            (parseFloat(router?.query?.price) * gstAndCurrencyData?.gst
              ? gstAndCurrencyData?.gst
              : 0) / 100
          )
      ).toFixed(2)
    );
    setFormData((prev) => ({
      ...prev,
      country: router?.query?.country
        ? {
            label:
              router?.query?.country === 'Bangladesh'
                ? 'Bangladesh'
                : 'United States',
            value:
              router?.query?.country === 'Bangladesh'
                ? 'Bangladesh'
                : 'United States',
          }
        : '',
      package: router?.query?.id,
    }));
  }, [
    gstAndCurrencyData?.gst,
    router?.query?.country,
    router?.query?.id,
    router?.query?.price,
  ]);

  useEffect(() => {
    dispatch(getSuperAdminCurrencyAndGst());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSuperAdminInfo());
  }, [dispatch]);

  useEffect(() => {
    if (superAdminInfo?._id) {
      dispatch(allPaymentSettings(superAdminInfo?._id));
    }
  }, [dispatch, superAdminInfo?._id]);

  //  error state
  const [errors, setErrors] = useState({});

  // for input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear the form error
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const changeHandler = (value) => {
    setFormData({
      ...formData,
      country: value,
    });

    setErrors({
      ...errors,
      country: '',
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const registedData = {
      ...formData,
      country: formData?.country?.label,
      player_registration_fee: formData?.reg_fee,
      sports_category:
        formData?.sports_category === 'other'
          ? formData?.other_sports
          : formData?.sports_category,
    };

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // Perform form validation
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Please enter an email.';
    } else if (!emailRegex.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData?.password) {
      newErrors.password = 'Please enter a password.';
    }
    if (!formData?.confirm_password) {
      newErrors.confirm_password = 'Confirm Please enter a password.';
    }

    if (formData?.password !== formData?.confirm_password) {
      newErrors.confirm_password =
        'Passwords do not match. Please confirm your password.';
    }

    if (!formData.first_name) {
      newErrors.first_name = 'First Name is required';
    }

    if (!formData.last_name) {
      newErrors.last_name = 'Last Name is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.organisation_name) {
      newErrors.organisation_name = 'Organisation Name is required';
    }
    if (!formData.subdomain) {
      newErrors.subdomain = 'Sub Domain Name is required';
    }
    if (!formData.sports_category) {
      newErrors.sports_category = 'Sports Category is required';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.address_line_1) {
      newErrors.address_line_1 = 'Address Line 1 is required';
    }
    if (!formData.address_line_2) {
      newErrors.address_line_2 = 'Address Line 2 is required';
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    if (!formData.zip) {
      newErrors.zip = 'Zip Code is required';
    }
    if (!formData.country) {
      newErrors.country = 'Please Select A Country';
    }
    if (!formData.reg_fee) {
      newErrors.reg_fee = 'Player Registration Fee is required';
    }
    // if (!formData.other_sports) {
    //   newErrors.other_sports = 'Sports Category is required';
    // }
    if (formData.terms === false) {
      newErrors.terms = 'Please Select Terms And Conditions';
    }

    if (Object.keys(newErrors).length === 0) {
      if (total === 0 || total === '0.00') {
        dispatch(registration(registedData)).then((res) => {
          if (res.error) {
            toast.error('Something Went Wrong.Please Try Again');
          } else {
            dispatch(
              login({
                email: registedData?.email,
                password: registedData?.password,
              })
            );
            toast.success('Registration Successfull.');
          }
        });
      } else {
        toggleTab(activeTab + 1);
      }
    } else {
      setErrors(newErrors);
    }
  };

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  const handleCouponSubmit = async () => {
    if (myCoupon === couponCode) {
      setPrice(0);
      setGst(0);
      setTotal(0);
      toast.success('Coupon Applied Successfully');
    } else {
      toast.error('Not A Valid Coupon');
    }
  };

  console.log('formData', formData);
  console.log('packageID', router?.query?.id);
  console.log('price', router?.query?.price);

  return (
    <div
      className={`auth-page-wrapper auth-bg-cover d-flex flex-column justify-content-center align-items-center min-vh-100`}
    >
      <Row className="m-5">
        <ToastContainer />
        <Col xxl={8}>
          <RegisterCheckOutForm
            activeTab={activeTab}
            toggleTab={toggleTab}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            changeHandler={changeHandler}
            handleRegisterSubmit={handleRegisterSubmit}
            registrationIsLoading={registrationIsLoading}
            setLoading={setLoading}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            total={total}
            stripeKeyData={stripeKeyData}
            setSelectedCurrency={setSelectedCurrency}
          />
        </Col>

        <Col xxl={4} className="fs-3">
          <OrderSummary
            forSuperAdmin={'forSuperAdmin'}
            subTotal={price}
            name={`${router?.query?.name} Package`}
            gst={gst}
            total={total}
            currency={selectedCurrency}
            gstPercent={gstAndCurrencyData?.gst ? gstAndCurrencyData?.gst : 0}
          />
          {total === 0 || total === '0.00' ? (
            ''
          ) : (
            <>
              {activeTab === 1 && (
                <Card>
                  <div className="m-4">
                    <label htmlFor="couponCode" className="form-label fs-3">
                      Do You Have A Coupon?
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="couponCode"
                        className="form-control fs-3 qoute_color"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        onPaste={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCouponSubmit();
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="button p-3 text-white"
                        onClick={handleCouponSubmit}
                        disabled={loading}
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <div className="text-danger mt-2">{couponError}</div>
                    )}
                  </div>
                </Card>
              )}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default RegisterWithPayment;
