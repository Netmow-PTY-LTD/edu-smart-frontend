import { ErrorMessage, Field } from 'formik';
import React from 'react';

const FileUpload = ({ name, label, handleFileChange, ...props }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="form-label fs-2 custom-input-label d-flex justify-content-center align-items-center gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="20"
          viewBox="0 0 15 21"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 3.3252C0 2.66215 0.263392 2.02627 0.732233 1.55743C1.20107 1.08859 1.83696 0.825195 2.5 0.825195H8.2325C8.89549 0.825337 9.53127 1.08882 10 1.5577L14.2675 5.8252C14.7364 6.29393 14.9999 6.92971 15 7.5927V18.3252C15 18.9882 14.7366 19.6241 14.2678 20.093C13.7989 20.5618 13.163 20.8252 12.5 20.8252H2.5C1.83696 20.8252 1.20107 20.5618 0.732233 20.093C0.263392 19.6241 0 18.9882 0 18.3252V3.3252ZM3 8.34961C3 7.79732 3.44772 7.34961 4 7.34961H10C10.5523 7.34961 11 7.79732 11 8.34961C11 8.90189 10.5523 9.34961 10 9.34961H4C3.44772 9.34961 3 8.90189 3 8.34961ZM12 13.3496C12 12.7973 11.5523 12.3496 11 12.3496H4C3.44772 12.3496 3 12.7973 3 13.3496C3 13.9019 3.44772 14.3496 4 14.3496H11C11.5523 14.3496 12 13.9019 12 13.3496Z"
            fill="var(--color--secondary)"
          />
        </svg>
        {label || 'Upload File'}
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
                onChange={(e) => handleFileChange(e, form.setFieldValue)}
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

export default FileUpload;
