import NavBarJeu from "../../components/NavBarJeu.jsx";
import { FaEgg, FaX } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import useInscriptionStore from "../../stores/useInscriptionStore.js";
import { connexion } from "../../apis/auth.api.js";

export default function Connexion() {
  const navigate = useNavigate();
  const { setUser } = useInscriptionStore();
  const defaultValues = {
    mail: "",
    password: "",
  };

  const schema = yup.object({
    mail: yup
      .string()
      .email("Format de votre email non valide")
      .required("Le champ est obligatoire")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Format de votre email non valide"
      ),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(8, "Mot de passe trop court"),
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
    // console.log(values);
    try {
      const response = await connexion(values);
      if (response.message === "Connexion réussie !") {
        setUser(response.user);
        // console.log("response.user dans Connexion.jsx", response.user);
        reset(defaultValues);
        toast.success("Connexion réussie !");
        navigate("/choix-coco");
      } else {
        // toast.error(response.message);
        toast.error("Email et/ou mot de passe incorrect");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la connexion.");
    }
  }

  return (
    <>
      <NavBarJeu />
      <main className="bg-linear-[160deg] p-2 from-[#EDE1F6] to-[#EACEFF] w-full min-h-screen">
        <h1 className="text-3xl text-center md:text-4xl font-bold">
          Connexion
        </h1>

        <div className="box-white md:max-w-3xl md:mx-auto p-4 md:p-12 xl:max-w-6xl space-y-4 min-h-[70vh]">
          {/* FORM */}
          <form
            className="mx-auto space-y-4 mb-4 md:mb-6 max-w-[450px] flex flex-col"
            onSubmit={handleSubmit(submit)}
          >
            {/* Email */}
            <div className="flex flex-col mb-2">
              <label htmlFor="mail" className="mt-4 mb-2 md:text-lg font-[700]">
                Email :
              </label>
              <input
                {...register("mail")}
                type="email"
                id="mail"
                required
                placeholder="gertrude@gmail.com"
                className="bg-[var(--color-blanc-bleu)] p-1 md:p-3 rounded shadow md:text-lg"
              />
              {errors.mail && (
                <p className="text-red-500">{errors.mail.message}</p>
              )}
            </div>

            {/* MDP */}
            <div className="flex flex-col mb-2">
              <label
                htmlFor="password"
                className="mt-4 mb-2 md:text-lg font-[700]"
              >
                Mot de passe :
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                required
                placeholder="Mot de passe"
                className="bg-[var(--color-blanc-bleu)] p-1 md:p-3 rounded shadow md:text-lg"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <NavLink
              to="/mot-de-passe-oublie"
              className="text-gray-400 px-4 pb-2 hover:text-red-600 text-sm md:text-lg self-end"
            >
              Mot de passe oublié
            </NavLink>

            {/* buttons */}
            <div className="space-y-4 flex flex-col items-end md:flex-row-reverse md:justify-start">
              <button type="submit" className="btn-valider md:ml-4">
                <i className="text-lg md:text-2xl xl:text-3xl">
                  <FaCheck />
                </i>
                <p className="md:text-lg">Se connecter</p>
              </button>

              <NavLink to="/" className="btn-annuler">
                <i className="text-lg md:text-2xl xl:text-3xl">
                  <FaX />
                </i>
                <p className="md:text-lg">Annuler</p>
              </NavLink>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
