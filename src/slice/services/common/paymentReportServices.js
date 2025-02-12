import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const paymentReportService = createApi({
  reducerPath: 'paymentReportService',
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
    getApplicationPaymentReport: builder.query({
      query: () => {
        return {
          url: '/payment-report/application',
          method: 'GET',
        };
      },
    }),
    getPackagePaymentReport: builder.query({
      query: () => {
        return {
          url: '/payment-report/package',
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetApplicationPaymentReportQuery,
  useGetPackagePaymentReportQuery,
} = paymentReportService;
