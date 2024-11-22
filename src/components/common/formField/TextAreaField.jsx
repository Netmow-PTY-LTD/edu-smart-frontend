import { ErrorMessage, Field } from 'formik';
import React from 'react';

const TextArea = ({ name, label, ...props }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label || 'Description'}
      </label>

      <Field
        {...props}
        as="textarea"
        id={name}
        name={name}
        className="form-control"
        placeholder={`Enter your ${name}`}
        rows="12"
      />

      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export default TextArea;
