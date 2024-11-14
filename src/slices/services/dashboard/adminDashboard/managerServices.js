const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addManagerService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/manager',
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
const getAllManagerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/manager',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateManagerService = async (data) => {
  const token = localStorage.getItem('token');
  // const { id, ...restData } = data;
  const id = data.get('id');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/manager/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deleteManagerService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/manager/${id}`;
  const res = await axios.delete(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const getSingleManagerService = async ({ id }) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/manager/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

export const managerServices = {
  addManagerService,
  getAllManagerService,
  updateManagerService,
  deleteManagerService,
  getSingleManagerService,
};
