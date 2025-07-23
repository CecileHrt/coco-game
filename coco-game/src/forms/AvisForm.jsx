import React from "react";
import { BiSolidLike } from "react-icons/bi";
import RatingStar from "../components/avisClient/RatingStar.jsx";
import { NavLink } from "react-router-dom";
import useFeedbackStore from "../stores/useFeedbackStore.js";

export default function AvisForm() {
  const { rating, setRating, avis, setAvis, auteur, setAuteur } =
    useFeedbackStore(); // console.log("setRating type:", typeof setRating);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("rating:", rating);
    console.log("auteur:", auteur);
    console.log("avis:", avis);
  };

  return (
    <section>
      {/* TITRE */}

      <div className="box-h2 pb-2 mt-8">
        <i className="text-lg md:text-2xl xl:text-3xl">
          <BiSolidLike />
        </i>
        <h2 className="text-lg md:text-2xl xl:text-3xl mx-2">
          Encouragez-nous !
        </h2>
        <figure className="bg-[var(--color-mauve-omb)] mt-2.5 md:mt-4 xl:mt-5.5"></figure>
      </div>
      <div className="flex justify-evenly items-center max-sm:flex-col ">
        <div className="sm:w-[45%] py-3">
          <p className="max-w-[800px] italic font-[800] md:text-xl text-lg mb-2 lg:mb-4">
            Votre avis compte vraiment !
          </p>
          <p className="max-w-[800px] italic md:text-lg mb-2 lg:mb-4">
            En le partageant, vous devenez acteur·rice de cette aventure
            éducative et{" "}
            <strong> contribuez à faire grandir l’application </strong>pour tous
            les enfants.
          </p>
        </div>
        {/* FORM */}
        <form
          className="flex flex-col max-w-[800px] sm:w-[45%] mb-2 "
          onSubmit={handleSubmit}
        >
          <label htmlFor="rating" className="mt-4 mb-1 md:text-lg font-[700]">
            Note :
          </label>
          <RatingStar rating={rating} setRating={setRating} />
          <label htmlFor="auteur" className="mt-4 mb-2 md:text-lg font-[700]">
            Présentez-vous :
          </label>
          <input
            type="text"
            id="auteur"
            required
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            placeholder="Eric, papa d'Alexandra, CE2"
            className="bg-[var(--color-blanc-mauve)] p-1 md:p-3 rounded shadow md:text-lg"
          />
          <p className="font-[300] text-right text-gray-600 md:text-sm mt-1 italic text-xs">
            Ne transmettez aucune donnée sensible.
          </p>
          <label htmlFor="avis" className="mt-4 mb-2 md:text-lg font-[700]">
            Donnez votre avis :
          </label>
          <textarea
            name="avis"
            id="avis"
            value={avis}
            required
            onChange={(e) => setAvis(e.target.value)}
            className="bg-[var(--color-blanc-mauve)] p-1 md:p-3 rounded shadow md:text-lg"
            placeholder="Partagez votre expérience"
          ></textarea>
          <p className="text-sm md:text-sm mt-4 mb-4 ">
            En soumettant votre avis, vous acceptez que les données partagées
            soient traitées par CocoGame dans le but d’améliorer l’expérience
            utilisateur ou de promouvoir l’application. Vous pouvez{" "}
            <NavLink
              to="/politique-confidentialite"
              className="text-[var(--color-mauve-omb)] underline"
            >
              consulter la politique de confidentialité
            </NavLink>{" "}
            pour en savoir plus.
          </p>
          <input
            type="submit"
            value="Envoyer mon avis"
            className="cta text-lg my-4 w-full md:w-60 mx-auto pt-1 pb-2 md:text-xl border-[var(--color-mauve-omb)] bg-[var(--color-mauve-omb)] text-[var(--color-blanc-mauve)] hover:text-[var(--color-mauve-omb)] hover:bg-[var(--color-blanc-mauve)]"
          />
        </form>
      </div>
    </section>
  );
}
