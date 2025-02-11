import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const requiredService = createApi({
  reducerPath: 'requiredService',
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
    addRequiredDocumentInSuperAdmin: builder.mutation({
      query: (body) => {
        return {
          url: `/document/list`,
          method: 'POST',
          body,
        };
      },
    }),
    getRequiredDocumentInSuperAdmin: builder.query({
      query: () => {
        return {
          url: `/document/list`,
          method: 'GET',
        };
      },
    }),
    updateRequiredDocumentInSuperAdmin: builder.mutation({
      query: (body) => {
        const RequiredDocument_id = body.RequiredDocument_id;
        return {
          url: `/document/list/${RequiredDocument_id}`,
          method: 'PATCH',
          body: body,
        };
      },
    }),
    deleteRequiredDocumentInSuperAdmin: builder.mutation({
      query: (RequiredDocument_id) => {
        return {
          url: `/document/list/${RequiredDocument_id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useAddRequiredDocumentInSuperAdminMutation,
  useGetRequiredDocumentInSuperAdminQuery,
  useUpdateRequiredDocumentInSuperAdminMutation,
  useDeleteRequiredDocumentInSuperAdminMutation,
} = requiredService;
