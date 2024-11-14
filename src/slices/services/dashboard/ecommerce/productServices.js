const { default: axios } = require('axios');

const addEcommerceProductService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/product`,
    data,
    {
      headers: {
        authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res.data;
};
const allEcommerceProductService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/products`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const editEcommerceProductService = async (data) => {
  const id = data.get('id');
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/product/${id}`,
    data,
    {
      headers: {
        authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res.data;
};
const deleteEcommerceProductService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/product/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allOrderListsService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/public/api/v1/shop/order`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deleteOrderListsService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/shop/order/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getEcommerceOrderService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/order`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateEcommerceOrderService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/order/${data?.id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const ecommerceProductServices = {
  addEcommerceProductService,
  allEcommerceProductService,
  editEcommerceProductService,
  deleteEcommerceProductService,
  allOrderListsService,
  deleteOrderListsService,
  getEcommerceOrderService,
  updateEcommerceOrderService,
};
