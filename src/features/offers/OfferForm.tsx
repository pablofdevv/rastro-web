import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateOfferMutation } from "../../app/api";
import { getErrorMessage } from "../../app/apiError";
import { useCurrentUser } from "../users/CurrentUserContext";

type OfferFormProps = {
  listingId: string;
};

export function OfferForm({ listingId }: OfferFormProps) {
  const { user } = useCurrentUser();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [createOffer, { isLoading }] = useCreateOfferMutation();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!amount || Number.isNaN(numAmount) || numAmount <= 0) {
      setError("La oferta tiene que ser mayor que cero.");
      return;
    }
    setError(null);
    try {
      await createOffer({
        listingId,
        buyerId: user.id,
        amount: numAmount,
        status: "PENDING",
        createdAt: new Date().toISOString(),
        buyer: user,
      }).unwrap();
      setAmount("");
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hacer una oferta</h2>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <label htmlFor="amount">Tu oferta (€)</label>
      <input
        id="amount"
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Ej: 300"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Ofertar"}
      </button>
    </form>
  );
}
