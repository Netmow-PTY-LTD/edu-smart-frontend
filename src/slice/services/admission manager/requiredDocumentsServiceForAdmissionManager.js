import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const requiredDocumentsServiceForAdmissionManager = createApi({
  reducerPath: 'requiredDocumentsServiceForAdmissionManager',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/admission-manager',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addRequiredDocumentForAdmissionManager: builder.mutation({
      query: (body) => {
        return {
          url: `/document/list`,
          method: 'POST',
          body,
        };
      },
    }),
    getRequiredDocumentForAdmissionManager: builder.query({
      query: () => {
        return {
          url: `/document/list`,
          method: 'GET',
        };
      },
    }),
    updateRequiredDocumentForAdmissionManager: builder.mutation({
      query: (body) => {
        const RequiredDocument_id = body.RequiredDocument_id;
        return {
          url: `/document/list/${RequiredDocument_id}`,
          method: 'PATCH',
          body: body,
        };
      },
    }),
    deleteRequiredDocumentForAdmissionManager: builder.mutation({
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
  useAddRequiredDocumentForAdmissionManagerMutation,
  useGetRequiredDocumentForAdmissionManagerQuery,
  useUpdateRequiredDocumentForAdmissionManagerMutation,
  useDeleteRequiredDocumentForAdmissionManagerMutation,
} = requiredDocumentsServiceForAdmissionManager;
