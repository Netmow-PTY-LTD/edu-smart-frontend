import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const universityService = createApi({
  reducerPath: 'universityService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-smart-backend-3n7b.onrender.com/api/v1/university/admin',
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
        url: '/university',
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
      query: (id) => ({
        url: `/university/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddUniversityMutation,
  useGetUniversityQuery,
  useUpdateUniversityMutation,
  useGetSingleUniversityQuery,
  useDeleteUniversityMutation,
} = universityService;
