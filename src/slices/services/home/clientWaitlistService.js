import { baseURL } from './../../helper/helper';
import axios from 'axios';

const clientWaitlistService = async (data, subdomain) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD +
      `/public/api/v1/admin/website/join-waitlist/${subdomain}`,
    data
  );
  return res.data;
};

export default clientWaitlistService;
