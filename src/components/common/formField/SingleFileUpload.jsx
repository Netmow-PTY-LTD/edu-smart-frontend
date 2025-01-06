import { allowedFileTypes } from '@/utils/common/data';
import { ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';

const SingleFileUpload = ({ field, form, label, ...props }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileName, setFileName] = useState('');

  const isValidFile = (file) => {
    return allowedFileTypes.includes(file.type);
  };

  useEffect(() => {
    const file = form.values[field.name];

    if (file && isValidFile(file)) {
      setFileName(file.name);
      setFileType(file.type);
      if (file.type === 'application/pdf') {
        setFilePreview(URL.createObjectURL(file));
      } else if (
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword'
      ) {
        setFilePreview(null);
      } else {
        setFilePreview(null);
      }
    } else {
      setFilePreview(null);
    }
  }, [field.name, form.values]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidFile(file)) {
      setFileName(file.name);
      setFileType(file.type);
      if (file.type === 'application/pdf') {
        setFilePreview(URL.createObjectURL(file));
      } else if (
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword'
      ) {
        setFilePreview(null);
      }
      form?.setFieldValue(field?.name, file);
    } else {
      setFilePreview(null);
      form?.setFieldValue(field?.name, null);
    }
  };

  const handleRemoveFile = () => {
    setFilePreview(null);
    setFileName('');
    setFileType(null);
    form.setFieldValue(field.name, null);
  };

  return (
    <div>
      <label htmlFor={field.name} className="form-label fs-2">
        {label || 'Upload File'}
      </label>

      <input
        {...props}
        type="file"
        id={field.name}
        name={field.name}
        className="form-control "
        onChange={handleFileChange}
      />

      <div className="my-4">
        {filePreview && (
          <div className="position-relative d-inline-block">
            {filePreview && fileType === 'application/pdf' && (
              <div className="pdf-preview">
                <object
                  data={filePreview}
                  type="application/pdf"
                  width="200"
                  height="200"
                />
              </div>
            )}

            <button
              className="btn btn-danger btn-sm position-absolute top-0 end-0 d-flex align-items-center justify-content-center rounded-circle p-0"
              style={{
                width: '1.563rem',
                height: '1.563rem',
              }}
              onClick={handleRemoveFile}
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

export default SingleFileUpload;
