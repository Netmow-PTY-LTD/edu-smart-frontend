import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const publicPackageService = createApi({
  reducerPath: 'publicPackageService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/public',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSinglePackage: builder.query({
      query: (package_id) => {
        return {
          url: `/package/${package_id}`,
          method: 'GET',
        };
      },
    }),
    getAllPackage: builder.query({
      query: () => {
        return {
          url: `/package`,
          method: 'GET',
        };
      },
    }),
    getAllHotOffer: builder.query({
      query: () => {
        return {
          url: `/hot-offer`,
          method: 'GET',
        };
      },
    }),
    getAllActiveCoupon: builder.query({
      query: () => {
        return {
          url: `/coupons/active`,
          method: 'GET',
        };
      },
    }),
    checkCouponVerify: builder.mutation({
      query: (body) => {
        return {
          url: `/coupons/verify`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useGetSinglePackageQuery,
  useGetAllPackageQuery,
  useGetAllHotOfferQuery,
  useGetAllActiveCouponQuery,
  useCheckCouponVerifyMutation,
} = publicPackageService;
