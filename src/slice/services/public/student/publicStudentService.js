import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const publicStudentService = createApi({
  reducerPath: 'publicStudentService',
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
    getAllStudent: builder.query({
      query: () => ({
        url: '/Student',
        method: 'GET',
      }),
    }),

    getSingleStudent: builder.query({
      query: (student_id) => ({
        url: `/Student/${student_id}`,
        method: 'GET',
      }),
    }),

  }),
});

export const { useGetAllStudentQuery,useGetSingleStudentQuery } = publicStudentService;
