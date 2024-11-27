import { ErrorMessage, Field } from 'formik';
import React, { useState } from 'react';

const PasswordField = ({ label, name, placeholder = 'Enter password' }) => {
  const [passwordShow, setPasswordShow] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setPasswordShow(!passwordShow);
  };

  return (
    <div className="mb-3 pb-3">
      <label className="form-label fs-2" htmlFor={name}>
        {label}
      </label>
      <div className="position-relative auth-pass-inputgroup">
        <Field
          type={passwordShow ? 'text' : 'password'}
          name={name}
          className="form-control password-input fs-3 p-3 mb-2"
          placeholder={placeholder}
        />
        <button
          className="position-absolute end-0 top-0 fs-2 text-decoration-none text-muted password-addon px-4"
          type="button"
          onClick={handlePasswordVisibilityToggle}
          style={{ backgroundColor: 'transparent', height: '48px' }}
        >
          <i
            className={`${
              passwordShow
                ? 'ri-eye-off-line align-middle'
                : 'ri-eye-fill align-middle'
            }`}
          ></i>
        </button>
        <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
      </div>
    </div>
  );
};

export default PasswordField;
