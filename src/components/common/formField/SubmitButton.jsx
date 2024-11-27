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
    <div className="hstack gap-2 justify-content-center mx-auto mt-5 mb-2">
      <button
        type="submit"
        className={`button px-3 py-2 `}
        disabled={isSubmitting}
        {...props}
      >
        {isSubmitting ? (
          <Loader />
        ) : (
          children || `${formSubmit ? formSubmit : ''}`
        )}{' '}
      </button>
    </div>
  );
};

export default SubmitButton;
