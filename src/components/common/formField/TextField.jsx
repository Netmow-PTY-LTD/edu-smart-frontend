import { ErrorMessage, Field } from 'formik';
import React from 'react';

const TextField = ({ name, label, ...props }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fs-2">
        {label || 'Name'}
      </label>
      {/* Use Formik's Field component */}
      <Field
        {...props}
        type="text"
        id={name}
        name={name}
        className="form-control"
        placeholder={`Enter your ${name}`}
      />
      {/* Show validation error if it exists */}
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default TextField;
