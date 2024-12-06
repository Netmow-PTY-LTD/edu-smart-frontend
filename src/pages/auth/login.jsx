import CheckboxField from '@/components/common/formField/CheckBoxField';
import EmailField from '@/components/common/formField/EmailField';
import PasswordField from '@/components/common/formField/PasswordField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { useLogInMutation } from '@/slice/services/public/auth/authService';
import { Form, Formik } from 'formik';

import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import * as Yup from 'yup';
import eduSmartLogo from '../../../public/assets/images/edusmart_logo.png';

// const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;
const appEnvironment = 'production';

const Login = () => {
  const [logIn, { data: LoginData }] = useLogInMutation();

  //  for authenticating
  useEffect(() => {
    if (LoginData?.data?.token && LoginData?.data?.role === 'super_admin') {
      Cookies.set('token', LoginData?.data?.token, { expires: 7 });
      if (appEnvironment === 'development') {
        window.location.assign(
          `${window.location.protocol}//localhost:3005/super-admin`
        );
      } else {
        // window.location.assign(
        //   `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/super-admin`
        // );
        window.location.assign(
          `${window.location.protocol}//${'edusmartmy.netlify.app'}/super-admin`
        );
      }
    }
  }, [LoginData]);

  // temporary agent login
  useEffect(() => {
    if (LoginData?.data?.token && LoginData?.data?.role === 'agent') {
      Cookies.set('token', LoginData?.data?.token, { expires: 7 });
      if (appEnvironment === 'development') {
        window.location.assign(
          `${window.location.protocol}//localhost:3005/agent`
        );
      } else {
        // window.location.assign(
        //   `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/agent`
        // );

        window.location.assign(
          `${window.location.protocol}//${'edusmartmy.netlify.app'}/agent`
        );
      }
    } else if (LoginData?.data?.token && LoginData?.data?.role === 'student') {
      Cookies.set('token', LoginData?.data?.token, { expires: 7 });
      if (appEnvironment === 'development') {
        window.location.assign(
          `${window.location.protocol}//localhost:3005/student`
        );
      } else {
        // window.location.assign(
        //   `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/student`
        // );
        window.location.assign(
          `${window.location.protocol}//${'edusmartmy.netlify.app'}/student`
        );
      }
    }
  }, [LoginData]);

  // useEffect(() => {
  //   if (
  //     // subdomainData?.subdomain &&
  //     typeof window !== 'undefined' &&
  //     loginData?.token
  //   ) {
  //     if (loginData?.token) {
  //       localStorage.setItem('token', loginData?.token);
  //     }
  //     if (appEnvironment === 'development') {
  //       if (loginData.role && loginData?.role === 'admin') {
  //         window.location.assign(
  //           `${window.location.protocol}//${subdomainData?.subdomain}.localhost:3000/admin?token=${loginData.token}`
  //         );
  //       } else if (loginData.role && loginData?.role === 'guardian') {
  //         window.location.assign(
  //           `${window.location.protocol}//${subdomainData?.subdomain}.localhost:3000/guardian?token=${loginData.token}`
  //         );
  //       }
  //     } else {
  //       if (loginData.role && loginData?.role === 'admin') {
  //         window.location.assign(
  //           `${window.location.protocol}//${subdomainData?.subdomain}.${process.env.NEXT_PUBLIC_REDIRECT_URL}/admin?token=${loginData.token}`
  //         );
  //       } else if (loginData.role && loginData?.role === 'guardian') {
  //         window.location.assign(
  //           `${window.location.protocol}//${subdomainData?.subdomain}.${process.env.NEXT_PUBLIC_REDIRECT_URL}/guardian?token=${loginData.token}`
  //         );
  //       }
  //     }
  //   }
  // }, []);

  //  for login
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
  });

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const res = await logIn(values).unwrap();
      if (res) {
        toast.success(res?.message);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-page-wrapper auth-bg-cover pt-5 pb-2 d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay "></div>
        {/* <!-- auth-page content --> */}
        <div className="branding-area">
          <div className="container">
            <div className="brand-logo">
              <Link href="/university">
                <Image src={eduSmartLogo ? eduSmartLogo : ''} alt="Logo" />
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
                          <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleLogin}
                          >
                            {({ isSubmitting }) => (
                              <Form>
                                <Row>
                                  <Col xl={12}>
                                    <div className="mb-3">
                                      <EmailField name="email" label="Email" />
                                    </div>
                                  </Col>

                                  <Col xl={12}>
                                    <PasswordField
                                      name="password"
                                      label="Password"
                                    />
                                  </Col>
                                  <Col xl={12}>
                                    <CheckboxField
                                      name="remember_me"
                                      label={'Remember Me'}
                                    />
                                  </Col>
                                </Row>
                                <div className="hstack gap-2 justify-content-start mx-auto mt-5 mb-2">
                                  <SubmitButton
                                    isSubmitting={isSubmitting}
                                    formSubmit={'Login'}
                                  >
                                    {'Login'}
                                  </SubmitButton>
                                </div>
                              </Form>
                            )}
                          </Formik>
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
                              className="fw-semibold text-primary text-decoration-underline"
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
