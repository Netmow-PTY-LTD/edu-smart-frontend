const { default: axios } = require('axios');
const { baseURL } = require('@/slices/helper/helper');

const waitlistRequestService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/web/waitlist/' + id,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const deleteWaitListService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/web/waitlist/' + id,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const migrateWaitlistUserService = async (id) => {
  const token = localStorage.getItem('token');

  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/web/migrate-waitlist/' +
      id,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export {
  deleteWaitListService,
  migrateWaitlistUserService,
  waitlistRequestService,
};
