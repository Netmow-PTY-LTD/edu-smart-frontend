import React from 'react';
import Select from 'react-select';

const NewSingleSelectField = ({ name, label, options, value, onChange }) => (
  <div>
    <label className="form-label fs-2 mb-3">{label}</label>
    <Select
      name={name}
      options={options}
      value={options.find(option => option.value === value)}
      onChange={(selectedOption) => onChange(selectedOption)}
      isSearchable
    />
  </div>
);

export default NewSingleSelectField;