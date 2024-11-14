const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addPlayerSubscriptionsService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/add-player-subscription',
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
const getAllPlayerSubscriptionsService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/all-player-subscription',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const deletePlayerSubscriptionService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/Player-subscription/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updatePlayerSubscriptionService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/player-subscription/${id}`,
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

export const playerSubscriptionServices = {
  addPlayerSubscriptionsService,
  getAllPlayerSubscriptionsService,
  deletePlayerSubscriptionService,
  updatePlayerSubscriptionService,
};
