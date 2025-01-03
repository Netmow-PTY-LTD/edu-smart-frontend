import React from 'react';
import Loader from '../constants/Loader/Loader';

const OtpComponent = ({
  otp,
  handlePaste,
  isLoading,
  handleSubmit,
  setOtp,
  showBtn = true,
}) => {
  return (
    <>
      <div className="pt-4">
        <div>
          <div className="row d-flex justify-content-center align-items-center p-4">
            {otp.map((digit, index) => (
              <div className="col-2" key={index}>
                <div className="mb-3">
                  <label
                    htmlFor={`digit${index + 1}-input`}
                    className="visually-hidden"
                  >
                    Digit {index + 1}
                  </label>
                  <input
                    key={index}
                    autoComplete="off"
                    type="text"
                    value={digit}
                    className=" code-input form-control p-3 fs-3 text-center"
                    maxLength={1}
                    id={`digit${index + 1}-input`}
                    onChange={() => {}}
                    onPaste={(e) => handlePaste(e, index)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            {showBtn &&
              (isLoading ? (
                <Loader />
              ) : (
                <button
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e)}
                  className="button fs-2 w-100 btn fw-semibold"
                >
                  Confirm OTP
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpComponent;
