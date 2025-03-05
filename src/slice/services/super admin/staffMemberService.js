import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const staffMemberService = createApi({
  reducerPath: 'staffMemberService',
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
    addStaffMemberInSuperAdmin: builder.mutation({
      query: (body) => {
        return {
          url: `/staff-member`,
          method: 'POST',
          body,
        };
      },
    }),
    getStaffMemberInSuperAdmin: builder.query({
      query: () => {
        return {
          url: `/staff-members`,
          method: 'GET',
        };
      },
    }),
    updateStaffMemberInSuperAdmin: builder.mutation({
      query: (body) => {
        const user_id = body.get('user_id');
        return {
          url: `/staff-members/${user_id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    getSingleStaffMemberInSuperAdmin: builder.query({
      query: (id) => {
        return {
          url: `/staff-members/${id}`,
          method: 'GET',
        };
      },
    }),
    updateStaffMemberStatusInSuperAdmin: builder.mutation({
      query: (body) => {
        return {
          url: `/staff-members/${body?.id}/status`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useAddStaffMemberInSuperAdminMutation,
  useGetSingleStaffMemberInSuperAdminQuery,
  useGetStaffMemberInSuperAdminQuery,
  useUpdateStaffMemberInSuperAdminMutation,
  useUpdateStaffMemberStatusInSuperAdminMutation,
} = staffMemberService;
