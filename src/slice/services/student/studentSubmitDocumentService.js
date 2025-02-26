import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const studentSubmitDocumentService = createApi({
  reducerPath: 'studentSubmitDocumentService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/student',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    submitStudentDocument: builder.mutation({
      query: (body) => ({
        url: '/documents',
        method: 'POST',
        body: body,
      }),
    }),
    submitSingleDocumentForStudent: builder.mutation({
      query: (body) => {
        const id = body?.get('id');
        return {
          url: `/document/${id}`,
          method: 'POST',
          body: body,
        };
      },
    }),
    updateSingleDocumentForStudent: builder.mutation({
      query: (body) => {
        const id = body?.get('id');
        return {
          url: `/document/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
    }),
    allSubmittedDocumentForStudent: builder.query({
      query: () => ({
        url: '/documents',
        method: 'GET',
      }),
    }),
    getDocumentRequestForStudent: builder.query({
      query: () => ({
        url: '/documents/requested',
        method: 'GET',
      }),
    }),
    /* -------------------- Air Ticket Document ----------------- */

    submitStudentAirTicketDocument: builder.mutation({
      query: (body) => ({
        url: '/airticket/document',
        method: 'POST',
        body: body,
      }),
    }),

    updateSingleAirTicketDocumentForStudent: builder.mutation({
      query: (body) => {
        const id = body?.get('id');
        return {
          url: `/airticket/document/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
    }),

    getAllSubmittedAirTicketDocumentsForStudent: builder.query({
      query: () => ({
        url: '/airticket/documents',
        method: 'GET',
      }),
    }),

    getSingleAirTicketDocumentForStudent: builder.query({
      query: (body) => {
        const id = body?.get('id');
        return {
          url: `/airticket/document/${id}`,
          method: 'GET',
        };
      },
    }),
    deleteSingleAirTicketDocumentForStudent: builder.mutation({
      query: (body) => {
        const id = body?.get('id');
        return {
          url: `/airticket/document/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useSubmitStudentDocumentMutation,
  useAllSubmittedDocumentForStudentQuery,
  useGetDocumentRequestForStudentQuery,
  useSubmitSingleDocumentForStudentMutation,
  useUpdateSingleDocumentForStudentMutation,
  useSubmitStudentAirTicketDocumentMutation,
  useGetAllSubmittedAirTicketDocumentsForStudentQuery,
  useGetSingleAirTicketDocumentForStudentQuery,
  useUpdateSingleAirTicketDocumentForStudentMutation,
  useDeleteSingleAirTicketDocumentForStudentMutation,
} = studentSubmitDocumentService;
