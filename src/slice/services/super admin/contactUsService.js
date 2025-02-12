import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const superAdminContactService = createApi({
  reducerPath: 'superAdminContactService',
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
    getAllContactMessages: builder.query({
      query: () => ({
        url: `/contact-us`,
        method: 'GET',
      }),
    }),
    deleteContactMessage: builder.mutation({
      query: (id) => {
        return {
          url: `/contact-us/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetAllContactMessagesQuery,
  useDeleteContactMessageMutation,
} = superAdminContactService;
