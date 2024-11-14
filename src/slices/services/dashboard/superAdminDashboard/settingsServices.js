const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const updateSystemSettingsForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/system-authority',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getAllSystemSettingsForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/system-authority',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getSuperAdminInfoService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/public/api/v1/super-admin`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allDomainPointingRequestService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/supper/api/v1/domain-pointing-request`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const updateDomainPointingRequestService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data?.id;
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/supper/api/v1/domain-pointing-request/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const addCurrencyAndGstForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/add-currency-gst`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getCurrencyAndGstForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/get-currency-gst`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getCurrencyAndGstFromAdminToSAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/get-super-admin-currency-gst`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAdminGstCurrencySdfeeService = async (subdomain) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/admin-gst-currency-charge/${subdomain}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const settingsServices = {
  updateSystemSettingsForSuperAdminService,
  getSuperAdminInfoService,
  allDomainPointingRequestService,
  updateDomainPointingRequestService,
  getAllSystemSettingsForSuperAdminService,
  addCurrencyAndGstForSuperAdminService,
  getCurrencyAndGstForSuperAdminService,
  getCurrencyAndGstFromAdminToSAdminService,
  getAdminGstCurrencySdfeeService,
};
