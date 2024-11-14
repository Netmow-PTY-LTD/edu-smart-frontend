const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const postProfileSettingsForCommonService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/user-additional-info',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const changeEmailForCommonService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/change-email',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const changePasswordForCommonService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/change-password',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const profileSettingsForCommonServices = {
  postProfileSettingsForCommonService,
  changeEmailForCommonService,
  changePasswordForCommonService,
};
