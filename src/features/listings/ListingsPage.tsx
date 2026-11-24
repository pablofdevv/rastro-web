import { useSearchParams } from "react-router-dom";
import { useGetListingsQuery } from "../../app/api";
import type { ListingFilters as Filters } from "../../app/types";
import { Loading } from "../../components/ui/Loading";
import { ListingCard } from "./ListingCard";
import { ListingFilters } from "./ListingFilters";

export function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters: Filters = Object.fromEntries(searchParams);

  const { data: listings = [], isLoading, isError } = useGetListingsQuery(filters);

  function changeFilter(name: keyof Filters, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(name, value);
    } else {
      next.delete(name);
    }
    setSearchParams(next);
  }

  return (
    <>
      <h1>Anuncios</h1>
      <ListingFilters filters={filters} onChange={changeFilter} />

      {isLoading && <Loading text="Cargando anuncios..." />}
      {isError && <p className="error">No se ha podido conectar con la API.</p>}
      {!isLoading && !isError && listings.length === 0 && (
        <p>No hay anuncios con esos filtros.</p>
      )}
      {!isLoading && !isError && listings.length > 0 && (
        <div className="grid">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </>
  );
}
