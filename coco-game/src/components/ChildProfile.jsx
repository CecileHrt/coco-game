import React from "react";
import useInscriptionStore from "../stores/useInscriptionStore";

export default function ChildProfile({ prenom }) {
  const user = useInscriptionStore((state) => state.user);
  // console.log("child depuis ChildProfile", user.child);

  return (
    <article className="w-[40%] bg-[var(--color-mauve-pastel)] shadow-mauve rounded-sm p-4 mx-2 my-3 text-center">
      {/* IMAGE PROFIL*/}
      <img
        src="\img-profil-enf-150.png"
        alt="image de profil enfant fille"
        className="w-[100%] max-w-[100px]"
      />
      <h2 className="capitalize">{prenom}</h2>
    </article>
  );
}
