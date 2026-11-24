import { STATUS_LABELS } from "../../app/labels";
import styles from "./StatusBadge.module.css";

type StatusBadgeProps = {
  status: string; // AVAILABLE, RESERVED, SOLD... (también los de las ofertas)
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const badgeClass = `${styles.badge} ${styles[status] ?? ""}`;
  const label = STATUS_LABELS[status] ?? status;

  return <span className={badgeClass}>{label}</span>;
}
