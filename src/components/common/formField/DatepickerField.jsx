import 'flatpickr/dist/flatpickr.min.css'; // Import flatpickr styles
import { ErrorMessage } from 'formik';
import React from 'react';
import Flatpickr from 'react-flatpickr';

// Custom DatepickerField component for Formik using Flatpickr
const DatepickerField = ({ field, form, label, ...props }) => {
  const handleChange = (selectedDates) => {
    // Format the selected date to 'yyyy-mm-dd' (full date)
    const selectedDate = selectedDates.length
      ? selectedDates[0].toISOString().split('T')[0] // Get date in 'yyyy-mm-dd' format
      : '';

    // Update Formik state with the selected date
    form.setFieldValue(field.name, selectedDate);
  };

  return (
    <div>
      <label htmlFor={field?.name} className="form-label fs-2">
        {label || 'Date'}
      </label>

      <Flatpickr
        {...props}
        id={field?.name}
        name={field?.name}
        value={field?.value || ''}
        onChange={handleChange}
        options={{
          enableTime: false,
          dateFormat: 'Y-m-d',
        }}
        className="form-control"
        style={{ borderRadius: '5px', padding: '8px', fontSize: '14px' }}
      />

      {/* Display error if any */}
      <ErrorMessage
        name={field?.name}
        component="div"
        style={{ color: 'red' }}
      />
    </div>
  );
};

export default DatepickerField;
