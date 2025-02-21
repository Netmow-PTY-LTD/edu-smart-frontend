import React from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';

const MultipleSelectFieldAccessories = ({ name, options, isMulti = true, className, classNamePrefix }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field] = useField(name);

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFieldValue(name, selectedValues); // Store selected values
    console.log("Shadik", selectedValues);

  };




  return (
    <Select
      {...field}
      isMulti={isMulti}
      options={options}
      value={options.filter(option => values[name]?.includes(option.value))}
      onChange={handleChange}
      className={className}
      classNamePrefix={classNamePrefix}
    />
  );
};

export default MultipleSelectFieldAccessories;
