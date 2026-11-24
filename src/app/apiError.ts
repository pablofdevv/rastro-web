// Saca un texto legible de un error de la API (se copia tal cual).
// La API de Rastro responde { error: "texto" }
export function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { error?: string } }).data;
    if (data?.error) return data.error;
  }
  return "No se ha podido conectar con la API.";
}
