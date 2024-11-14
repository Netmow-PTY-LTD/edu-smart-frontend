const { default: axios } = require('axios');

const addShopCategoryService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/category`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allShopCategoryService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/category`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const editShopCategoryService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/shop/category/${data?.id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deleteShopCategoryService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/category/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const shopServices = {
  addShopCategoryService,
  allShopCategoryService,
  editShopCategoryService,
  deleteShopCategoryService,
};
