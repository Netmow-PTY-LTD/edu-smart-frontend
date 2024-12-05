import { ErrorMessage, Field } from 'formik';
import React from 'react';

const TextArea = ({ name, label, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fs-2">
        {label || 'Description'}
      </label>

      <Field
        {...props}
        as="textarea"
        id={name}
        name={name}
        className="form-control"
        placeholder={`Enter your ${name}`}
        rows="6"
      />

      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default TextArea;
