import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Listing,
  ListingFilters,
  ListingSummary,
  NewListing,
  NewOffer,
  Offer,
} from "./types";

interface RawListingSummary extends Omit<ListingSummary, "id"> {
  id?: string;
  _id?: string;
}

interface RawListing extends Omit<Listing, "id"> {
  id?: string;
  _id?: string;
}

interface RawOffer extends Omit<Offer, "id"> {
  id?: string;
  _id?: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Listing", "Offer"],
  endpoints: (builder) => ({
    // GET /listings (o /api/listings)
    getListings: builder.query<ListingSummary[], ListingFilters>({
      query: ({ category, city, maxPrice }) => ({
        url: "/listings",
        params: {
          category,
          city,
          maxPrice,
          "price:lte": maxPrice,
          price_lte: maxPrice,
          _sort: "-publishedAt",
        },
      }),
      transformResponse: (response: RawListingSummary[]) =>
        response.map((item) => ({
          ...item,
          id: String(item._id ?? item.id),
        })),
      providesTags: ["Listing"],
    }),

    // GET /listings/:id
    getListing: builder.query<Listing, string>({
      query: (id) => `/listings/${id}`,
      transformResponse: (item: RawListing) => ({
        ...item,
        id: String(item._id ?? item.id),
      }),
      providesTags: ["Listing"],
    }),

    // GET /listings/:id/offers (Express) o fallback /offers?listingId=... (json-server)
    getOffers: builder.query<Offer[], string>({
      query: (listingId) => {
        const isExpress = import.meta.env.VITE_API_URL?.endsWith("/api");
        return isExpress
          ? `/listings/${listingId}/offers`
          : {
              url: "/offers",
              params: { listingId, _sort: "-createdAt" },
            };
      },
      transformResponse: (response: RawOffer[]) =>
        response.map((item) => ({
          ...item,
          id: String(item._id ?? item.id),
        })),
      providesTags: ["Offer"],
    }),

    // POST /offers
    createOffer: builder.mutation<Offer, NewOffer & { buyerId?: string }>({
      query: (body) => ({
        url: "/offers",
        method: "POST",
        body,
      }),
      transformResponse: (item: RawOffer) => ({
        ...item,
        id: String(item._id ?? item.id),
      }),
      invalidatesTags: ["Offer"],
    }),

    // POST /listings
    createListing: builder.mutation<Listing, NewListing & { sellerId?: string }>({
      query: (body) => ({
        url: "/listings",
        method: "POST",
        body,
      }),
      transformResponse: (item: RawListing) => ({
        ...item,
        id: String(item._id ?? item.id),
      }),
      invalidatesTags: ["Listing"],
    }),

    // PATCH /listings/:id  (solo el precio)
    updatePrice: builder.mutation<Listing, { id: string; price: number }>({
      query: ({ id, price }) => ({
        url: `/listings/${id}`,
        method: "PATCH",
        body: { price },
      }),
      transformResponse: (item: RawListing) => ({
        ...item,
        id: String(item._id ?? item.id),
      }),
      invalidatesTags: ["Listing"],
    }),

    // DELETE /listings/:id
    deleteListing: builder.mutation<void, string>({
      query: (id) => ({
        url: `/listings/${id}`,
        method: "DELETE",
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
  useUpdatePriceMutation,
  useDeleteListingMutation,
} = api;
