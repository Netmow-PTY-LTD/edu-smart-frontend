import EmailField from '@/components/common/formField/EmailField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { useForgetPasswordMutation } from '@/slice/services/public/auth/authService';
import { brandlogo } from '@/utils/common/data';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import * as Yup from 'yup';

export default function ForgetPassword() {
  const [initialValues, setInitialValues] = useState({
    email: '',
  });

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
  });

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleForgotPassword = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const response = await forgetPassword({ email: values.email }).unwrap();
      toast.success(response?.message);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page-wrapper auth-bg-cover pt-5 pb-2 d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="bg-overlay "></div>
      {/* <!-- auth-page content --> */}
      <ToastContainer />
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
        </div>
      </div>
      <div className="auth-page-content overflow-hidden pt-lg-5">
        <div className="container p-3">
          <div className="row pt-1 justify-content-center">
            <div className="col-lg-6 fs-2 ">
              <div className="card overflow-hidden">
                <div className="row justify-content-center g-0">
                  {/* <!-- end col --> */}

                  <div className="col-lg-12">
                    <div className="p-5 p-lg-5 px-4 px-lg-5 py-5">
                      <div>
                        <h5 className="fs-24 fw-bold text-black mb-4 text-center">
                          Recover Your Account
                        </h5>
                        <p className="text-center">
                          Please enter your email address to receive a password
                          reset link.
                        </p>
                      </div>
                      <div className="mt-4">
                        <Formik
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          onSubmit={handleForgotPassword}
                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <Row>
                                <Col xl={12}>
                                  <div className="mb-3">
                                    <EmailField name="email" label="Email" />
                                  </div>
                                </Col>
                              </Row>
                              <div className="hstack gap-2 justify-content-start mx-auto mb-2">
                                <SubmitButton
                                  isSubmitting={isSubmitting || isLoading}
                                  formSubmit="Send"
                                >
                                  {'Send'}
                                </SubmitButton>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
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
                    <i className="mdi mdi-heart text-danger"></i> by Inleads IT
                    MY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- end Footer --> */}
      </div>
    </div>
  );
}
