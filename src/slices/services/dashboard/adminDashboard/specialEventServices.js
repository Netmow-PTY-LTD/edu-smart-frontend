const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addSpecialEvents = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/add-special-event',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllSpecialEvents = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/all-special-event',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const getUpcomingSpecialEvents = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/upcoming-special-event',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const getEndedSpecialEvents = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/ended-special-event',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const updateSpecialEvents = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/special-event/${id}`,
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
const deleteSpecialEvents = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/special-event/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

// duty rosters api's
const addSpecialEventDutyRosterService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/special-event-duty-roster',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getPlayerListForDutyRosterCommonService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/dutyroster-player-list/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllSpecialEventDutyRosterServices = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/special-event-duty-roster/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateSpecialEventDutyRosterService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data?.id;
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/api/v1/special-event-duty-roster/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deleteSpecialEventDutyRosterService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/special-event-duty-roster/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const postSpecialEventCommentService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/special-event-comment`,
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

const getSpecialEventCommentService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/special-event-comment/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
//
const singleSpecialEventService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/special-event/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const getSpecialEventAttendanceService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/api/v1/special-event-attendance/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deleteSpecialEventsAttendanceService = async (data) => {
  const token = localStorage.getItem('token');
  const events_id = data.events_id;
  const attendance_id = data.attendance_id;
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/admin/api/v1/special-event-attendance`,
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

export const SpecialEventServices = {
  addSpecialEvents,
  getAllSpecialEvents,
  getUpcomingSpecialEvents,
  getEndedSpecialEvents,
  updateSpecialEvents,
  deleteSpecialEvents,
  addSpecialEventDutyRosterService,
  getAllSpecialEventDutyRosterServices,
  updateSpecialEventDutyRosterService,
  deleteSpecialEventDutyRosterService,
  postSpecialEventCommentService,
  getSpecialEventCommentService,
  singleSpecialEventService,
  getSpecialEventAttendanceService,
  deleteSpecialEventsAttendanceService,
  getPlayerListForDutyRosterCommonService,
};
