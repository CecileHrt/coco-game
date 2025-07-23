import React, { useEffect, useState } from "react";
import { FaChild } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function AvatarEnfant() {
  const [animProfil, setAnimProfil] = useState(false);

  const ouverture = (e) => {
    console.log("Type d'événement :", e.type);
    setAnimProfil(true);
    setTimeout(() => setAnimProfil(false), 5000);
  };
  useEffect(() => {
    // console.log("état:", animProfil);
  }, [animProfil]);

  return (
    <div className="flex space-x-1" onClick={ouverture}>
      <div
        className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out 
          ${animProfil ? "opacity-100 " : "opacity-0"}`}
      >
        {/* <NavLink to="/profil-enfant"> */}
        <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
          <FaChild />
        </i>
        {/* </NavLink> */}
        <p
          className="text-base md:text-xl "
          style={{ fontFamily: "var(--font-yusei)" }}
        >
          Mauricette
        </p>
      </div>
      <img src="\img-profil-enf.png" alt="image de profil enfant fille" />
    </div>
  );
}
