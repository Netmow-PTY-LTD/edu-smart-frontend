const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addFeatureForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/features',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allFeatureForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/feature',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const updateFeatureForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/features/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deleteFeatureForSuperAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/features/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const featureServices = {
  addFeatureForSuperAdminService,
  allFeatureForSuperAdminService,
  updateFeatureForSuperAdminService,
  deleteFeatureForSuperAdminService,
};
