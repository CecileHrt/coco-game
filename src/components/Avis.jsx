import React from "react";
import useConceptStore from "../stores/useConceptStore";
import formatRelativeTime from "../utils/formatRelativeTime";

export default function Avis({ id, auteur, message, rating, timestamp }) {
  const { avis, setAvis } = useConceptStore();
  // console.log("auteur :", { auteur });
  // const relative = formatRelativeTime("2025-04-27 14:30:00");

  return (
    <article className="bg-[var(--color-blanc-mauve)] w-[45%] p-4 shadow-sm rounded-lg m-3  max-sm:w-auto">
      <h3 className="text-[var(--color-bleu-canard)] font-[800] mb-1 md:text-lg xl:text-xl lg:mb-3">
        {auteur}
      </h3>
      {/* <div className="mb-2 md:mb-4">{rating}</div> */}
      <div className="mb-2 md:mb-4">{"⭐".repeat(rating)}</div>
      <p className="mb-2 md:text-xl md:mb-4">{message}</p>
      <p className="font-[300] italic text-xs text-right text-gray-600 md:text-sm lg:mb-4">
        {formatRelativeTime(timestamp)}
      </p>
    </article>
  );
}

// auteur": "Alice, maman de Léa (7 ans)",
// "message": "J’adore cette application ! La création du compte est rapide et simple, juste un email et un mot de passe pour moi, et le prénom, l’anniversaire et la classe pour Léa. Ça rassure de ne pas avoir à renseigner plein d’infos inutiles. Mon enfant s’amuse tout en apprenant, et je peux suivre ses progrès facilement.",
// "timestamp": "2025-06-20T14:30:00Z",
// "rating": 5
