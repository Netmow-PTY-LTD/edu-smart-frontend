const { default: axios } = require('axios');
const { baseURL } = require('@/slices/helper/helper');

const getWebInfoService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/web/setting/web-info/',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateWebInfoService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/web/setting/web-info/',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateNavMenu = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/nav-menu/',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getNavMenu = async (subdomain) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/nav-menu/' +
      subdomain,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const updateFooterMenu = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/footer-menu/',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getFooterMenu = async (subdomain) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/public/api/v1/footer-menu/' +
      subdomain,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const webInfoServices = {
  getWebInfoService,
  updateWebInfoService,
  updateNavMenu,
  getNavMenu,
  updateFooterMenu,
  getFooterMenu,
};
