import React from "react";
import BackEdit from "../components/BackEdit.jsx";
import NavBarJeu from "../components/NavBarJeu.jsx";
import HighContrastSwitch from "../components/preferences/HighContrastSwitch.jsx";
import FontTypeSwitch from "../components/preferences/FontTypeSwitch.jsx";
import VoiceSwitch from "../components/preferences/VoiceSwitch.jsx";
import { FaChartLine, FaCheck } from "react-icons/fa";
import { BiSolidTimer } from "react-icons/bi";
import { IoNotifications, IoArrowUndo, IoCreate } from "react-icons/io5";
import { FaX } from "react-icons/fa6";
import SynthesisButton from "../components/preferences/SynthesisButton.jsx";
import SwitchModel from "../components/SwitchModel.jsx";

export default function Preferences() {
  return (
    <>
      <NavBarJeu />
      <main className="bg-linear-[160deg] p-2 from-[#FFD8FA] via-[#C3A3FF] to-[#8964C2] w-full ">
        <BackEdit />
        <h1 className="text-3xl text-center md:text-4xl font-bold">
          Préférences
        </h1>
        <div className="box-white-transparent md:max-w-3xl md:mx-auto p-4 md:p-12 xl:max-w-6xl space-y-4 ">
          {/* PEDAGOGIE & ACCESSIBILITE */}
          <section className="space-y-4 mb-4 md:mb-6">
            <div className="box-h2 pb-2">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <FaChartLine />
              </i>
              <h2 className="text-lg md:text-2xl xl:text-3xl mx-2">
                Pédagogie & accessibilité
              </h2>
              <figure className="bg-[var(--color-mauve-omb)] mt-2.5 md:mt-4 xl:mt-5.5"></figure>
            </div>

            {/* Assistance vocale */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Assistance vocale :</h3>
                <VoiceSwitch />
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Les fonctions de synthèse et de reconnaissance vocales sont
                  conseillées pour favoriser l’autonomie des enfants ne pouvant
                  lire ou écrire seul.
                </p>
                <SynthesisButton
                  text="Les fonctions de synthèse et de reconnaissance vocales sont
                  conseillées pour favoriser l’autonomie des enfants ne pouvant
                  lire ou écrire seul."
                />
              </div>
            </article>

            {/* Contraste évelé */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Contraste évelé :</h3>
                <HighContrastSwitch />
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Remplacer le thème actuel par un thème contrasté optimisant
                  ainsi la lisibilité.
                </p>
                <SynthesisButton text="Remplacer le thème actuel par un thème contrasté optimisant ainsi la lisibilité. " />
              </div>
            </article>

            {/* Police Dys */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Police Dys :</h3>
                <FontTypeSwitch />
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Remplacer les polices actuelles par une police d’écriture
                  adaptée aux troubles Dys.
                </p>
                <SynthesisButton text="Remplacer les polices actuelles par une police d’écriture adaptée aux troubles dys. " />
              </div>
            </article>

            {/* Classe */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Niveau scolaire :</h3>
                <p className="font-[800]"> CE1</p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Renseigner la classe fréquentée par l'enfant permet d'adapter
                  la difficulté des jeux.
                </p>
                <SynthesisButton text="Renseigner la classe fréquentée par l'enfant permet d'adapter la difficulté des jeux." />
              </div>
            </article>
          </section>

          {/* TPS DE JEU */}
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

            {/* Durée Max Journalière */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Durée maximale journalière&nbsp;:</h3>
                <p className="font-[800]"> 30min</p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Le temps d’écran renseigné correspond à l’énergie quotidienne
                  attribuée au compagnon.
                </p>
                <SynthesisButton text="Le temps d’écran renseigné correspond à l’énergie journalière attribuée au compagnon. " />
              </div>
            </article>

            {/* horaires d'accès. */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Horaire d’accessibilité :</h3>
                <p className="font-[800]"> 17h-19h</p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Heures où l’application est accessible pour l’enfant. En
                  dehors des heures, seul le mode de jeu ne sera pas disponible.
                </p>
                <SynthesisButton text="Heures où l’application est accessible pour l’enfant. En dehors des heures, seul le mode de jeu ne sera pas disponible." />
              </div>
            </article>
          </section>

          {/* NOTIFICATIONS */}
          <section className="space-y-4 mb-4 md:mb-6">
            <div className="box-h2 pb-2 mt-8">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <IoNotifications />
              </i>
              <h2 className="text-lg md:text-2xl xl:text-3xl mx-2">
                Notifications
              </h2>
              <figure className="bg-[var(--color-mauve-omb)] mt-2.5 md:mt-4 xl:mt-5.5"></figure>
            </div>

            {/* Encouragement de fréquence */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Encouragement de fréquence&nbsp;:</h3>
                <SwitchModel />
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Messages d’encouragement ou informatif à l’attention de
                  l’enfant, afin de l'inviter à jouer ou à s’occuper du
                  compagnon.
                </p>
                <SynthesisButton text="Messages d’encouragement ou informatif à l’attention de l’enfant, afin de l'inviter à jouer ou à s’occuper du compagnon." />
              </div>
            </article>

            {/* Alerte d’engagement :  */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3>Alerte d’engagement :</h3>
                <SwitchModel />
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                  Recevez des mises en garde lorsque la fréquence de jeu devient
                  irrégulière.
                </p>
                <SynthesisButton text="Recevez des mises en garde lorsque la fréquence de jeu devient irrégulière." />
              </div>
            </article>
          </section>

          {/* buttons */}
          <div className="space-y-4 flex flex-col items-end md:flex-row-reverse md:justify-start">
            <button className="btn-valider md:ml-4 ">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <FaCheck />
              </i>
              <p className="md:text-lg">Enregistrer les modifications</p>
            </button>
            <button className="btn-annuler">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <FaX />
              </i>
              <p className="md:text-lg">Annuler les modifications</p>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

//   import SpeechButton from "../components/preferences/SpeechButton.jsx";
//   import SynthesisButton from "../components/preferences/SynthesisButton.jsx";
// <div className="flex items-center space-x-4 bg-red-400 p-4 rounded">
//   <p>Reconnaissance vocale</p>
//   <SynthesisButton text="Bonjour, ceci est une synthèse vocale." />
// </div>
// <div className="flex items-center space-x-4 bg-red-400 p-4 rounded">
//   <p>Synthèse vocale</p>
//   <SpeechButton
//     onResult={(result) => console.log("Texte reconnu :", result)}
//   />
// </div>
