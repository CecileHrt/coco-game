import AvatarEnfant from "../components/identification/AvatarEnfant.jsx";
import NavBarJeu from "../components/NavBarJeu.jsx";
import { IoArrowUndo, IoCreate } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { FaChartLine, FaCheck, FaHeart } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { BiSolidTimer } from "react-icons/bi";
import AvisForm from "../forms/AvisForm.jsx";
import useInscriptionStore from "../stores/useInscriptionStore.js";

export default function TableauBord() {
  const children = useInscriptionStore((state) => state.user.childList);
  console.log(children);
  return (
    <>
      <NavBarJeu />
      <main className="bg-linear-[160deg] p-2 from-[#FFD8FA]  via-[#C3A3FF] to-[#8964C2] w-full ">
        <div className="flex items-center justify-end space-x-1.5 md:max-w-3xl xl:max-w-6xl md:mx-auto">
          <AvatarEnfant />
        </div>

        <h1 className="text-3xl text-center md:text-4xl font-bold">
          Tableau de bord
        </h1>

        {/* <div className="box-white-transparent md:max-w-3xl md:mx-auto p-4 md:p-12 space-y-4 "> */}

        <div className="box-white-transparent md:max-w-3xl md:mx-auto p-4 md:p-12 xl:max-w-6xl space-y-4 ">
          {/* RESULTATS*/}
          <section className="space-y-4 mb-4 md:mb-6">
            <div className="box-h2 pb-2">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <FaChartLine />
              </i>
              <h2 className="text-lg md:text-2xl xl:text-3xl mx-2">
                Résultats des mini-jeux
              </h2>
              <figure className="bg-[var(--color-mauve-omb)] mt-2.5 md:mt-4 xl:mt-5.5"></figure>
            </div>

            {/* Resultats moyens */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Résultats moyens :</h3>
                <p className="font-[800]"> Excellent</p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Moyenne de la position à l’issue des mini jeux (Excellent,
                  Bon, Non validé).
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>

            {/* Catégorie Jouée */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Catégorie la plus jouée :</h3>
                <p className="font-[800]"> Maths</p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Catégorie de jeu préférée par l'enfant.
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>

            {/* Catégorie faible */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Catégorie faible :</h3>
                <p className="font-[800]"> Anglais</p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Catégorie de jeu où les résultats de l’enfant sont les moins
                  élevés.
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>
          </section>

          {/* TEMPS D'ECRAN*/}
          <section className="space-y-4 mb-4 md:mb-6">
            <div className="box-h2 pb-2 mt-8">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <BiSolidTimer />
              </i>
              <h2 className="text-lg md:text-2xl xl:text-3xl mx-2">
                Temps de jeu
              </h2>
              <figure className="bg-[var(--color-mauve-omb)] mt-2.5 md:mt-4 xl:mt-5.5"></figure>
            </div>

            {/* Resultats moyens */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Temps de jeu cumulé :</h3>
                <p className="font-[800]"> 6h40</p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Moyenne mensuelle du temps de connexion de l’enfant.
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>

            {/* Catégorie Jouée */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Durée moyenne des sessions :</h3>
                <p className="font-[800] whitespace-nowrap"> 32 min</p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Durée moyenne d’activité du profil enfant, par session de jeu.
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>

            {/* Catégorie faible */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Moyenne de mini-jeu :</h3>
                <p className="font-[800]"> 4 mini-jeu</p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Mini-jeux réalisés en moyenne par session de jeu.
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>
          </section>

          {/* INTERACTION AFFECTIVES */}
          <section className="space-y-4 mb-4 md:mb-6">
            <div className="box-h2 pb-2 mt-8">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <FaHeart />
              </i>
              <h2 className="text-lg md:text-2xl xl:text-3xl mx-2">
                Interactions affectives
              </h2>
              <figure className="bg-[var(--color-mauve-omb)] mt-2.5 md:mt-4 xl:mt-5.5"></figure>
            </div>

            {/* Resultats moyens */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Etat général du compagnon :</h3>
                <p className="font-[800]"> Bon</p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Moyenne représentative de l’état du compagnon sur un mois :
                  fréquence des soins, état des jauges (faim et joie).
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>
          </section>

          {/* FORMULAIRE */}
          <section className="space-y-4 mb-4 md:mb-6">
            {/* <div className="p-4 lg:p-16"> */}
            <AvisForm />
            {/* </div> */}
          </section>

          {/* buttons
          <div className="space-y-4 flex flex-col items-end md:flex-row-reverse md:justify-start">
            <button className="btn-valider md:ml-4 ">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <FaCheck />
              </i>
              <p>Enregistrer les modifications</p>
            </button>
            <button className="btn-annuler">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <FaX />
              </i>
              <p>Annuler les modifications</p>
            </button>
          </div> */}
        </div>
      </main>
    </>
  );
}
