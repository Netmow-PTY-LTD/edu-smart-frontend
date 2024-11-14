const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addNSService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/ns-record',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const getAllNSservice = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/ns-record',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const deleteNsService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/ns-record/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const updateNsSettingsService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/ns-record/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

export const nsServices = {
  addNSService,
  getAllNSservice,
  deleteNsService,
  updateNsSettingsService,
};
