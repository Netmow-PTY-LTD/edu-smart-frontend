import { ErrorMessage, Field } from 'formik';
import React from 'react';
import Select from 'react-select';

const SingleSelectFieldDepartment = ({
  name,
  label,
  options,
  fieldClass,
  setInitialValues,
  onChange, // ✅ Accept parent onChange
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
            options?.find((option) => {
              return (
                option.value === field?.value ||
                option.label === field?.value?.label ||
                option.value === field?.value?.value
              );
            }) || null;

          const handleChange = (selectedOption) => {
            const newValue =
              name === 'country' ? selectedOption?.label : selectedOption?.value;

            // ✅ Update Formik value
            form.setFieldValue(name, newValue);

            // ✅ Update initial values if needed
            if (setInitialValues) {
              setInitialValues((prev) => ({
                ...prev,
                [name]: newValue,
              }));
            }

            // ✅ Call external onChange (e.g. handleDepartmentChange)
            if (onChange) {
              onChange(selectedOption);
            }
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

export default SingleSelectFieldDepartment;
