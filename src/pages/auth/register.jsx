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
  useUniversityRegisterMutation,
} from '@/slice/services/public/auth/authService';
import { brandlogo } from '@/utils/common/data';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
// import eduSmartLogo from '../../../public/assets/images/edusmart_logo.png';

const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  const [step, setStep] = useState(1);
  const [checkExistingUser, setCheckExistingUser] = useState('');

  console.log('from register page==>', query);

  const [logIn, { data: LoginData }] = useLogInMutation();
  const [generateOtp] = useGenerateOtpMutation();
  const [agentRegister] = useAgentRegisterMutation();
  const [studentRegister] = useStudentRegisterMutation();
  const [universityRegister] = useUniversityRegisterMutation();

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

  const searchParams = useSearchParams();
  const package_choice = searchParams.get('packageId');
  const course_choice = searchParams.get('courseId');
  const universityId = searchParams.get('universityId');

  //console.log('Package ID:', packageChoice);

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
    terms_and_conditions: false,
    user_role: '',
  });

  useEffect(() => {
    if (course_choice) {
      setInitialValues((prev) => ({
        ...prev,
        user_role: 'Student',
      }));
    }
  }, [course_choice]);

  useEffect(() => {
    if (package_choice) {
      setInitialValues((prev) => ({
        ...prev,
        user_role: 'Agent',
      }));
    } else if (query?.userRole === 'student') {
      setInitialValues((prev) => ({
        ...prev,
        user_role: 'Student',
      }));
    }
  }, [package_choice, query]);

  //console.log(initialValues);

  var initialStepValidationSchema;
  if (package_choice) {
    initialStepValidationSchema = Yup.object({
      //user_role: Yup.string().required('Please Select User First'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
      terms_and_conditions: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('terms_and_conditions is required'),
    });
  } else {
    initialStepValidationSchema = Yup.object({
      user_role: Yup.string().required('Please Select User First'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
      terms_and_conditions: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('terms_and_conditions is required'),
    });
  }

  const agentRegistrationValidationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),

    subdomain: Yup.string().test(
      'subdomain-required',
      'Subdomain is required',
      function (value) {
        const { user_role } = this.parent;
        if (user_role !== 'Student' && user_role !== 'University' && !value) {
          return false;
        }
        return true;
      }
    ),

    phone: Yup.string().required('Phone is required'),
    address_line_1: Yup.string().required('Address Line 1 is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip is required'),
  });

  const handleAgentSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);

    try {
      const updatedValues = { ...values, email: values?.email, package_choice };
      console.log(updatedValues);
      if (checkExistingUser) {
        toast.error('Email already exists');
      } else {
        const res = await generateOtp(updatedValues).unwrap();
        if (res) {
          setCheckExistingUser('');
          setInitialValues(values);
          toast.success(res?.message);
          setStep(step + 1);
        }
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

    // console.log('agent', values);

    try {
      const updatedRegisterValues = {
        ...values,
        confirm_password: values?.password,
        package_choice,
        course_choice,
      };

      const resRegister = await agentRegister(updatedRegisterValues).unwrap();

      if (resRegister) {
        toast.success(resRegister?.message);

        const resLogin = await logIn({
          email: values?.email,
          password: values?.password,
        }).unwrap();

        if (resLogin) {
          toast.success(resLogin?.message);
          Cookies.set('course_choice', course_choice, { expires: 1 });
          Cookies.set('universityId', universityId, { expires: 1 });
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

    // console.log('student', values);

    try {
      const updatedStudentRegisterValues = {
        ...values,
        confirm_password: values?.password,
        course_choice,
      };
      const resRegister = await studentRegister(
        updatedStudentRegisterValues
      ).unwrap();

      if (resRegister) {
        toast.success(resRegister?.message);

        const resLogin = await logIn({
          email: values?.email,
          password: values?.password,
        }).unwrap();

        if (resLogin) {
          toast.success(resLogin?.message);

          if (course_choice) {
            Cookies.set('course_choice', course_choice, { expires: 1 });
          } else {
            console.log('course_choice is not present in the URL');
          }

          if (universityId) {
            Cookies.set('universityId', universityId, { expires: 1 });
          } else {
            console.log('universityId is not present in the URL');
          }

          // Cookies.set('course_choice', course_choice, { expires: 1 });
          // Cookies.set('universityId', universityId, { expires: 1 });
        }
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUniversityRegistrationSubmit = async (
    values,
    { setSubmitting }
  ) => {
    setSubmitting(true);

    // console.log('university', values);

    try {
      const resRegister = await universityRegister({
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

  //console.log(initialValues);

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
                <Image src={brandlogo} width={300} height={80} alt="Logo" />
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
                        setCheckExistingUser={setCheckExistingUser}
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
                            : initialValues?.user_role === 'Agent'
                              ? handleRegistrationSubmit
                              : handleUniversityRegistrationSubmit
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
