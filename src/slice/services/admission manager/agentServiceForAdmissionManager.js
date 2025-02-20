import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const superAdminAgentServiceForAdmissionManager = createApi({
  reducerPath: 'superAdminAgentServiceForAdmissionManager',
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${serverInfo?.base_url_prod}` +
      '/api/v1/admission-manager/agent/earnings',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAgentEarningsForAdmissionManager: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
    updateAgentEarningsForAdmissionManager: builder.mutation({
      query: (body) => {
        const id = body instanceof FormData ? body.get('id') : body.id;

        return {
          url: `/${id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
  }),
});

export const { useGetAgentEarningsQuery, useUpdateAgentEarningsMutation } =
  superAdminAgentServiceForAdmissionManager;
