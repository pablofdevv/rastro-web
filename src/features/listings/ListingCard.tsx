import { Link } from "react-router-dom";
import { CATEGORY_LABELS, formatPrice } from "../../app/labels";
import type { ListingSummary } from "../../app/types";
import { StatusBadge } from "./StatusBadge";
import styles from "./ListingCard.module.css";

type ListingCardProps = {
  listing: ListingSummary;
};

export function ListingCard({ listing }: ListingCardProps) {
  const categoryLabel = CATEGORY_LABELS[listing.category] ?? listing.category;
  const imageClass = `${styles.image} ${styles[listing.category] ?? ""}`;

  return (
    <Link to={`/listings/${listing.id}`} className={styles.card}>
      <div className={imageClass}>{categoryLabel}</div>
      <div className={styles.body}>
        <span className={styles.price}>{formatPrice(listing.price)}</span>
        <span className={styles.title}>{listing.title}</span>
        <div className={styles.footer}>
          <span>{listing.city}</span>
          <StatusBadge status={listing.status} />
        </div>
      </div>
    </Link>
  );
}
