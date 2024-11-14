const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const menuService = async () => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/sadmin/website/menu'
  );
  return res.data;
};

const mainHomeService = async () => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/sadmin/website/home'
  );

  return res.data;
};

const getFeatureBySlugService = async (slug) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/sadmin/website/features/' +
      slug
  );

  return res.data;
};

const getAllSportsService = async () => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/sadmin/website/sports'
  );
  return res.data;
};

const getSportBySlugService = async (slug) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/sadmin/website/sports/' +
      slug
  );
  return res.data;
};

const pricingService = async () => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/sadmin/website/pricing'
  );
  return res.data;
};

module.exports = {
  menuService,
  mainHomeService,
  getFeatureBySlugService,
  getAllSportsService,
  getSportBySlugService,
  pricingService,
};
