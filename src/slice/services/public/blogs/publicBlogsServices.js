import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const publicBlogServices = createApi({
  reducerPath: 'publicBlogServices',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverInfo?.base_url_prod}` + '/api/v1/public',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: `/blogs`,
        method: 'GET',
      }),
    }),
    getSingleBlog: builder.query({
      query: (slug) => ({
        url: `/blogs/${slug}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetSingleBlogQuery } =
  publicBlogServices;
