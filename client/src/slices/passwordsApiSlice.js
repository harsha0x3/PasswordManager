import { apiSlice } from "./apiSlice";

export const passwordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generate: builder.mutation({
      query: (data) => ({
        url: "/passwords/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Passwords"],
    }),

    generateNSave: builder.mutation({
      query: (data) => ({
        url: `/passwords/generate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Passwords"],
    }),

    getPasswords: builder.query({
      query: () => ({
        url: "/passwords/mypasswords",
        method: "GET",
      }),
      providesTags: ["Passwords"],
    }),

    updatePasswordData: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `passwords/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Passwords"],
    }),
  }),
});

export const {
  useGenerateMutation,
  useGetPasswordsQuery,
  useUpdatePasswordDataMutation,
  useGenerateNSaveMutation,
} = passwordsApiSlice;
