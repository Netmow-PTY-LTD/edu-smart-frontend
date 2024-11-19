import { ErrorMessage, Field } from 'formik';
import React from 'react';
import NumberFormat from 'react-number-format';

const CustomNumberField = ({ field, form, label, ...props }) => (
  <div>
    <label htmlFor={field.name} className="form-label">
      {label || 'Number'}
    </label>
    <Field
      name={field.name}
      render={({ field }) => (
        <NumberFormat
          {...field}
          {...props}
          customInput="input"
          className="form-control"
          thousandSeparator={true}
          allowNegative={false}
        />
      )}
    />
    <ErrorMessage name={field.name} component="div" style={{ color: 'red' }} />
  </div>
);
