import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ListingFilters, ListingSummary } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Listing", "Offer"],
  endpoints: (builder) => ({
    // GET /listings?category=Cars&city=Valencia&price:lte=500&_sort=-publishedAt
    getListings: builder.query<ListingSummary[], ListingFilters>({
      query: ({ category, city, maxPrice }) => ({
        url: "/listings",
        params: { category, city, "price:lte": maxPrice, _sort: "-publishedAt" },
      }),
      providesTags: ["Listing"],
    }),
  }),
});

export const { useGetListingsQuery } = api;
