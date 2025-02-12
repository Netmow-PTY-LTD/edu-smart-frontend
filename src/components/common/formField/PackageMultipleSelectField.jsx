import { ErrorMessage } from 'formik';
import React from 'react';
import Select from 'react-select';

const PackageMultipleSelectField = ({ field, form, label, options, ...props }) => {
  const handleChange = (selectedOptions) => {
    console.log('Selected Options:', selectedOptions);
    form.setFieldValue(
      field.name,
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  // Extract values from initial values
  const initialValues = form.values[field.name]?.map(item => item.value || item);

  // Map initial values to the options format
  const selectedValues = options.filter(option => initialValues?.includes(option.value));

  console.log('Initial Values:', initialValues);
  console.log('Options:', options);
  console.log('Selected Values:', selectedValues);

  return (
    <div>
      <label htmlFor={field.name} className="form-label fs-2 mb-3">
        {label || 'Select'}
      </label>

      <Select
        {...props}
        id={field.name}
        name={field.name}
        value={selectedValues}
        onChange={handleChange}
        options={options}
        classNamePrefix="select"
        isMulti
        isClearable={true}
      />

      <ErrorMessage
        name={field.name}
        component="div"
        style={{ color: 'red' }}
      />
    </div>
  );
};

export default PackageMultipleSelectField;
