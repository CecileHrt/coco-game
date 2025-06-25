import React, { useEffect, useState } from "react";
import NavBarPdv from "../components/NavBarPdv";
import { NavLink } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { FaEgg } from "react-icons/fa6";
import useConceptStore from "../stores/useConceptStore";
import ArgumentType from "../components/ArgumentType";

export default function CocoConcept() {
  const argumentsList = useConceptStore((state) => state.argumentsList);

  const ListeEnfant = argumentsList.filter((arg) => arg.cible === "enfants");
  const ListeAdulte = argumentsList.filter((arg) => arg.cible === "adultes");
  console.log("liste adulte", ListeAdulte);
  console.log("liste enf", ListeEnfant);
  return (
    <>
      <NavBarPdv />
      <main>
        <header
          className="
         bg-[url(../../public/a-propos/bg-header.webp)] p-8 
         md:bg-repeat lg:p-16"
        >
          <div
            className="flex justify-between rounded-xl shadow-lg bg-[var(--color-blanc-mauve)] p-4 mx-auto
          sm:p-16 lg:justify-evenly center"
          >
            {/* xl:max-w-[1300px] xl:mx-auto */}
            <div className=" flex-1 sm:pr-8 lg:max-w-[600px]">
              <h1 className="text-[var(--color-bleu-canard)] text-3xl md:text-4xl xl:text-[48px] xl:mb-8 ">
                Un compagnon virtuel pour&nbsp;apprendre
              </h1>
              <p className="mb-4 md:text-xl xl:mb-6">
                Offrez à votre enfant une aventure interactive qui développe{" "}
                <strong>l’empathie, le sens des responsabilités</strong> et
                encourage l’<strong>apprentissage par le jeu</strong>.
              </p>
              <p className="mb-8 md:text-xl xl:mb-10">
                Chaque activité est <strong>adaptée à son âge</strong>, pour une
                expérience éducative à la fois douce et engageante.
              </p>
              <img
                // src="../../public/a-propos/pere-et-fille-sur-la-tablette.webp"
                src="../../public/a-propos/pt-pere-et-fille-a-l-aide-de-la-tablette.jpg"
                alt="Père et fille,jouent ensemble sur une tablette"
                title="Père et fille,jouent ensemble sur une tablette"
                className="rounded-sm mx-auto max-h-[300px] object-cover mt-8 mb-4 sm:hidden"
              />
              <p
                className="text-center italic mx-auto mb-8 text-xs text-gray-600 w-[70%]
              sm:mx-0 sm:text-left sm:w-full md:text-lg lg:mb-8"
              >
                Application éducative dédiée aux enfants
                de&nbsp;4&nbsp;à&nbsp;10&nbsp;ans.
              </p>
              <NavLink
                to="/choix-coco"
                className="cta bg-[var(--color-bleu-canard)] text-[var(--color-blanc-mauve)] text-lg md:text-2xl border-[var(--color-bleu-canard)] hover:bg-[var(--color-blanc-mauve)] hover:text-[var(--color-bleu-canard)]"
              >
                Commencer l'aventure
              </NavLink>
            </div>
            <img
              src="../../public/a-propos/gd-pere-et-fille-tablette.jpg"
              alt="Père et fille,jouent ensemble sur une tablette"
              title="Père et fille,jouent ensemble sur une tablette"
              className="rounded-lg object-cover w-[270px] max-sm:hidden "
            />
          </div>
        </header>
        {/* section 1 - présentation */}
        <section className="bg-linear-[160deg] from-[#ede1f6] to-[#eaceff] p-8  lg:p-16">
          <div className="center">
            {/* xl:max-w-[1300px] xl:mx-auto  */}
            <div className="flex align-baseline space-x-4 mb-8">
              <i className="text-[var(--color-mauve-mid)] mt-1 self-baseline text-2xl md:text-3xl xl:text-4xl ">
                <FaHeart />
              </i>
              <div className="flex space-x-4 w-full max-sm:flex-col">
                <h2
                  className="text-2xl whitespace-nowrap flex-shrink-0
                md:text-3xl xl:text-4xl xl:mb-8 max-sm:whitespace-normal"
                >
                  Un outil pédagogique riche en émotion
                </h2>
                <figure
                  className="bg-[var(--color-mauve-mid)] self-end mb-1 rounded-t-sm h-1 mt-4 flex-grow w-full  
              md:text-3xl md:mb-1 xl:mb-9 xl:text-4xl"
                ></figure>
              </div>
            </div>
            <article className="sm:w-[70%] mx-auto">
              <h3 className="text-xl text-[var(--color-bleu-canard)] mb-6 md:text-2xl xl:text-3xl lg:mb-8">
                Les enfants au coeur du projet
              </h3>
              <p className="mb-4 md:text-xl md:mb-6">
                Offrez bien <strong>plus qu’un jeu </strong> : un compagnon
                virtuel qui l’aide à grandir, s’exprimer et apprendre à son
                rythme.
              </p>
              <p className="mb-4 md:text-xl md:mb-6">
                L’application est pensée pour éveiller la curiosité et{" "}
                <strong>
                  cultiver la bienveillance des enfants de 4 à 10 ans
                </strong>
                .
              </p>
              <p className="mb-4 md:text-xl md:mb-6">
                <strong>Suivez</strong> les progrès,{" "}
                <strong>personnalisez</strong> les activités et accompagnez
                votre enfant dans une{" "}
                <strong>
                  expérience positive et intelligente du numérique
                </strong>
                .
              </p>
            </article>
          </div>
        </section>
        {/* section 2 - Interface */}
        <section className="bg-linear-[160deg] from-[#ede1f6] to-[#eaceff] p-8  lg:p-16">
          <div className="center">
            {/* xl:max-w-[1300px] xl:mx-auto  */}
            <div className="flex align-baseline space-x-4 mb-8">
              <i className="text-[var(--color-jaune)] mt-1 self-baseline text-2xl md:text-3xl xl:text-4xl ">
                <FaEgg />
              </i>
              <div className="flex space-x-4 w-full max-sm:flex-col">
                <h2
                  className="text-2xl whitespace-nowrap flex-shrink-0
                md:text-3xl xl:text-4xl xl:mb-8 max-sm:whitespace-normal"
                >
                  Une application pensée pour petits et grands
                </h2>
                <figure
                  className="bg-[var(--color-jaune)] self-end mb-1 rounded-t-sm h-1 mt-4 flex-grow w-full  
              md:text-3xl md:mb-1 xl:mb-9 xl:text-4xl"
                ></figure>
              </div>
            </div>
            <article className="sm:w-[70%] mx-auto">
              <div className="mb-8">
                <h3 className="text-xl text-[var(--color-mauve-omb)] mb-6 md:text-2xl xl:text-3xl lg:mb-8">
                  Avantages pour les enfants&nbsp;:
                </h3>
                {/* arguments enfant */}
                {ListeEnfant.map((arg, index) => (
                  <ArgumentType key={index} {...arg} />
                ))}
              </div>
              {/* <img src="" alt="" /> */}
            </article>
            <article className="sm:w-[70%] mx-auto">
              <div>
                <h3 className="text-xl text-[var(--color-mauve-omb)] mb-6 md:text-2xl xl:text-3xl lg:mb-8">
                  Avantages pour les parents&nbsp;:
                </h3>
                {/* arguments adulte */}
                {ListeAdulte.map((arg, index) => (
                  <ArgumentType key={index} {...arg} />
                ))}
              </div>
              {/* <img src="" alt="" /> */}
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
