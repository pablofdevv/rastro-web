import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteListingMutation, useUpdatePriceMutation } from "../../app/api";
import { getErrorMessage } from "../../app/apiError";
import type { Listing } from "../../app/types";
import styles from "./ListingDetailPage.module.css";

type SellerPanelProps = {
  listing: Listing;
};

export function SellerPanel({ listing }: SellerPanelProps) {
  const [price, setPrice] = useState(String(listing.price));
  const [error, setError] = useState<string | null>(null);
  const [updatePrice, { isLoading: saving }] = useUpdatePriceMutation();
  const [deleteListing, { isLoading: deleting }] = useDeleteListingMutation();
  const navigate = useNavigate();

  async function savePrice(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      await updatePrice({ id: listing.id, price: Number(price) }).unwrap();
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }

  async function remove() {
    setError(null);
    try {
      await deleteListing(listing.id).unwrap();
      navigate("/");
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }

  return (
    <form onSubmit={savePrice}>
      <h2>Tu anuncio</h2>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <label htmlFor="price">Nuevo precio (€)</label>
      <div className={styles.row}>
        <input
          id="price"
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
      <button
        type="button"
        className="danger"
        onClick={remove}
        disabled={deleting}
      >
        {deleting ? "Borrando..." : "Borrar anuncio"}
      </button>
    </form>
  );
}
