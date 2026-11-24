import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Listing,
  ListingFilters,
  ListingSummary,
  NewListing,
  NewOffer,
  Offer,
} from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Listing", "Offer"],
  endpoints: (builder) => ({
    // GET /listings?category=Cars&city=Valencia&price:lte=500&_sort=-publishedAt
    getListings: builder.query<ListingSummary[], ListingFilters>({
      query: ({ category, city, maxPrice }) => ({
        url: "/listings",
        params: {
          category,
          city,
          "price:lte": maxPrice,
          price_lte: maxPrice,
          _sort: "-publishedAt",
        },
      }),
      providesTags: ["Listing"],
    }),

    // GET /listings/:id
    getListing: builder.query<Listing, string>({
      query: (id) => `/listings/${id}`,
      providesTags: ["Listing"],
    }),

    // GET /offers?listingId=listing-1
    getOffers: builder.query<Offer[], string>({
      query: (listingId) => ({
        url: "/offers",
        params: { listingId, _sort: "-createdAt" },
      }),
      providesTags: ["Offer"],
    }),

    // POST /offers
    createOffer: builder.mutation<Offer, NewOffer>({
      query: (body) => ({
        url: "/offers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Offer"],
    }),

    // POST /listings
    createListing: builder.mutation<Listing, NewListing>({
      query: (body) => ({
        url: "/listings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Listing"],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetListingQuery,
  useGetOffersQuery,
  useCreateOfferMutation,
  useCreateListingMutation,
} = api;
