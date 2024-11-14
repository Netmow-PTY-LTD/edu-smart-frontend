const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const allTeamListForManagerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/manager/api/v1/all-teams',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const singleTeamForManagerService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/manager/api/v1/teams/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const teamsForManagerServices = {
  allTeamListForManagerService,
  singleTeamForManagerService,
};
