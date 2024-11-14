const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addPackageForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/package',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allPackageForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/admin/website/packages',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const singlePackageForSuperAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/package/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const updatePackageForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/package/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deletePackageForSuperAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/package/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const packagesServices = {
  addPackageForSuperAdminService,
  allPackageForSuperAdminService,
  singlePackageForSuperAdminService,
  updatePackageForSuperAdminService,
  deletePackageForSuperAdminService,
};
