import { ErrorMessage } from 'formik';
import React from 'react';
import Select from 'react-select';

const MultipleSelectField = ({ field, form, label, options, ...props }) => {
  const handleChange = (selectedOptions) => {
    form.setFieldValue(
      field.name,
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  // console.log(form);
  // console.log(field);

  return (
    <div>
      <label htmlFor={field?.name} className="form-label fs-2 mb-3">
        {label || 'Select'}
      </label>

      <Select
        {...props}
        id={field?.name}
        name={field?.name}
        onChange={handleChange}
        options={options}
        classNamePrefix="select"
        isMulti
        isClearable={true}
      />

      <ErrorMessage
        name={field?.name}
        component="div"
        style={{ color: 'red' }}
      />
    </div>
  );
};

export default MultipleSelectField;
