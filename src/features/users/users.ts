// No hay GET /users: los 5 usuarios de los datos van aquí (se copia tal cual)
export type User = {
  id: string;
  name: string;
};

export const USERS: User[] = [
  { id: "660000000000000000000001", name: "Ana García" },
  { id: "660000000000000000000002", name: "Luis Martín" },
  { id: "660000000000000000000003", name: "Marta Ruiz" },
  { id: "660000000000000000000004", name: "Hugo Sanz" },
  { id: "660000000000000000000005", name: "Sara López" },
];
