const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

export const updateSlide = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/company-information`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
