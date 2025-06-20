import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const paymentService = createApi({
  reducerPath: 'paymentService',
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
    sslCommerzPaymentIntend: builder.mutation({
      query: (data) => {
        return {
          url: '/payment/intend/sslcommerz',
          method: 'POST',
          body: data,
        };
      },
    }),
        stripePaymentIntend: builder.mutation({
      query: (data) => {
        return {
          url: '/payment/intend/stripe',
          method: 'POST',
          body: data,
        };
      },
    }),
      stripeSettings: builder.query({
      query: (data) => {
        return {
          url: '/payment/intend/stripesuper',
          method: 'GET',
        };
      },
    }),
      sslCommerzSettings: builder.query({
      query: (data) => {
        return {
          url: '/payment/intend/sslcommerzsuper',
          method: 'GET',
        };
      },
    }),

  }),
});

export const { useSslCommerzPaymentIntendMutation, useStripePaymentIntendMutation, useStripeSettingsQuery, useSslCommerzSettingsQuery } = paymentService;
