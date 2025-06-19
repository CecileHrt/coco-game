import React from "react";
import { IoArrowUndo, IoCreate } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function BackEdit() {
  return (
    <div className="flex items-center justify-end space-x-1.5 md:max-w-3xl md:mx-auto">
      <NavLink to="/tableau-bord" className="flex items-center">
        <i className="text-3xl p-1 hover:text-[var(--color-mauve-omb)]">
          <IoArrowUndo />
        </i>
      </NavLink>

      <i className="text-3xl p-1 hover:text-[var(--color-mauve-omb)]">
        <IoCreate className="text-2xl hover:text-[var(--color-mauve-omb)]" />
      </i>
    </div>
  );
}
