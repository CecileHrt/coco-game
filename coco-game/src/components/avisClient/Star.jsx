import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export const Star = ({ filled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-yellow-500  focus:outline-none"
    aria-label={filled ? "Étoile remplie" : "Étoile vide"}
  >
    {filled ? (
      <FaStar className="h-8 w-8" />
    ) : (
      <FaRegStar className="h-8 w-8 " />
    )}
  </button>
);
