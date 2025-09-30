import useInscriptionStore from "../../stores/useInscriptionStore.js";
// import { signup } from "../apis/auth.api.js";
import { useNavigate, NavLink, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { signupMdp } from "../../apis/auth.api.js";

export default function InscriptionMdp() {
  const navigate = useNavigate();
  const { setUser } = useInscriptionStore();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const defaultValues = {
    password: "",
    confirmPassword: "",
    rgpd: false,
  };

  const schema = yup.object({
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
    console.log(values);
    try {
      const response = await signupMdp(values, token);
      // if (response.message === "Inscription réussie !") {
      if (response.user) {
        setUser(response.user); // stocke l'utilisateur
        reset(defaultValues);
        toast.success("Inscription réussie !");
        // navigate("/creer-profil-enfant");
        // délai pour s'assurer que UserConnected voit le store mis à jour
        setTimeout(() => {
          navigate("/creer-profil-enfant");
        }, 50);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription.");
    }
  }
  return (
    <>
      {/* FORM */}
      <form
        data-testid="inscriptionMdp-form" // pour les tests
        className="mx-auto space-y-4 mb-4 md:mb-6 max-w-[450px] flex flex-col"
        onSubmit={handleSubmit(submit)}
      >
        {/* MDP */}
        <div className="flex flex-col space-x-4 mb-2">
          <label htmlFor="password" className="mt-4 mb-2 md:text-lg font-[700]">
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
              className="bg-[var(--color-blanc-bleu)] mt-1 rounded md:text-lg"
            />
            <p className="text-sm md:text-lg mb-4 md:mb-6 ">
              J’accepte la collecte de mes données personnelles pour la création
              de mon compte, conformément à la{" "}
              <NavLink
                to="/politique-confidentialite"
                className="text-[var(--color-mauve-omb)] underline"
              >
                politique de confidentialité.
              </NavLink>
            </p>
          </div>
          {errors.rgpd && <p className="text-red-500">{errors.rgpd.message}</p>}
        </div>

        {/* buttons */}
        <input
          type="submit"
          className="btn-valider self-end md:text-lg"
          value="Créer un compte"
        />
      </form>
    </>
  );
}
