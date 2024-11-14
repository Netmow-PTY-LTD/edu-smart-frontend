const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addSmtpSettingsService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/add-smtp',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const upadateSmtpSettingsService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/update-smtp',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const smtpSettingsServices = {
  addSmtpSettingsService,
  upadateSmtpSettingsService,
};
