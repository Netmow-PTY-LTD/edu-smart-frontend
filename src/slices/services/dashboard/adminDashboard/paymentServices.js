const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const stripePaymentService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/stripe-payment-intent',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const stripePaymentByAdminForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/stripe-payment-intend-by-admin',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const stripePaymentForPackageByAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/stripe-payment-intend-by-admin',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const createTransactionByAdminForSuperadmin = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/create-transaction-by-admin',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const stripeInfoService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/add-stripe',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateStripeInfoService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/update-stripe',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const addPaypalInfoService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/add-paypal',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updatePaypalInfoService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/update-paypal',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const addSslCommerzeInfoService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/add-sslcommerz',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateSslCommerzeInfoService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/update-sslcommerz',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const paymentServices = {
  stripePaymentService,
  stripeInfoService,
  updateStripeInfoService,
  addPaypalInfoService,
  updatePaypalInfoService,
  addSslCommerzeInfoService,
  updateSslCommerzeInfoService,
  stripePaymentByAdminForSuperAdminService,
  createTransactionByAdminForSuperadmin,
  stripePaymentForPackageByAdminService,
};
