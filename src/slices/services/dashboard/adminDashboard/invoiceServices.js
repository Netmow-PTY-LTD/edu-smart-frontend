const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const paidByCashService = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL_PROD +
        `/admin/api/v1/paid-by-cash/${data?.id}`,
      data,
      {
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error in paidByCashService:', error.message);
    throw error;
  }
};

const getTotalCharge = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/get-total-charge',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const multiPlayerForGuardianPaidByCashService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data?.id;
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL_PROD +
        `/admin/api/v1/paid-by-cash-for-all-player/${id}`,
      data,
      {
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error in paidByCashService:', error.message);
    throw error;
  }
};

const multiPlayerForGuardianSendInvoiceMailService = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/send-invoice',
      data,
      {
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error in paidByCashService:', error.message);
    throw error;
  }
};

const singlePlayerRegistrationInvoiceService = async (player_id) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL_PROD +
        `/api/v1/single-player-registration-invoice/${player_id}`,
      {
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error in paidByCashService:', error.message);
    throw error;
  }
};

const seasonalGamePaidByCashService = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL_PROD +
        `/admin/api/v1/seasonal-game-paid-by-cash
        `,
      data,
      {
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error in paidByCashService:', error.message);
    throw error;
  }
};

export const invoiceServices = {
  paidByCashService,
  getTotalCharge,
  multiPlayerForGuardianPaidByCashService,
  multiPlayerForGuardianSendInvoiceMailService,
  singlePlayerRegistrationInvoiceService,
  seasonalGamePaidByCashService,
};
