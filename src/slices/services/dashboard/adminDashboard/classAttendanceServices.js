const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addClassService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/add-class',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const getAllClassService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/all-class',
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

const deleteClassAttendanceService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/class/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

const updateClassAttendanceService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/class/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

export const classAttendanceServices = {
  addClassService,
  getAllClassService,
  deleteClassAttendanceService,
  updateClassAttendanceService,
};
