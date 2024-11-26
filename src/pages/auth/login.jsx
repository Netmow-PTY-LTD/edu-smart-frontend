/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
// import { useRouter } from "next/navigation";

// import ForgotPasswordModal from '@/components/dashboard/common/ForgotPasswordModal';
//import Loader from '@/components/dashboard/common/Loader';
// import {
//   getSubdomain,
//   login,
// } from '@/slices/dashboard/adminDashboard/Actions/authActions';
// import { emptyLogin } from '@/slices/dashboard/adminDashboard/reducer';
// import { getSubdomainHelperFunction } from '@/slices/helper/getSubdomain';
// import { getTheme } from '@/slices/home/actions/organizationAction';
//import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
//import mainLogo from '../../../public/assets/img/main_logo.png';
import Loader from '@/components/constants/Loader/Loader';

const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

const Login = () => {
  const [email, setEmail] = useState('');
  const [passwordShow, setPasswordShow] = useState();
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = () => {
    console.log('Submitted');
  };

  return (
    <>
      <div className="auth-page-wrapper auth-bg-cover pt-5 pb-2 d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay "></div>
        {/* <!-- auth-page content --> */}
        <div className="branding-area">
          <div className="container">
            <div className="brand-logo">
              <Link href="/">
                <img src="/assets/images/edusmart_logo.png" alt="Logo" />
              </Link>
            </div>
            {/* <h2 className="text-black fw-bold mt-4 fs-20 text-center">
              Login To EduSmart
            </h2> */}
          </div>
        </div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <div className="container p-3">
            <div className="row pt-1">
              <div className="col-lg-12 fs-2 ">
                <div className="card overflow-hidden">
                  <div className="row justify-content-center g-0">
                    <div className="col-lg-6">
                      <div className="p-lg-5 p-4 auth-one-bg h-100 position-relative">
                        <div className="bg-overlay-login"></div>
                      </div>
                    </div>
                    {/* <!-- end col --> */}

                    <div className="col-lg-6">
                      <div className="p-5 p-lg-5 px-4 px-lg-5 py-5">
                        <div>
                          <h5 className="fs-24 fw-bold text-black mb-5 text-center">
                            Login To EduSmart
                          </h5>
                        </div>

                        <div className="mt-4">
                          <form onSubmit={handleSubmit}>
                            <div className="pb-3">
                              <label
                                htmlFor="username"
                                className="form-label fs-2 pb-2"
                              >
                                User Email
                              </label>
                              <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="form-control fs-3 p-3"
                                placeholder="Enter Your Email"
                              />
                              {/* {error && (
                                <div className="text-danger text-center">
                                  {error}
                                </div>
                              )} */}
                            </div>
                            <div className="mb-4">
                              <div className="d-flex justify-content-between align-items-center">
                                <label
                                  className="form-label fs-2 mb-0"
                                  htmlFor="password-input"
                                >
                                  Password
                                </label>
                                <div
                                  style={{
                                    cursor: 'pointer',
                                    lineHeight: '48px',
                                  }}
                                  className="text-muted text-primary fw-semibold text-decoration-underline text-end fs-14"
                                >
                                  Forgot password?
                                </div>
                              </div>
                              {/* {
                                  <ForgotPasswordModal
                                    openModal={openModal}
                                    setOpenModal={setOpenModal}
                                  />
                                } */}
                              <div className="position-relative auth-pass-inputgroup">
                                <input
                                  type={passwordShow ? 'text' : 'password'}
                                  className="form-control password-input fs-3 p-3 mb-2"
                                  // onPaste={handlePaste}
                                  placeholder="Enter password"
                                  aria-describedby="passwordInput"
                                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                  required
                                />
                                <button
                                  className="position-absolute end-0 top-0 fs-2 text-decoration-none text-muted password-addon p-3"
                                  type="button"
                                  onClick={() => setPasswordShow(!passwordShow)}
                                  style={{
                                    backgroundColor: 'transparent',
                                  }}
                                >
                                  <i
                                    className={`${
                                      passwordShow
                                        ? 'ri-eye-off-line align-middle'
                                        : 'ri-eye-fill align-middle'
                                    }`}
                                  ></i>
                                </button>
                              </div>
                            </div>

                            <div className="form-check py-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="auth-remember-check"
                              />
                              <label
                                className="form-check-label fs-14"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </label>
                            </div>

                            <div className="mt-4 ">
                              {loginError && (
                                <div className="text-danger text-center mb-4">
                                  {'Credential Not Matched'}
                                </div>
                              )}
                              {loading ? (
                                <Loader />
                              ) : (
                                <input
                                  disabled={''}
                                  type="submit"
                                  value="Sign In"
                                  className="button text-light w-100 fs-2 p-3"
                                  // style={bgPrimary(themeData)}
                                />
                              )}
                            </div>
                          </form>
                        </div>
                        {/* <div className="d-flex align-items-center justify-content-center gap-5 my-4">
                          <button className="button text-white px-3 py-1">
                            <i className="ri-google-fill me-2"></i>Login with
                            Google
                          </button>
                          <button className="button text-white px-3 py-1">
                            <i className="ri-linkedin-box-fill me-2"></i> Login
                            with Linkedin
                          </button>
                        </div> */}
                        <div className="mt-5 fs-2 text-center">
                          <p className="mb-0">
                            Don't have an account ?{' '}
                            <Link
                              href="/auth/register"
                              className="fw-semibold text-primary text-decoration-underline p-3"
                            >
                              {' '}
                              Signup
                            </Link>{' '}
                          </p>
                        </div>

                        {/* <div className="mt-4 d-flex justify-content-center">
                            <GoogleLogin
                              onSuccess={(credentialResponse) => {
                                handleGoogleLogin(credentialResponse);
                              }}
                              auto_select={true}
                              useOneTap={true}
                            />
                          </div> */}
                      </div>
                    </div>
                    {/* <!-- end col --> */}
                  </div>
                  {/* <!-- end row -->
                        </div> */}
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col -->/ */}
              </div>
            </div>
          </div>

          {/* <!-- footer --> */}
          <footer className="mt-4">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center">
                    <p className="mb-0 fs-4">
                      &copy; {new Date().getFullYear()} EduSmart. Crafted with{' '}
                      <i className="mdi mdi-heart text-danger"></i> by Inleads
                      IT MY
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          {/* <!-- end Footer --> */}
        </div>
      </div>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
        crossOrigin="anonymous"
      />
    </>
  );
};

export default Login;
