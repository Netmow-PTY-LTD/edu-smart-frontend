const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const allcontactMessageForSAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/contact-messages',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const singleContactMessageForSAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/supper/api/v1/contact-message/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const deletecontactMessageForSAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/supper/api/v1/contact-message/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const contactMessageForSAdminServices = {
  allcontactMessageForSAdminService,
  singleContactMessageForSAdminService,
  deletecontactMessageForSAdminService,
};
