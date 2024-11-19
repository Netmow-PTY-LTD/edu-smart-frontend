import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const universityService = createApi({
  reducerPath: 'universityService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-smart-backend-3n7b.onrender.com/api/v1/super',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    healthCheck: builder.query({
      query: () => ({
        url: '/',
      }),
    }),
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
  }),
});

export const { useAddUniversityMutation, useGetUniversityQuery } =
  universityService;
