const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const importCSVDataService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1//import-data',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const sdGuardianDataService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/data-import-guardian-required-fields',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

const guardianDataUploadService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      '/admin/api/v1/guardian-data-upload',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

export const importServices = {
  importCSVDataService,
  sdGuardianDataService,
  guardianDataUploadService,
};
