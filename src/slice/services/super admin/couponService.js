import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const couponService = createApi({
  reducerPath: 'couponService',
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
    addCouponInSuperAdmin: builder.mutation({
      query: (body) => {
        return {
          url: `/coupon`,
          method: 'POST',
          body,
        };
      },
    }),
    getCouponInSuperAdmin: builder.query({
      query: () => {
        return {
          url: `/coupon`,
          method: 'GET',
        };
      },
    }),
    updateCouponInSuperAdmin: builder.mutation({
      query: (body) => {
        const coupon_id = body.coupon_id;
        return {
          url: `/coupon/${coupon_id}`,
          method: 'PATCH',
          body: body,
        };
      },
    }),
    deleteCouponInSuperAdmin: builder.mutation({
      query: (coupon_id) => {
        return {
          url: `/coupon/${coupon_id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useAddCouponInSuperAdminMutation,
  useGetCouponInSuperAdminQuery,
  useUpdateCouponInSuperAdminMutation,
  useDeleteCouponInSuperAdminMutation,
} = couponService;
