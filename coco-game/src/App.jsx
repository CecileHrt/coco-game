import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import AdaptativeMode from "./AdaptativeMode";
import { Toaster } from "react-hot-toast";
import useInscriptionStore from "./stores/useInscriptionStore";

function App() {
  // LOADER
  const data = useLoaderData(); // récupère { user } depuis authLoader
  const setUser = useInscriptionStore((state) => state.setUser);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user); // hydrate le store avant le rendu des routes protégées
    }
  }, [data, setUser]);

  return (
    <>
      <AdaptativeMode>
        <Toaster position="top-right" reverseOrder={false} />
        <Outlet />
        {/* <CocoConcept />; */}
      </AdaptativeMode>
    </>
  );
}

export default App;
