import { useState } from "react";

export default function BurgerMenu({ toggleMenu, toggleActive, active }) {
  return (
    <button
      className="relative w-11 h-8 cursor-pointer z-99"
      onClick={() => {
        toggleActive();
        toggleMenu();
      }}
    >
      <span
        className={`absolute left-0 w-10 h-1.5 rounded bg-[var(--color-mauve-omb)] transition-all duration-300 ease-in-out 
          ${active ? "top-1/2 rotate-45" : "top-0 rotate-0"}`}
      />
      <span
        className={`absolute left-0 w-10 h-1.5 rounded bg-[var(--color-mauve-omb)] transition-all duration-300 ease-in-out 
          ${active ? "opacity-0" : "top-1/2 -translate-y-1/2"}`}
      />
      <span
        className={`absolute left-0 w-10 h-1.5 rounded bg-[var(--color-mauve-omb)] transition-all duration-300 ease-in-out 
          ${
            active
              ? "top-1/2 -rotate-45"
              : "top-full -translate-y-full rotate-0"
          }`}
      />
    </button>
  );
}
