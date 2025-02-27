/* eslint-disable @next/next/no-img-element */
import { allowedFileTypes } from '@/utils/common/data';
import { ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';

const MultipleFileUploadAcceptAll = ({ field, form, label, ...props }) => {
  const [filePreviews, setFilePreviews] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const isValidFile = (file) =>
    allowedFileTypes ? allowedFileTypes.includes(file?.type) : true;

  useEffect(() => {
    const files = form.values[field.name] || [];

    if (files?.length > 0) {
      const validFiles = files.filter(isValidFile);
      setFilePreviews(
        validFiles.map((file) =>
          file.type === 'application/pdf' ||
          file.type.startsWith('application/') ||
          file.type.startsWith('image/')
            ? URL.createObjectURL(file)
            : null
        )
      );
      setFileNames(validFiles.map((file) => file.name));
    }
  }, [form.values, field.name]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => isValidFile(file));

    if (validFiles.length > 0) {
      const currentFiles = form.values[field.name] || [];
      const newFiles = [...currentFiles, ...validFiles];

      const newFilePreviews = validFiles
        .map((file) =>
          file.type === 'application/pdf' || file.type.startsWith('image/')
            ? URL.createObjectURL(file)
            : null
        )
        .filter((preview) => preview !== null);

      const newFileNames = validFiles.map((file) => file.name);

      setFilePreviews((prevPreviews) => [...prevPreviews, ...newFilePreviews]);
      setFileNames((prevNames) => [...prevNames, ...newFileNames]);

      form?.setFieldValue(field.name, newFiles);
    }
  };

  //   const handleRemoveFile = (index) => {
  //     const currentFiles = form.values[field.name] || [];

  //     const updatedFiles = currentFiles.filter((_, i) => i !== index);
  //     const updatedPreviews = filePreviews.filter((_, i) => i !== index);
  //     const updatedNames = fileNames.filter((_, i) => i !== index);

  //     setFilePreviews(updatedPreviews);
  //     setFileNames(updatedNames);

  //     form?.setFieldValue(field.name, updatedFiles);
  //   };

  const handleRemoveFile = (index) => {
    const currentFiles = Array.isArray(form.values[field.name])
      ? form.values[field.name]
      : [];

    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    const updatedNames = fileNames.filter((_, i) => i !== index);

    setFilePreviews(updatedPreviews);
    setFileNames(updatedNames);

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
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      />

      <div className="my-4">
        {filePreviews.length > 0 && (
          <div>
            {filePreviews.map((preview, index) => (
              <div key={index} className="position-relative d-inline-block">
                {preview ? (
                  fileNames[index].endsWith('.pdf') ? (
                    <div className="pdf-preview">
                      <object
                        data={preview}
                        type="application/pdf"
                        width="200"
                        height="200"
                      />
                    </div>
                  ) : (
                    <figure className="me-2">
                      <img
                        src={preview}
                        alt="Preview"
                        width="200"
                        height="200"
                      />
                    </figure>
                  )
                ) : (
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

export default MultipleFileUploadAcceptAll;
