import NavBarJeu from "../components/NavBarJeu.jsx";
import { FaEgg } from "react-icons/fa6";
import useInscriptionStore from "../stores/useInscriptionStore.js";
import { signup } from "../apis/auth.api.js";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

export default function InscriptionAdulte() {
  const navigate = useNavigate();
  const { setUser } = useInscriptionStore();

  const defaultValues = {
    mail: "",
    password: "",
    confirmPassword: "",
    rgpd: false,
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
    confirmPassword: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
    rgpd: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les termes et conditions"),
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
      const response = await signup(values);
      if (response.message) {
        setUser(response.user);
        reset(defaultValues);
        toast.success("Inscription réussie !");
        console.log("Je redirige vers créer-profil-enfant");
        navigate("/creer-profil-enfant");
        console.log("Inscription réussie :", response.user);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription.");
    }
  }
  return (
    <>
      <NavBarJeu />
      <main className="bg-linear-[160deg] p-2 from-[#EDE1F6] to-[#EACEFF] w-full min-h-screen">
        {/* STARTER 1 */}
        <div className="flex items-center justify-center my-10 md:my-12 space-x-1.5 md:max-w-3xl xl:max-w-6xl md:mx-auto">
          <i className="text-lg md:text-2xl xl:text-3xl text-[var(--color-mauve-mid)]">
            <FaEgg />
          </i>
          <i className="text-lg md:text-2xl xl:text-3xl text-[var(--color-mauve-mid)]/30">
            <FaEgg />
          </i>
          <i className="text-lg md:text-2xl xl:text-3xl text-[var(--color-mauve-mid)]/30">
            <FaEgg />
          </i>
        </div>

        <h1 className="text-3xl text-center md:text-4xl font-bold">
          Créer mon compte
        </h1>

        <div className="box-white md:max-w-3xl md:mx-auto p-4 md:p-12 xl:max-w-6xl space-y-4 min-h-[70vh]">
          <p className="mb-4 md:text-xl md:mb-6">
            Dans le respect de votre vie privée, nous ne collectons que les
            informations nécessaires à l'inscription. Tous les champs sont
            obligatoires.
          </p>

          {/* FORM */}
          <form
            className="mx-auto space-y-4 mb-4 md:mb-6 max-w-[450px] flex flex-col"
            onSubmit={handleSubmit(submit)}
          >
            {/* Email */}
            <div className="flex flex-col space-x-4 mb-2">
              <label
                htmlFor="mail"
                required
                className="mt-4 mb-2 md:text-lg font-[700]"
              >
                Email :
              </label>
              <input
                {...register("mail")}
                type="email"
                id="mail"
                required
                // value={mail}
                // onChange={(e) => mail(e.target.value)}
                placeholder="gertrude@gmail.com"
                className="bg-[var(--color-blanc-bleu)] p-1 md:p-3 rounded shadow md:text-lg"
              />
              {errors.mail && (
                <p className="text-red-500">{errors.mail.message}</p>
              )}
            </div>

            {/* MDP */}
            <div className="flex flex-col space-x-4 mb-2">
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
                // value={password}
                // onChange={(e) => password(e.target.value)}
                placeholder="Mot de passe"
                className="bg-[var(--color-blanc-bleu)] p-1 md:p-3 rounded shadow md:text-lg"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            {/* CONF MDP */}
            <div className="flex flex-col space-x-4 mb-2">
              <label
                htmlFor="confirmPassword"
                className="mt-4 mb-2 md:text-lg font-[700]"
              >
                Confirmation de mot de passe :
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                required
                // value={confirmPassword}
                // onChange={(e) => confirmPassword(e.target.value)}
                placeholder="Confirmation de mot de passe"
                className="bg-[var(--color-blanc-bleu)] p-1 md:p-3 rounded shadow md:text-lg"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            {/*  ACCORD RGPD */}
            <div className="flex flex-col space-x-4 mb-2">
              <label htmlFor="rgpd" className="mt-4 mb-2 md:text-lg font-[700]">
                Données personnelles :
              </label>
              <div className="flex items-start space-x-4 mb-2">
                <input
                  {...register("rgpd")}
                  type="checkbox"
                  id="rgpd"
                  required
                  // value={rgpd}
                  // onChange={(e) => mail(e.target.value)}
                  className="bg-[var(--color-blanc-bleu)] mt-1 rounded md:text-lg"
                />
                <p className="text-sm md:text-lg mb-4 md:mb-6 ">
                  J’accepte la collecte de mes données personnelles pour la
                  création de mon compte, conformément à la{" "}
                  <NavLink
                    to="/politique-confidentialite"
                    className="text-[var(--color-mauve-omb)] underline"
                  >
                    politique de confidentialité.
                  </NavLink>
                </p>
                {errors.rgpd && (
                  <p className="text-red-500">{errors.rgpd.message}</p>
                )}
              </div>
            </div>

            {/* buttons */}
            <input
              type="submit"
              // className="btn-valider self-end"
              className="btn-valider self-end md:text-lg"
              value="Créer un compte"
            />
          </form>
        </div>
      </main>
    </>
  );
}
