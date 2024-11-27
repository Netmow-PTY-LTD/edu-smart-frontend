import { ErrorMessage, Field } from 'formik';
import React from 'react';

const EmailField = ({ name, label, ...props }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fs-2">
        {label || 'Email'}
      </label>
      {/* Use Formik's Field component */}
      <Field
        {...props}
        type="email"
        id={name}
        name={name}
        className="form-control"
        placeholder="Enter your email"
      />
      {/* Show validation error if it exists */}
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default EmailField;
