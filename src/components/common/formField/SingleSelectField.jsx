import { ErrorMessage, Field } from 'formik';
import React from 'react';
import Select from 'react-select';

const SingleSelectField = ({ name, label, options, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label || 'Select'}
      </label>

      <Field name={name}>
        {({ field, form }) => {
          console.log(field);
          console.log(form);
          const selectedOption = options
            ? options.find((option) => option.value === field.value)
            : null;

          const handleChange = (selectedOption) => {
            form.setFieldValue(
              name,
              selectedOption ? selectedOption.label : null
            );
          };

          return (
            <Select
              {...props}
              id={name}
              name={name}
              value={selectedOption}
              onChange={handleChange}
              options={options}
              classNamePrefix="select"
              isClearable={true}
            />
          );
        }}
      </Field>

      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default SingleSelectField;
