import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const agentSettingsService = createApi({
  reducerPath: 'agentSettingsService',
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
    getAgentBusinessSettings: builder.query({
      query: () => {
        return {
          url: '/settings/business',
          method: 'GET',
        };
      },
    }),
    updateAgentBusinessSettings: builder.mutation({
      query: (data) => {
        return {
          url: '/settings/business',
          method: 'PATCH',
          body: data,
        };
      },
    }),
    getAgentCurrencySettings: builder.query({
      query: () => {
        return {
          url: '/settings/currency',
          method: 'GET',
        };
      },
    }),
    updateAgentCurrencySettings: builder.mutation({
      query: (data) => {
        return {
          url: '/settings/currency',
          method: 'PATCH',
          body: data,
        };
      },
    }),
    getAgentStripeSettings: builder.query({
      query: () => {
        return {
          url: '/settings/stripe',
          method: 'GET',
        };
      },
    }),
    updateAgentStripeSettings: builder.mutation({
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
  useGetAgentBusinessSettingsQuery,
  useUpdateAgentBusinessSettingsMutation,
  useGetAgentCurrencySettingsQuery,
  useUpdateAgentCurrencySettingsMutation,
  useGetAgentStripeSettingsQuery,
  useUpdateAgentStripeSettingsMutation,
} = agentSettingsService;
