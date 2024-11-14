const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const clientNewsService = async (data) => {
  const subDomain = data?.subdomain;
  const page = data?.page || 1;
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/admin/website/news?page=${page}&subdomain=${subDomain}`
  );
  return res.data;
};

const clientSingleNewsService = async (data) => {
  const subDomain = data.subdomain;
  const id = data.id;
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/admin/website/news/${id}?subdomain=${subDomain}`
  );
  return res.data;
};

module.exports = {
  clientNewsService,
  clientSingleNewsService,
};
