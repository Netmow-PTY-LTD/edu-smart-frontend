const { default: axios } = require('axios');

const sslCommerzeInitService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/ssl-payment-intend',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const sslCommerzeForCommonInitService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/ssl-payment-intend',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const sslCommerzeServices = {
  sslCommerzeInitService,
  sslCommerzeForCommonInitService,
};
