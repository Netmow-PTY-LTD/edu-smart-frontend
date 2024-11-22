import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const departmentService = createApi({
  reducerPath: 'departmentService',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://edu-smart-backend-3n7b.onrender.com/api/v1/super/university',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addDepartment: builder.mutation({
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
    getDepartment: builder.query({
      query: (id) => {
        return {
          url: `/${id}/department`,
          method: 'GET',
        };
      },
    }),
    getSingleDepartment: builder.query({
      query: (idObj) => {
        const university_id = idObj?.university_id;
        const department_id = idObj?.department_id;

        return {
          url: `/${university_id}/department/${department_id}`,
          method: 'GET',
        };
      },
    }),
    updateDepartment: builder.mutation({
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
    deleteDepartment: builder.mutation({
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
  useAddDepartmentMutation,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
  useGetSingleDepartmentQuery,
  useDeleteDepartmentMutation,
} = departmentService;
