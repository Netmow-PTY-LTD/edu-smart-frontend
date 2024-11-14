import axios from 'axios';

const updateChargeManagementService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/charge-management',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allChargeManagementService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/charge-amount',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deleteChargeManagementService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/supper/api/v1/charge-management/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const chargeManagementServices = {
  updateChargeManagementService,
  allChargeManagementService,
  deleteChargeManagementService,
};
