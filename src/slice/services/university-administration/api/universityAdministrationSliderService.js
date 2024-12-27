import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const universityAdministrationSliderService = createApi({
  reducerPath: 'universityAdministrationSliderService',
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${serverInfo?.base_url_prod}` + '/api/v1/university/admin/university',
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
        const university_id =
          body instanceof FormData
            ? body.get('university_id')
            : body.university_id;
        return {
          url: `/${university_id}/website/slider`,
          method: 'PUT',
          body,
        };
      },
    }),
    deleteUniversitySlider: builder.mutation({
      query: ({ university_id, slider_id }) => {
        return {
          url: `/${university_id}/website/slider/${slider_id} `,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useUpdateUniversitySliderMutation,
  useDeleteUniversitySliderMutation,
} = universityAdministrationSliderService;
