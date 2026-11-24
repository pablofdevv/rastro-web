import { CATEGORY_LABELS, CITIES } from "../../app/labels";
import type { ListingFilters as Filters } from "../../app/types";
import styles from "./ListingFilters.module.css";

type ListingFiltersProps = {
  filters: Filters;
  onChange: (name: keyof Filters, value: string) => void;
};

export function ListingFilters({ filters, onChange }: ListingFiltersProps) {
  return (
    <div className={styles.filters}>
      <div className={styles.field}>
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          value={filters.category ?? ""}
          onChange={(e) => onChange("category", e.target.value)}
        >
          <option value="">Todas</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <select
          id="city"
          value={filters.city ?? ""}
          onChange={(e) => onChange("city", e.target.value)}
        >
          <option value="">Todas</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="maxPrice">Precio máximo (€)</label>
        <input
          id="maxPrice"
          type="number"
          min="0"
          placeholder="Sin límite"
          value={filters.maxPrice ?? ""}
          onChange={(e) => onChange("maxPrice", e.target.value)}
        />
      </div>
    </div>
  );
}
