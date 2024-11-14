const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const add_game_shcedule_service = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/add-game-schedule',
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
const get_all_game_shcedule_service = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/all-game-schedule',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateGameScheduleService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/all-game-schedule/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deleteGameScheduleService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/all-game-schedule/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

export const game_shcedule_ervices = {
  add_game_shcedule_service,
  get_all_game_shcedule_service,
  updateGameScheduleService,
  deleteGameScheduleService,
};
