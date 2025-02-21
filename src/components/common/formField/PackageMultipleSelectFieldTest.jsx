import React, { useEffect } from 'react';
import { ErrorMessage } from 'formik';
import Select from 'react-select';

const PackageMultipleSelectFieldTest = ({
  field,
  form,
  label,
  options,
  ...props
}) => {

  // Handle the select change
  const handleChange = (selectedOptions) => {
    let selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];

    // Handle "Select All"
    if (selectedValues.includes('select_all')) {
      selectedValues = options.map((option) => option.value);
    }

    const prevValues = form.values[field.name] || [];
    const removedValues = prevValues.filter((val) => !selectedValues.includes(val));
    const addedValues = selectedValues.filter((val) => !prevValues.includes(val));

    // **Update FieldArray (document_requirements)**
    let updatedRequirements = [...form.values.document_requirements];

    // Remove unselected items
    removedValues.forEach((value) => {
      updatedRequirements = updatedRequirements.filter((item) => item.document_list_id !== value);
    });

    // Add new selected items, but only if not already present
    addedValues.forEach((value) => {
      const alreadyAdded = updatedRequirements.some((item) => item.document_list_id === value);

      if (!alreadyAdded) {
        const selectedOption = options.find((option) => option.value === value);
        if (selectedOption) {
          updatedRequirements.push({
            document_list_id: selectedOption.value,
            title: selectedOption.label,
            description: selectedOption.description || '',
            isRequired: false,
          });
        }
      }
    });

    // **Update Formik Values**
    form.setFieldValue('document_requirements', updatedRequirements);
    form.setFieldValue(field.name, selectedValues);
  };

  // Map initial values from document_requirements
  const initialValues = form.values.document_requirements || [];
  const selectedValues = [...new Set(initialValues.map((item) => item.document_list_id))]; // Use Set to remove duplicates
  
  // Pre-select the options from the available options
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value)
  );

  return (
    <div>
      <label htmlFor={field.name} className="form-label fs-2 mb-3">
        {label || 'Select'}
      </label>

      <Select
        {...props}
        id={field.name}
        name={field.name}
        value={selectedOptions} // Set the value to preselect the correct options
        onChange={handleChange}
        options={options} // Use the options passed as props
        classNamePrefix="select"
        isMulti
        isClearable={true}
        getOptionLabel={(option) => option.label} // Use label for proper selection
        getOptionValue={(option) => option.value} // Ensure unique key for each option by using value
      />

      <ErrorMessage name={field.name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default PackageMultipleSelectFieldTest;
