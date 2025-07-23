import NavBarJeu from "../components/NavBarJeu.jsx";
import { FaUser } from "react-icons/fa";
import { IoArrowUndo, IoCreate } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function CompteAdulte() {
  return (
    <>
      <NavBarJeu />
      <main className="bg-linear-[160deg] p-2 from-[#FFD8FA] via-[#C3A3FF] to-[#8964C2] w-full min-h-screen">
        {/* BACK - EDIT */}
        <div className="flex items-center justify-end space-x-1.5 md:max-w-3xl xl:max-w-6xl md:mx-auto">
          <NavLink to="/tableau-de-bord" className="flex items-center">
            <i className="text-3xl p-1 hover:text-[var(--color-mauve-omb)]">
              <IoArrowUndo />
            </i>
          </NavLink>

          <NavLink to="/edit-mon-compte" className="flex items-center">
            <i className="text-3xl p-1 hover:text-[var(--color-mauve-omb)]">
              <IoCreate className="text-2xl hover:text-[var(--color-mauve-omb)]" />
            </i>
          </NavLink>
        </div>

        <h1 className="text-3xl text-center md:text-4xl font-bold">
          Mon compte
        </h1>

        {/* <div className="box-white-transparent md:max-w-3xl md:mx-auto p-4 md:p-12 space-y-4 "> */}

        <div className="box-white-transparent md:max-w-3xl md:mx-auto p-4 md:p-12 xl:max-w-6xl space-y-4 min-h-[70vh]">
          <section className="space-y-4 mb-4 md:mb-6">
            <div className="box-h2 pb-2">
              <i className="text-lg md:text-2xl xl:text-3xl">
                <FaUser />
              </i>
              <h2 className="text-lg md:text-2xl xl:text-3xl mx-2">
                Identifiants
              </h2>
              <figure className="bg-[var(--color-mauve-omb)] mt-2.5 md:mt-4 xl:mt-5.5"></figure>
            </div>

            {/* Email */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3 className="font-[800]">Email :</h3>
              </div>
              <div className="flex justify-between ">
                <p className=" text-gray-600 ml-4 mt-2 max-w-[90%] flex-1 md:text-sm">
                  adulte.test@gmail.com
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>

            {/* MDP */}
            <article>
              <div className="flex items-center justify-between space-x-4 mb-1">
                <h3 className="font-[800]">Mot de passe :</h3>
              </div>
              <div className="flex justify-between ">
                <p className=" text-gray-600 ml-4 mt-2 max-w-[90%] flex-1 md:text-lg">
                  ************
                </p>
                {/* <SynthesisButton text="" /> */}
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}
