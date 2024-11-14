const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const sendOtpService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/otp',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const checkOtpService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/check-otp',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const registrationService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/register',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const loginService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/login',
    data
  );
  return res.data;
};
const loginWithSocialService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/login-with-social',
    data
  );
  return res.data;
};

const checkSubdomainService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/check-subdomain',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const userInfoService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/userinfo',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getSubdomainServices = async (data) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/get-subdomain',
    {
      headers: data,
    }
  );
  return res.data;
};

const googleLoginService = async (data) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/google-auth',
    data
  );
  return res.data;
};
const forgotPasswordService = async (data) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/forgot-password',
    data
  );
  return res.data;
};

const resetPasswordService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/change-password',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const playerRegistrationService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/register-player',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const guardianRegistrationService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/register-guardian',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const authServices = {
  sendOtpService,
  checkOtpService,
  registrationService,
  loginService,
  checkSubdomainService,
  userInfoService,
  getSubdomainServices,
  googleLoginService,
  forgotPasswordService,
  resetPasswordService,
  playerRegistrationService,
  guardianRegistrationService,
  loginWithSocialService,
};
