import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const superAdminBlogServices = createApi({
  reducerPath: 'superAdminBlogServices',
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
    addBlog: builder.mutation({
      query: (body) => {
        return {
          url: `/blog`,
          method: 'POST',
          body,
        };
      },
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: `/blogs`,
        method: 'GET',
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/blog/${id}`,
          method: 'PATCH',
          body: formData,
        };
      },
    }),
    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          url: `/blog/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = superAdminBlogServices;
