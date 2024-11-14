const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const clientHomeService = async (subDomain) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/admin/website/home/' +
      subDomain
  );
  return res.data;
};

module.exports = {
  clientHomeService,
};
