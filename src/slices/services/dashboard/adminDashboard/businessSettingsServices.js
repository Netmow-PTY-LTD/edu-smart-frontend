const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addBusinessSettingsService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/company-information',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getAllBusinessSettingsService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/company-information',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const upgradeSubscriptionPackageService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data?.id;
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/upgrade-package/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const createTransactionForDomainPointingService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/create-domain-purchase-transaction`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const purchaseDomainPointingService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/domain-purchase`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const searchDomainPointingService = async (domain) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/admin/api/v1/search-domain/${domain}`,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

const getDomainPointingService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/domain-pointing`,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

const createDomainPointingService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/create-domain-pointing`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

const checkDnsService = async (domain) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/check-dns/${domain}`,

    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

export const businessSettingsServices = {
  addBusinessSettingsService,
  getAllBusinessSettingsService,
  upgradeSubscriptionPackageService,
  searchDomainPointingService,
  createTransactionForDomainPointingService,
  purchaseDomainPointingService,
  getDomainPointingService,
  createDomainPointingService,
  checkDnsService,
};
