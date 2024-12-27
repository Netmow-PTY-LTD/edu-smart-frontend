import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const userInfoService = createApi({
  reducerPath: 'userInfoService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
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
        body: data,
      }),
    }),
  }),
});

export const { useGetUserInfoQuery, useUpdateUserInfoMutation } =
  userInfoService;
