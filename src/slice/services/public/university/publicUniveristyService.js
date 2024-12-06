import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const publicUniversityService = createApi({
  reducerPath: 'publicUniversityService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-smart-backend-3n7b.onrender.com/api/v1/public',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUniversity: builder.query({
      query: () => ({
        url: '/university',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllUniversityQuery } = publicUniversityService;
