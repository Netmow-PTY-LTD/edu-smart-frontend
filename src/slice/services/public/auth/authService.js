import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const authService = createApi({
  reducerPath: 'authService',
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
    verifyExistingUser: builder.mutation({
      query: (body) => ({
        url: '/verify/user',
        method: 'POST',
        body,
      }),
    }),
    generateOtp: builder.mutation({
      query: (body) => ({
        url: '/otp',
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: '/otp/verify',
        method: 'POST',
        body,
      }),
    }),
    agentRegister: builder.mutation({
      query: (body) => ({
        url: '/register/agent',
        method: 'POST',
        body,
      }),
    }),
    studentRegister: builder.mutation({
      query: (body) => ({
        url: '/register/student',
        method: 'POST',
        body,
      }),
    }),
    universityRegister: builder.mutation({
      query: (body) => ({
        url: '/register/university-administrator',
        method: 'POST',
        body,
      }),
    }),
    logIn: builder.mutation({
      query: (body) => {
        return {
          url: `/login`,
          method: 'POST',
          body,
        };
      },
    }),
    subdomain: builder.query({
      query: () => {
        return {
          url: `/subdomain`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useVerifyExistingUserMutation,
  useGenerateOtpMutation,
  useVerifyOtpMutation,
  useAgentRegisterMutation,
  useStudentRegisterMutation,
  useUniversityRegisterMutation,
  useLogInMutation,
  useSubdomainQuery,
} = authService;
