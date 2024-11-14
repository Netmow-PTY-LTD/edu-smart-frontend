const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const clientAboutService = async (subdomain) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/admin/website/about/' +
      subdomain
  );
  return res.data;
};

module.exports = {
  clientAboutService,
};
