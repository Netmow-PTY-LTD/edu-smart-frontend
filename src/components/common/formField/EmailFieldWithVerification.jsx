import { useVerifyExistingUserMutation } from '@/slice/services/public/auth/authService';
import { ErrorMessage, useField } from 'formik';
import React, { useEffect, useState } from 'react';

const EmailFieldWithVerification = ({ label, ...props }) => {
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
            setIsVerify(true);
          }
        } catch (error) {
          setIsVerify(false);
        }
      } else {
        setIsVerify(false);
      }
    };

    verifyEmail();
  }, [field?.value, verifyExistingUser]);

  console.log(meta);

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
        <ErrorMessage
          name={meta.error}
          component="div"
          style={{ color: 'red' }}
        />
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
