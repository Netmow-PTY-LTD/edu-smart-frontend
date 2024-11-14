const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addWeeklyTrainingSchedule = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/add-weekly-training-schedule',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getAllWeeklyTrainingSchedule = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/all-weekly-training-schedule',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const deleteWeeklyTrainingSchedule = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/weekly-training-schedule/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateWeeklyTrainingSchedule = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/weekly-training-schedule/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

export const weeklyTrainingScheduleServices = {
  addWeeklyTrainingSchedule,
  getAllWeeklyTrainingSchedule,
  deleteWeeklyTrainingSchedule,
  updateWeeklyTrainingSchedule,
};
