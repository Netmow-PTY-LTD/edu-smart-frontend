import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const universityAdministrationDescriptionService = createApi({
  reducerPath: 'universityAdministrationDescriptionService',
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

  // -------------------------------------- Endpoints -------------------------------
  endpoints: (builder) => ({
    updateUniversityDescription: builder.mutation({
      query: ({ data, university_id }) => {
        return {
          url: `/${university_id}/website/section-description`,
          method: 'PUT',
          body: data,
        };
      },
    }),
  }),
});

export const { useUpdateUniversityDescriptionMutation } =
  universityAdministrationDescriptionService;
