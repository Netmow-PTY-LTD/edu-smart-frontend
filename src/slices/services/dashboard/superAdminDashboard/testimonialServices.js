const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addTestimonialForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/supper/api/v1/testimonial',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const allTestimonialForSuperAdminService = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/testimonial',
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const updateTestimonialForSuperAdminService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.get('id');
  const res = await axios.put(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/testimonial/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};
const deleteTestimonialForSuperAdminService = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/supper/api/v1/testimonial/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

export const testimonialServices = {
  addTestimonialForSuperAdminService,
  updateTestimonialForSuperAdminService,
  deleteTestimonialForSuperAdminService,
  allTestimonialForSuperAdminService,
};
