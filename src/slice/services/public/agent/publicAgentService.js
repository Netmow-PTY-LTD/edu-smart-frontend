import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const publicAgentService = createApi({
  reducerPath: 'publicAgentService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/public',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllAgent: builder.query({
      query: () => ({
        url: '/agent',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllAgentQuery } = publicAgentService;
