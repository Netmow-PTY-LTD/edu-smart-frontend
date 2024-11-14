const { default: axios } = require('axios');
const { baseURL } = require('@/slices/helper/helper');

const getSlides = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/web/setting/slider/',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const createSlides = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/web/setting/slider/',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getSingleSlide = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/web/setting/slider/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateSlide = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/web/setting/slider/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const deleteSlide = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/web/setting/slider/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateSlideStatus = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/web/setting/slider/${id}/status`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

module.exports = {
  getSlides,
  createSlides,
  getSingleSlide,
  updateSlide,
  deleteSlide,
  updateSlideStatus,
};
