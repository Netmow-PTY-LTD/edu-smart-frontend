const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addPlayerForGuardianService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/guardian/api/v1/player',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allPlayerForGuardianService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/guardian/api/v1/player',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allPlayerForGuardianRegistrationInvoicesService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/all-player-registration-invoice/guardian/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allPlayerForGuardianSeasonalGameInvoicesService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/all-player-subscription-invoice/guardian/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const singlePlayerForGuardianService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/guardian/api/v1/player/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deletePlayerForGuardianService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/guardian/api/v1/player/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const updatePlayerForGuardianService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/guardian/api/v1/player/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const totalPlayerForGuardianService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/guardian/api/v1/total-players',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const latestPlayerForGuardianService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/guardian/api/v1/latest-players',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const playerForGuardianSevices = {
  addPlayerForGuardianService,
  allPlayerForGuardianService,
  singlePlayerForGuardianService,
  deletePlayerForGuardianService,
  updatePlayerForGuardianService,
  totalPlayerForGuardianService,
  latestPlayerForGuardianService,
  allPlayerForGuardianRegistrationInvoicesService,
  allPlayerForGuardianSeasonalGameInvoicesService,
};
