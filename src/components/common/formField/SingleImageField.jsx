import { ErrorMessage } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// Helper function to validate file types
const isValidImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif','image/webp'];
  return validTypes.includes(file.type);
};

const SingleImageField = ({ field, form, label, ...props }) => {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const file = form.values[field.name];

    if (file && isValidImage(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [form.values, field.name]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file && isValidImage(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      form.setFieldValue(field.name, file);
    } else {
      setPreviewImage(null);
      form.setFieldValue(field.name, null);
    }
  };

  const handleRemoveImage = (event) => {
    event.preventDefault();
    setPreviewImage(null);
    form.setFieldValue(field.name, null);
  };

  return (
    <div>
      <label htmlFor={field.name} className="form-label fs-2 my-3">
        {label || 'Upload Image'}
      </label>
      <input
        {...props}
        {...field}
        type="file"
        id={field.name}
        name={field.name}
        accept="image/*"
        onChange={handleFileChange}
        className="form-control"
      />
      <div className="my-4">
        {previewImage && (
          <div className="position-relative d-inline-block">
            <Image
              src={previewImage}
              alt="preview"
              width={100}
              height={100}
              style={{
                borderRadius: '4px',
                width: '100px',
                height: '100px',
                objectFit: 'cover',
              }}
            />
            <button
              className="btn btn-danger btn-sm position-absolute top-0 end-0 d-flex align-items-center justify-content-center rounded-circle p-0"
              style={{
                width: '1.563rem',
                height: '1.563rem',
              }}
              onClick={handleRemoveImage}
            >
              <span className="visually-hidden">Remove</span>
              <strong>X</strong>
            </button>
          </div>
        )}
      </div>
      <ErrorMessage
        name={field.name}
        component="div"
        style={{ color: 'red' }}
      />
    </div>
  );
};

export default SingleImageField;
