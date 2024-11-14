const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addGamesForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/game',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allGamesForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/all-games',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const updateGamesForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/game/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deleteGamesForSuperAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/game/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const gamesServices = {
  addGamesForSuperAdminService,
  allGamesForSuperAdminService,
  updateGamesForSuperAdminService,
  deleteGamesForSuperAdminService,
};
