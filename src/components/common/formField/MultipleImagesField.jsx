import { ErrorMessage } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';

// Helper function to validate file types
const isValidImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return validTypes.includes(file.type);
};

const MultipleImageField = ({ field, form, label, ...props }) => {
  const [previewImages, setPreviewImages] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const validFiles = [];
    const previews = [];

    // Filter and prepare previews of valid image files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (isValidImage(file)) {
        validFiles.push(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === validFiles.length) {
            setPreviewImages(previews);
          }
        };
        reader.readAsDataURL(file);
      }
    }

    // Update Formik field value with the valid files
    form.setFieldValue(field.name, validFiles);
  };

  return (
    <div>
      <label htmlFor={field.name} className="form-label">
        {label || 'Upload Images'}
      </label>
      <input
        {...props}
        {...field}
        type="file"
        id={field.name}
        name={field.name}
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="form-control"
      />
      <div className="mt-2">
        {previewImages.length > 0 && (
          <div className="d-flex flex-wrap">
            {previewImages.map((src, index) => (
              <div key={index} className="me-2 mb-2">
                <Image
                  src={src}
                  alt={`preview-${index}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
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

export default MultipleImageField;
