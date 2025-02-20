import { ErrorMessage, Field } from 'formik';
import React from 'react';

const NumberFieldForCourse = ({ name, label, form, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fs-2 mb-3">
        {label || 'Number'}
      </label>
      <Field name={name}>
        {({ field, form }) => {
          const universityPrice = form.values.university_price || 0; // Get university_price

          return (
            <input
              {...field}
              {...props}
              type="number"
              id={name}
              className="form-control"
              placeholder={`Enter ${label}`}
              min="0"
              onChange={(e) => {
                let value = e.target.value;
                if (value === '' || value === '-') {
                  form.setFieldValue(name, '');
                  form.setFieldValue('emgs_fee', '');
                } else {
                  const numValue = parseFloat(value);
                  if (numValue >= 0) {
                    if (name === 'price' && numValue > universityPrice) {
                      form.setFieldValue(name, universityPrice); // Restrict price
                    } else {
                      form.setFieldValue(name, numValue);
                    }
                    if (name === 'price') {
                      form.setFieldValue('emgs_fee', numValue); // Sync emgs_fee
                    }
                  }
                }
              }}
              onBlur={(e) => {
                let value = e.target.value;
                if (value === '' || parseFloat(value) < 0) {
                  form.setFieldValue(name, '0');
                  form.setFieldValue('emgs_fee', '0');
                }
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default NumberFieldForCourse;
