import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const superAdminSettingsService = createApi({
  reducerPath: 'superAdminSettingsService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/super',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSuperAdminStripeSettings: builder.query({
      query: () => {
        return {
          url: '/settings/stripe',
          method: 'GET',
        };
      },
    }),
    updateSuperAdminStripeSettings: builder.mutation({
      query: (data) => {
        return {
          url: '/settings/stripe',
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetSuperAdminStripeSettingsQuery,
  useUpdateSuperAdminStripeSettingsMutation,
} = superAdminSettingsService;
