const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const allRegClientsForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/registered-client',

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const deleteRegisterClientsForSuperAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/supper/api/v1/registered-client/${id}`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allDemoClientsForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/book-demos',

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const deleteDemoClientsForSuperAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/book-demo/${id}`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const registeredAndDemoClientsServices = {
  allRegClientsForSuperAdminService,
  allDemoClientsForSuperAdminService,
  deleteDemoClientsForSuperAdminService,
  deleteRegisterClientsForSuperAdminService,
};
