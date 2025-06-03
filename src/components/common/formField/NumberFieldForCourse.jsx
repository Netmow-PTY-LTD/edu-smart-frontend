import { ErrorMessage, Field } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

const NumberFieldForCourse = ({ name, label, form, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fs-2 mb-3">
        {label || 'Number'}
      </label>
      <Field name={name}>
        {({ field, form }) => {
          const values = form.values;
          const emgs_fee = parseFloat(values.emgs_fee) || 0;
          const tuition_fee_put = parseFloat(values.tuition_fee_put) || 0;
          const others_fee = parseFloat(values.others_fee) || 0;
          const after_emgs_fee = parseFloat(values.after_emgs_fee) || 0;
          const incentive_amount = parseFloat(values.incentive_amount) || 0;

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
                const value = e.target.value;

                if (value === '' || value === '-') {
                  form.setFieldValue(name, '');
                  return;
                }

                const numValue = parseFloat(value) || 0;
                // Always set the current field first
                form.setFieldValue(name, numValue);
                // Get latest field values with this new input
                const updatedValues = {
                  ...form.values,
                  [name]: numValue,
                };
                const others_fee = parseFloat(updatedValues.others_fee) || 0;
                const tuition_fee_put =
                  parseFloat(updatedValues.tuition_fee_put) || 0;
                const emgs_fee = parseFloat(updatedValues.emgs_fee) || 0;

                const after_emgs_fee = others_fee + tuition_fee_put;
                const tuition_fee = emgs_fee + after_emgs_fee;

                form.setFieldValue('after_emgs_fee', after_emgs_fee);
                form.setFieldValue('tuition_fee', tuition_fee);

                if (name === 'incentive_amount') {
                  if (numValue > after_emgs_fee) {
                    form.setFieldValue('incentive_amount', '0');
                    toast.error(
                      'Incentive amount cannot be greater than after EMGS fee.'
                    );
                  } else {
                    form.setFieldValue('incentive_amount', numValue);
                  }
                }
              }}
              onBlur={(e) => {
                const value = e.target.value;
                if (value === '' || parseFloat(value) < 0) {
                  form.setFieldValue(name, '0');
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

// import { ErrorMessage, Field } from 'formik';
// import React from 'react';
// import { toast } from 'react-toastify';

// const NumberFieldForCourse = ({ name, label, form, ...props }) => {
//   return (
//     <div className="mb-4">
//       <label htmlFor={name} className="form-label fs-2 mb-3">
//         {label || 'Number'}
//       </label>
//       <Field name={name}>
//         {({ field, form }) => {
//           const values = form.values;
//           const emgs_fee = parseFloat(values.emgs_fee) || 0;
//           const tuition_fee_put = parseFloat(values.tuition_fee_put) || 0;
//           const others_fee = parseFloat(values.others_fee) || 0;
//           const after_emgs_fee = parseFloat(values.after_emgs_fee) || 0;
//           const incentive_amount = parseFloat(values.incentive_amount) || 0;

//           return (
//             <input
//               {...field}
//               {...props}
//               type="number"
//               id={name}
//               className="form-control"
//               placeholder={`Enter ${label}`}
//               min="0"
//               readOnly={props.readOnly}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (value === '' || value === '-') {
//                   form.setFieldValue(name, '');
//                   return;
//                 }
//                 const numValue = parseFloat(value);

//                 console.log('emgs_fee', emgs_fee);
//                 console.log('tuition_fee_put', tuition_fee_put);
//                 console.log('others_fee', others_fee);
//                 console.log('after_emgs_fee', after_emgs_fee);
//                 console.log('numValue', numValue);

//                 if (name === 'others_fee') {
//                   form.setFieldValue('others_fee', numValue);
//                   form.setFieldValue(
//                     'after_emgs_fee',
//                     after_emgs_fee + numValue
//                   );
//                 }

//                 if (name === 'tuition_fee_put') {
//                   form.setFieldValue('tuition_fee_put', numValue);
//                   form.setFieldValue(
//                     'after_emgs_fee',
//                     after_emgs_fee + numValue
//                   );
//                 }

//                 if (name === 'emgs_fee') {
//                   form.setFieldValue('emgs_fee', numValue);
//                   form.setFieldValue('tuition_fee', after_emgs_fee + emgs_fee);
//                 }

//                 if (name === 'incentive_amount') {
//                   if (numValue > after_emgs_fee) {
//                     form.setFieldValue('incentive_amount', '0');
//                     toast.error(
//                       'Incentive amount cannot be greater than after EMGS fee.'
//                     );
//                   } else {
//                     form.setFieldValue('incentive_amount', numValue);
//                   }
//                 }
//               }}
//               onBlur={(e) => {
//                 const value = e.target.value;
//                 if (value === '' || parseFloat(value) < 0) {
//                   form.setFieldValue(name, '0');
//                 }
//               }}
//             />
//           );
//         }}
//       </Field>
//       <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
//     </div>
//   );
// };

// export default NumberFieldForCourse;
