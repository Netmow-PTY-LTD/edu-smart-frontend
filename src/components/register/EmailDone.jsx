import React from 'react';

const EmailDone = ({ step, setStep, userInfo, setUserInfo }) => {
  return (
    <>
      <div className="fs-2">
        <div className="p-lg-5 p-4 text-center">
          <div className="avatar-lg mx-auto mt-2">
            <div className="avatar-title bg-light text-success display-3 rounded-circle">
              <i className="ri-checkbox-circle-fill qoute_color"></i>
            </div>
          </div>
          <div className="mt-4 pt-2">
            <h4 className="fs-2 p-2">Email Verification Done !</h4>
            <p className="text-muted mx-4">
              Success! Your email verification is complete.
            </p>

            <div className="mt-4 py-4">
              <button
                onClick={() => setStep(step + 1)}
                className="button fs-2 w-100 text-white py-3"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailDone;
