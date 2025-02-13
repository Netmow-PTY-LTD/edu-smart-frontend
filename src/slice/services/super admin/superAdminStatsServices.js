import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const superAdminStatsServices = createApi({
  reducerPath: 'superAdminStatsServices',
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
    getToatalIncomeInSuperAdmin: builder.query({
      query: () => {
        return {
          url: `/dashboard/widgets/total-transaction-amount`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetToatalIncomeInSuperAdminQuery } = superAdminStatsServices;
