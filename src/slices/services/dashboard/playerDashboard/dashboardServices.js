const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const totalTeamsForPlayerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/player/api/v1/total-teams',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const totalSubscriptionForPlayerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/player/api/v1/total-subscription',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const dashboardForPlayerServices = {
  totalTeamsForPlayerService,
  totalSubscriptionForPlayerService,
};
