const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const allTeamsForPlayerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/player/api/v1/all-teams',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const singleTeamsForPlayerService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/player/api/v1/teams/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const teamsForPlayerServices = {
  allTeamsForPlayerService,
  singleTeamsForPlayerService,
};
