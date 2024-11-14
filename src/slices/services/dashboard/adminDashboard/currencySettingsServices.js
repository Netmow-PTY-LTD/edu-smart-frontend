const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addCurrencySettingsService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/currency',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getCurrencySettingsService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/currency',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const getGstAndCurrencyService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/get-currency',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const getSuperAdminCurrencyAndGstService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/get-super-admin-currency-gst',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

export const currencySettingsServices = {
  addCurrencySettingsService,
  getCurrencySettingsService,
  getGstAndCurrencyService,
  getSuperAdminCurrencyAndGstService,
};
