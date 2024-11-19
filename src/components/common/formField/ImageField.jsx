import { ErrorMessage, Field } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';

const ImageField = ({ name, label, ...props }) => {
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image file change
  const handleImageChange = (e, setFieldValue) => {
    console.log(e);
    console.log(setFieldValue);
    const file = e.target.files[0];
    if (file) {
      // Set the file in Formik field value
      setFieldValue(name, file);

      // Create an image preview URL
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div>
      <label htmlFor={name} className="form-label">
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
