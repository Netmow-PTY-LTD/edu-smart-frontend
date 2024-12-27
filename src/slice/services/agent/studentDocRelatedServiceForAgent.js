import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const studentDocRelatedServiceForAgent = createApi({
  reducerPath: 'studentDocRelatedServiceForAgent',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-smart-backend-3n7b.onrender.com/api/v1/agent',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addStudentForAgent: builder.mutation({
      query: (body) => {
        return {
          url: '/student',
          method: 'POST',
          body: body,
        };
      },
    }),
    allStudentForAgent: builder.query({
      query: () => {
        return {
          url: '/students',
          method: 'GET',
        };
      },
    }),
    singleStudentForAgent: builder.query({
      query: (student_id) => {
        return {
          url: `/students/${student_id}`,
          method: 'GET',
        };
      },
    }),
    updateStudentForAgent: builder.mutation({
      query: (data) => {
        const student_id = data.get('student_id');
        return {
          url: `/students/${student_id}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
    deleteStudentForAgent: builder.mutation({
      query: (student_id) => {
        return {
          url: `/students/${student_id}`,
          method: 'DELETE',
        };
      },
    }),

    allSubmittedDocumentForAgent: builder.query({
      query: () => {
        return {
          url: '/documents',
          method: 'GET',
        };
      },
    }),
    createDocRequestForAgent: builder.mutation({
      query: (body) => {
        return {
          url: '/documents/requested',
          method: 'POST',
          body: body,
        };
      },
    }),
    updateDocStatusForAgent: builder.mutation({
      query: (data) => {
        const id = data?.id;
        return {
          url: `/documents/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
    singleStudentSubmittedDocumentForAgent: builder.query({
      query: (id) => {
        return {
          url: `/documents/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useAddStudentForAgentMutation,
  useAllStudentForAgentQuery,
  useSingleStudentForAgentQuery,
  useUpdateStudentForAgentMutation,
  useDeleteStudentForAgentMutation,
  useAllSubmittedDocumentForAgentQuery,
  useCreateDocRequestForAgentMutation,
  useUpdateDocStatusForAgentMutation,
  useSingleStudentSubmittedDocumentForAgentQuery,
} = studentDocRelatedServiceForAgent;
