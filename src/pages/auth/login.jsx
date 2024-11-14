/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
// import { useRouter } from "next/navigation";

import ForgotPasswordModal from '@/components/dashboard/common/ForgotPasswordModal';
import Loader from '@/components/dashboard/common/Loader';
import {
  getSubdomain,
  login,
} from '@/slices/dashboard/adminDashboard/Actions/authActions';
import { emptyLogin } from '@/slices/dashboard/adminDashboard/reducer';
import { getSubdomainHelperFunction } from '@/slices/helper/getSubdomain';
import { getTheme } from '@/slices/home/actions/organizationAction';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import mainLogo from '../../../public/assets/img/main_logo.png';

const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [subdomain, setSubdoamin] = useState('');

  const {
    data: loginData,
    isLoading: loginIsLoading,
    error: loginError,
  } = useSelector((state) => state.AdminDashboard.login);

  const { data: subdomainData } = useSelector(
    (state) => state.AdminDashboard.getSubdomain
  );

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    if (loginData?.token) {
      localStorage.setItem('token', loginData?.token);
      dispatch(
        getSubdomain({
          authorization: loginData?.token,
        })
      );
    }

    setSubdoamin(getSubdomainHelperFunction());
  }, [loginData.token, dispatch]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname?.split('.');
      if ((host.length === 3 && host[0] !== 'www') || host[1] === 'localhost') {
        dispatch(getTheme(host[0]));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (
      loginData?.token &&
      loginData.role &&
      loginData?.role === 'super_admin'
    ) {
      if (loginData?.token) {
        localStorage.setItem('token', loginData?.token);
      }
      if (appEnvironment === 'development') {
        window.location.assign(
          `${window.location.protocol}//localhost:3000/super_admin?token=${loginData.token}`
        );
      } else {
        window.location.assign(
          `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/super_admin?token=${loginData.token}`
        );
      }
    }
  }, [loginData.role, loginData.token]);

  useEffect(() => {
    if (
      subdomainData?.subdomain &&
      typeof window !== 'undefined' &&
      loginData?.token
    ) {
      if (loginData?.token) {
        localStorage.setItem('token', loginData?.token);
      }
      if (appEnvironment === 'development') {
        if (loginData.role && loginData?.role === 'admin') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.localhost:3000/admin?token=${loginData.token}`
          );
        } else if (loginData.role && loginData?.role === 'guardian') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.localhost:3000/guardian?token=${loginData.token}`
          );
        } else if (loginData.role && loginData?.role === 'player') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.localhost:3000/player?token=${loginData.token}`
          );
        } else if (loginData.role && loginData?.role === 'manager') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.localhost:3000/manager?token=${loginData.token}`
          );
        } else if (loginData.role && loginData?.role === 'trainer') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.localhost:3000/trainer?token=${loginData.token}`
          );
        }
      } else {
        if (loginData.role && loginData?.role === 'admin') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.${process.env.NEXT_PUBLIC_REDIRECT_URL}/admin?token=${loginData.token}`
          );
        } else if (loginData.role && loginData?.role === 'guardian') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.${process.env.NEXT_PUBLIC_REDIRECT_URL}/guardian?token=${loginData.token}`
          );
        } else if (loginData.role && loginData?.role === 'player') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.${process.env.NEXT_PUBLIC_REDIRECT_URL}/player?token=${loginData.token}`
          );
        } else if (loginData.role && loginData?.role === 'manager') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.${process.env.NEXT_PUBLIC_REDIRECT_URL}/manager?token=${loginData.token}`
          );
        } else if (loginData.role && loginData?.role === 'trainer') {
          window.location.assign(
            `${window.location.protocol}//${subdomainData?.subdomain}.${process.env.NEXT_PUBLIC_REDIRECT_URL}/trainer?token=${loginData.token}`
          );
        }
      }

      dispatch(emptyLogin());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, subdomainData?.subdomain, loginData.role, loginData.token]);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    const allLoginData = {
      email,
      password,
    };
    if (isValid) {
      dispatch(login(allLoginData));
    }
  };

  const togOpenModal = () => {
    setOpenModal(!openModal);
  };

  const logo =
    themeData?.subdomain && themeData?.branding?.logo?.secure_url
      ? `${themeData?.branding?.logo?.secure_url}`
      : `${mainLogo.src}`;

  const altName =
    themeData?.subdomain && themeData?.organisation_name
      ? `${themeData?.organisation_name}`
      : 'SquadDeck';

  const googleRegistrationHandler = (e) => {
    e.preventDefault();
    if (subdomain && subdomain !== '') {
      router.push(
        `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/auth/with-google?login=true&subdomain=${subdomain}`
      );
    } else {
      router.push(
        `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/auth/with-google?login=true`
      );
    }
  };

  const linkedinRegistrationHandler = (e) => {
    e.preventDefault();
    if (subdomain && subdomain !== '') {
      router.push(
        `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/auth/with-linkedin?login=true&subdomain=${subdomain}`
      );
    } else {
      router.push(
        `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/auth/with-linkedin?login=true`
      );
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId="614492324409-f8l9j8dnspdgegrpl1up06ms6raefc21.apps.googleusercontent.com">
        <div className="auth-page-wrapper auth-bg-cover pt-5 pb-2 d-flex justify-content-center align-items-center min-vh-100">
          <div className="bg-overlay "></div>
          {/* <!-- auth-page content --> */}
          <div className="auth-page-content overflow-hidden pt-lg-5">
            <div className="container p-3">
              <div className="row pt-1">
                <div className="col-lg-12 fs-2 ">
                  <div className="card overflow-hidden border-0">
                    <div className="row justify-content-center g-0">
                      <div className="col-lg-6">
                        <div className="p-lg-5 p-4 auth-one-bg h-100 position-relative">
                          <div className="bg-overlay-login"></div>
                          <div className="h-100 d-flex flex-column justify-content-center">
                            <div className="btn-wrapper-auth left-5 position-absolute top-10">
                              <button
                                onClick={() => history.back()}
                                className="btn-back-head"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="35"
                                  height="35"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="none"
                                    stroke="#9344E8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="m15 4l-8 8l8 8"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                            <div className="mb-4">
                              <Link href="/" className={`d-block text-center`}>
                                <img
                                  src={logo}
                                  alt={altName}
                                  height="60"
                                  style={{
                                    maxWidth: '300px',
                                    maxHeight: '100px',
                                  }}
                                />
                              </Link>
                            </div>
                            <div className="text-center mt-5 position-relative">
                              <p className="fs-14 fst-italic text-white ">
                                Powered By
                                <Link
                                  href="https://www.squaddeck.app"
                                  className="d-block mt-2"
                                >
                                  <img
                                    src={mainLogo.src}
                                    alt="SquadDeck"
                                    style={{
                                      maxWidth: '130px',
                                    }}
                                  />
                                </Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- end col --> */}

                      <div className="col-lg-6">
                        <div className="p-lg-5 p-4">
                          <div>
                            <h5 className=" fs-1 fw-bold">Welcome Back </h5>
                            <p className="text-muted fs-3">
                              Sign in to{' '}
                              {themeData?.organisation_name
                                ? themeData?.organisation_name
                                : 'SquadDeck'}
                              .
                            </p>
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
                              <div className="mb-3">
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
                                    onClick={() => togOpenModal()}
                                    className="text-muted text-primary fw-semibold text-decoration-underline text-end"
                                  >
                                    Forgot password?
                                  </div>
                                </div>
                                {
                                  <ForgotPasswordModal
                                    openModal={openModal}
                                    setOpenModal={setOpenModal}
                                  />
                                }
                                <div className="position-relative auth-pass-inputgroup">
                                  <input
                                    onChange={(e) => handleChange(e)}
                                    type={passwordShow ? 'text' : 'password'}
                                    className="form-control password-input fs-3 p-3 mb-2"
                                    // onPaste={handlePaste}
                                    placeholder="Enter password"
                                    aria-describedby="passwordInput"
                                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    required
                                  />
                                  <button
                                    className="position-absolute end-0 top-0 fs-2 text-decoration-none text-muted password-addon p-4"
                                    type="button"
                                    onClick={() =>
                                      setPasswordShow(!passwordShow)
                                    }
                                    style={{
                                      backgroundColor: 'transparent',
                                      height: '48px',
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

                              {/* <div className="form-check py-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="auth-remember-check"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="auth-remember-check"
                                >
                                  Remember me
                                </label>
                              </div> */}

                              <div className="mt-4 ">
                                {loginError && (
                                  <div className="text-danger text-center mb-4">
                                    {'Credential Not Matched'}
                                  </div>
                                )}
                                {loginIsLoading ? (
                                  <Loader />
                                ) : (
                                  <input
                                    disabled={loginIsLoading}
                                    type="submit"
                                    value="Sign In"
                                    className="button text-light w-100 fs-2 py-4"
                                    // style={bgPrimary(themeData)}
                                  />
                                )}
                              </div>
                            </form>
                          </div>
                          <div className="d-flex align-items-center justify-content-center gap-5 my-4">
                            <button
                              onClick={googleRegistrationHandler}
                              className="button text-white px-3 py-1"
                            >
                              <i class="ri-google-fill me-2"></i>Login with
                              Google
                            </button>
                            <button
                              onClick={linkedinRegistrationHandler}
                              className="button text-white px-3 py-1"
                            >
                              <i class="ri-linkedin-box-fill me-2"></i> Login
                              with Linkedin
                            </button>
                          </div>
                          <div className="mt-5 fs-2 text-center">
                            <p className="mb-0">
                              Don't have an account ?{' '}
                              <Link
                                href="/auth/register"
                                className="fw-semibold text-primary text-decoration-underline py-4"
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
            <footer className="text-light mt-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="text-center">
                      <p className="mb-0 fs-4">
                        &copy; {new Date().getFullYear()} SquadDeck. Crafted
                        with <i className="mdi mdi-heart text-danger"></i> by
                        NETMOW
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
      </GoogleOAuthProvider>
    </>
  );
};

export default Login;
