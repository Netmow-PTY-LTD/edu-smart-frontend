import { ErrorMessage, Field } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';

const ImageField = ({ name, label, handleImageChange, ...props }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="form-label fs-2 custom-input-label d-flex justify-content-center align-items-center gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="21"
          viewBox="0 0 23 21"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.05382 0.645752C2.30709 0.645752 1.59095 0.942388 1.06293 1.4704C0.534917 1.99842 0.238281 2.71456 0.238281 3.46129V17.539C0.238281 18.2857 0.534917 19.0018 1.06293 19.5298C1.59095 20.0579 2.30709 20.3545 3.05382 20.3545H19.947C20.6937 20.3545 21.4099 20.0579 21.9379 19.5298C22.4659 19.0018 22.7626 18.2857 22.7626 17.539V3.46129C22.7626 2.71456 22.4659 1.99842 21.9379 1.4704C21.4099 0.942388 20.6937 0.645752 19.947 0.645752H3.05382ZM19.947 17.539H3.05382L8.68488 6.27682L12.9082 14.7234L15.7237 9.09235L19.947 17.539Z"
            fill="var(--color--secondary)"
          />
        </svg>
        {label || 'Upload Image'}
      </label>

      <Field name={name}>
        {({ form }) => {
          return (
            <>
              <input
                {...props}
                type="file"
                id={name}
                name={name}
                className="form-input-file custom-input-file"
                onChange={(e) => handleImageChange(e, form.setFieldValue)}
              />
              <ErrorMessage
                name={name}
                component="div"
                style={{ color: 'red' }}
              />
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default ImageField;
