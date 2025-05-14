import { ErrorMessage, Field } from 'formik';
import React from 'react';
import Select from 'react-select';

const SelectField = ({ name, label, options, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fs-2 mb-3">
        {label || 'Select'}
      </label>

      <Field name={name}>
        {({ form }) => {
          const selectedValue = form.values[name]; // This should be the whole object { label, value }

          // 🔁 Match by value and return the exact object from `options`
          const matchedOption = options.find(
            (opt) => opt.value === selectedValue?.value
          );

          console.log('▶ FORM VALUES:', form.values);
          console.log('▶ SELECTED VALUE:', selectedValue);
          console.log('▶ OPTIONS:', options);
          console.log('▶ MATCHED OPTION:', matchedOption);

          const handleChange = (option) => {
            console.log('▶ SELECTED OPTION FROM DROPDOWN:', option);
            form.setFieldValue(name, option || null); // Update Formik with full object { label, value }
          };

          return (
            <Select
              {...props}
              name={name}
              value={matchedOption || null} // Display the selected option from options
              onChange={handleChange} // Update Formik state on change
              options={options}
              classNamePrefix="select"
              isClearable={true}
            />
          );
        }}
      </Field>

      <ErrorMessage name={name} component="div" className="text-danger mt-1" />
    </div>
  );
};

export default SelectField;
