import { apiSlice } from "./apiSlice";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/users/auth`,
        method: "POST",
        body: data,
      }),
      invalidateTags: ["Users"],
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidateTags: ["Users"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutaion } = userApiSlice;
