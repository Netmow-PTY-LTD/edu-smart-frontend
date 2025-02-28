import DataObjectComponent from '@/utils/common/data';
import { ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';

const SingleFileUpload = ({ field, form, label, ...props }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileName, setFileName] = useState('');

  const { allowedFileTypes } = DataObjectComponent();

  const isValidFile = (file) => {
    return allowedFileTypes.includes(file.type);
  };

  useEffect(() => {
    const file = form.values[field.name];

    if (file && isValidFile(file)) {
      setFileName(file.name);
      setFileType(file.type);
      if (
        file.type === 'application/pdf' ||
        file.type === 'application/octet-stream' ||
        file.type.startsWith('image/')
      ) {
        setFilePreview(URL.createObjectURL(file));
        form?.setFieldValue(field?.name, file);
      } else {
        setFilePreview(null);
      }
    } else {
      setFilePreview(null);
      form?.setFieldValue(field?.name, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.name]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && isValidFile(file)) {
      setFileName(file.name);
      setFileType(file.type);
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file));
        form?.setFieldValue(field?.name, file);
      } else {
        setFilePreview(null);
      }
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
        className="form-control"
        onChange={handleFileChange}
        accept="application/pdf"
      />

      <div className="my-4">
        {filePreview && (
          <div className="position-relative d-inline-block">
            {(fileType === 'application/pdf' ||
              fileType === 'application/octet-stream') && (
              <div className="pdf-preview">
                <object
                  data={filePreview}
                  type={'application/pdf'}
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
