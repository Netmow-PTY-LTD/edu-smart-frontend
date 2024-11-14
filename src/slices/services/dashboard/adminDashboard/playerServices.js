const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addPlayerService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/player',
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
const addPlayerForGuardianService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/add-player-for-guardian/${id}`,
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
const getPlayerForGuardianService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/all-players-for-guardian/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const getAllPlayerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/player',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const getLatestPlayerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/latest-player',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const getSinglePlayerService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/player/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const getTotalPlayerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/total-player',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const getGuardianFreePlayerService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/guardian-free-players',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const assignGuardianToPlayerService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/assign-player-to-guardian/${data?.id}`,
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

const deletePlayerService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/player/${id}`;
  const res = await axios.delete(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deletePlayerFromGuardainService = async (data) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/remove-player-from-guardian/${data?.id}`;
  const res = await axios.patch(url, data?.data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deletePlayerFromTeamService = async (data) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/remove-player-from-team/${data?.id}`;
  const res = await axios.patch(url, data?.data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const removeTeamService = async (data) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/remove-team-from-player/${data?.id}`;
  const res = await axios.put(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const removeTeamFromManagerService = async (data) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/remove-team-from-manager/${data?.id}`;
  const res = await axios.put(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const removeTeamsForTrainerService = async (data) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/remove-team-from-trainer/${data?.id}`;
  const res = await axios.put(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const updatePlayerService = async (data) => {
  const token = localStorage.getItem('token');
  // const { id, ...restData } = data;
  const id = data.get('id');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/player/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

export const playerServices = {
  addPlayerService,
  getAllPlayerService,
  getLatestPlayerService,
  getSinglePlayerService,
  getTotalPlayerService,
  addPlayerForGuardianService,
  getPlayerForGuardianService,
  deletePlayerService,
  getGuardianFreePlayerService,
  assignGuardianToPlayerService,
  updatePlayerService,
  removeTeamService,
  removeTeamFromManagerService,
  removeTeamsForTrainerService,
  deletePlayerFromGuardainService,
  deletePlayerFromTeamService,
};
