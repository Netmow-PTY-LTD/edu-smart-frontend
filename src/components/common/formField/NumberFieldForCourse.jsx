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
          const tuitionFee = form.values.tuition_fee || 0; // Get tuition_fee
          const after_emgs_fee = form.values.after_emgs_fee || 0; // Get tuition_fee
          const emgs_get = form.values.emgs_fee || 0; // Get tuition_fee

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
                    if (name === 'emgs_fee' && numValue > tuitionFee) {
                      form.setFieldValue('emgs_fee', tuitionFee); // Restrict price
                    } else if (name === 'emgs_fee' && numValue < tuitionFee) {
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

                    if (name === 'tuition_fee') {
                      form.setFieldValue('tuition_fee', numValue); // Restrict price
                    }
                    if (name === 'scholarship_amount') {
                      form.setFieldValue('scholarship_amount', numValue); // Restrict price
                    }
                  }
                }
              }}
              onBlur={(e) => {
                let value = e.target.value;
                if (value === '' || parseFloat(value) < 0) {
                  form.setFieldValue(name, '0');
                }

                if (name === 'tuition_fee' && parseInt(value) < emgs_get) {
                  form.setFieldValue('tuition_fee', emgs_get); // Restrict price
                  form.setFieldValue('incentive_amount', '0'); // Restrict price
                  toast.error(
                    'Tuition Fee amount cannot be less  than EMGS fee.'
                  );
                }

                if (
                  name === 'incentive_amount' &&
                  parseInt(value) > after_emgs_fee
                ) {
                  form.setFieldValue('incentive_amount', after_emgs_fee); // Restrict price
                  toast.error(
                    'Incentive amount cannot be greater than After EMGS fee.'
                  );
                }

                if (name === 'incentive_amount' && parseInt(value) <= 0) {
                  form.setFieldValue('auto_deduct', false); // Restrict price
                }

                if (
                  name === 'scholarship_amount' &&
                  parseInt(value) > tuitionFee
                ) {
                  form.setFieldValue('scholarship_amount', tuitionFee); // Restrict price
                  toast.error(
                    'Scholarship  amount cannot be greater than Tuition fee.'
                  );
                }
                if (name === 'scholarship_amount' && parseInt(value) <= 0) {
                  form.setFieldValue('scholarship_on_tuition_fee', false); // Optionally uncheck the box if scholarship_amount is <= 0
                  form.setFieldValue('scholarship_auto_deduct', false); // Optionally uncheck the box if scholarship_amount is <= 0
                } else {
                  form.setFieldValue('scholarship_on_tuition_fee', true); // Optionally uncheck the box if scholarship_amount is <= 0
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
