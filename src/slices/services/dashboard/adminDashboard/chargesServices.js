const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const pendingChargesListService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/pending-charges-list',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const paidgChargesListService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/paid-charges-list',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getSingleChargeDetailsService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/single-charges-details/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getMultipleChargeDetailsService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/multiple-charges-details/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const createTransectionService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/transaction',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getSinglePaidChargeDetailsService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/single-paid-charges-details/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getMultiplePaidChargeDetailsService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/multiple-paid-charges-details/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const chargesServices = {
  pendingChargesListService,
  paidgChargesListService,
  getSingleChargeDetailsService,
  getMultipleChargeDetailsService,
  createTransectionService,
  getMultiplePaidChargeDetailsService,
  getSinglePaidChargeDetailsService,
};
