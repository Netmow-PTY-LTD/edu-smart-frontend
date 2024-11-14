const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addCustomTrainingSchedule = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/add-custom-training-schedule',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllCustomTrainingSchedule = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/all-custom-training-schedule',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateCustomTrainingSchedule = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/custom-training-schedule/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deleteCustomTrainingSchedule = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/custom-training-schedule/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

export const customTrainingScheduleServices = {
  getAllCustomTrainingSchedule,
  addCustomTrainingSchedule,
  deleteCustomTrainingSchedule,
  updateCustomTrainingSchedule,
};
