import NavBarJeu from "../components/NavBarJeu.jsx";
import { FaEgg } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

export default function InscriptionAdulte() {
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
          <Outlet />
          {/* soit <InscriptionMail />, soit <InscriptionMdp />  */}
        </div>
      </main>
    </>
  );
}
