/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

import DetailsInfo from '@/components/register/DetailsInfo';
import EmailDone from '@/components/register/EmailDone';
import EmailOtp from '@/components/register/EmailOtp';
import InitialInfo from '@/components/register/InitialInfo';
import {
  getSubdomain,
  guardianRegistration,
  login,
  loginWithSocial,
  playerRegistration,
  registration,
} from '@/slices/dashboard/adminDashboard/Actions/authActions';
import {
  emptyCheckOtp,
  emptyLogin,
  emptySendOtp,
} from '@/slices/dashboard/adminDashboard/reducer';
import { getSubdomainHelperFunction } from '@/slices/helper/getSubdomain';
import { getTheme } from '@/slices/home/actions/organizationAction';
import { mdiHeart } from '@mdi/js';
import Icon from '@mdi/react';
import { countryToCurrencyData } from 'get-currency-by-country';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import mainLogo from '../../../public/assets/img/main_logo.png';

const appEnvironment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [locationName, setLocationName] = useState('');
  const [selectCountry, setSelectCountry] = useState('');
  const [userRole, setUserRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userInfoData, setUserInfoData] = useState({
    organisation_name: '',
    subdomain: '',
    phone: '',
    sports_category: '',
    email: '',
    password: '',
    confrim_password: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    first_name: '',
    last_name: '',
    gender: '',
    height: '',
    weight: '',
    date_of_birth: '',
    jersey_number: '',
    reg_fee: '',
  });

  const socialRef = router.query?.socialRef;

  useEffect(() => {
    if (socialRef) {
      const fetchData = async (socialRef) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/user-register-social-data/${socialRef}`
          );
          const result = await response.json();

          const payload = {
            email: result?.email,
            first_name: result?.first_name,
            last_name: result?.last_name,
            terms: true,
          };

          if (result?.provider === 'google') {
            payload.googleId = result.socialId;
          }
          if (result?.provider === 'linkedin') {
            payload.linkedinId = result.socialId;
          }

          setUserInfoData((prevState) => ({
            ...prevState,
            email: payload?.email,
            first_name: payload?.first_name,
            last_name: payload?.last_name,
            terms: payload?.terms,
            googleId: payload?.googleId ? payload?.googleId : '',
            linkedinId: payload?.linkedinId ? payload?.linkedinId : '',
            user_role: result?.userType,
          }));
          setStep(4);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData(socialRef);
    }
  }, [socialRef]);

  useEffect(() => {
    dispatch(emptySendOtp());
    dispatch(emptyCheckOtp());
    dispatch(emptyLogin());
  }, [dispatch]);

  const {
    data: loginData,
    isLoading: loginIsLoading,
    error: loginError,
  } = useSelector((state) => state.AdminDashboard.login);

  const { isLoading: playerRegistrationIsLoading } = useSelector(
    (state) => state.AdminDashboard.playerRegistration
  );

  const { isLoading: guardianRegistrationIsLoading } = useSelector(
    (state) => state.AdminDashboard.guardianRegistration
  );

  const {
    data: registrationData,
    isLoading: registrationIsLoading,
    error: registrationError,
  } = useSelector((state) => state.AdminDashboard.registration);

  const { data: subdomainData } = useSelector(
    (state) => state.AdminDashboard.getSubdomain
  );

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    if (registrationError) {
      toast.error(registrationError);
    }
  }, [registrationError]);

  useEffect(() => {
    dispatch(getTheme(getSubdomainHelperFunction()));
  }, [dispatch]);

  useEffect(() => {
    if (loginData?.token) {
      localStorage.setItem('token', loginData?.token);
      dispatch(
        getSubdomain({
          authorization: loginData?.token,
        })
      );
    }
  }, [loginData.token, dispatch]);

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

  const changeHandler = (value) => {
    setUserInfoData((prev) => ({
      ...prev,
      country: value?.label,
    }));

    setSelectCountry(value);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // eslint-disable-next-line no-useless-escape
    const subdomainRegex = /^[a-zA-Z0-9]+$/;

    if (name === 'subdomain' && value !== '') {
      if (!subdomainRegex.test(value)) {
        setErrorMessage(
          'Invalid subdomain: no spaces or special characters allowed.'
        );
      } else {
        setErrorMessage('');
      }
    }

    if (type === 'file') {
      setUserInfoData({
        ...userInfoData,
        [name]: e.target.files[0].name,
      });
    } else {
      setUserInfoData({
        ...userInfoData,
        [name]: value,
      });
    }
  };

  const handledate_of_birthChange = (selectedDates, dateStr) => {
    setUserInfoData({
      ...userInfoData,
      date_of_birth: dateStr,
    });
  };

  const logo =
    themeData?.subdomain && themeData?.branding?.logo?.secure_url
      ? `${themeData?.branding?.logo?.secure_url}`
      : `${mainLogo.src}`;

  const altName =
    themeData?.subdomain && themeData?.organisation_name
      ? `${themeData?.organisation_name}`
      : 'SquadDeck';

  // for player registration
  const handlePlayerRegister = async (e) => {
    e.preventDefault();

    const {
      email,
      password,
      confirm_password,
      address_line_2,
      date_of_birth,
      first_name,
      gender,
      height,
      // jersey_number,
      last_name,
      phone,
      weight,
    } = userInfoData || {};

    const newData = {
      ...userInfoData,
      email,
      password,
      confirm_password,
      address_line_1:
        locationName?.street_number && locationName?.route
          ? `${locationName?.street_number} ${locationName?.route}`
          : userInfoData?.address_line_1 || '',
      address_line_2,
      city: locationName?.locality
        ? `${locationName?.locality}`
        : userInfoData?.city || '',
      state: locationName?.administrative_area_level_1
        ? `${locationName?.administrative_area_level_1}`
        : userInfoData?.state || '',
      zip: locationName?.postal_code
        ? `${locationName?.postal_code} `
        : userInfoData?.zip || '',
      country: locationName?.country
        ? `${locationName?.country} `
        : selectCountry?.label || '',
      date_of_birth,
      first_name,
      gender,
      height,
      // jersey_number,
      last_name,
      phone,
      weight,
      subdomain: themeData?.subdomain,
    };

    try {
      const res = await dispatch(playerRegistration(newData));
      if (res.error) {
        toast.error('Registration Failed. Please Try Again');
      } else {
        if (socialRef) {
          dispatch(
            loginWithSocial({
              email: newData?.email,
              googleId: newData?.googleId,
              linkedinId: newData?.linkedinId,
            })
          );
        } else {
          dispatch(
            login({ email: newData?.email, password: newData?.password })
          );
        }

        toast.success('Registration Is Successful', {
          onClose: () => {
            dispatch(emptySendOtp());
            dispatch(emptyCheckOtp());
          },
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  // for guardian registration
  const handleGuardianRegister = async (e) => {
    e.preventDefault();

    const {
      address_line_2,
      confirm_password,
      email,
      first_name,
      last_name,
      password,
      phone,
    } = userInfoData || {};

    const newData = {
      ...userInfoData,
      address_line_1:
        locationName?.street_number && locationName?.route
          ? `${locationName?.street_number} ${locationName?.route}`
          : userInfoData?.address_line_1 || '',
      address_line_2,
      city: locationName?.locality
        ? `${locationName?.locality}`
        : userInfoData?.city || '',
      state: locationName?.administrative_area_level_1
        ? `${locationName?.administrative_area_level_1}`
        : userInfoData?.state || '',
      zip: locationName?.postal_code
        ? `${locationName?.postal_code} `
        : userInfoData?.zip || '',
      country: locationName?.country
        ? `${locationName?.country} `
        : selectCountry?.label || '',
      confirm_password,
      email,
      first_name,
      last_name,
      password,
      phone,
      subdomain: themeData?.subdomain,
    };

    try {
      const res = await dispatch(guardianRegistration(newData));
      if (res.error) {
        toast.error('Registration Failed. Please Try Again');
      } else {
        if (socialRef) {
          dispatch(
            loginWithSocial({
              email: newData?.email,
              googleId: newData?.googleId,
              linkedinId: newData?.linkedinId,
            })
          );
        } else {
          dispatch(
            login({ email: newData?.email, password: newData?.password })
          );
        }

        toast.success('Registration Is Successful', {
          onClose: () => {
            dispatch(emptySendOtp());
            dispatch(emptyCheckOtp());
          },
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  const handleAdminRegister = async (e) => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      organisation_name,
      subdomain,
      address_line_2,
      phone,
      reg_fee,
    } = userInfoData || {};

    const newData = {
      ...userInfoData,
      first_name,
      last_name,
      organisation_name,
      subdomain,
      sports_category:
        userInfoData?.sports_category === 'other'
          ? userInfoData?.other_sports
          : userInfoData?.sports_category,
      address_line_1:
        locationName?.street_number && locationName?.route
          ? `${locationName?.street_number} ${locationName?.route}`
          : userInfoData?.address_line_1 || '',
      address_line_2,
      city: locationName?.locality
        ? `${locationName?.locality}`
        : userInfoData?.city || '',
      state: locationName?.administrative_area_level_1
        ? `${locationName?.administrative_area_level_1}`
        : userInfoData?.state || '',
      zip: locationName?.postal_code
        ? `${locationName?.postal_code} `
        : userInfoData?.zip || '',
      country: locationName?.country
        ? `${locationName?.country} `
        : selectCountry?.label || '',
      phone,
      package: router?.query?.id,
      player_registration_fee: reg_fee,
    };

    try {
      const res = await dispatch(registration(newData));
      if (res.error) {
        toast.error('Registration Failed. Please Try Again');
      } else {
        if (socialRef) {
          dispatch(
            loginWithSocial({
              email: newData?.email,
              googleId: newData?.googleId,
              linkedinId: newData?.linkedinId,
            })
          );
        } else {
          dispatch(
            login({ email: newData?.email, password: newData?.password })
          );
        }

        toast.success('Registration Is Successful', {
          onClose: () => {
            dispatch(emptySendOtp());
            dispatch(emptyCheckOtp());
          },
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    if (locationName?.country) {
      setSelectCountry({
        label: locationName?.country,
        value: locationName?.country,
      });
    }
  }, [locationName?.country]);

  const countryData = countryToCurrencyData[selectCountry?.label];
  const currency = countryData?.currency;

  return (
    <>
      {/* <!-- auth-page wrapper --> */}
      <div
        className={`auth-page-wrapper auth-bg-cover d-flex flex-column justify-content-center align-items-center min-vh-100 `}
      >
        <ToastContainer />
        <div className={'bg-overlay'}></div>
        {/* <!-- auth-page content --> */}
        <div className={`auth-page-content overflow-hidden py-5`}>
          <div className="container">
            <div className="row pt-1">
              <div className="col-lg-12 fs-2">
                <div className="card overflow-hidden border-0">
                  <div className="row justify-content-center g-0">
                    <div className="col-lg-6">
                      <div className={`p-lg-5 p-4 auth-one-bg h-100`}>
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
                            <p className="fs-15 fst-italic text-white">
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
                    <div className="col-lg-6">
                      {step === 1 && (
                        <>
                          <InitialInfo
                            setUserInfo={setUserInfoData}
                            userInfo={userInfoData}
                            step={step}
                            setStep={setStep}
                            subdomain={themeData?.subdomain}
                            setUserRole={setUserRole}
                            userRole={userRole}
                          />
                        </>
                      )}
                      {step === 2 && (
                        <EmailOtp
                          userEmail={userInfoData.email}
                          step={step}
                          setStep={setStep}
                          subdomain={themeData?.subdomain}
                        />
                      )}
                      {step === 3 && (
                        <EmailDone
                          userInfo={userInfoData}
                          setUserInfo={setUserInfoData}
                          step={step}
                          setStep={setStep}
                        />
                      )}
                      {step === 4 && (
                        <>
                          <DetailsInfo
                            userInfo={userInfoData}
                            setUserInfo={setUserInfoData}
                            step={step}
                            setStep={setStep}
                            handleInputChange={handleInputChange}
                            handledate_of_birthChange={
                              handledate_of_birthChange
                            }
                            changeHandler={changeHandler}
                            handleAllUserRegistration={
                              themeData?.subdomain &&
                              userInfoData?.user_role === 'player'
                                ? handlePlayerRegister
                                : themeData?.subdomain &&
                                    userInfoData?.user_role === 'guardian'
                                  ? handleGuardianRegister
                                  : handleAdminRegister
                            }
                            subdomain={themeData?.subdomain}
                            isLoading={
                              themeData?.subdomain &&
                              userInfoData?.user_role === 'player'
                                ? playerRegistrationIsLoading
                                : themeData?.subdomain &&
                                    userInfoData?.user_role === 'guardian'
                                  ? guardianRegistrationIsLoading
                                  : registrationIsLoading
                            }
                            currency={currency}
                            errorMessage={errorMessage}
                            setLocationName={setLocationName}
                            locationName={locationName}
                            socialRef={socialRef}
                          />
                        </>
                      )}
                    </div>
                  </div>
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
                  <p className="mb-0 fs-4 text-light">
                    &copy; {new Date().getFullYear()} SquadDeck. Crafted with{' '}
                    <Icon path={mdiHeart} size={1} color="red" /> by NETMOW
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
export async function getServerSideProps() {
  try {
    const seoData = {
      title: `Register for squaddeck's Advanced Club and Academy Software`,
      description:
        'Register with SquadDeck to streamline sports club management. Enjoy advanced features for efficient operations and enhanced team connectivity. Sign up today!',
      keywords: 'squddeck,registration',
      // image: SEOMetaData?.news_feature_image?.secure_url || '',
    };

    return {
      props: {
        metaTags: seoData,
      },
    };
  } catch (error) {
    return {
      props: {
        metaTags: null,
        error: 'Error fetching SEO metadata',
      },
    };
  }
}
export default Register;
