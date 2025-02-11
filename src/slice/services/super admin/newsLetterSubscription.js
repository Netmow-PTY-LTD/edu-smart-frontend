import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const newsLetterSubscriptionSuperAdmin = createApi({
  reducerPath: 'newsLetterSubscriptionSuperAdmin',
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
    getNewsLetterSubscriptionInSuperAdmin: builder.query({
      query: () => {
        return {
          url: `/newsletter`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetNewsLetterSubscriptionInSuperAdminQuery } =
  newsLetterSubscriptionSuperAdmin;
