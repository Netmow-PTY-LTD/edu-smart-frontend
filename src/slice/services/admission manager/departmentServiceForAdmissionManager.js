import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const departmentServiceForAdmissionManager = createApi({
  reducerPath: 'departmentServiceForAdmissionManager',
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${serverInfo?.base_url_prod}` +
      '/api/v1/admission-manager/university',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addDepartmentForAdmissionManager: builder.mutation({
      query: (body) => {
        const id =
          body instanceof FormData
            ? body.get('university_id')
            : body.university_id;
        return {
          url: `/${id}/department`,
          method: 'POST',
          body,
        };
      },
    }),
    getDepartmentForAdmissionManager: builder.query({
      query: (id) => {
        return {
          url: `/${id}/department`,
          method: 'GET',
        };
      },
    }),
    getSingleDepartmentForAdmissionManager: builder.query({
      query: (idObj) => {
        const university_id = idObj?.university_id;
        const department_id = idObj?.department_id;

        return {
          url: `/${university_id}/department/${department_id}`,
          method: 'GET',
        };
      },
    }),
    updateDepartmentForAdmissionManager: builder.mutation({
      query: (body) => {
        const university_id =
          body instanceof FormData ? body.get('university_id') : body.id;
        const department_id =
          body instanceof FormData ? body.get('department_id') : body.id;

        return {
          url: `/${university_id}/department/${department_id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    deleteDepartmentForAdmissionManager: builder.mutation({
      query: (idObj) => {
        const university_id = idObj?.university_id;
        const department_id = idObj?.department_id;
        return {
          url: `/${university_id}/department/${department_id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useAddDepartmentForAdmissionManagerMutation,
  useGetDepartmentForAdmissionManagerQuery,
  useUpdateDepartmentForAdmissionManagerMutation,
  useGetSingleDepartmentForAdmissionManagerQuery,
  useDeleteDepartmentForAdmissionManagerMutation,
} = departmentServiceForAdmissionManager;
