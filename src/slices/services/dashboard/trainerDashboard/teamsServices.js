const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const totalTeamListForTrainerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/trainer/api/v1/trainer-team-list',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const singleTeamForTrainerService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/trainer/api/v1/trainer-single-team-info/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const teamsForTrainerServices = {
  totalTeamListForTrainerService,
  singleTeamForTrainerService,
};
