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
          className="form-control password-input fs-3 ps-3 pt-3 pb-3"
          style={{paddingRight:'40px'}}
          placeholder={placeholder}
        />
        <button
          className="position-absolute end-0 fs-2 text-decoration-none text-muted password-addon px-4"
          type="button"
          onClick={handlePasswordVisibilityToggle}
          style={{ backgroundColor: 'transparent',top:'50%',transform:'translateY(-50%)'}}
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
