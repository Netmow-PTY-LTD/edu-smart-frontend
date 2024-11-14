const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addTrainerService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/trainer',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllTrainerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/trainer',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateTrainerService = async (data) => {
  const token = localStorage.getItem('token');
  // const { id, ...restData } = data;
  const id = data.get('id');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/trainer/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deleteTrainerService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/trainer/${id}`;
  const res = await axios.delete(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const getSingleTrainerService = async ({ id }) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/trainer/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

export const trainerServices = {
  addTrainerService,
  getAllTrainerService,
  updateTrainerService,
  deleteTrainerService,
  getSingleTrainerService,
};
