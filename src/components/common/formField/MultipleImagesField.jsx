import { ErrorMessage } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// Helper function to validate file types
const isValidImage = (file) => {
  const validTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/jpeg',
    'application/jpg',
    'application/png',
    'application/gif',
    'application/webp',
    'application/octet-stream',
  ];
  return validTypes.includes(file.type);
};

const MultipleImageField = ({ field, form, label, ...props }) => {
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    const validFiles = [];
    const previews = [];

    const files = form.values[field.name] || [];
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
  }, [form.values, field.name]);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const validFiles = [];
    const previews = [];

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

  const handleRemoveImage = (event, index) => {
    // Prevent default form submission behavior
    event.preventDefault();
    // Remove the preview image at the specified index
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
    // Remove the corresponding file
    const updatedFiles = [...form.values[field.name]];
    updatedFiles.splice(index, 1);
    form.setFieldValue(field.name, updatedFiles);
  };

  return (
    <div>
      <label htmlFor={field.name} className="form-label fs-2">
        {label || 'Upload Images'}
      </label>
      <input
        {...props}
        {...field}
        type="file"
        id={field.name + 1}
        name={field.name}
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="form-control"
      />
      <div className="my-4">
        {previewImages.length > 0 && (
          <div className="d-flex flex-wrap">
            {previewImages.map((src, index) => (
              <div
                key={index}
                className="position-relative d-inline-block me-2 mb-2"
              >
                <Image
                  src={src}
                  alt={`preview-${index}`}
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
                  onClick={(e) => handleRemoveImage(e, index)} // Pass the event explicitly
                >
                  <span className="visually-hidden">Remove</span>
                  <strong>X</strong>
                </button>
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
