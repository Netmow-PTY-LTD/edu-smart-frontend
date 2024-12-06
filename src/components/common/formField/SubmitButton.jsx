import Loader from '@/components/constants/Loader/Loader';
import React from 'react';

const SubmitButton = ({
  isSubmitting,
  children,
  formSubmit,
  className,
  ...props
}) => {
  return (
    <button
      type="submit"
      className={`button px-3 py-2 fw-semibold ${className}`}
      disabled={isSubmitting}
      {...props}
    >
      {isSubmitting ? (
        <Loader />
      ) : (
        children || `${formSubmit ? formSubmit : ''}`
      )}
    </button>
  );
};

export default SubmitButton;
