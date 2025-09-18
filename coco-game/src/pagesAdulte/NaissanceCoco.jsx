import React from "react";
import { Link } from "react-router-dom";

const NaissanceCoco = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-[160deg] from-[#FFD8FA] via-[#C3A3FF] to-[#8964C2] text-[#1f1b24] p-6 text-center ">
      <h1 className="text-7xl font-bold text-[#b031d7] mb-4">
        Bienvenue Maurice
      </h1>
      <h2 className="text-2xl font-semibold mb-6">
        Le choix de l’œuf devra encore attendre...
      </h2>
      <p className="text-lg max-w-lg mb-8">
        Ici se trouveront prochainement les étapes de choix du compagnon, suivi
        d'un didacticiel rapide pour découvrir l'espace de jeu.
      </p>
      <p className="text-lg max-w-lg mb-8">
        En attendant, imagine que ces étapes ont eu lieu et qu'il s'agit
        maintenant d'une énième visite.
      </p>
      <Link
        to="/choix-coco"
        className="btn-jaune px-6 py-3 rounded-lg shadow-md hover:opacity-90 text-[#1f1b24] font-bold text-base transition duration-300"
      >
        Découvrir l'espace permettant de jouer avec Coco
      </Link>
    </div>
  );
};

export default NaissanceCoco;
