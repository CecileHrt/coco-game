import React from "react";
import NavBarJeu from "../components/NavBarJeu.jsx";
import useInscriptionStore from "../stores/useInscriptionStore.js";
import ChildProfile from "../components/ChildProfile.jsx";

export default function ChoixCoco() {
  const { user } = useInscriptionStore();
  console.log("User ds ChoixCoco:", user);
  return (
    <>
      <main
        className="bg-image 
         md:bg-[url(/public/bg-perso/prairie-large.jpg)] bg-[url(/public/bg-perso/prairie-mobile.jpg)] h-screen"
      >
        <NavBarJeu />
        <h1 className="text-3xl text-center mt-12 md:text-4xl font-bold">
          Allons jouer !
        </h1>
        <section className="w-5/6 mx-auto flex flex-wrap justify-center items-center mt-6 ">
          {user.childList.slice(0, 4).map((enfant) => (
            <ChildProfile key={enfant._id} prenom={enfant.prenom} />
          ))}
          {/* Limite manuelle à 4 enfants pour la phase de production. à modifier ultérieurement */}
        </section>
      </main>
    </>
  );
}
