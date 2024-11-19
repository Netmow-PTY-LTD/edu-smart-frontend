import { ErrorMessage } from 'formik';
import React from 'react';
import Select from 'react-select';

// Custom Multiple Select component for Formik
const MultipleSelectField = ({ field, form, label, options, ...props }) => {
  // Handle change to update Formik state
  const handleChange = (selectedOptions) => {
    form.setFieldValue(
      field.name,
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  return (
    <div>
      <label htmlFor={field.name} className="form-label">
        {label || 'Select'}
      </label>
      {/* without custom style */}
      {/* <Select
        {...props}
        id={field.name}
        name={field.name}
        value={
          options
            ? options.filter((option) => field.value.includes(option.value))
            : []
        }
        onChange={handleChange}
        options={options}
        className="form-control"
        classNamePrefix="select"
        isMulti // Enable multi-select
        isClearable={true} // Allow clearing the selection
      /> */}

      {/* with custom style */}
      <Select
        {...props}
        id={field.name}
        name={field.name}
        value={
          options
            ? options.filter((option) => field.value.includes(option.value))
            : []
        }
        onChange={handleChange}
        options={options}
        className="form-control"
        classNamePrefix="select"
        isMulti
        isClearable={true}
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: '5px', // Customize border radius
            borderColor: '#ccc', // Customize border color
          }),
          menu: (base) => ({
            ...base,
            maxHeight: '200px', // Customize max height
          }),
        }}
      />

      <ErrorMessage
        name={field.name}
        component="div"
        style={{ color: 'red' }}
      />
    </div>
  );
};

export default MultipleSelectField;
