import { useEffect, useState } from "react";

type LoadingProps = {
  text: string;
};

export function Loading({ text }: LoadingProps) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="loading">
      {text}
      {slow && " El servidor se está despertando: puede tardar hasta un minuto."}
    </p>
  );
}
