import EmailField from '@/components/common/formField/EmailField';
import PasswordField from '@/components/common/formField/PasswordField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useLogInMutation } from '@/slice/services/public/auth/authService';
import DataObjectComponent, { brandlogo } from '@/utils/common/data';
import { Form, Formik } from 'formik';

import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import * as Yup from 'yup';

const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

const Login = () => {
  const [logIn, { data: LoginData }] = useLogInMutation();
  const [isAuthCheck, setIsAuthCheck] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');

    if (!token || !role) {
      Cookies.remove('token');
      Cookies.remove('role');
      setIsAuthCheck(true);
    } else {
      const dashboardPath = role === 'super_admin' ? 'super-admin' : role;
      if (appEnvironment === 'development') {
        window.location.assign(
          `${window.location.protocol}//${'localhost:3005'}/dashboard/${dashboardPath}`
        );
      } else {
        window.location.assign(
          `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/${dashboardPath}`
        );
      }
    }
  }, []);

  useEffect(() => {
    if (LoginData?.data?.token && LoginData?.data?.role === 'super_admin') {
      Cookies.set('token', LoginData?.data?.token, { expires: 7 });
      Cookies.set('role', LoginData?.data?.role, { expires: 7 });
      if (appEnvironment === 'development') {
        window.location.assign(
          `${window.location.protocol}//${'localhost:3005'}/dashboard/super-admin`
        );
      } else {
        window.location.assign(
          `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/super-admin`
        );
      }
    }
    if (
      LoginData?.data?.token &&
      LoginData?.data?.role === 'admission_manager'
    ) {
      Cookies.set('token', LoginData?.data?.token, { expires: 7 });
      Cookies.set('role', LoginData?.data?.role, { expires: 7 });
      if (appEnvironment === 'development') {
        window.location.assign(
          `${window.location.protocol}//${'localhost:3005'}/dashboard/admission-manager`
        );
      } else {
        window.location.assign(
          `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/admission-manager`
        );
      }
    }
    if (LoginData?.data?.token && LoginData?.data?.role === 'accountant') {
      Cookies.set('token', LoginData?.data?.token, { expires: 7 });
      Cookies.set('role', LoginData?.data?.role, { expires: 7 });
      if (appEnvironment === 'development') {
        window.location.assign(
          `${window.location.protocol}//${'localhost:3005'}/dashboard/accountant`
        );
      } else {
        window.location.assign(
          `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/accountant`
        );
      }
    }
  }, [LoginData]);

  useEffect(() => {
    if (LoginData?.data?.token && LoginData?.data?.role === 'agent') {
      const subdomain = LoginData?.data?.domain?.subdomain;
      const token = LoginData?.data?.token;

      if (appEnvironment === 'development') {
        Cookies.set('token', token, {
          expires: 7,
        });
        Cookies.set('subdomain', subdomain, {
          expires: 7,
        });
        Cookies.set('role', LoginData?.data?.role, {
          expires: 7,
        });
        window.location.assign(
          `${window.location.protocol}//localhost:3005/dashboard/agent`
        );
      } else {
        const domain = process.env.NEXT_PUBLIC_REDIRECT_URL;

        Cookies.set('token', token, {
          expires: 7,
        });
        Cookies.set('subdomain', subdomain, {
          expires: 7,
        });
        Cookies.set('role', LoginData?.data?.role, {
          expires: 7,
        });
        window.location.assign(
          `${window.location.protocol}//${domain}/dashboard/agent`
        );
      }
    } else if (LoginData?.data?.token && LoginData?.data?.role === 'student') {
      Cookies.set('token', LoginData?.data?.token, { expires: 7 });
      Cookies.set('role', LoginData?.data?.role, { expires: 7 });
      const subdomain = LoginData?.data?.domain?.subdomain;
      const token = LoginData?.data?.token;

      if (appEnvironment === 'development') {
        Cookies.set('token', token, {
          expires: 7,
        });
        Cookies.set('subdomain', subdomain, {
          expires: 7,
        });
        window.location.assign(
          `${window.location.protocol}//localhost:3005/dashboard/student`
        );
      } else {
        const domain = process.env.NEXT_PUBLIC_REDIRECT_URL;

        Cookies.set('token', token, {
          expires: 7,
        });
        Cookies.set('subdomain', subdomain, {
          expires: 7,
        });
        window.location.assign(
          `${window.location.protocol}//${domain}/dashboard/student`
        );
      }
    }

    // if (LoginData?.data?.token && LoginData?.data?.role === 'agent') {
    //   const subdomain = LoginData?.data?.domain?.subdomain;
    //   const token = LoginData?.data?.token;

    //   if (appEnvironment === 'development') {
    //     Cookies.set('token', token, {
    //       expires: 7,
    //       domain: '.localhost',
    //       sameSite: 'Lax',
    //     });
    //     Cookies.set('subdomain', subdomain, {
    //       expires: 7,
    //       domain: '.localhost',
    //       sameSite: 'Lax',
    //     });
    //     Cookies.set('role', LoginData?.data?.role, {
    //       expires: 7,
    //       domain: '.localhost',
    //       sameSite: 'Lax',
    //     });

    //     // window.location.assign(
    //     //   `${window.location.protocol}//${subdomain}.localhost:3005/dashboard/agent`
    //     // );
    //     window.location.assign(
    //       `${window.location.protocol}//localhost:3005/dashboard/agent`
    //     );
    //   } else {
    //     const domain = process.env.NEXT_PUBLIC_REDIRECT_URL;

    //     Cookies.set('token', token, {
    //       domain: domain,
    //       expires: 7,
    //     });
    //     Cookies.set('subdomain', subdomain, {
    //       domain: domain,
    //       expires: 7,
    //     });
    //     Cookies.set('role', LoginData?.data?.role, {
    //       domain: domain,
    //       expires: 7,
    //     });

    //     // window.location.assign(
    //     //   `${window.location.protocol}//${subdomain}.${domain}/dashboard/agent`
    //     // );
    //     window.location.assign(
    //       `${window.location.protocol}//${domain}/dashboard/agent`
    //     );
    //   }
    // } else if (LoginData?.data?.token && LoginData?.data?.role === 'student') {
    //   Cookies.set('token', LoginData?.data?.token, { expires: 7 });
    //   Cookies.set('role', LoginData?.data?.role, { expires: 7 });
    //   const subdomain = LoginData?.data?.domain?.subdomain;
    //   const token = LoginData?.data?.token;

    //   if (appEnvironment === 'development') {
    //     Cookies.set('token', token, {
    //       expires: 7,
    //       domain: '.localhost',
    //       sameSite: 'Lax',
    //     });
    //     Cookies.set('subdomain', subdomain, {
    //       expires: 7,
    //       domain: '.localhost',
    //       sameSite: 'Lax',
    //     });
    //     window.location.assign(
    //       `${window.location.protocol}//localhost:3005/dashboard/student`
    //     );
    //   } else {
    //     const domain = process.env.NEXT_PUBLIC_REDIRECT_URL;

    //     Cookies.set('token', token, {
    //       domain: domain,
    //       expires: 7,
    //     });
    //     Cookies.set('subdomain', subdomain, {
    //       domain: domain,
    //       expires: 7,
    //     });
    //     window.location.assign(
    //       `${window.location.protocol}//${domain}/dashboard/student`
    //     );
    //   }
    // }

    // else if (
    //   LoginData?.data?.token &&
    //   LoginData?.data?.role === 'university_administrator'
    // ) {
    //   Cookies.set('token', LoginData?.data?.token, { expires: 7 });
    //   Cookies.set('role', LoginData?.data?.role, { expires: 7 });
    //   if (appEnvironment === 'development') {
    //     window.location.assign(
    //       `${window.location.protocol}//${'localhost:3005'}/dashboard/university-administrator`
    //     );
    //   } else {
    //     window.location.assign(
    //       `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/university-administrator`
    //     );
    //   }
    // }
  }, [LoginData]);

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
      {!isAuthCheck ? (
        <LoaderSpiner />
      ) : (
        <div className="auth-page-wrapper auth-bg-cover pt-5 pb-2 d-flex flex-column justify-content-center align-items-center min-vh-100">
          <div className="bg-overlay "></div>
          {/* <!-- auth-page content --> */}
          <div className="branding-area">
            <div className="container">
              <div className="brand-logo">
                <Link href="/">
                  <Image
                    src={brandlogo ? brandlogo : ''}
                    alt="Logo"
                    width={300}
                    height={50}
                  />
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
                                        <EmailField
                                          name="email"
                                          label="Email"
                                        />
                                      </div>
                                    </Col>

                                    <Col xl={12}>
                                      <PasswordField
                                        name="password"
                                        label="Password"
                                      />
                                      <div className="text-end">
                                        <Link href="/auth/forget-password">
                                          Forgot Password?
                                        </Link>
                                      </div>
                                    </Col>
                                    <Col xl={12}>
                                      {/* <CheckboxField
                                        name="remember_me"
                                        label={'Remember Me'}
                                      /> */}
                                    </Col>
                                  </Row>
                                  <div className="hstack gap-2 justify-content-start mx-auto mt-4 mb-2">
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
      )}

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
        crossOrigin="anonymous"
      />
    </>
  );
};

export default Login;
