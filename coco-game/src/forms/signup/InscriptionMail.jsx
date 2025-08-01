import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { signupMail } from "../../apis/auth.api.js";

export default function InscriptionMail() {
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
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function submit(values) {
    // console.log(values);
    try {
      const response = await signupMail(values);
      if (response.success) {
        toast.success("Un email de confirmation a été envoyé !");
        reset(defaultValues);
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
        className="mx-auto space-y-4 mb-4 md:mb-6 max-w-[450px] flex flex-col"
        onSubmit={handleSubmit(submit)}
      >
        {/* Email */}
        <div className="flex flex-col space-x-4 mb-2">
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
          {errors.mail && <p className="text-red-500">{errors.mail.message}</p>}
        </div>

        {/* buttons */}
        <input
          type="submit"
          className="btn-valider self-end md:text-lg mt-4"
          value="Créer un compte"
        />
      </form>
    </>
  );
}
