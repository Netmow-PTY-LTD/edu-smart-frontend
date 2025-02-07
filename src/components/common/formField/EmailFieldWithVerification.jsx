import { useVerifyExistingUserMutation } from '@/slice/services/public/auth/authService';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EmailFieldWithVerification = ({
  label,
  setCheckExistingUser,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [isVerify, setIsVerify] = useState(null);

  const [verifyExistingUser, { data: LoginData, error }] =
    useVerifyExistingUserMutation();

  useEffect(() => {
    const verifyEmail = async () => {
      if (field?.value) {
        try {
          const res = await verifyExistingUser({ email: field.value }).unwrap();
          if (res) {
            // console.log(res);
            setIsVerify(true);
            setCheckExistingUser(field.value);
            toast.error('Email already exists');
          }
        } catch (error) {
          setIsVerify(false);
          setCheckExistingUser('');
        }
      } else {
        setIsVerify(false);
      }
    };

    verifyEmail();
  }, [field.value, setCheckExistingUser, verifyExistingUser]);

  return (
    <div className="mb-3 pb-3">
      {label && <label htmlFor={field.name}>{label}</label>}

      <input
        {...field}
        {...props}
        type="email"
        className="form-control"
        placeholder="Enter your email"
      />
      {meta.touched && meta.error && (
        <div style={{ color: 'red' }}>{meta.touched && meta.error}</div>
      )}
      {isVerify && (
        <div>
          <i className="ri-checkbox-circle-fill third-color fw-bold fs-1">
            {LoginData?.message}
          </i>
        </div>
      )}
    </div>
  );
};

export default EmailFieldWithVerification;
