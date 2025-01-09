import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const applicationService = createApi({
  reducerPath: 'applicationService',
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
    createApplication: builder.mutation({
      query: (data) => {
        return {
          url: '/application',
          method: 'POST',
          body: data,
        };
      },
    }),
    getApplications: builder.query({
      query: () => ({
        url: '/application',
        method: 'GET',
      }),
    }),
    getApplication: builder.query({
      query: (id) => ({
        url: `/application/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetApplicationsQuery,
  useGetApplicationQuery,
} = applicationService;
