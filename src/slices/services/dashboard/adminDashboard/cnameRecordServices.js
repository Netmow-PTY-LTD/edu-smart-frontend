/* eslint-disable no-useless-catch */
const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addCnameService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/cname-record',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};
const getAllCnameService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/cname-record',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateCnameService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  try {
    const response = await axios.patch(
      process.env.NEXT_PUBLIC_BASE_URL_PROD +
        `/admin/api/v1/cname-record/${id}`,
      data,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteCnameService = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_BASE_URL_PROD +
        `/admin/api/v1/cname-record/${id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cnameServices = {
  addCnameService,
  getAllCnameService,
  updateCnameService,
  deleteCnameService,
};
