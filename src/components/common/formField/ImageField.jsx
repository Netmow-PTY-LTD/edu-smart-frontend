import { ErrorMessage, Field } from 'formik';
import React from 'react';

const ImageField = ({ name, label, handleImageChange, ...props }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="form-label fs-2 custom-input-label d-flex justify-content-center align-items-center gap-3"
      >
        <i className="ri-image-fill text-primary fw-bold fs-1"></i>
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
                onChange={(e) => handleImageChange(e, form.setFieldValue, name)}
                accept={'image/png, image/jpg, image/jpeg'}
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
