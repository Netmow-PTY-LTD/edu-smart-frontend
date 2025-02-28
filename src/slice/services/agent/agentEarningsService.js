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
    upgradePackageForAgent: builder.mutation({
      query: (body) => {
        const package_id = body.package_id;
        return {
          url: `/package/upgrade/${package_id}`,
          method: 'PATCH',
          body,
        };
      },
    }),

    getAgentYearlyBonus: builder.query({
      query: (id) => ({
        url: `/yearly-bonus`,
        method: 'GET',
      }),
    }),

    getAgentFamilyTrip: builder.query({
      query: (id) => ({
        url: `/family-trip`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetEarningsQuery,
  useUpgradePackageForAgentMutation,
  useGetAgentFamilyTripQuery,
  useGetAgentYearlyBonusQuery,
} = agentEarningsService;
