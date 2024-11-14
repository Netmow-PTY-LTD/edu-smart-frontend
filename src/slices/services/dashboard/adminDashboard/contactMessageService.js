const { default: axios } = require('axios');
const { baseURL } = require('@/slices/helper/helper');

const getAllContactMessagesService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/web/contact-messages/' +
      id,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const contactServices = {
  getAllContactMessagesService,
};
