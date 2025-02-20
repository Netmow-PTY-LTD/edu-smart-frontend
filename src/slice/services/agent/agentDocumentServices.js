import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const agentDocumentServices = createApi({
  reducerPath: 'agentDocumentServices',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/agent',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ---------------- Application Base endpoint --------------------
    createApplicationDocRequestForAgent: builder.mutation({
      query: (body) => {
        const application_id = body.application_id;
        return {
          url: `/documents/application/request/${application_id}`,
          method: 'POST',
          body,
        };
      },
    }),
    updateApplicationDocStatusForAgent: builder.mutation({
      query: (body) => {
        const application_document_id = body.application_document_id;
        return {
          url: `/documents/application/status/${application_document_id}`,
          method: 'PATCH',
          body,
        };
      },
    }),

    //-------------------- User or Student Base End Point ------------------------
    createUserDocRequestForAgent: builder.mutation({
      query: (body) => {
        const student_id = body.student_id;
        return {
          url: `/documents/user/request/${student_id}`,
          method: 'POST',
          body,
        };
      },
    }),

    updateUserDocStatusForAgent: builder.mutation({
      query: (body) => {
        const user_document_id = body.user_document_id;
        return {
          url: `/documents/user/status/${user_document_id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
  }),
});

export const {
  useCreateUserDocRequestForAgentMutation,
  useCreateApplicationDocRequestForAgentMutation,
  useUpdateUserDocStatusForAgentMutation,
  useUpdateApplicationDocStatusForAgentMutation,
} = agentDocumentServices;
