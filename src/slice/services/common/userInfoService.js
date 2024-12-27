import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const userInfoService = createApi({
  reducerPath: 'userInfoService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-smart-backend-3n7b.onrender.com/api/v1',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      // console.log('token', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
    }),
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: '/user',
        method: 'PATCH',
        body:data
      }),
    }),
  }),
});

export const { useGetUserInfoQuery,useUpdateUserInfoMutation } = userInfoService;
