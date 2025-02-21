import { ErrorMessage, Field } from 'formik';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const NumberFieldForCourse = ({ name, label, form, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fs-2 mb-3">
        {label || 'Number'}
      </label>
      <Field name={name}>
        {({ field, form }) => {
          const universityPrice = form.values.university_price || 0; // Get university_price
          const after_emgs_fee = form.values.after_emgs_fee || 0; // Get university_price
          const price_get = form.values.price || 0; // Get university_price

          return (
            <input
              {...field}
              {...props}
              type="number"
              id={name}
              className="form-control"
              placeholder={`Enter ${label}`}
              min="0"
              readOnly={props.readOnly}
              onChange={(e) => {
                let value = e.target.value;
                if (value === '' || value === '-') {
                  form.setFieldValue(name, '');
                } else {
                  const numValue = parseFloat(value);
                  if (numValue >= 0) {
                    if (name === 'price' && numValue > universityPrice) {
                      form.setFieldValue('price', universityPrice); // Restrict price
                      form.setFieldValue('emgs_fee', universityPrice);
                    } else if (name === 'price' && numValue < universityPrice) {
                      form.setFieldValue('price', numValue);
                      form.setFieldValue('emgs_fee', numValue);
                    }

                    if (
                      name === 'incentive_amount' &&
                      numValue > after_emgs_fee
                    ) {
                      form.setFieldValue('incentive_amount', after_emgs_fee); // Restrict price
                      toast.error(
                        'Incentive amount cannot be greater than after EMGS fee.'
                      );
                    } else if (
                      name === 'incentive_amount' &&
                      numValue < after_emgs_fee
                    ) {
                      form.setFieldValue('incentive_amount', numValue); // Restrict price
                    }

                    if (name === 'university_price') {
                      form.setFieldValue('university_price', numValue); // Restrict price
                    }
                  }
                }
              }}
              onBlur={(e) => {
                let value = e.target.value;
                if (value === '' || parseFloat(value) < 0) {
                  form.setFieldValue(name, '0');
                }

                if (name === 'university_price' && value < price_get) {
                  form.setFieldValue('university_price', price_get); // Restrict price
                  form.setFieldValue('incentive_amount', '0'); // Restrict price
                  toast.error(
                    'Tuition Fee amount cannot be less  than EMGS fee.'
                  );
                }

                if (name === 'incentive_amount' && value > after_emgs_fee) {
                  form.setFieldValue('incentive_amount', after_emgs_fee); // Restrict price
                  toast.error(
                    'Incentive amount cannot be greater than After EMGS fee.'
                  );
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
