import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const universityServiceForAdmissionManager = createApi({
  reducerPath: 'universityServiceForAdmissionManager',
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${serverInfo?.base_url_prod}` + '/api/v1/university/admission-manager',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addUniversityForAdmissionManager: builder.mutation({
      query: (body) => ({
        url: '/university',
        method: 'POST',
        body,
      }),
    }),
    getUniversityForAdmissionManager: builder.query({
      query: () => ({
        url: '/university',
        method: 'GET',
      }),
    }),
    getSingleUniversityForAdmissionManager: builder.query({
      query: (id) => ({
        url: `/university/${id}`,
        method: 'GET',
      }),
    }),
    updateUniversityForAdmissionManager: builder.mutation({
      query: (body) => {
        const id = body instanceof FormData ? body.get('id') : body.id;

        return {
          url: `/university/${id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    deleteUniversityForAdmissionManager: builder.mutation({
      query: (id) => ({
        url: `/university/${id}`,
        method: 'DELETE',
      }),
    }),
    universitySponsorForAdmissionManager: builder.mutation({
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
  useAddUniversityForAdmissionManagerMutation,
  useGetUniversityForAdmissionManagerQuery,
  useUpdateUniversityForAdmissionManagerMutation,
  useGetSingleUniversityForAdmissionManagerQuery,
  useDeleteUniversityForAdmissionManagerMutation,
  useUniversitySponsorForAdmissionManagerMutation,
} = universityServiceForAdmissionManager;
