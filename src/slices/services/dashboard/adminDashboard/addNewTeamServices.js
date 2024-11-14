const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addNewTeamService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/team',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};
const getAllTeamService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/team',
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};
const getLatestTeamService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/latest-team',
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};
const getTotalTeamService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/total-team',
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

const assignTeamToPlayer = async (data) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/assign-team/${data?.id}`;
  const res = await axios.post(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const assignTeamToManager = async (data) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/assign-team-to-manager/${data?.id}`;
  const res = await axios.put(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const assignTeamForTrainerService = async (data) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/assign-team-to-trainer/${data?.id}`;
  const res = await axios.put(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const assignPlayerToTeam = async (data) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/assign-player/${data?.id}`;
  const res = await axios.post(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const getAllTeamsForPlayerService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/all-team-for-player/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const getAllTeamsToManagerService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/all-team-for-manager/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const getAllTeamsForTrainerService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/all-team-for-trainer/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const getPlayerListForAssignIntoTeamService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/player-list-for-assign-in-team/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const getAllTeamListForPlayerService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/all-remain-team-for-player/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const getAllTeamListForManagerService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/all-remain-team-for-manager/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const getAllTeamListForTrainerService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/all-remain-team-for-trainer/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deleteTeamService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/team/${id}`;
  const res = await axios.delete(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const updateTeamService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('team_id');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/team/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const getSingleTeamService = async ({ id }) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/team/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};
export const teamServices = {
  addNewTeamService,
  getAllTeamService,
  getLatestTeamService,
  getTotalTeamService,
  assignTeamToPlayer,
  getAllTeamsForPlayerService,
  getAllTeamListForPlayerService,
  deleteTeamService,
  updateTeamService,
  getAllTeamsToManagerService,
  getAllTeamListForManagerService,
  getAllTeamsForTrainerService,
  getAllTeamListForTrainerService,
  assignTeamToManager,
  assignTeamForTrainerService,
  assignPlayerToTeam,
  getPlayerListForAssignIntoTeamService,
  getSingleTeamService,
};
