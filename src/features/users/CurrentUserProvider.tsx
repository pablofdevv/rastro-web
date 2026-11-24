import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { USERS } from "./users";

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId") ?? USERS[0].id
  );

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  const user = USERS.find((u) => u.id === userId) ?? USERS[0];

  return (
    <CurrentUserContext.Provider value={{ user, changeUser: setUserId }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
