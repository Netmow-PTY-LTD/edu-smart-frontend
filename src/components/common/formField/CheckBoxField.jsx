import { ErrorMessage, Field } from 'formik';
import Link from 'next/link';
import React from 'react';

const CheckboxField = ({ label, name, termsLink, termsText }) => {
  return (
    <div className="mb-3 form-check">
      <Field
        type="checkbox"
        className="form-check-input"
        id={name}
        name={name}
      />
      <label className="form-check-label fs-2" htmlFor={name}>
        {label}
        {termsText && (
          <Link
            href={termsLink || ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            {termsText}
          </Link>
        )}
      </label>

      {/* Display error message from Formik */}
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default CheckboxField;
