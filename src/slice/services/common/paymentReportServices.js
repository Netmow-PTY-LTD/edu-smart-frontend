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
    getSingleApplicationPaymentReport: builder.query({
      query: (id) => {
        return {
          url: `/payment-report/application/${id}`,
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
    getSinglePackagePaymentReport: builder.query({
      query: (id) => {
        return {
          url: `/payment-report/package/${id}`,
          method: 'GET',
        };
      },
    }),
    getAllPaymentReport: builder.query({
      query: () => {
        return {
          url: `/payment-reports/all`,
          method: 'GET',
        };
      },
    }),
    updateAgentPendingPayoutStatus: builder.mutation({
      query: (body) => {
        return {
          url: `/payment-report/update/agent-payout/${body?.report_id}`,
          method: 'PATCH',
          body: {
            status: body?.status,
          },
        };
      },
    }),
  }),
});

export const {
  useGetApplicationPaymentReportQuery,
  useGetPackagePaymentReportQuery,
  useGetSingleApplicationPaymentReportQuery,
  useGetSinglePackagePaymentReportQuery,
  useGetAllPaymentReportQuery,
  useUpdateAgentPendingPayoutStatusMutation,
} = paymentReportService;
