const { default: axios } = require('axios');

const allSeasonalGameInvoicesService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/all-seasonal-game-subscription-invoice/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const singleSeasonalGameInvoicesService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/single-seasonal-game-subscription-invoice/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allPaymentSettingsService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/all-payment-settings/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const singleSeasonalGameInvoiceByIdService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/seasonal-game-subscription-invoice-by-id/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const adminInfoService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/admin-info`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allPlayerRegistrationInvoiceService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/api/v1/all-player-registration-invoice
    `,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const getAdminStripeSandboxModeService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/admin-stripe-keys`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const seasonalGameInvoices = {
  allSeasonalGameInvoicesService,
  singleSeasonalGameInvoicesService,
  allPaymentSettingsService,
  adminInfoService,
  allPlayerRegistrationInvoiceService,
  singleSeasonalGameInvoiceByIdService,
  getAdminStripeSandboxModeService,
};
