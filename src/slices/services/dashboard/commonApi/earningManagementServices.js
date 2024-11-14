import axios from 'axios';

const allEarningManagementCommonService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/earnings',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const earningManagementServices = { allEarningManagementCommonService };
