import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

export const applicationService = createApi({
  reducerPath: 'applicationService',
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
    createApplication: builder.mutation({
      query: (data) => {
        return {
          url: '/application',
          method: 'POST',
          body: data,
        };
      },
    }),
    getApplications: builder.query({
      query: () => ({
        url: '/application',
        method: 'GET',
      }),
    }),
    getRecentApplications: builder.query({
      query: () => ({
        url: '/applications/recent',
        method: 'GET',
      }),
    }),
    getApplication: builder.query({
      query: (id) => ({
        url: `/application/${id}`,
        method: 'GET',
      }),
    }),
    getAllEmgsStatus: builder.query({
      query: (id) => ({
        url: `/application/emgs/status/${id}`,
        method: 'GET',
      }),
    }),
    getEmgsStatusTimeline: builder.query({
      query: (id) => ({
        url: `/application/emgs/status/${id}/timeline`,
        method: 'GET',
      }),
    }),
    checkApplicationIsValid: builder.query({
      query: ({ course_id, student_id }) => ({
        url: `/application/${course_id}/verify/${student_id}`,
        method: 'GET',
      }),
    }),
    addEmgsTimeline: builder.mutation({
      query: (data) => {
        const id = data.get('id');
        return {
          url: `/application/emgs/status/${id}/timeline`,
          method: 'POST',
          body: data,
        };
      },
    }),
    updateApplicationStatus: builder.mutation({
      query: (data) => {
        const application_id = data.id;
        return {
          url: `/super/application/status/${application_id}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetApplicationsQuery,
  useGetApplicationQuery,
  useGetAllEmgsStatusQuery,
  useGetEmgsStatusTimelineQuery,
  useAddEmgsTimelineMutation,
  useGetRecentApplicationsQuery,
  useCheckApplicationIsValidQuery,
  useUpdateApplicationStatusMutation,
} = applicationService;
