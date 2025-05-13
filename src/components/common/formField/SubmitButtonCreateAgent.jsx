import Loader from '@/components/constants/Loader/Loader';
import React from 'react';
import { useFormikContext } from 'formik';

const SubmitButtonCreateAgent = ({ children, className, ...props }) => {
  const { isSubmitting, handleSubmit, isValid } = useFormikContext();

  return (
    <button
      type="button"
      className={`button px-3 py-2 fw-semibold ${className}`}
      disabled={isSubmitting || !isValid}
      onClick={handleSubmit}
      {...props}
    >
      {isSubmitting ? <Loader /> : children || 'Submit'}
    </button>
  );
};

export default SubmitButtonCreateAgent;
