const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addSeasonalGameService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/add-seasonal-game',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllSeasonalGameServices = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/all-seasonal-game',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateSeasonalGameService = async (data) => {
  const token = localStorage.getItem('token');
  // const { id, ...restData } = data;
  const id = data.get('id');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/admin/api/v1/update-seasonal-game/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deleteSeasonalGameService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/delete-seasonal-game/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const addSeasonalGameDutyRosterService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/seasonal-game-duty-roster',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllSeasonalGameDutyRosterServices = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/seasonal-game-duty-roster/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateSeasonalGameDutyRosterService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data?.id;
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/api/v1/seasonal-game-duty-roster/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deleteSeasonalGameDutyRosterService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/seasonal-game-duty-roster/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const singleSeasonalGameService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/single-seasonal-game/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const postSeasonalgameCommentService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/seasonal-game-comment`,
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
const getSeasonalgameCommentService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/seasonal-game-comment/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const getSeasonalGameAttendanceService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/seasonal-game-attendance/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const deleteSeasonalGameAttendanceService = async (data) => {
  const token = localStorage.getItem('token');
  const events_id = data.events_id;
  const attendance_id = data.attendance_id;
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/admin/api/v1/seasonal-game-attendance`,
    {
      headers: {
        authorization: token,
      },
      params: {
        events_id: events_id,
        attendance_id: attendance_id,
      },
    }
  );
  return res.data;
};

const updateAttendanceService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/api/v1/event-activity`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const seasonalGameServices = {
  addSeasonalGameService,
  getAllSeasonalGameServices,
  updateSeasonalGameService,
  deleteSeasonalGameService,
  singleSeasonalGameService,
  addSeasonalGameDutyRosterService,
  getAllSeasonalGameDutyRosterServices,
  updateSeasonalGameDutyRosterService,
  deleteSeasonalGameDutyRosterService,
  postSeasonalgameCommentService,
  getSeasonalgameCommentService,
  getSeasonalGameAttendanceService,
  deleteSeasonalGameAttendanceService,
  updateAttendanceService,
};
