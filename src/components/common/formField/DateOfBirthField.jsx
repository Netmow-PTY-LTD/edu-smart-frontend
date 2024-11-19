import 'flatpickr/dist/flatpickr.min.css'; // Import flatpickr styles
import { ErrorMessage } from 'formik';
import React, { useEffect, useRef } from 'react';
import Flatpickr from 'react-flatpickr';

// Custom DateOfBirthField component for Formik using Flatpickr
const DateOfBirthField = ({ field, form, label, ...props }) => {
  const flatpickrRef = useRef(null);

  // Initialize Flatpickr options (you can customize the date format and behavior)
  useEffect(() => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr({
        dateFormat: 'Y-m-d', // Customize the date format as needed
        maxDate: 'today', // Prevent selecting future dates
        defaultDate: field.value || null, // Set default value if exists
      });
    }
  }, [field.value]);

  const handleChange = (selectedDates) => {
    form.setFieldValue(
      field.name,
      selectedDates.length ? selectedDates[0].toISOString().split('T')[0] : null
    );
  };

  return (
    <div>
      <label htmlFor={field.name} className="form-label">
        {label || 'Date of Birth'}
      </label>
      <Flatpickr
        ref={flatpickrRef}
        {...props}
        id={field.name}
        name={field.name}
        value={field.value || ''}
        onChange={handleChange}
        options={{
          dateFormat: 'Y-m-d', // Set the date format
          maxDate: 'today', // Prevent future dates from being selected
        }}
        className="form-control"
      />
      <ErrorMessage
        name={field.name}
        component="div"
        style={{ color: 'red' }}
      />
    </div>
  );
};

export default DateOfBirthField;
