import { serverInfo } from '@/utils/common/serverInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const packageService = createApi({
  reducerPath: 'packageService',
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
    addPackageInSuperAdmin: builder.mutation({
      query: (body) => {
        return {
          url: `/package`,
          method: 'POST',
          body,
        };
      },
    }),
    updatePackageInSuperAdmin: builder.mutation({
      query: (body) => {
        const package_id = body.get('package_id');
        return {
          url: `/package/${package_id}`,
          method: 'PATCH',
          body: body,
        };
      },
    }),
  }),
});

export const {
  useAddPackageInSuperAdminMutation,
  useUpdatePackageInSuperAdminMutation,
} = packageService;
