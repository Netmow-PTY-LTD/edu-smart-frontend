import { ErrorMessage } from 'formik'; // Assuming you're using Formik for validation
import React, { useEffect, useState } from 'react';

const MultipleFileUpload = ({ field, form, label, ...props }) => {
  const [filePreviews, setFilePreviews] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const validTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  const isValidFile = (file) => {
    return validTypes.includes(file.type);
  };

  useEffect(() => {
    const files = form.values[field.name] || [];

    if (files?.length > 0) {

      const validFiles = files.filter(isValidFile);
      setFilePreviews(
        validFiles.map((file) =>
          file.type === 'application/pdf' ? URL.createObjectURL(file) : null
        )
      );
      setFileNames(validFiles.map((file) => file.name));
    }
  }, [form.values, field.name]);



  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter((file) => isValidFile(file));

    if (validFiles.length > 0) {
      // Ensure currentFiles is always an array
      const currentFiles = Array.isArray(form.values[field.name])
        ? form.values[field.name]
        : [];

      const newFiles = [...currentFiles, ...validFiles];

      const newFilePreviews = validFiles.map((file) =>
        file.type === 'application/pdf' ? URL.createObjectURL(file) : null
      );
      const newFileNames = validFiles.map((file) => file.name);

      setFilePreviews((prevPreviews) => [...prevPreviews, ...newFilePreviews]);
      setFileNames((prevNames) => [...prevNames, ...newFileNames]);

      // Update Formik with the new files
      form.setFieldValue(field.name, newFiles);
    }
  };

  const handleRemoveFile = (index) => {
    const currentFiles = form.values[field.name] || []; // Ensure it's an array

    // Safely filter the array
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    const updatedNames = fileNames.filter((_, i) => i !== index);

    setFilePreviews(updatedPreviews);
    setFileNames(updatedNames);

    // Update Formik with the updated files
    form.setFieldValue(field.name, updatedFiles);
  };

  return (
    <div>
      <label htmlFor={field.name} className="form-label fs-2">
        {label || 'Upload Files'}
      </label>

      <input
        {...props}
        type="file"
        id={field.name}
        name={field.name}
        className="form-control"
        multiple
        onChange={handleFileChange}
      />

      <div className="my-4">
        {filePreviews.length > 0 && (
          <div>
            {filePreviews.map((preview, index) => (
              <div key={index} className="position-relative d-inline-block">
                {preview && (
                  <div className="pdf-preview">
                    <object
                      data={preview}
                      type="application/pdf"
                      width="200"
                      height="200"
                    />
                  </div>
                )}
                {!preview && (
                  <div className="file-name">{fileNames[index]}</div>
                )}
                <button
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 d-flex align-items-center justify-content-center rounded-circle p-0"
                  style={{
                    width: '1.563rem',
                    height: '1.563rem',
                  }}
                  onClick={() => handleRemoveFile(index)}
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

export default MultipleFileUpload;
