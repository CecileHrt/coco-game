import React from "react";
import useInscriptionStore from "../stores/useInscriptionStore";

export default function ChildProfile({ classe, prenom }) {
  const user = useInscriptionStore((state) => state.user);
  console.log("child depuis ChildProfile", user.child);

  return (
    <div>
      <p>Bonjour : {classe}</p>
    </div>
  );
}
