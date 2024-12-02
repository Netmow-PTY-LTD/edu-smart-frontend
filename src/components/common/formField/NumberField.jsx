import { ErrorMessage, Field } from 'formik';
import React from 'react';

// Custom NumberField component for Formik
const NumberField = ({ name, form, label, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fs-2 mb-3">
        {label || 'Number'}
      </label>
      <Field
        {...props}
        type="number"
        name={name}
        id={name}
        className="form-control"
        placeholder={`Enter your ${name}`}
      />
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default NumberField;
