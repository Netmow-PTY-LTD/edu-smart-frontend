import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const universityAdministrationSliderService = createApi({
  reducerPath: 'universityAdministrationSliderService',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://edu-smart-backend-3n7b.onrender.com/api/v1/university/admin/university',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    updateUniversitySlider: builder.mutation({
      query: (body) => {
        const university_id = body?.university_id;
        return {
          url: `/${university_id}/website/slider`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

export const { updateUniversitySlider } = universityAdministrationSliderService;
