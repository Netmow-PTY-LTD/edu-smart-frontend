import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const agentServiceForAdmissionManager = createApi({
  reducerPath: 'agentServiceForAdmissionManager',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/admission-manager/agent',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSingleAgentForAdmissionManager: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetSingleAgentForAdmissionManagerQuery } =
  agentServiceForAdmissionManager;
