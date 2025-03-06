import { ErrorMessage, Field } from 'formik';
import React from 'react';
import Select from 'react-select';

const SingleSelectFieldForAgent = ({
  name,
  label,
  options,
  fieldClass,
  setInitialValues,
  ...props
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fs-2 mb-3">
        {label || 'Select'}
      </label>

      <Field name={name}>
        {({ field, form }) => {
          const selectedOption =
            options?.length > 0
              ? options.find((option) => {
                  return (
                    option.label === field?.value ||
                    option.label === field?.value?.label
                  );
                })
              : null;

          const handleChange = (selectedOption) => {
            if (setInitialValues) {
              setInitialValues((prev) => ({
                ...prev,
                user_role: selectedOption?.value,
              }));
            }

            form.setFieldValue(
              name,
              name === 'country' ? selectedOption?.label : selectedOption?.value
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

export default SingleSelectFieldForAgent;
