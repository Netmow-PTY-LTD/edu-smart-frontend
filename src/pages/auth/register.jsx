/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

import DetailsInfo from '@/components/register/DetailsInfo';
import EmailDone from '@/components/register/EmailDone';
import EmailOtp from '@/components/register/EmailOtp';
import InitialInfo from '@/components/register/InitialInfo';
import Icon from '@mdi/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
      subdomain: '',
    };
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
      subdomain: '',
    };
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
  };

  useEffect(() => {
    if (locationName?.country) {
      setSelectCountry({
        label: locationName?.country,
        value: locationName?.country,
      });
    }
  }, [locationName?.country]);

  return (
    <>
      {/* <!-- auth-page wrapper --> */}
      <div
        className={`auth-page-wrapper auth-bg-cover d-flex flex-column justify-content-center align-items-center min-vh-100 `}
      >
        <div className={'bg-overlay'}></div>
        {/* <!-- auth-page content --> */}
        <div className="branding-area">
          <div className="container">
            <div className="brand-logo">
              <Link href="/">
                <img src="/assets/images/edusmart_logo.png" alt="Logo" />
              </Link>
            </div>
            {/* <h2 className="text-black fw-bold mt-4 fs-20 text-center">
              Register To EduSmart
            </h2> */}
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
                        setUserInfo={setUserInfoData}
                        userInfo={userInfoData}
                        step={step}
                        setStep={setStep}
                        subdomain={''}
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
                      subdomain={''}
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
                        handledate_of_birthChange={handledate_of_birthChange}
                        changeHandler={changeHandler}
                        handleAllUserRegistration={''}
                        subdomain={''}
                        isLoading={''}
                        currency={''}
                        errorMessage={errorMessage}
                        setLocationName={setLocationName}
                        locationName={locationName}
                        socialRef={socialRef}
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
                    MY
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
