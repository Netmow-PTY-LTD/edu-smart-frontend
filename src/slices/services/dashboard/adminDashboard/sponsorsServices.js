const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addSponsorService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/add-sponsor',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllSponsorService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/all-sponsor',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const deleteSponsorService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/sponsor/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const updateSponsorService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/sponsor/${id}`,
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

const getSponsorsForEventsAndTeamsService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
    `/api/v1/sponsor-for-team-or-events/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

export const sponsorServices = {
  addSponsorService,
  getAllSponsorService,
  deleteSponsorService,
  updateSponsorService,
  getSponsorsForEventsAndTeamsService,
};
