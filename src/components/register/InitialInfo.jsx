import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
//import Loader from '../dashboard/common/Loader';

const InitialInfo = ({
  setStep,
  step,
  setUserInfo,
  userInfo,
  subdomain,
  setUserRole,
  userRole,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [pasted, setPasted] = useState(false);
  // error state

  const [emailError, setEmailError] = useState('');
  const [userRoleError, setUserRoleError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  // eye btn state
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (email) {
      setEmailError('');
    }
  };
  const handleTermsAndConditions = (e) => {
    const isChecked = e.target.checked;
    setTerms(isChecked);

    if (isChecked) {
      setTermsError('');
    } else {
      setTermsError('Please Select Terms And Conditions');
    }

    console.log(isChecked);
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;

    if (!pasted) {
      if (name === 'password') {
        setPassword(value);
      } else if (name === 'confirmPassword') {
        setConfirmPassword(value);
      }
    }

    // Password validation
    if (name === 'password') {
      if (value === '') {
        setPasswordError('*Please enter a password.');
      } else if (value.length < 4) {
        setPasswordError('*Password must be at least 4 characters long.');
      } else {
        setPasswordError(''); // Clear error if password is valid
      }
    }

    // Confirm Password validation
    if (name === 'confirmPassword') {
      if (value === '') {
        setConfirmPasswordError('*Please confirm your password.');
      } else if (password !== value) {
        setConfirmPasswordError('*Passwords do not match.');
      } else {
        setConfirmPasswordError(''); // Clear error if passwords match
      }
    }
  };

  const handlePaste = (e) => {
    setPasted(true);
    const pastedText = (e.clipboardData || window.Clipboard).getData('text');
    setPassword(pastedText);
    setConfirmPassword(pastedText);
  };

  const handleStepsAndData = async (e) => {
    e.preventDefault();

    let isValid = true;

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (subdomain && !userRole && userRole === '') {
      setUserRoleError('Please Select An User.');
      isValid = false;
    }

    if (!email) {
      setEmailError('Please enter an email.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Please enter a password.');
      isValid = false;
    }

    if (!subdomain && terms === false) {
      setTermsError('Please Select Terms And Conditions');
      isValid = false;
    }

    if (password.length < 4) {
      setPasswordError('Password should be at least 4 characters long');
      isValid = false;
    }

    if (password !== confirm_password) {
      setConfirmPasswordError(
        'Passwords do not match. Please confirm your password.'
      );
      isValid = false;
    }

    if (isValid) {
      setUserInfo({
        ...userInfo,
        email: email,
        password: password,
        confirm_password: confirm_password,
        ...(subdomain && subdomain !== 'localhost'
          ? { terms: terms }
          : { terms: terms }),
        ...(userRole && { user_role: userRole }),
      });

      let otpData = {};

      if (email) {
        otpData.email = email;
      }
      if (userRole) {
        otpData.interest = userRole;
      }
      if (subdomain && subdomain !== 'localhost') {
        otpData.subdomain = subdomain;
      }
      console.log(otpData);
      setStep(step + 1);
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div className="row justify-content-center g-0">
        <div className="col-lg-6">
          <div className={`p-lg-5 p-4 auth-one-bg h-100`}>
            <div className="bg-overlay-login"></div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="p-lg-5 px-5 px-4">
            <div className="">
              <h5 className="fs-24 fw-semibold text-black mb-5">
                Register To EduSmart
              </h5>
            </div>
            <div className="mt-4">
              <form>
                {subdomain ? (
                  <div className="mb-3">
                    <label htmlFor="selectuser" className="form-label fs-3">
                      Select User <span className="text-danger">*</span>
                    </label>

                    <select
                      name="userRole"
                      id="selectuser"
                      className="form-select fs-4"
                      required
                      onChange={(e) => setUserRole(e.target.value)}
                    >
                      <option className="text-muted" value={''}>
                        Select User
                      </option>
                      <option value="player">Agent</option>
                      <option value="guardian">Student</option>
                      <option value="guardian">University</option>
                    </select>
                    {userRoleError && (
                      <span className="text-danger fs-3">{userRoleError}</span>
                    )}
                  </div>
                ) : (
                  ''
                )}
                <div className="mb-3 pb-3">
                  <label htmlFor="useremail" className="form-label fs-2 mb-2">
                    {!subdomain ? 'Admin Email' : 'Email'}{' '}
                    <span className="text-danger ">*</span>
                  </label>
                  <input
                    onChange={(e) => handleEmailChange(e)}
                    type="email"
                    className="form-control fs-3 p-3 mb-2"
                    placeholder="Enter email address"
                    required
                  />
                  {emailError && (
                    <span className="text-danger fs-3">{emailError}</span>
                  )}
                </div>

                <div className="mb-3 pb-3">
                  <label
                    className="form-label fs-2 mb-1"
                    htmlFor="password-input"
                  >
                    Password
                  </label>
                  <div className="position-relative auth-pass-inputgroup">
                    <input
                      onChange={handlePasswordInputChange}
                      type={passwordShow ? 'text' : 'password'}
                      name="password"
                      className="form-control password-input fs-3 p-3 mb-2"
                      onPaste={handlePaste}
                      placeholder="Enter password"
                      aria-describedby="passwordInput"
                      required
                    />
                    <button
                      className="position-absolute end-0 top-0 fs-2 text-decoration-none text-muted password-addon p-4"
                      type="button"
                      onClick={() => setPasswordShow(!passwordShow)}
                      style={{ backgroundColor: 'transparent', height: '48px' }}
                    >
                      <i
                        className={`${
                          passwordShow
                            ? 'ri-eye-off-line align-middle'
                            : 'ri-eye-fill align-middle'
                        }`}
                      ></i>
                    </button>
                    {passwordError && (
                      <span className="text-danger fs-12">{passwordError}</span>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    className="form-label fs-2 mb-1"
                    htmlFor="password-input"
                  >
                    Confirm Password
                  </label>
                  <div className="position-relative auth-pass-inputgroup pb-2">
                    <input
                      onChange={handlePasswordInputChange}
                      type={confirmPasswordShow ? 'text' : 'password'}
                      name="confirmPassword"
                      className="form-control password-input fs-3 mb-3"
                      onPaste={handlePaste}
                      placeholder="Enter password"
                      aria-describedby="passwordInput"
                      // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      required
                    />
                    <button
                      className="position-absolute end-0 top-0 fs-2 text-decoration-none text-muted password-addon p-4"
                      type="button"
                      onClick={() =>
                        setConfirmPasswordShow(!confirmPasswordShow)
                      }
                      style={{ backgroundColor: 'transparent', height: '48px' }}
                    >
                      <i
                        className={`${
                          confirmPasswordShow
                            ? 'ri-eye-off-line align-middle'
                            : 'ri-eye-fill align-middle'
                        }`}
                      ></i>
                    </button>
                    {confirmPasswordError && (
                      <span className="text-danger fs-3">
                        {confirmPasswordError}
                      </span>
                    )}
                  </div>
                </div>
                {subdomain === 'localhost' || !subdomain ? (
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="termsCheck"
                      name="terms"
                      checked={terms}
                      onClick={(e) => handleTermsAndConditions(e)}
                      required
                    />
                    <label
                      className="form-check-label fs-3"
                      htmlFor="termsCheck"
                    >
                      I agree to the{' '}
                      <a href="/terms-and-conditions" target="_blank">
                        Terms and Conditions
                      </a>
                    </label>
                    {termsError && (
                      <div className="text-danger fs-4 mt-1">{termsError}</div>
                    )}
                  </div>
                ) : (
                  ''
                )}

                <div className="mt-3">
                  {loading ? (
                    ''
                  ) : (
                    <button
                      disabled={''}
                      onClick={handleStepsAndData}
                      className={`button w-100 fs-2 py-3 fw-semibold`}
                    >
                      Continue to Register
                    </button>
                  )}
                </div>
                {/* <div className="d-flex align-items-center justify-content-center gap-5 my-4">
                  <button
                    onClick={googleRegistrationHandler}
                    className="button text-white px-3 py-1"
                  >
                    <i class="ri-google-fill me-2"></i>Register with Google
                  </button>
                  <button
                    onClick={linkedinRegistrationHandler}
                    className="button text-white px-3 py-1"
                  >
                    <i class="ri-linkedin-box-fill me-2"></i> Register with Linkedin
                  </button>
                </div> */}
                <div className="mt-5 fs-2 text-center">
                  <p className="mb-0 fw-medium">
                    Already have an account ?
                    <Link
                      href="/auth/login"
                      className="fw-semibold text-primary text-decoration-underline ms-2"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InitialInfo;
