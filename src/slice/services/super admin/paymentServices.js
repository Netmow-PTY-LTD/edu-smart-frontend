import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const paymentServices = createApi({
  reducerPath: 'paymentServices',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/super/settings',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateSSLcommerzForSuperAdmin: builder.mutation({
      query: (body) => {
        return {
          url: `/sslcommerz`,
          method: 'PATCH',
          body,
        };
      },
    }),
    getSSLcommerzForSuperAdmin: builder.query({
      query: () => {
        return {
          url: `/sslcommerz`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useUpdateSSLcommerzForSuperAdminMutation,
  useGetSSLcommerzForSuperAdminQuery,
} = paymentServices;
