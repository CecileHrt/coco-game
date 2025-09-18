import NavBarJeu from "../../components/NavBarJeu.jsx";
import { FaX } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import * as yup from "yup";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import useInscriptionStore from "../../stores/useInscriptionStore.js";
import { resetPassword } from "../../apis/auth.api.js";

export default function ReinitMdp() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setUser } = useInscriptionStore();

  const defaultValues = {
    password: "",
    confirmPassword: "",
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function submit(values) {
    console.log(values);

    const response = await resetPassword({
      password: values.password,
      token: token,
    });

    console.log(response);
    if (response.messageOk) {
      toast.success(response.messageOk);
      navigate("/connexion");
    } else {
      toast.error(response.message);
    }
  }

  return (
    <>
      <NavBarJeu />
      <main className="bg-linear-[160deg] p-2 from-[#EDE1F6] to-[#EACEFF] w-full min-h-screen">
        <h1 className="text-3xl mt-8 mb-3 text-center md:text-4xl font-bold">
          Réinitialisation du mot de passe
        </h1>

        <div className="box-white md:max-w-3xl md:mx-auto p-4 md:p-12 xl:max-w-6xl space-y-4 min-h-[70vh]">
          <p className="mb-4 md:text-xl md:mb-6">
            Après la réinitialisation du mot de passe, un email de confirmation
            vous sera transmis. Vous pourrez alors vous connecter.
          </p>

          {/* FORM */}
          <form
            className="mx-auto space-y-4 mb-4 md:mb-6 max-w-[450px] flex flex-col"
            onSubmit={handleSubmit(submit)}
          >
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

            {/* buttons */}
            <div className="space-y-4 mt-6 flex flex-col items-end md:flex-row-reverse md:justify-start">
              <button type="submit" className="btn-valider md:ml-4">
                <i className="text-lg md:text-2xl xl:text-3xl">
                  <FaCheck />
                </i>
                <p className="md:text-lg">Changer mon mot de passe</p>
              </button>

              <NavLink to="/connexion" className="btn-annuler">
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
