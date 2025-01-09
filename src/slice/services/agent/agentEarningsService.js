import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const agentEarningsService = createApi({
  reducerPath: 'agentEarningsService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/agent',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: () => ({
        url: `/earnings`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetEarningsQuery } = agentEarningsService;
