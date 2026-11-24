import { useGetOffersQuery } from "../../app/api";
import { formatPrice } from "../../app/labels";
import { StatusBadge } from "../listings/StatusBadge";
import styles from "./OfferList.module.css";

type OfferListProps = {
  listingId: string;
};

export function OfferList({ listingId }: OfferListProps) {
  const { data: offers = [], isLoading, isError } = useGetOffersQuery(listingId);

  return (
    <div className={styles.box}>
      <h2>Ofertas ({offers.length})</h2>

      {isLoading && <p className="loading">Cargando ofertas...</p>}
      {isError && <p className="error">Error al cargar las ofertas.</p>}

      {!isLoading && !isError && offers.length === 0 && (
        <p>Todavía no hay ofertas.</p>
      )}

      {!isLoading && !isError && offers.length > 0 && (
        <div>
          {offers.map((offer) => (
            <div key={offer.id} className={styles.offer}>
              <span>{offer.buyer.name}</span>
              <strong>{formatPrice(offer.amount)}</strong>
              <StatusBadge status={offer.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
