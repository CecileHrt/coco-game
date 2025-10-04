import NavBarJeu from "../components/NavBarJeu.jsx";
import { FaEgg } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createProfile } from "../apis/auth.api.js";
import useInscriptionStore from "../stores/useInscriptionStore";
import { NavLink } from "react-router-dom";

export default function CreationProfilEnf() {
  // const addChildProfile = useInscriptionStore((state) => state.addChildProfile); remplacée pour le rechargement suite à l'inscription :
  const { updateUser } = useInscriptionStore();
  const navigate = useNavigate();

  const defaultValues = {
    prenom: "",
    anniversaire: "",
    classe: "",
    accParental: false,
    // image de profil
  };

  const schema = yup.object({
    prenom: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le prénom est trop court")
      .max(50, "Le prénom est trop long"),
    anniversaire: yup
      .date()
      .typeError("Veuillez entrer une date valide")
      .required("Le champ est obligatoire")
      .max(new Date(), "La date ne peut pas être dans le futur"),
    classe: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf(["MS", "GS", "CP", "CE1", "CE2", "CM1", "CM2"]),
    accParental: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les termes et conditions"),

    // image de profil
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function submit(values) {
    //console.log(values);
    try {
      const child = await createProfile(values);
      if (!child) {
        toast.error("Impossible de créer le profil enfant.");
        return; // si pas de child, on arrête la fonction
      }
      // addChildProfile(child); Ne fonctionne pas, remplacer par la mise à jour
      updateUser(child);
      toast.success("Profil enregistré !");
      reset(defaultValues);
      // console.log("Nouvel enfant créé :", child);
      navigate("/confirmer-preferences");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    }
  }

  return (
    <>
      <NavBarJeu />
      <main className="bg-linear-[160deg] p-2 from-[#EDE1F6] to-[#EACEFF] w-full min-h-screen">
        {/* STARTER 2 */}
        <div className="flex items-center justify-center my-10 md:my-12 space-x-1.5 md:max-w-3xl xl:max-w-6xl md:mx-auto">
          <i className="text-lg md:text-2xl xl:text-3xl text-[var(--color-mauve-mid)]">
            <FaEgg />
          </i>
          <i className="text-lg md:text-2xl xl:text-3xl text-[var(--color-mauve-mid)]">
            <FaEgg />
          </i>
          <i className="text-lg md:text-2xl xl:text-3xl text-[var(--color-mauve-mid)]/30">
            <FaEgg />
          </i>
        </div>

        <h1 className="text-3xl text-center md:text-4xl font-bold">
          Créer un profil enfant
        </h1>

        <div className="box-white md:max-w-3xl md:mx-auto p-4 md:p-12 xl:max-w-6xl space-y-4 min-h-[70vh]">
          <p className="mb-4 md:text-xl md:mb-6">
            La date anniversaire et la classe fréquentée sont nécessaires pour
            optimiser l’expérience de jeu et optimiser des interactions avec le
            compagnon.
          </p>

          {/* FORM */}
          <form
            className="mx-auto space-y-4 mb-4 md:mb-6 max-w-[450px] flex flex-col"
            onSubmit={handleSubmit(submit)}
          >
            <div className="flex justify-between items-end space-x-4 mb-2">
              {/* PRENOM */}
              <div className="flex flex-col space-x-4 mb-2">
                <label
                  htmlFor="prenom"
                  required
                  className="mt-4 mb-2 md:text-lg font-[700]"
                >
                  Prénom :
                </label>
                <input
                  {...register("prenom")}
                  type="text"
                  id="prenom"
                  required
                  placeholder="Mauricette"
                  className="bg-[var(--color-blanc-bleu)] p-1 md:p-3 rounded shadow md:text-lg"
                />
                {errors.prenom && (
                  <p className="text-red-500">{errors.prenom.message}</p>
                )}
              </div>

              {/* IMAGE PROFIL */}
              <div className="w-[25%] max-w-[150px]">
                <img
                  src="\img-profil-enf-150.png"
                  alt="image de profil enfant fille"
                  className="w-[100%] max-w-[100px]"
                />
              </div>
            </div>

            {/* AGE */}
            <div className="flex flex-col space-x-4 mb-2">
              <label
                htmlFor="anniversaire"
                className="mt-4 mb-2 md:text-lg font-[700]"
              >
                Date de naissance :
              </label>
              <input
                {...register("anniversaire")}
                type="date"
                id="anniversaire"
                required
                placeholder="10/07/17"
                className="bg-[var(--color-blanc-bleu)] p-1 md:p-3 rounded shadow md:text-lg"
              />
              {errors.anniversaire && (
                <p className="text-red-500">{errors.anniversaire.message}</p>
              )}
            </div>

            {/* CLASSE */}
            <div className="flex flex-col space-x-4 mb-4 md:mb-6 ">
              <label
                htmlFor="classe"
                className="mt-4 mb-2 md:text-lg font-[700]"
              >
                Classe fréquentée :
              </label>

              <select
                {...register("classe")}
                id="classe"
                required
                className="bg-[var(--color-blanc-bleu)] p-1 md:p-3 rounded shadow md:text-lg"
                defaultValue=""
              >
                <option
                  value=""
                  disabled
                  className="text-[#1f1b24] bg-[#ede1f6]"
                >
                  Sélectionnez une classe
                </option>
                <option value="MS">MS</option>
                <option value="GS">GS</option>
                <option value="CP">CP</option>
                <option value="CE1">CE1</option>
                <option value="CE2">CE2</option>
                <option value="CM1">CM1</option>
                <option value="CM2">CM2</option>
              </select>
              <p className="text-xs mt-1 text-right text-gray-600 italic max-w-[90%] flex-1 md:text-sm">
                De moyenne section à CM2
              </p>
              {errors.classe && (
                <p className="text-red-500">{errors.classe.message}</p>
              )}
            </div>

            {/*  ACCORD PARENTAL */}
            <div className="flex flex-col space-x-4 mb-2">
              <label
                htmlFor="accParental"
                className="mt-4 mb-2 md:text-lg font-[700]"
              >
                Consentement d'une personne majeur :
              </label>
              <div className="flex items-start space-x-4 mb-2">
                <input
                  {...register("accParental")}
                  type="checkbox"
                  id="accParental"
                  required
                  className="bg-[var(--color-blanc-bleu)] mt-1 rounded md:text-lg"
                />
                <p className="text-sm md:text-lg mb-4 md:mb-6 ">
                  En tant qu’adulte responsable, je consens à l’utilisation des
                  données personnelles de l'enfant exclusivement pour optimiser
                  son expérience utilisateur sur cette application, conformément
                  à la{" "}
                  <NavLink
                    to="/politique-confidentialite"
                    className="text-[var(--color-mauve-omb)] underline"
                  >
                    politique de confidentialité.
                  </NavLink>
                </p>
              </div>
              {errors.accParental && (
                <p className="text-red-500">{errors.accParental.message}</p>
              )}
            </div>

            {/* buttons */}
            <input
              type="submit"
              className="btn-valider self-end md:text-lg"
              value="Créer un profil enfant"
            />
          </form>
        </div>
      </main>
    </>
  );
}
