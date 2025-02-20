import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const commonDocumentService = createApi({
  reducerPath: 'commonDocumentService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/documents',
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
          url: '/application/request',
          method: 'GET',
        };
      },
    }),

    getSingleApplicationDocRequest: builder.query({
      query: (body) => {
        const application_id = body.application_id;
        return {
          url: `/application/request/${application_id}`,
          method: 'GET',
        };
      },
    }),

    uploadRequestApplicationDoc: builder.mutation({
      query: (body) => {
        const application_id = body.application_id;
        return {
          url: `/application/upload/${application_id}`,
          method: 'POST',
          body,
        };
      },
    }),
    // ---------------- User or Student Base document  endpoint --------------------

    getAllUserDocRequest: builder.query({
      query: () => {
        return {
          url: '/user/request',
          method: 'GET',
        };
      },
    }),

    getSingleUserDocRequest: builder.query({
      query: (body) => {
        const student_id = body.student_id;
        console.log(body);
        return {
          url: `/user/request/${student_id}`,
          method: 'GET',
        };
      },
    }),

    updateRequestUserDocStatus: builder.mutation({
      query: (body) => {
        const user_document_id = body.user_document_id;
        return {
          url: `user/update/status/${user_document_id}`,
          method: 'PATCH',
          body,
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
} = commonDocumentService;
