/* eslint-disable react/no-unescaped-entities */
import { checkOtp } from '@/slices/dashboard/adminDashboard/Actions/authActions';
import { emptyCheckOtp } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import EmailOtpComponent from '../dashboard/common/EmailOtpComponent';

const EmailOtp = ({ step, setStep, userEmail, subdomain }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '']);

  useEffect(() => {
    dispatch(emptyCheckOtp());
  }, [dispatch]);

  const { data, isLoading, error } = useSelector(
    (state) => state.AdminDashboard.checkOtp
  );

  useEffect(() => {
    if (data?.message && error === null) {
      dispatch(emptyCheckOtp());
      setStep(step + 1);
    } else {
      toast.error(error);
    }
  }, [data?.message, dispatch, error, setStep, step]);

  const handlePaste = (e, index) => {
    const inputElements = document.querySelectorAll('input.code-input');
    const data = e.clipboardData.getData('Text').split('').slice(0, 4);
    const newData = [...data, '', '', ''].slice(0, 4);
    setOtp((prevValues) => {
      const newValues = [...prevValues];
      newValues.splice(index, newData.length, ...newData);
      return newValues.slice(0, 4);
    });

    if (index < otp.length - 1) {
      inputElements[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkOtp({ email: userEmail, otp: parseInt(otp.join('')) }));
  };

  return (
    <>
      <EmailOtpComponent
        userEmail={userEmail}
        otp={otp}
        handlePaste={handlePaste}
        error={error}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        setOtp={setOtp}
        subdomain={subdomain}
      />
    </>
  );
};

export default EmailOtp;
