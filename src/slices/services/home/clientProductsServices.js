const { default: axios } = require('axios');

const allEcommerceProductsService = async (subdomain) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/shop/product/active?subdomain=${subdomain}`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allEcommerceProductCategoriesService = async (subdomain) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/shop/product-categories/${subdomain}`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getProductBySlugService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/shop/product/${data.slug}/${data.subdomain}`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const addToCartService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/cart`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getAllCartItemsService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/cart`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateCartItemService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/cart/${data?.id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const deleteCartItemService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/cart/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const createOrderService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/public/api/v1/order`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const shoppingStripePaymentService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/shopping-stripe-payment-intent`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const ecommerceProductsServices = {
  allEcommerceProductsService,
  allEcommerceProductCategoriesService,
  getProductBySlugService,
  addToCartService,
  getAllCartItemsService,
  updateCartItemService,
  deleteCartItemService,
  createOrderService,
  shoppingStripePaymentService,
};
