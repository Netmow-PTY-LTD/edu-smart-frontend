const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const AddNoticeService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/notices',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  console.log(res.data);
  return res.data;
};

const editNoticeService = async (data) => {
  const id = data?.id;
  const token = localStorage.getItem('token');
  if (id) {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/notices/${id}`;

    const res = await axios.put(url, data, {
      headers: {
        authorization: token,
      },
    });
    return res.data;
  }
};

const getAllNoticesService = async (data) => {
  const token = localStorage.getItem('token');
  if (data?.subdomain) {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/notices/all/${data?.subdomain}`;
    const res = await axios.get(url, {
      headers: {
        authorization: token,
      },
    });
    return res.data;
  }
};

const getSingleNoticeService = async (id) => {
  const token = localStorage.getItem('token');
  if (id) {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL_PROD + `/public/api/v1/notices/${id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return res.data;
  }
};

const deleteNoticeService = async (id) => {
  const token = localStorage.getItem('token');
  if (id) {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/notices/${id}`;

    const res = await axios.delete(url, {
      headers: {
        authorization: token,
      },
    });
    return res.data;
  }
};

export const noticeServices = {
  AddNoticeService,
  getAllNoticesService,
  editNoticeService,
  getSingleNoticeService,
  deleteNoticeService,
};
