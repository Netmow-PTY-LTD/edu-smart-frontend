const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const getThemeService = async (subdomain) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/theme/' + subdomain
  );

  localStorage.setItem('subdomain', res?.data?.subdomain);
  return res.data;
};

export const organizationServices = {
  getThemeService,
};
