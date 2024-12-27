import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const universityAdministrationFaqService = createApi({
  reducerPath: 'universityAdministrationFaqService',
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
    updateUniversityFaq: builder.mutation({
      query: ({ data, university_id }) => {
        return {
          url: `/${university_id}/website/faq`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    deleteUniversityFaq: builder.mutation({
      query: ({ university_id, faq_id }) => {
        return {
          url: `/${university_id}/website/faq/${faq_id} `,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useUpdateUniversityFaqMutation,
  useDeleteUniversityFaqMutation,
} = universityAdministrationFaqService;
