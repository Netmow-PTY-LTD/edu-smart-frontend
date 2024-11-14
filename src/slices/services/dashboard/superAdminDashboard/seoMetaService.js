const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const seoMetaForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/seo-meta'
  );
  return res.data;
};

const updateSeoMetaForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/seo-meta`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const setMetaServices = {
  seoMetaForSuperAdminService,
  updateSeoMetaForSuperAdminService,
};
