import React, { useEffect, useRef, useState } from "react";
import NavBarPdv from "../components/NavBarPdv";
import { NavLink, useSearchParams } from "react-router-dom";
import { FaHeart, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FaEgg } from "react-icons/fa6";
import useConceptStore from "../stores/useConceptStore";
import ArgumentType from "../components/cocoConcept/ArgumentType";
import Carousel from "../components/cocoConcept/Carousel";
import AvisType from "../components/cocoConcept/AvisType";
import AvisForm from "../forms/AvisForm";

export default function CocoConcept() {
  const [searchParams] = useSearchParams(); // récupère les search params
  const data = searchParams.get("url"); // ici on récupère la valeur du param "url"
  // console.log("data", data); // affiche la valeur du param "url"

  useEffect(() => {
    if (data) {
      const element = document.getElementById(data);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [data]); // dépendance sur data pour réagir aux changements

  const argumentsList = useConceptStore((state) => state.argumentsList);
  const ListeEnfant = argumentsList.filter((arg) => arg.cible === "enfants");
  const ListeAdulte = argumentsList.filter((arg) => arg.cible === "adultes");
  // console.log("liste adulte", ListeAdulte);  console.log("liste enf", ListeEnfant);

  const videoRef = useRef(null);

  const { avis, setAvis } = useConceptStore();
  const [afficherAvis, setAfficherAvis] = useState(false);
  const AfficherMasquer = () => {
    setAfficherAvis(!afficherAvis);
  };
  const PlusAvis = afficherAvis ? avis.slice() : avis.slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 } // joue la vidéo si au moins 50% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <>
      <NavBarPdv />
      <main>
        {/* HEADER */}
        <header
          className="
         bg-[url(/a-propos/bg-header.webp)] p-8 
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
                // src="/a-propos/pere-et-fille-sur-la-tablette.webp"
                src="/a-propos/pt-pere-et-fille-a-l-aide-de-la-tablette.jpg"
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
                to="/inscription"
                className="cta text-lg my-10 px-2 py-2 md:text-2xl bg-[var(--color-bleu-canard)] text-[var(--color-blanc-mauve)] border-[var(--color-bleu-canard)] hover:bg-[var(--color-blanc-mauve)] hover:text-[var(--color-bleu-canard)]"
              >
                Commencer l'aventure
              </NavLink>
            </div>
            <img
              src="/a-propos/gd-pere-et-fille-tablette.jpg"
              alt="Père et fille,jouent ensemble sur une tablette"
              title="Père et fille,jouent ensemble sur une tablette"
              className="rounded-lg object-cover w-[270px] max-sm:hidden "
            />
          </div>
        </header>

        {/* SECTION 1 - présentation */}
        <section className="bg-linear-[160deg] from-[#ede1f6] to-[#eaceff] p-4  lg:p-16">
          <div className="center">
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
                  className="bg-[var(--color-mauve-mid)] self-end mb-1 rounded-t-sm h-[5px] mt-4 flex-grow w-full  
              md:text-3xl md:mb-1 xl:mb-9 xl:text-4xl"
                ></figure>
              </div>
            </div>
            <article className="sm:w-[70%] mx-auto">
              <h3 className="text-xl text-[var(--color-bleu-canard)] font-[700] mb-6 md:text-2xl xl:text-3xl lg:mb-8">
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

        {/* SECTION 2 - Interface */}
        <section
          id="fonctionnalite"
          className="bg-[var(--color-blanc-mauve)] py-4 pl-4 lg:py-16 lg:pl-16"
        >
          <div className="center">
            {/* TITRE */}
            <div className="flex align-baseline space-x-4 mb-12 pr-4">
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
                  className="bg-[var(--color-jaune)] self-end mb-1 rounded-t-sm h-[5px] mt-4 flex-grow w-full  
              md:text-3xl md:mb-1 xl:mb-9 xl:text-4xl"
                ></figure>
              </div>
            </div>
            {/* INTERFACE */}
            <article className="relative pb-12 ml-auto w-[80%] xl:w-[80%] h-[370px] lg:h-[700px]">
              <div className="absolute w-[80%] rounded-2xl right-0 bg-[url(/a-propos/bg-header.webp)] py-6 pl-6 md:bg-repeat lg:py-16 lg:pl-16">
                {/* images de l'interface */}
                <div className="flex justify-evenly h-[270px] space-x-2 hidden-x overflow-x-scroll lg:h-[450px]">
                  <img
                    src="/a-propos/img-interface/compagnon-choix.jpg"
                    alt="interface CocoGame, page permettant de choisir un compagnon pour cette aventure pédagogique"
                    className="rounded-sm shadow-sm"
                  />
                  <img
                    src="/a-propos/img-interface/espace-compagnon.jpg"
                    alt="interface CocoGame, page permettant de découvrir et d'iteragir avec le compagnon"
                    className="rounded-sm shadow-sm"
                  />
                  <img
                    src="/a-propos/img-interface/boutique.jpg"
                    alt="interface CocoGame, page permettant de présenter la boutique du jeu"
                    className="rounded-sm shadow-sm"
                  />
                  <img
                    src="/a-propos/img-interface/inventaire.jpg"
                    alt="interface CocoGame, page permettant de orésenter la page inventaire du jeu"
                    className="rounded-sm shadow-sm"
                  />
                  <img
                    src="/a-propos/img-interface/choix-mini-jeu.jpg"
                    alt="interface CocoGame, page permettant de découvrir la page de choix des jeux parmi ceux disponible"
                    className="rounded-sm shadow-sm"
                  />
                  <img
                    src="/a-propos/img-interface/tableau-de-bord.jpg"
                    alt="interface CocoGame, page permettant de découvrir l'espace de suivi dédié aux adultes"
                    className="rounded-sm shadow-sm"
                  />
                  <img
                    src="/a-propos/img-interface/preferences.jpg"
                    alt="interface CocoGame, page permettant de modifier les préférences d'utilisation de l'application éducative"
                    className="rounded-sm shadow-sm"
                  />
                </div>
                <img
                  src="/a-propos/img-interface/gd-oeufs.png"
                  className="absolute bottom-[-15px] left-[-15px] w-[90px] lg:w-[250px] lg:bottom-[-30px] lg:left-[-65px]"
                  alt="illustration des oeufs des compagnons dispobibles dans l'application"
                />
              </div>
            </article>

            {/* ENFANT */}
            <article className=" pb-12 sm:w-[70%] mx-auto pr-4 lg:justify-evenly lg:flex ">
              <div className="pr-4 mb-4 ">
                <h3
                  className="text-xl text-[var(--color-mauve-omb)] mb-6 md:text-2xl xl:text-3xl lg:mb-8"
                  style={{ fontFamily: "var(--font-yusei)" }}
                >
                  Avantages pour les enfants&nbsp;:
                </h3>
                {/* arguments enfant */}
                {ListeEnfant.map((arg, index) => (
                  <ArgumentType key={index} {...arg} />
                ))}
              </div>
              <img
                src="/a-propos/petite-fille-a-la-campagne-tient-un-chiot-sur-ses-bras.jpg"
                className="rounded shadow-sm lg:w-2/5 object-cover max-h-[400px]"
                alt="Petite fille à la campagne avec un chien dans les bras avec attention et délicatesse."
                title="Petite fille avec un chien dans les bras"
              />
            </article>
            {/* ADULTE */}
            <article className=" pb-12 sm:w-[70%] mx-auto pr-4 lg:justify-evenly lg:flex  flex flex-col-reverse  lg:flex-row ">
              {/* lg:items-center */}
              <img
                src="/a-propos/vue-laterale-femme-et-fille-a-la-maison-sur-la-tablette.jpg"
                alt="mere qui accompagne sa fille sur la tablette"
                // className="rounded shadow-sm lg:w-2/5 object-cover object-right max-h-[400px] "
                className="rounded shadow-sm lg:w-2/5 object-cover object-right max-h-[400px]"
                title="Mère qui accompagne sa fille sur la tablette"
              />
              <div className="pl-4 mb-4">
                <h3
                  className="text-xl font-yusei text-[var(--color-mauve-omb)] mb-6 md:text-2xl xl:text-3xl lg:mb-8"
                  style={{ fontFamily: "var(--font-yusei)" }}
                >
                  Avantages pour les parents&nbsp;:
                </h3>
                {/* arguments adulte */}
                {ListeAdulte.map((arg, index) => (
                  <ArgumentType key={index} {...arg} />
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* SECTION 3 - Inscription en 3 clics */}
        <section className="bg-[var(--color-bleu-canard)] text-[var(--color-blanc-mauve)] p-4 lg:p-16">
          <div className="center">
            <h2
              className="text-2xl text-center whitespace-nowrap flex-shrink-0
                md:text-3xl xl:text-4xl xl:mb-8 max-sm:whitespace-normal"
            >
              Commencez en 3 étapes
            </h2>
            <div className="flex justify-center space-x-1 py-4 md:my-12">
              <i className="text-lg lg:text-xl">
                <FaEgg />
              </i>
              <i className="text-lg lg:text-xl">
                <FaEgg />
              </i>
              <i className="text-lg lg:text-xl">
                <FaEgg />
              </i>
            </div>

            <div className="xl:flex xl:items-center">
              <article className="md:max-w-[800px] mx-auto">
                <div className="border-[var(--color-blanc-mauve)]/30 border-1 rounded p-2 text-center">
                  <h3 className="mb-2 md:text-2xl">Je créé un compte</h3>
                  <p className="italic text-xs font-[100] md:text-lg">
                    Compte adulte, profil enfant et préférences
                  </p>
                </div>
                <hr className="border-0  bg-[var(--color-blanc-mauve)]/30 w-[0.5px] h-10 xl:h-15 block mx-auto" />
                <div className="border-[var(--color-blanc-mauve)]/30 border-1 rounded p-2 text-center">
                  <h3 className="mb-2 md:text-2xl">
                    Nous choisissons un oeuf surprise
                  </h3>
                  <p className="italic text-xs font-[100] md:text-lg">
                    Parmi une selection de 3 compagnons
                  </p>
                </div>
                <hr className="border-0  bg-[var(--color-blanc-mauve)]/30 w-[0.5px] h-10 xl:h-15 block mx-auto" />
                <div className="border-[var(--color-blanc-mauve)]/30 border-1 rounded p-2 text-center">
                  <h3 className="mb-2 md:text-2xl">Il commence à jouer</h3>
                  <p className="italic text-xs font-[100] md:text-lg">
                    Avec une rapide présentation de l'interface avant de
                    commencer à jouer librement
                  </p>
                </div>
              </article>
              <video
                ref={videoRef}
                className="w-[150px] my-6 mx-auto rounded-4xl md:w-[250px] md:my-14"
                src="/a-propos/video/inscription-video.mp4"
                playsInline
                loop
                preload="auto"
              ></video>
            </div>
            <div className="mx-auto w-70 xl:w-100 ">
              <NavLink
                to="/inscription"
                className="cta text-lg my-10 px-2 py-2 md:text-2xl hover:bg-[var(--color-bleu-canard)] hover:text-[var(--color-blanc-mauve)] border-[var(--color-bleu-canard)] bg-[var(--color-blanc-mauve)] text-[var(--color-bleu-canard)]"
              >
                Découvrir l'univers
              </NavLink>
            </div>
          </div>
        </section>

        {/* SECTION 4 - Pourquoi ?   */}
        <section className="bg-linear-[160deg] from-[#FFD8FA] via-[#C3A3FF] to-[#8964C2] px-4 pt-4 pb-16 lg:p-16">
          <div className="center">
            {/* TITRE */}
            <div className="flex align-baseline space-x-4 mb-12 pr-4">
              <i className=" mt-1 self-baseline text-2xl md:text-3xl xl:text-4xl ">
                <svg
                  width="22"
                  height="26"
                  viewBox="0 0 22 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.2343 14.9211C13.9733 15.6652 13.6473 16.3849 13.2602 17.0719C15.0908 16.4808 17.496 16.9788 18.7164 18.2977C17.5699 20.8726 13.3176 22.8674 11.1259 19.8739C10.7427 20.2537 10.337 20.6101 9.91094 20.941C11.7169 21.2967 13.4681 22.5637 14.1084 24.1562C11.955 26.3097 7.0679 26.8405 5.8995 23.1301C4.03378 23.7846 2.07991 24.1536 0.10398 24.2246L0 22.4597C11.5527 21.8467 15.3589 13.0057 12.8634 5.00472C11.6622 3.26716 13.4873 0.626616 15.1291 0C16.0759 1.57338 16.905 4.71194 14.4532 5.54378C14.6224 6.17453 14.7576 6.81393 14.8582 7.4592C15.6982 6.01716 17.9448 5.20994 19.395 5.46716C19.395 7.5878 18.2759 11.2709 15.0552 9.97387C15.0587 10.7782 14.9983 11.5816 14.8746 12.3764C16.4754 10.7893 19.6303 10.5978 21.3077 11.9769C20.5333 14.6475 16.8065 17.4057 14.2343 14.9211ZM10.803 9.4485C9.47586 9.28706 9.76865 7.40447 11.0137 7.5577C12.2587 7.71094 12.0124 9.58531 10.803 9.4485ZM10.3296 11.8647C11.8783 12.0535 11.5801 14.4149 10.056 14.2288C8.4087 14.0127 8.77263 11.6594 10.3296 11.851V11.8647ZM6.92288 18.4318C4.85149 18.1773 5.30845 15.2358 7.25397 15.4766C9.19949 15.7174 8.81641 18.6617 6.92288 18.4291V18.4318Z"
                    fill="var(--color-mauve-omb)"
                  />
                </svg>
              </i>
              <div className="flex space-x-4 w-full max-sm:flex-col">
                <h2
                  className="text-2xl whitespace-nowrap flex-shrink-0
                md:text-3xl xl:text-4xl xl:mb-8 max-sm:whitespace-normal"
                >
                  Pourquoi je choisis cette application éducative&nbsp;?
                </h2>
                <figure
                  className="bg-[var(--color-mauve-omb)] self-end mb-1 rounded-t-sm h-[5px] mt-4 flex-grow w-full  
              md:text-3xl md:mb-1 xl:mb-9 xl:text-4xl"
                ></figure>
              </div>
            </div>
            <article className="sm:w-[70%] mx-auto">
              <p className="mb-4 md:text-xl md:mb-6">
                Parce qu’aujourd’hui, l’écran fait partie de la vie des enfants,
                autant en faire <strong> un allié bienveillant</strong>.
              </p>
              <p className="mb-8 md:text-xl md:mb-10">
                Entre écrans passifs et devoirs trop sérieux, cette application
                éducative propose un nouveau souffle : une expérience
                interactive, affective et évolutive{" "}
                <strong>
                  qui crée du lien en toute liberté, sans pub et avec le sourire
                </strong>
                .
              </p>
            </article>
            <Carousel />
          </div>
        </section>

        {/* SECTION 5 - Avis */}
        <section
          id="avis"
          className="bg-[var(--color-mauve-pastel)] p-4 lg:p-16"
        >
          <div className="center">
            <div className="flex align-baseline space-x-4 mb-8">
              <i className="text-red-400 mt-1 self-baseline text-2xl md:text-3xl xl:text-4xl ">
                <FaHeart />
              </i>
              <div className="flex space-x-4 w-full max-sm:flex-col">
                <h2
                  className="text-2xl whitespace-nowrap flex-shrink-0
                md:text-3xl xl:text-4xl xl:mb-8 max-sm:whitespace-normal"
                >
                  Vos avis nous font grandir
                </h2>
                <figure
                  className="bg-red-500 self-end mb-1 rounded-t-sm h-[5px] mt-4 flex-grow w-full  
              md:text-3xl md:mb-1 xl:mb-9 xl:text-4xl"
                ></figure>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-evenly max-sm:flex-col">
            {PlusAvis.map((item) => (
              <AvisType key={item.id} {...item} />
            ))}
            <button
              onClick={AfficherMasquer}
              className="rounded flex items-center w-50 justify-center mx-auto text-gray-600 bg-[var(--color-blanc-mauve)] border-[var(--color-blanc-mauve)] my-2 "
            >
              {afficherAvis ? (
                <>
                  Voir les 4 derniers avis
                  <i>
                    <FaAngleUp />
                  </i>
                </>
              ) : (
                <>
                  Voir tous les avis
                  <i>
                    <FaAngleDown />
                  </i>
                </>
              )}
            </button>
          </div>
          <div className="mx-auto w-70 xl:w-100 ">
            <NavLink
              to="/inscription"
              className="cta text-lg my-10 px-2 pt-2 pb-3 md:text-2xl bg-[var(--color-bleu-canard)] text-[var(--color-blanc-mauve)] border-[var(--color-bleu-canard)] hover:bg-[var(--color-blanc-mauve)] hover:text-[var(--color-bleu-canard)]"
            >
              Commencer l'aventure
            </NavLink>
          </div>
        </section>
        <footer className="p-4 flex flex-col items-center justify-center space-x-2 bg-[var(--color-bleu-canard)]">
          <div className="logotype pl-2">
            <img
              src="/logo-coco.webp"
              alt="logo le l'application, poussin"
              title="Logo Coco Game"
            />
            <span
              className="text-[var(--color-blanc-mauve)] text-xl"
              style={{ fontFamily: "var(--font-yusei)" }}
            >
              Coco Game
            </span>
          </div>
          <div className="flex flex-col sm:flex-row text-center pt-4 text-[var(--color-blanc-mauve)]">
            <p className="mx-2 font-[300]">Tous droits réservés</p>
            <p className="mx-2 font-[300]">Projet de formation - 2025</p>
          </div>
        </footer>
      </main>
    </>
  );
}
