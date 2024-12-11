import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const universityAdministrationSocialLinkService = createApi({
  reducerPath: 'universityAdministrationSocialLinkService',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://edu-smart-backend-3n7b.onrender.com/api/v1/university/admin/university',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // -------------------------------------- Endpoints -------------------------------

  endpoints: (builder) => ({
    updateUniversitySocialLink: builder.mutation({
      query: ({data,university_id}) => {
        return {
          url: `/${university_id}/website/social-links`,
          method: 'PUT',
          body:data,
        };
      },
    }),

   

    
  }),
});

export const {
useUpdateUniversitySocialLinkMutation
} =  universityAdministrationSocialLinkService;
