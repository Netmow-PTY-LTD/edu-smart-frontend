import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const agentApplicationService = createApi({
  reducerPath: 'agentApplicationService',
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
    getApplications: builder.query({
      query: () => {
        return {
          url: '/applications',
          method: 'GET',
        };
      },
    }),
    getSingleStudentApplication: builder.query({
      query: (id) => {
        return {
          url: `/applications/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetApplicationsQuery, useGetSingleStudentApplicationQuery } =
  agentApplicationService;
