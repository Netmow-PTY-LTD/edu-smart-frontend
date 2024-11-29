import DetailsInfo from '@/components/register/DetailsInfo';
import EmailDone from '@/components/register/EmailDone';
import EmailOtp from '@/components/register/EmailOtp';
import InitialInfo from '@/components/register/InitialInfo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import {
  useAgentRegisterMutation,
  useGenerateOtpMutation,
  useLogInMutation,
  useStudentRegisterMutation,
} from '@/slice/services/public/auth/authService';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import eduSmartLogo from '../../../public/assets/images/edusmart_logo.png';

// const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;
const appEnvironment = 'development';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [logIn, { data: LoginData }] = useLogInMutation();
  const [generateOtp] = useGenerateOtpMutation();
  const [agentRegister] = useAgentRegisterMutation();
  const [studentRegister] = useStudentRegisterMutation();

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

  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    secondary_email: '',
    organization_name: '',
    subdomain: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    country: '',
    city: '',
    state: '',
    zip: '',
    terms_and_conditions: '',
  });

  const initialStepValidationSchema = Yup.object({
    user_role: Yup.string().required('Please Select User First'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    terms_and_conditions: Yup.string().required(
      'terms_and_conditions is required'
    ),
  });

  const agentRegistrationValidationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    secondary_email: Yup.string().required('Secondary Email is required'),
    subdomain: Yup.string().required('Subdomain is required'),
    phone: Yup.string().required('Phone is required'),
    address_line_1: Yup.string().required('Address Line 1 is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip is required'),
  });

  const handleAgentSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const res = await generateOtp({ email: values?.email }).unwrap();
      if (res) {
        setInitialValues(values);
        toast.success(res?.message);
        setStep(step + 1);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegistrationSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    console.log('agent', values);

    try {
      const resRegister = await agentRegister({
        ...values,
        confirm_password: values?.password,
      }).unwrap();

      if (resRegister) {
        toast.success(resRegister?.message);

        const resLogin = await logIn({
          email: values?.email,
          password: values?.password,
        }).unwrap();

        if (resLogin) {
          toast.success(resLogin?.message);
        }
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStudentRegistrationSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    console.log('student', values);

    try {
      const resRegister = await studentRegister({
        ...values,
        confirm_password: values?.password,
      }).unwrap();

      if (resRegister) {
        toast.success(resRegister?.message);

        const resLogin = await logIn({
          email: values?.email,
          password: values?.password,
        }).unwrap();

        if (resLogin) {
          toast.success(resLogin?.message);
        }
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  console.log(initialValues?.user_role);

  return (
    <>
      <ToastContainer />
      <div
        className={`auth-page-wrapper auth-bg-cover d-flex flex-column justify-content-center align-items-center min-vh-100 `}
      >
        <div className={'bg-overlay'}></div>
        {/* <!-- auth-page content --> */}
        <div className="branding-area">
          <div className="container">
            <div className="brand-logo">
              <Link href="/">
                <Image src={eduSmartLogo} alt="Logo" />
              </Link>
            </div>
          </div>
        </div>
        <div className={`auth-page-content overflow-hidden py-5`}>
          <div className="container">
            <div className="row pt-1">
              <div className="col-lg-12 fs-2">
                <div className="card overflow-hidden">
                  {step === 1 && (
                    <>
                      <InitialInfo
                        step={step}
                        setStep={setStep}
                        onSubmit={handleAgentSubmit}
                        initialValues={initialValues}
                        validationSchema={initialStepValidationSchema}
                        formSubmit={'Continue To Register'}
                        setInitialValues={setInitialValues}
                      />
                    </>
                  )}
                  {step === 2 && (
                    <EmailOtp
                      step={step}
                      setStep={setStep}
                      userEmail={initialValues?.email}
                    />
                  )}
                  {step === 3 && <EmailDone step={step} setStep={setStep} />}
                  {step === 4 && (
                    <>
                      <DetailsInfo
                        formSubmit={'Complete Register'}
                        initialValues={initialValues}
                        agentRegistrationValidationSchema={
                          agentRegistrationValidationSchema
                        }
                        handleRegistrationSubmit={
                          initialValues?.user_role === 'Student'
                            ? handleStudentRegistrationSubmit
                            : handleRegistrationSubmit
                        }
                      />
                    </>
                  )}
                </div>
                {/* <!-- end card --> */}
              </div>
              {/* <!-- end col --> */}
            </div>
            {/* <!-- end row --> */}
          </div>
          {/* <!-- end container --> */}
        </div>
        {/* <!-- end auth page content --> */}

        {/* <!-- footer --> */}
        <footer>
          <div className="container ">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0 fs-4">
                    &copy; {new Date().getFullYear()} EduSmart. Crafted with{' '}
                    <i className="mdi mdi-heart text-danger"></i> by Inleads IT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- end Footer --> */}
      </div>
      {/* <!-- end auth-page-wrapper --> */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" />
    </>
  );
};

export default Register;
