import { useLoaderData } from "react-router-dom";
import useInscriptionStore from "../stores/useInscriptionStore.js";
import { useEffect } from "react";

export default function AuchProviderZustand({ children }) {
  const initialUser = useLoaderData();
  const setUser = useInscriptionStore((state) => state.setUser);

  console.log("Initial user dans AuthProviderZustand:", initialUser);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser]);

  return children;
}
