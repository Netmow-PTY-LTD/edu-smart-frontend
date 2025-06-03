import { ErrorMessage, Field } from 'formik';
import React from 'react';

const TextFieldDefault = ({ name, label, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fs-2 mb-3">
        {label || 'Name'}
      </label>
      {/* Use Formik's Field component */}
      <Field
        {...props}
        type="text"
        id={name}
        name={name}
        className="form-control"
      />
      {/* Show validation error if it exists */}
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default TextFieldDefault;
