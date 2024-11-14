const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const clientTeamService = async (data) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/admin/website/teams/' +
      data.subdomain
  );
  return res.data;
};

const getSingleTeam = async (data) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/admin/website/' +
      data.subdomain +
      '/team/' +
      data.teamId
  );
  return res.data;
};

module.exports = {
  clientTeamService,
  getSingleTeam,
};
