import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const universityService = createApi({
  reducerPath: 'universityService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/university/admin',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addUniversity: builder.mutation({
      query: (body) => ({
        url: '/university',
        method: 'POST',
        body,
      }),
    }),
    getUniversity: builder.query({
      query: () => ({
        url: `${serverInfo?.base_url_prod}` + '/api/v1/super/university',
        method: 'GET',
      }),
    }),
    getSingleUniversity: builder.query({
      query: (id) => ({
        url: `/university/${id}`,
        method: 'GET',
      }),
    }),
    updateUniversity: builder.mutation({
      query: (body) => {
        const id = body instanceof FormData ? body.get('id') : body.id;

        return {
          url: `/university/${id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    deleteUniversity: builder.mutation({
      query: (body) => ({
        url: `/university/${body?.id}`,
        method: 'DELETE',
        body: { status: body?.status },
      }),
    }),
    universitySponsor: builder.mutation({
      query: (body) => {
        const university_id =
          body instanceof FormData
            ? body.get('university_id')
            : body.university_id;

        return {
          url: `/university/${university_id}/website/sponsor`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

export const {
  useAddUniversityMutation,
  useGetUniversityQuery,
  useUpdateUniversityMutation,
  useGetSingleUniversityQuery,
  useDeleteUniversityMutation,
  useUniversitySponsorMutation,
} = universityService;
