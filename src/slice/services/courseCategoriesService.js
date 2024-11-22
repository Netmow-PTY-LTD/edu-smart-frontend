import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseCategoriesService = createApi({
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
    addCourseCategory: builder.mutation({
      query: (data) => {
        const university_id =
          data instanceof FormData ? data.get('university_id') : data.id;
        const department_id =
          data instanceof FormData ? data.get('department_id') : data.id;

        return {
          url: `/${university_id}/department/${department_id}/category`,
          method: 'POST',
          data,
        };
      },
    }),
    getAllCourseCategories: builder.query({
      query: (data) => {
        const university_id = data?.university_id || '';
        const department_id = data?.department_id || '';

        return {
          url: `/${university_id}/department/${department_id}/category`,
          method: 'GET',
        };
      },
    }),
    getSingleCourseCategory: builder.query({
      query: (data) => {
        const id = data?.id;
        const university_id = data?.university_id;
        const department_id = data?.department_id;

        return {
          url: `/${university_id}/department/${department_id}/category/${id}`,
          method: 'GET',
        };
      },
    }),
    updateCourseCategory: builder.mutation({
      query: (data) => {
        const id = data.id;
        const university_id =
          data instanceof FormData ? data.get('university_id') : data.id;
        const department_id =
          data instanceof FormData ? data.get('department_id') : data.id;

        return {
          url: `/${university_id}/department/${department_id}/category/${id}`,
          method: 'PATCH',
          data,
        };
      },
    }),
    deleteCourseCategory: builder.mutation({
      query: (data) => {
        const id = data?.id;
        const university_id = data?.university_id;
        const department_id = data?.department_id;
        return {
          url: `/${university_id}/department/${department_id}/category/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useAddCourseCategoryMutation,
  useGetAllCourseCategoriesQuery,
  useUpdateCourseCategoryMutation,
  useGetSingleCourseCategoryQuery,
  useDeleteCourseCategoryMutation,
} = courseCategoriesService;
