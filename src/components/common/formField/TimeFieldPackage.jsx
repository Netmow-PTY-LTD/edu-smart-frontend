import 'flatpickr/dist/flatpickr.min.css';
import { ErrorMessage } from 'formik';
import React, { useRef } from 'react';
import Flatpickr from 'react-flatpickr';

const TimeField = ({ field, form, label, ...props }) => {
  const flatpickrRef = useRef(null);

  const handleChange = (selectedDates) => {
    form.setFieldValue(
      field.name,
      selectedDates.length ? selectedDates[0].toISOString().slice(0, 19) : null
    );
  };

  return (
    <div>
      <label htmlFor={field.name} className="form-label fs-2 mb-3">
        {label || 'Time'}
      </label>

      <Flatpickr
        ref={flatpickrRef}
        {...props}
        id={field.name}
        name={field.name}
        value={field.value || ''}
        onChange={handleChange}
        options={{
          enableTime: true,
          dateFormat: 'Y-m-d H:i',
        }}
        className="form-control mb-3"
        style={{ borderRadius: '5px', padding: '8px', fontSize: '14px' }}
        placeholder={`Enter ${label}`}
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
