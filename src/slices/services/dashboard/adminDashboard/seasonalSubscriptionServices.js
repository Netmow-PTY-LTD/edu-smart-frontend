const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addSeasonalSubscriptionsService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/add-seasonal-subscription',
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
const getAllSeasonalSubscriptionsService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/all-seasonal-subscription',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const deleteSeasonalSubscriptionService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/Seasonal-subscription/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateSeasonalSubscriptionService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/seasonal-subscription/${id}`,
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

export const seasonalSubscriptionServices = {
  addSeasonalSubscriptionsService,
  getAllSeasonalSubscriptionsService,
  deleteSeasonalSubscriptionService,
  updateSeasonalSubscriptionService,
};
