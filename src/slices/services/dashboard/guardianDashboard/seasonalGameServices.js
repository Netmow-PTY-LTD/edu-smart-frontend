const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const allSeasonalGameForGuardianService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/guardian/api/v1/seasonal-game',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const singleSeasonalGameForGuardianService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/seasonal-game/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const joinSeasonalGameForGuardianService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/guardian/api/v1/join-seasonal-game/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const seasonalGameInvoiceForGuardianService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/guardian/api/v1/seasonal-game-invoice/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const seasonalGameForGuardianServices = {
  allSeasonalGameForGuardianService,
  singleSeasonalGameForGuardianService,
  joinSeasonalGameForGuardianService,
  seasonalGameInvoiceForGuardianService,
};
