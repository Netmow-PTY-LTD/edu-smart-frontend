import { ErrorMessage, Field } from 'formik';
import React from 'react';
import Select from 'react-select';

const CountrySelectField = ({ name, label, options, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fs-2 mb-3">
        {label || 'Select'}
      </label>

      <Field name={name}>
        {({ field, form }) => {
          const selectedOption =
            options?.length > 0
              ? options?.find((option) =>
                  option.label === field.label
                    ? option.label === field.label
                    : option.label === field.value
                )
              : null;

          // console.log(selectedOption);

          const handleChange = (selectedOption) => {
            console.log(selectedOption);
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

export default CountrySelectField;
