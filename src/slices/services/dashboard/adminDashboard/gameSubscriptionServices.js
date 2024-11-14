const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addGameSubscriptionsService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/add-game-subscription',
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
const getAllGameSubscriptionsService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/all-game-subscription',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const deleteGameSubscriptionService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/game-subscription/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateGameSubscriptionService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/game-subscription/${id}`,
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

export const gameSubscriptionServices = {
  addGameSubscriptionsService,
  getAllGameSubscriptionsService,
  deleteGameSubscriptionService,
  updateGameSubscriptionService,
};
