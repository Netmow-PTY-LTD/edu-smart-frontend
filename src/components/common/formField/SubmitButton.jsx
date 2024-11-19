import React from 'react';

const SubmitButton = ({
  isSubmitting,
  children,
  formSubmit,
  className,
  ...props
}) => {
  return (
    <div className="mt-4">
      <button
        type="submit"
        className={`hstack d-flex align-items-center justify-content-center mx-auto button p-2 ${className}`}
        disabled={isSubmitting}
        {...props} // Spread other props like `onClick`, `type`, etc.
      >
        {isSubmitting
          ? 'Submitting...'
          : children || `${formSubmit ? formSubmit : ''}`}{' '}
      </button>
    </div>
  );
};

export default SubmitButton;
