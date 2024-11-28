import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const courseService = createApi({
  reducerPath: 'courseService',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://edu-smart-backend-3n7b.onrender.com/api/v1/super/university',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (body) => {
        const university_id = body?.university_id;
        const department_id = body?.department_id;
        const category_id = body?.category_id;
        return {
          url: `/${university_id}/department/${department_id}/category/${category_id}/course`,
          method: 'POST',
          body,
        };
      },
    }),
    getCourse: builder.query({
      query: (university_id) => {
        return {
          url: `/${university_id}/course`,
          method: 'GET',
        };
      },
    }),
    getSingleCourse: builder.query({
      query: (idObj) => {
        const university_id = idObj?.university_id;
        const department_id = idObj?.department_id;
        const category_id = idObj?.category_id;
        const course_id = idObj?.course_id;

        return {
          url: `/${university_id}/department/${department_id}/category/${category_id}/course/${course_id}`,
          method: 'GET',
        };
      },
    }),
    updateCourse: builder.mutation({
      query: (body) => {
        const university_id = body?.university_id;
        const department_id = body?.department_id;
        const category_id = body?.category_id;
        const course_id = body?.course_id;

        return {
          url: `/${university_id}/department/${department_id}/category/${category_id}/course/${course_id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    deleteCourse: builder.mutation({
      query: (idObj) => {
        const university_id = idObj?.university_id;
        const course_id = idObj?.course_id;
        return {
          url: `/${university_id}/course/${course_id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useGetSingleCourseQuery,
  useDeleteCourseMutation,
} = courseService;
