import { FaPlus } from "react-icons/fa";
import NavBarJeu from "../components/NavBarJeu.jsx";
import { FaEgg } from "react-icons/fa6";
import { IoArrowUndo, IoCreate } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProfilEnfant() {
  return (
    <>
      <NavBarJeu />
      <main className="bg-linear-[160deg] p-2 from-[#FFD8FA] via-[#C3A3FF] to-[#8964C2] w-full min-h-screen">
        {/* BACK - EDIT */}
        <div className="flex justify-between">
          {/* Ajouter un enfant */}
          <NavLink
            to="/creer-profil-enfant"
            className="flex items-center rounded hover:bg-[var(--color-mauve-omb)] bg-[var(--color-mauve-clair)]"
          >
            <i className="text-xl p-2">
              <FaPlus />
            </i>
          </NavLink>

          <div className="flex items-center justify-end space-x-1.5 md:max-w-3xl xl:max-w-6xl md:mx-auto">
            <NavLink to="/tableau-de-bord" className="flex items-center">
              <i className="text-3xl p-1 hover:text-[var(--color-mauve-omb)]">
                <IoArrowUndo />
              </i>
            </NavLink>

            <NavLink to="/edit-profil-enfant" className="flex items-center">
              <i className="text-3xl p-1 hover:text-[var(--color-mauve-omb)]">
                <IoCreate className="text-2xl hover:text-[var(--color-mauve-omb)]" />
              </i>
            </NavLink>
          </div>
        </div>
        <h1 className="text-3xl text-center md:text-4xl font-bold">
          Profil enfant
        </h1>

        {/* <div className="box-white-transparent md:max-w-3xl md:mx-auto p-4 md:p-12 space-y-4 "> */}

        <div className="box-white-transparent md:max-w-3xl md:mx-auto p-4 md:p-12 xl:max-w-6xl space-y-4 min-h-[70vh]">
          {/* RESULTATS*/}
          <section className="space-y-4 mb-4 md:mb-6">
            <div className="box-h2 pb-2">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <FaEgg />
              </i>
              <h2 className="text-lg md:text-2xl xl:text-3xl mx-2">
                Informations
              </h2>
              <figure className="bg-[var(--color-mauve-omb)] mt-2.5 md:mt-4 xl:mt-5.5"></figure>
            </div>

            <div className="flex items-end justify-between ">
              {/* PRENOM */}
              <article>
                <div className="flex items-center justify-between space-x-4 mb-1">
                  <h3 className="font-[800]">Prénom :</h3>
                </div>
                <div className="flex justify-between ">
                  <p className=" text-gray-600 ml-4 mt-2 max-w-[90%] flex-1 md:text-lg">
                    Mauricette
                  </p>
                  {/* <SynthesisButton text="" /> */}
                </div>
              </article>
              {/* IMAGE PROFIL*/}
              <article className="w-[25%] max-w-[150px]">
                <img
                  src="\img-profil-enf-150.png"
                  alt="image de profil enfant fille"
                  className="w-[100%] max-w-[100px]"
                />
              </article>
            </div>

            {/* DATE DE NAISSANCE */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3 className="font-[800]">Date de naissance :</h3>
              </div>
              <div className="flex justify-between ">
                <p className="text-gray-600 ml-4 mt-2 max-w-[90%] flex-1 md:text-sm">
                  10/07/2017
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>

            {/* NIVEAU */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3 className="font-[800]">Niveau scolaire :</h3>
              </div>
              <div className="flex justify-between ">
                <p className=" text-gray-600 ml-4 mt-2 max-w-[90%] flex-1 md:text-lg">
                  CE1
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}
