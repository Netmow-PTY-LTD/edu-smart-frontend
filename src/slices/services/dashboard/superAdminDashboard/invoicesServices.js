import axios from 'axios';

const allPendingInvoiceForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/pending-invoices`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const allPaidInvoiceForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/paid-invoices`,

    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const allInvoiceForSuperAdminService = {
  allPendingInvoiceForSuperAdminService,
  allPaidInvoiceForSuperAdminService,
};
