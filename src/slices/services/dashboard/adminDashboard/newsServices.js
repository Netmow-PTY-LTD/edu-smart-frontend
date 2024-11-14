const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const AddCategoryService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/news/categories',
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

const editCategoryService = async (data) => {
  const id = data?.id;
  const name = data?.name;
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/news/categories/${id}`,
    { name: name },
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const getAllCategoriesService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/news/categories',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const AddNewsService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/news',
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

const getAllNewsService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/news',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const getSingleNews = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/news/${id}`;
  const res = await axios.get(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const updateNewsService = async (data) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/news/${data.id}`;
  const res = await axios.put(url, data.formattedNewsData, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const deleteNewsService = async (id) => {
  const token = localStorage.getItem('token');
  const url =
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/news/${id}`;
  const res = await axios.delete(url, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

export const newsServices = {
  AddCategoryService,
  getAllCategoriesService,
  AddNewsService,
  getAllNewsService,
  updateNewsService,
  getSingleNews,
  deleteNewsService,
  editCategoryService,
};
