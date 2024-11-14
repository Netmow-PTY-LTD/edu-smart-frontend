import axios from 'axios';

const getAllSubscriberService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/subscriber',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const subscriberServices = {
  getAllSubscriberService,
};
