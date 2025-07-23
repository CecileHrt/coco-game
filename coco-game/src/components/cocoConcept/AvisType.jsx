import React from "react";
import useConceptStore from "../../stores/useConceptStore";
import formatRelativeTime from "../../utils/formatRelativeTime";

export default function AvisType({ id, auteur, message, rating, timestamp }) {
  const { avis, setAvis } = useConceptStore();

  return (
    <article className="relative bg-[var(--color-blanc-mauve)] w-[45%] p-4 shadow-sm rounded-lg m-3 max-sm:w-auto">
      <h3 className="text-[var(--color-bleu-canard)] font-[800] mb-1 md:text-lg xl:text-xl lg:mb-3">
        {auteur}
      </h3>
      <div className="mb-2 md:mb-4">{"⭐".repeat(rating)}</div>
      <p className="mb-2 md:text-lg md:mb-6">{message}</p>
      <p className="absolute right-4 bottom-0 font-[300] italic text-xs text-right text-gray-600 md:text-sm lg:mb-4">
        {formatRelativeTime(timestamp)}
      </p>
    </article>
  );
}
