const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addGuardianService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/guardian',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const getAllGuardianService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/guardian',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const getSingleGuardianService = async ({ id }) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/guardian/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const getTotalGuardianService = async () => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/total-guardian';
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const deleteGuardianService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/guardian/${id}`;
  const res = await axios.delete(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const updateGuardianService = async (data) => {
  const token = localStorage.getItem('token');
  // const { id, ...restData } = data;
  const id = data.get('id');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/guardian/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const getAllUnpaidPlayersForGuardianService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/all-unpaid-player/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

export const guardianServices = {
  addGuardianService,
  getAllGuardianService,
  getSingleGuardianService,
  getTotalGuardianService,
  deleteGuardianService,
  updateGuardianService,
  getAllUnpaidPlayersForGuardianService,
};
