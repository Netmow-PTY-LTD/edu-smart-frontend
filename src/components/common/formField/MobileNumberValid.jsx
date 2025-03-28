import { ErrorMessage, Field, useField } from 'formik';
import React from 'react';

const MobileNumberValid = ({ name, label, ...props }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (e) => {
    let value = e.target.value;

    // Allow only numbers and a "+" at the beginning
    value = value.replace(/[^0-9+]/g, '');

    // Ensure "+" appears only at the start
    if (value.includes('+') && value.indexOf('+') !== 0) {
      value = value.replace(/\+/g, ''); // Remove "+" if not at the start
    }

    // Update Formik's state
    helpers.setValue(value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fs-2 mb-3">
        {label || 'Number'}
      </label>
      <input
        {...field}
        {...props}
        type="text" // Use text to allow "+"
        id={name}
        className="form-control"
        placeholder={`Enter your ${label || 'number'}`}
        value={field.value}
        onChange={handleChange}
      />
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default MobileNumberValid;
