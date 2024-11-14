const { default: axios } = require('axios');

const addEventScheduleService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/add-schedule`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const updateEventScheduleService = async (data) => {
  const id = data?.id;
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/event-schedule/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deleteEventScheduleService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/event-schedule/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const eventsScheduleServices = {
  addEventScheduleService,
  updateEventScheduleService,
  deleteEventScheduleService,
};
