import React, { useEffect } from 'react';
import { ErrorMessage } from 'formik';
import Select from 'react-select';

const PackageMultipleSelectField = ({ field, form, label, options, ...props }) => {
  const handleChange = (selectedOptions) => {
    if (selectedOptions && selectedOptions.some(option => option.value === 'select_all')) {
      form.setFieldValue(
        field.name,
        options.map(option => option.value)
      );
    } else {
      form.setFieldValue(
        field.name,
        selectedOptions ? selectedOptions.map((option) => option.value) : []
      );
    }
  };

  // Add "Select All" option to the options array
  const extendedOptions = [{ value: 'select_all', label: 'Select All' }, ...options];

  // Extract values from initial values
  const initialValues = form.values[field.name]?.map(item => item.value || item);

  // Map initial values to the options format
  const selectedValues = extendedOptions.filter(option => initialValues?.includes(option.value));

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
        options={extendedOptions}
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