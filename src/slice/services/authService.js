import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://baker-street-library-24-7-server.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    healthCheck: builder.query({
      query: () => ({
        url: "/",
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    loggedInUser: builder.query({
      query: () => "/auth/user",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLoggedInUserQuery,
  useHealthCheckQuery,
} = authService;