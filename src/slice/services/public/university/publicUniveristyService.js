import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const publicUniversityService = createApi({
  reducerPath: 'publicUniversityService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-smart-backend-3n7b.onrender.com/api/v1/public',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUniversity: builder.query({
      query: () => ({
        url: '/university',
        method: 'GET',
      }),
    }),
    getsingleUniversity: builder.query({
      query: (university_id) => ({
        url: `/university/${university_id}`,
        method: 'GET',
      }),
    }),

    filterUniversityCourses: builder.query({
      query: ({ university_id, args }) => {
        const params = new URLSearchParams();
        // Check if args exist and append key-value pairs to params
        if (args && Array.isArray(args)) {
          args.forEach((item) => {
            if (item.name && item.value) {
              params.append(item.name, item.value);
            }
          });
        }

        return {
          url: `university/${university_id}/courses`,
          method: 'GET',
          params: params,
        };
      },
    }),

    getSingleCourse: builder.query({
      query: (data) => {
        return {
          url: `/university/${data?.university_id}/course/${data?.course_id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetAllUniversityQuery,
  useGetsingleUniversityQuery,
  useFilterUniversityCoursesQuery,
} = publicUniversityService;
