// Los textos en español de los valores que llegan en inglés (se copia tal cual)

export const CATEGORY_LABELS: Record<string, string> = {
  Cars: "Coches",
  Phones: "Móviles",
  Clothes: "Ropa",
  Furniture: "Muebles",
};

export const STATUS_LABELS: Record<string, string> = {
  AVAILABLE: "Disponible",
  RESERVED: "Reservado",
  SOLD: "Vendido",
  PENDING: "Pendiente",
  ACCEPTED: "Aceptada",
  REJECTED: "Rechazada",
};

export const CITIES = ["Valencia", "Alicante", "Castellón"];

// 6500 → "6.500 €"
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(price);
}
