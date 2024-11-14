const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const clientEventsService = async (subdomain) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/admin/website/seasonal-games/${subdomain}`
  );
  return res.data;
};

const clientSingleEventsService = async (data) => {
  const subdomain = data.subdomain;
  const id = data.id;
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/admin/website/${subdomain}/seasonal-game/${id}`
  );
  return res.data;
};

module.exports = {
  clientEventsService,
  clientSingleEventsService,
};
