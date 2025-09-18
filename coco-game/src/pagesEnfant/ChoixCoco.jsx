import React from "react";
import NavBarJeu from "../components/NavBarJeu.jsx";
import useInscriptionStore from "../stores/useInscriptionStore.js";
import ChildProfile from "../components/ChildProfile.jsx";

export default function ChoixCoco() {
  return (
    <>
      <main
        className="bg-image 
         md:bg-[url(/public/bg-perso/prairie-large.jpg)] bg-[url(/public/bg-perso/prairie-mobile.jpg)] h-screen"
      >
        <NavBarJeu />
        <h1 className="text-3xl text-center mt-3 md:text-4xl font-bold">
          Allons jouer !
        </h1>
        <section className="w-5/6 mx-auto bg-white  mt-6 ">
          <p className="h-[100px]">différents profils dispo</p>
        </section>
      </main>
    </>
  );
}
