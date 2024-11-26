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
          const selectedOption =
            options?.length > 0
              ? options?.find((option) =>
                  option.value === field.value.value
                    ? option.value === field.value.value
                    : option.value === field.value.label
                )
              : null;

          console.log(selectedOption);

          const handleChange = (selectedOption) => {
            console.log(selectedOption);
            form.setFieldValue(
              name,
              selectedOption ? selectedOption.value : null
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
