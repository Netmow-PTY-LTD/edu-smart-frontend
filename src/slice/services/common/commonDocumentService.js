import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const commonDocumentService = createApi({
  reducerPath: 'commonDocumentService',
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
    // ---------------- Application Document Base endpoint --------------------

    getAllApplicationDocRequest: builder.query({
      query: () => {
        return {
          url: '/documents/application/request',
          method: 'GET',
        };
      },
    }),

    getSingleApplicationDocRequest: builder.query({
      query: (body) => {
        const application_id = body.application_id;
        return {
          url: `/documents/application/request/${application_id}`,
          method: 'GET',
        };
      },
    }),

    uploadRequestApplicationDoc: builder.mutation({
      query: (body) => {
        const application_id = body.application_id;
        return {
          url: `/documents/application/upload/${application_id}`,
          method: 'POST',
          body,
        };
      },
    }),
    getAllApplicationSubmittedDocument: builder.query({
      query: () => {
        return {
          url: '/documents/all/application',
          method: 'GET',
        };
      },
    }),
    getSingleApplicationSubmittedDocument: builder.query({
      query: (body) => {
        const application_id = body.application_id;
        return {
          url: `/documents/user/single/${application_id}`,
          method: 'GET',
        };
      },
    }),

    // ---------------- User or Student Base document  endpoint --------------------

    getAllUserDocRequest: builder.query({
      query: () => {
        return {
          url: '/documents/user/request',
          method: 'GET',
        };
      },
    }),

    getSingleUserDocRequest: builder.query({
      query: (body) => {
        const student_id = body.student_id;

        return {
          url: `/documents/user/request/${student_id}`,
          method: 'GET',
        };
      },
    }),

    updateRequestUserDocStatus: builder.mutation({
      query: (body) => {
        const user_document_id = body.user_document_id;
        return {
          url: `/documents/user/update/status/${user_document_id}`,
          method: 'PATCH',
          body,
        };
      },
    }),

     updateSingleDocumentForStudentByAllUser: builder.mutation({
      query: (body) => {
        const id = body?.get('id');
        return {
          url: `/document/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
    }),

    getAllUserSubmittedDocument: builder.query({
      query: () => {
        return {
          url: '/documents/all/user',
          method: 'GET',
        };
      },
    }),
    getSingleUserSubmittedDocument: builder.query({
      query: (body) => {
        const student_id = body.student_id;
        return {
          url: `/documents/user/single/${student_id}`,
          method: 'GET',
        };
      },
    }),

    // ---------------- document list  endpoint --------------------
    getAllDocumentList: builder.query({
      query: () => {
        return {
          url: '/documents/list',
          method: 'GET',
        };
      },
    }),
    // ---------------- Air Ticket  endpoint --------------------
    GetAllStudentsAirticketDocumentRequest: builder.query({
      query: () => {
        return {
          url: '/documents/airticket/request',
          method: 'GET',
        };
      },
    }),
    getSingleUserAirTicketDocumentRequest: builder.query({
      query: (body) => {
        const student_id = body.student_id;
        return {
          url: `/documents/airticket/request/${student_id}`,
          method: 'GET',
        };
      },
    }),

    updateSingleAirTicketDocumentForAgent: builder.mutation({
      query: (body) => {
        const id = body?.get('id');
        return {
          url: `/airticket/document/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
    }),
  }),
});

export const {
  useGetAllApplicationDocRequestQuery,
  useGetAllUserDocRequestQuery,
  useGetSingleApplicationDocRequestQuery,
  useGetSingleUserDocRequestQuery,
  useUpdateRequestUserDocStatusMutation,
  useUploadRequestApplicationDocMutation,
  useGetAllApplicationSubmittedDocumentQuery,
  useGetAllUserSubmittedDocumentQuery,
  useGetSingleApplicationSubmittedDocumentQuery,
  useGetSingleUserSubmittedDocumentQuery,
  useGetAllDocumentListQuery,
  useGetAllStudentsAirticketDocumentRequestQuery,
  useGetSingleUserAirTicketDocumentRequestQuery,
  useUpdateSingleAirTicketDocumentForAgentMutation,
  useUpdateSingleDocumentForStudentByAllUserMutation,
} = commonDocumentService;
