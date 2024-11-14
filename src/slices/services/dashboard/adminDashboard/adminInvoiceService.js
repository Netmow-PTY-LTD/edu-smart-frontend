const { default: axios } = require('axios');

const invoiceList = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/admin-invoices',
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

const invoiceItem = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/single-invoice/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

export const adminInvoiceService = {
  invoiceList,
  invoiceItem,
};
