const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addClientsForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/client',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allClientsForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/client',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const updateClientsForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/client/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deleteClientsForSuperAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/client/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const clientsServices = {
  addClientsForSuperAdminService,
  updateClientsForSuperAdminService,
  deleteClientsForSuperAdminService,
  allClientsForSuperAdminService,
};
