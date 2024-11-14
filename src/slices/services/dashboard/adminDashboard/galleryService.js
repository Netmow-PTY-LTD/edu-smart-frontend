const { default: axios } = require('axios');
const { baseURL } = require('@/slices/helper/helper');

const getAllGalleryItems = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/web/setting/gallery/',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const createGalleryItem = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/web/setting/gallery/',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getSingleGalleryItem = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/web/setting/gallery/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateGalleryItem = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/web/setting/gallery/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const deleteGalleryItem = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/web/setting/gallery/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateGalleryItemStatus = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/web/setting/gallery/${id}/status`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

module.exports = {
  getAllGalleryItems,
  createGalleryItem,
  getSingleGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  updateGalleryItemStatus,
};
