import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const superAdminAgentService = createApi({
  reducerPath: 'superAdminAgentService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/super/agent',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAgentEarnings: builder.query({
      query: (id) => ({
        url: `/earnings/${id}`,
        method: 'GET',
      }),
    }),
    updateAgentEarnings: builder.mutation({
      query: (body) => {
        const id = body instanceof FormData ? body.get('id') : body.id;

        return {
          url: `/earnings/${id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
  }),
});

export const { useGetAgentEarningsQuery, useUpdateAgentEarningsMutation } =
  superAdminAgentService;
