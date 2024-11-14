const { default: axios } = require('axios');

const addProductSizeService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/size`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allProductSizeService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/size/all`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const editProductSizeService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/shop/size/${data?.id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deleteProductSizeService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/size/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const productSizeServices = {
  addProductSizeService,
  allProductSizeService,
  editProductSizeService,
  deleteProductSizeService,
};
