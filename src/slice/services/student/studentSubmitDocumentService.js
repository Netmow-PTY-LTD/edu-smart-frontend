import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const studentSubmitDocumentService = createApi({
  reducerPath: 'studentSubmitDocumentService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-smart-backend-3n7b.onrender.com/api/v1/student',
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
    allSubmittedDocumentForStudent: builder.query({
      query: () => ({
        url: '/documents',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSubmitStudentDocumentMutation,
  useAllSubmittedDocumentForStudentQuery,
} = studentSubmitDocumentService;
