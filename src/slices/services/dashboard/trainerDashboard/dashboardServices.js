const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const totalTeamsForTrainerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/trainer/api/v1/total-teams',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const totalGameScheduleForTrainerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/trainer/api/v1/total-game-schedule',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const totalTrainingScheduleForTrainerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/trainer/api/v1/total-training-schedule',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const dashboardServicesForTrainer = {
  totalTeamsForTrainerService,
  totalGameScheduleForTrainerService,
  totalTrainingScheduleForTrainerService,
};
