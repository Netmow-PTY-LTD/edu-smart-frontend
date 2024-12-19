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
    allSubmittedDocumentForAgent: builder.query({
      query: () => ({
        url: '/documents',
        method: 'GET',
      }),
    }),
  }),
});

export const { useAllSubmittedDocumentForAgentQuery } =
  studentDocRelatedServiceForAgent;
