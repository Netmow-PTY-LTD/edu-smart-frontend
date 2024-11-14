import axios from 'axios';

const updateOnboardingStepsService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/onboarding',
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
const getOnboardingStepsService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/onboarding',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

export const onboardingServices = {
  updateOnboardingStepsService,
  getOnboardingStepsService,
};
