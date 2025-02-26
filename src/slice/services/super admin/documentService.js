import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const documentService = createApi({
  reducerPath: 'documentService',
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
    addDocumentInSuperAdmin: builder.mutation({
      query: (body) => {
        return {
          url: `/document/list`,
          method: 'POST',
          body,
        };
      },
    }),
    getDocumentInSuperAdmin: builder.query({
      query: () => {
        return {
          url: `/document/list`,
          method: 'GET',
        };
      },
    }),
    updateDocumentInSuperAdmin: builder.mutation({
      query: (body) => {
        const document_id = body.document_id;
        return {
          url: `/document/list/${document_id}`,
          method: 'PATCH',
          body: body,
        };
      },
    }),
    deleteDocumentInSuperAdmin: builder.mutation({
      query: (document_id) => {
        return {
          url: `/document/${document_id}`,
          method: 'DELETE',
        };
      },
    }),

    // -------------------- Document related endpoints ------------
    createAirTicketDocRequestInSuperAdmin: builder.mutation({
      query: (body) => {
        return {
          url: `/document/list`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useGetDocumentInSuperAdminQuery,
  useDeleteDocumentInSuperAdminMutation,
  useAddDocumentInSuperAdminMutation,
  useUpdateDocumentInSuperAdminMutation,
} = documentService;
