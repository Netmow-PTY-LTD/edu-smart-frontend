import { ErrorMessage, Field } from 'formik';
import React from 'react';
import Select from 'react-select';

const SingleSelectField = ({
  name,
  label,
  options,
  fieldClass,
  setInitialValues,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={name} className="form-label fs-2">
        {label || 'Select'}
      </label>

      <Field name={name}>
        {({ field, form }) => {
          const selectedOption =
            options?.length > 0
              ? options?.find((option) =>
                  option?.value === field?.value?.value
                    ? option?.value === field?.value?.value
                    : option?.value === field?.value?.label
                )
              : null;

          const handleChange = (selectedOption) => {
            setInitialValues((prev) => ({
              ...prev,
              user_role: selectedOption?.value,
            }));
            form.setFieldValue(
              name,
              selectedOption ? selectedOption?.value : null
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
              className={fieldClass}
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
