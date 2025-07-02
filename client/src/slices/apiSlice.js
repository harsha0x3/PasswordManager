import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Users", "Passwords"],
  endpoints: (builder) => ({}),
});
