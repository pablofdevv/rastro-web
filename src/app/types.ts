// Cómo llegan los datos (de momento, de db.json)

export type ListingStatus = "AVAILABLE" | "RESERVED" | "SOLD";
export type OfferStatus = "PENDING" | "ACCEPTED" | "REJECTED";

// Lo que usa el listado (GET /listings)
export type ListingSummary = {
  id: string;
  title: string;
  price: number;
  category: string;
  city: string;
  status: ListingStatus;
};

// La ficha completa (GET /listings/:id): lo de arriba y más
export type Listing = ListingSummary & {
  description: string;
  publishedAt: string;
  views: number;
  seller: { id: string; name: string };
  attributes: Record<string, string | number>;
};

// Un anuncio nuevo: todo menos el id, que lo pone json-server
export type NewListing = Omit<Listing, "id">;

export type Offer = {
  id: string;
  listingId: string;
  amount: number;
  status: OfferStatus;
  createdAt: string;
  buyer: { id: string; name: string };
};

// json-server guarda lo que le mandes: hay que mandarlo todo
export type NewOffer = Omit<Offer, "id">;

// Los filtros del listado. Todos opcionales
export type ListingFilters = {
  category?: string;
  city?: string;
  maxPrice?: string;
};
