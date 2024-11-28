import 'flatpickr/dist/flatpickr.min.css'; // Import flatpickr styles
import { ErrorMessage } from 'formik';
import React, { useEffect, useRef } from 'react';
import Flatpickr from 'react-flatpickr';

// Custom TimeField component for Formik using Flatpickr
const TimeField = ({ field, form, label, ...props }) => {
  const flatpickrRef = useRef(null);

  // Initialize Flatpickr options (you can customize the time format and behavior)
  useEffect(() => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr({
        enableTime: true, // Enable time picking
        noCalendar: true, // Disable calendar, only time picker
        dateFormat: 'H:i', // Use 24-hour format (HH:mm)
        defaultHour: 12, // Set default hour to 12
        defaultMinute: 0, // Set default minute to 0
        time_24hr: true, // Use 24-hour format
        minDate: 'today', // Disable selecting past time (optional)
        defaultDate: field.value || null, // Set default value if exists
      });
    }
  }, [field.value]);

  const handleChange = (selectedDates) => {
    // Update Formik state with the selected time (in ISO format)
    form.setFieldValue(
      field.name,
      selectedDates.length
        ? selectedDates[0].toISOString().split('T')[1].slice(0, 5)
        : null
    );
  };

  return (
    <div>
      <label htmlFor={field.name} className="form-label fs-2">
        {label || 'Time'}
      </label>

      {/* with custom style */}
      <Flatpickr
        ref={flatpickrRef}
        {...props}
        id={field.name}
        name={field.name}
        value={field.value || ''}
        onChange={handleChange}
        options={{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true,
          minDate: 'today',
          hourIncrement: 1,
          minuteIncrement: 5,
        }}
        className="form-control"
        style={{ borderRadius: '5px', padding: '8px', fontSize: '14px' }}
      />

      <ErrorMessage
        name={field.name}
        component="div"
        style={{ color: 'red' }}
      />
    </div>
  );
};

export default TimeField;
