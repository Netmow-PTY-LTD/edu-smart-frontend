import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const universityAdministrationGalleryService = createApi({
  reducerPath: 'universityAdministrationGalleryService',
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
    updateUniversityGallery: builder.mutation({
      query: (data) => {
        const university_id = data.get('university_id');
        return {
          url: `/${university_id}/website/gallery`,
          method: 'PUT',
          body: data,
        };
      },
    }),
  }),
});

export const { useUpdateUniversityGalleryMutation } =
  universityAdministrationGalleryService;
