const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const allSeasonalGameForCommonService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/seasonal-game',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allGameScheduleForCommonService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/game-schedule-for-user',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allGameScheduleForUserInAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/game-schedule-for-user-by-others/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allWeeklyTrainingScheduleForCommonService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/weekly-training-schedule-for-user/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allCustomTrainingScheduleForCommonService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/Custom-training-schedule-for-user/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allGameScheduleForTeamCommonService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/game-schedule-for-team/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allCustomTrainingScheduleForTeamCommonService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/Custom-training-schedule-for-team/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allWeeklyTrainingScheduleForTeamCommonService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/weekly-training-schedule-for-team/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allSeasonalGameForTeamCommonService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/seasonal-game-for-team/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allEventsForTeamCommonService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/events-for-team/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allEventsForCommonService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/events`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const singleEventsForCommonService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/events-for-team/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allEventsActivityService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/events-activity/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const singleEventsActivityService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/events-activity/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const singleGameScheduleService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/single-game-schedule/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const singleTrainingScheduleService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/single-training-schedule/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllRSVPForSeasonalGameService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/all-seasonalgame-rsvp/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllRSVPForSeasonalGameForUserService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/all-seasonalgame-rsvp-for-user/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllRSVPForSpecialEventsService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/all-specialevent-rsvp/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllRSVPForSpecialEventsForUserService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/all-specialevent-rsvp-for-user/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const playerListForSeasonalGameInGuardianServices = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/guardian/player-seasonal-game/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const singleTeamProfileCommonServices = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/single-team/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const eventsForCommonServices = {
  allSeasonalGameForCommonService,
  allGameScheduleForCommonService,
  allWeeklyTrainingScheduleForCommonService,
  allCustomTrainingScheduleForCommonService,
  allWeeklyTrainingScheduleForTeamCommonService,
  allCustomTrainingScheduleForTeamCommonService,
  allGameScheduleForTeamCommonService,
  allSeasonalGameForTeamCommonService,
  allEventsForTeamCommonService,
  allEventsForCommonService,
  singleEventsForCommonService,
  allEventsActivityService,
  singleEventsActivityService,
  singleGameScheduleService,
  singleTrainingScheduleService,
  getAllRSVPForSeasonalGameService,
  getAllRSVPForSpecialEventsService,
  getAllRSVPForSeasonalGameForUserService,
  getAllRSVPForSpecialEventsForUserService,
  playerListForSeasonalGameInGuardianServices,
  allGameScheduleForUserInAdminService,
  singleTeamProfileCommonServices,
};
