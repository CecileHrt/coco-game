import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ArgumentType({ titre, texte, index }) {
  // console.log("récupération des infos", { titre });

  const [anim, setAnim] = useState(false);
  const ref = useRef(null); // animer le 1er argument lorsqu'il apparait à l'écran

  const ouverture = (e) => {
    // console.log("Type d'événement :", e.type);
    setAnim(true);
    setTimeout(() => setAnim(false), 5000);
  };

  useEffect(() => {
    if (index !== 0) return; // seulement pour le 1er

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ouverture();
            observer.disconnect(); // déclenché une seule fois
          }
        });
      },
      { threshold: 0.5 } // 50% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [index]);

  return (
    <>
      <div
        ref={ref}
        onClick={ouverture}
        className="arguments-pdv transition-all duration-300 ease-in-out cursor-pointer mb-2 md:mb-6 hover:bg-[var(--color-mauve-pastel)] p-1 rounded"
      >
        <div className="flex space-x-2 items-center">
          <i
            className={`mr-2 mb-1 text-base md:text-xl text-[var(--color-mauve-mid)] transition-all duration-500 ease-in-out 
             ${anim ? "rotate-216" : "rotate-0"}`}
          >
            <FaStar />
          </i>
          <h4 className="font-[700] text-base md:text-xl">{titre}</h4>
        </div>
        <p
          className={`text-base md:text-xl overflow-hidden transition-all duration-500 ease-in-out 
              ${anim ? "opacity-100 max-h-40" : "opacity-0 max-h-0"}`}
        >
          {texte}
        </p>
      </div>
    </>
  );
}
