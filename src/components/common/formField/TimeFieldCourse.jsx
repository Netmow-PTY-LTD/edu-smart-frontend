import React from "react";
import { ErrorMessage } from "formik";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const TimeFieldCourse = ({ field, form, label, onChange, ...props }) => {
  const handleChange = (selectedDates) => {
    const selectedDate = selectedDates.length ? selectedDates[0] : null;

    // Ensure `form` is not undefined before calling setFieldValue
    if (form && form.setFieldValue) {
      form.setFieldValue(field.name, selectedDate);
    }

    if (onChange) onChange(selectedDate);
  };

  return (
    <div>
      <label htmlFor={field?.name || ""} className="form-label fs-2 mb-3">
        {label || "Time"}
      </label>
      <Flatpickr
        {...props}
        {...field}
        value={field.value || null}
        onChange={handleChange}
        options={{
          enableTime: true,
          dateFormat: "Y-m-d H:i",
        }}
        className="form-control mb-3"
        style={{ borderRadius: "5px", padding: "8px", fontSize: "14px" }}
      />
      <ErrorMessage name={field?.name || ""} component="div" style={{ color: "red" }} />
    </div>
  );
};

export default TimeFieldCourse;
