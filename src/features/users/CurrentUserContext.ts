import { createContext, useContext } from "react";
import type { User } from "./users";

type CurrentUserValue = {
  user: User;
  changeUser: (id: string) => void;
};

export const CurrentUserContext = createContext<CurrentUserValue | null>(null);

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useCurrentUser tiene que estar dentro de <CurrentUserProvider>"
    );
  }
  return context;
}
