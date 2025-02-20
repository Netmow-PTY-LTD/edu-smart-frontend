import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const courseCategoriesServiceForAdmissionManager = createApi({
  reducerPath: 'courseCategoriesServiceForAdmissionManager',
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${serverInfo?.base_url_prod}` +
      '/api/v1/university/admission-manager/university',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addCourseCategoryForAdmissionManager: builder.mutation({
      query: (body) => {
        const university_id =
          body instanceof FormData
            ? body.get('university_id')
            : body.university_id;
        const department_id =
          body instanceof FormData
            ? body.get('department_id')
            : body.department;

        return {
          url: `/${university_id}/department/${department_id}/category`,
          method: 'POST',
          body,
        };
      },
    }),
    getAllCourseCategoriesForAdmissionManager: builder.query({
      query: (university_id) => {
        return {
          url: `/${university_id}/category`,
          method: 'GET',
        };
      },
    }),
    getSingleCourseCategoryForAdmissionManager: builder.query({
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
    updateCourseCategoryForAdmissionManager: builder.mutation({
      query: (body) => {
        const category_id = body.category_id;
        const university_id = body.university_id;
        const department_id = body.department_id;

        return {
          url: `/${university_id}/department/${department_id}/category/${category_id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    deleteCourseCategoryForAdmissionManager: builder.mutation({
      query: (data) => {
        const category_id = data?.category_id;
        const university_id = data?.university_id;

        return {
          url: `/${university_id}/category/${category_id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useAddCourseCategoryForAdmissionManagerMutation,
  useGetAllCourseCategoriesForAdmissionManagerQuery,
  useUpdateCourseCategoryForAdmissionManagerMutation,
  useGetSingleCourseCategoryForAdmissionManagerQuery,
  useDeleteCourseCategoryForAdmissionManagerMutation,
} = courseCategoriesServiceForAdmissionManager;
