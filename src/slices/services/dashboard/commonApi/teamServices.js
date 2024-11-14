import { baseURL } from '@/slices/helper/helper';
import axios from 'axios';

export const eventsVisibleToTeamNameService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/all-teams-by-ids',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
