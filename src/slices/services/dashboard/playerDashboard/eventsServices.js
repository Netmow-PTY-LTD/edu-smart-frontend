const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const seasonalGameInvoiceForPlayerService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/player/api/v1/seasonal-game-invoice/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const eventsForPlayerServices = {
  seasonalGameInvoiceForPlayerService,
};
