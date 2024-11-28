/* eslint-disable react/no-unescaped-entities */
import { useVerifyOtpMutation } from '@/slice/services/public/auth/authService';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import EmailOtpComponent from '../common/EmailOtpComponent';

const EmailOtp = ({ step, setStep, userEmail, subdomain }) => {
  const [verifyOtp, { isLoading: verifyOtpIsLoading }] = useVerifyOtpMutation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handlePaste = (e, index) => {
    const inputElements = document.querySelectorAll('input.code-input');
    const data = e.clipboardData.getData('Text').split('').slice(0, 6);
    const newData = [...data, '', '', '', '', ''].slice(0, 6);
    setOtp((prevValues) => {
      const newValues = [...prevValues];
      newValues.splice(index, newData.length, ...newData);
      return newValues.slice(0, 6);
    });

    if (index < otp.length - 1) {
      inputElements[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await verifyOtp({
        email: userEmail,
        otp: parseInt(otp.join('')),
      }).unwrap();
      if (result) {
        toast.success(result?.message);
        setStep(step + 1);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      //
    }
  };

  return (
    <>
      <ToastContainer />
      <EmailOtpComponent
        userEmail={userEmail}
        otp={otp}
        handlePaste={handlePaste}
        error={'error'}
        isLoading={verifyOtpIsLoading}
        handleSubmit={handleSubmit}
        setOtp={setOtp}
        subdomain={subdomain}
      />
    </>
  );
};

export default EmailOtp;
