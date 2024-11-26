import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import Loader from './Loader';

const EmailOtpComponent = ({
  userEmail,
  otp,
  handlePaste,
  error,
  isLoading,
  handleSubmit,
  setOtp,
  subdomain,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const inputElements = document.querySelectorAll('input.code-input');

    const handleKeyDown = (e, index) => {
      if (e.keyCode === 8 && e.target.value === '' && index > 0) {
        const newIndex = Math.max(0, index - 1);
        inputElements[newIndex].focus();
        setOtp((prevValues) => {
          const newValues = [...prevValues];
          newValues[newIndex] = '';
          return newValues;
        });
      }
    };

    const handleInput = (e, index) => {
      const newValue = e.target.value;
      const [first, ...rest] = newValue;

      setOtp((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = first ?? '';
        return newValues;
      });

      if (first !== undefined && index < otp.length - 1) {
        inputElements[index + 1].focus();
      }
    };

    inputElements.forEach((ele, index) => {
      ele.addEventListener('keydown', (e) => handleKeyDown(e, index));
      ele.addEventListener('input', (e) => handleInput(e, index));
    });

    return () => {
      inputElements.forEach((ele, index) => {
        ele.removeEventListener('keydown', (e) => handleKeyDown(e, index));
        ele.removeEventListener('input', (e) => handleInput(e, index));
      });
    };
  }, [otp.length, setOtp]);

  const handleResentOtp = () => {
    //dispatch(sendOtp({ email: userEmail, subdomain }));
  };

  return (
    <>
      <div className="row justify-content-center g-0">
        <div className="col-lg-6">
          <div className={`p-lg-5 p-4 auth-one-bg h-100`}>
            <div className="bg-overlay-login"></div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="p-4">
            <div className="p-lg-5">
              <div className="mb-4 p-4">
                <div className="avatar-lg mx-auto">
                  <div className="avatar-title bg-primary-alt text-primary display-5 rounded-circle">
                    <i className="ri-mail-line text-secondary-alt fw-semibold"></i>
                  </div>
                </div>
              </div>
              <div className="text-muted text-center fs-2 mx-lg-3">
                <h4 className="fs-1 pb-3 fw-semibold text-secondary-alt">
                  Verify Your Email
                </h4>
                <p>
                  Please enter the 4 digit code sent to{' '}
                  <span className="fw-semibold">{userEmail}</span>
                </p>
              </div>

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
                    {/* {error && (
                  <div className=" text-danger fs-2 mb-4 text-center">
                    {error}
                  </div>
                )} */}
                    {isLoading ? (
                      ''
                    ) : (
                      <button
                        disabled={isLoading}
                        onClick={(e) => handleSubmit(e)}
                        className="button fs-2 w-100 btn fw-semibold"
                      >
                        Confirm OTP
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center fs-2">
                <p className="mb-0">
                  Didn't receive a code ?{' '}
                  <button
                    onClick={handleResentOtp}
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    Resend
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailOtpComponent;
