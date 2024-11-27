import { ErrorMessage, Field } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';

const ImageField = ({ name, label,imagePreview,setImagePreview, ...props }) => {

  // Handle image file change
  const handleImageChange = (e, setFieldValue) => {


    const file = e.target.files[0];
    if (file) {
      setFieldValue(name, file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div>
      <label htmlFor={name} className="form-label fs-2">
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
                className="form-control"
                onChange={(e) => handleImageChange(e, form.setFieldValue)}
              />
              <ErrorMessage
                name={name}
                component="div"
                style={{ color: 'red' }}
              />
              {imagePreview && (
                <div className="w-100">
                  <Image
                    src={imagePreview}
                    width={500}
                    height={500}
                    alt="Preview"
                    className="mt-2"
                    style={{ maxWidth: '100px' }}
                  />
                </div>
              )}
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default ImageField;
