import NavBarJeu from "../../components/NavBarJeu.jsx";
import { FaX } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import useInscriptionStore from "../../stores/useInscriptionStore.js";
import { forgotPassword } from "../../apis/auth.api.js";

export default function MdpOublie() {
  const { setUser } = useInscriptionStore();
  const defaultValues = {
    mail: "",
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
    // console.log("submit", values);
    const response = await forgotPassword(values);
    // console.log(response); // { message: "bien reçu"}
    toast.success(response.message);
  }

  return (
    <>
      <NavBarJeu />
      <main className="bg-linear-[160deg] p-2 from-[#EDE1F6] to-[#EACEFF] w-full min-h-screen">
        <h1 className="text-3xl mt-8 mb-3 text-center md:text-4xl font-bold">
          Mot de passe oublié
        </h1>

        <div className="box-white md:max-w-3xl md:mx-auto p-4 md:p-12 xl:max-w-6xl space-y-4 min-h-[70vh]">
          <p className="mb-4 md:text-xl md:mb-6">
            Un email de réinitialisation de mot de passe vous sera transmis.
          </p>

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

            {/* buttons */}
            <div className="space-y-4 mt-6 flex flex-col items-end md:flex-row-reverse md:justify-start">
              <button type="submit" className="btn-valider md:ml-4">
                <i className="text-lg md:text-2xl xl:text-3xl">
                  <FaCheck />
                </i>
                <p className="md:text-lg">Valider mon email</p>
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
