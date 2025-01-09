import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const hotOfferService = createApi({
  reducerPath: 'hotOfferService',
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
    addHotOfferInSuperAdmin: builder.mutation({
      query: (body) => {
        return {
          url: `/hot-offer`,
          method: 'POST',
          body,
        };
      },
    }),
    getHotOfferInSuperAdmin: builder.query({
      query: () => {
        return {
          url: `/hot-offer`,
          method: 'GET',
        };
      },
    }),
    updateHotOfferInSuperAdmin: builder.mutation({
      query: (body) => {
        const hot_offer_id = body.hot_offer_id;
        return {
          url: `/hot-offer/${hot_offer_id}`,
          method: 'PATCH',
          body: body,
        };
      },
    }),
    deleteHotOfferInSuperAdmin: builder.mutation({
      query: (hot_offer_id) => {
        return {
          url: `/hot-offer/${hot_offer_id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useAddHotOfferInSuperAdminMutation,
  useGetHotOfferInSuperAdminQuery,
  useUpdateHotOfferInSuperAdminMutation,
  useDeleteHotOfferInSuperAdminMutation,
} = hotOfferService;
