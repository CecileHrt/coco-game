import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu";
import {
  FaHome,
  FaPuzzlePiece,
  FaStar,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaEgg } from "react-icons/fa6";
import { GiBirdHouse } from "react-icons/gi";

export default function NavBarPdv() {
  const [user, setUser] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header className="relative flex items-center justify-between p-2 bg-[var(--color-blanc-mauve)] lg:px-6">
      <div className="logotype">
        <img
          src="/logo-coco.webp"
          alt="logo le l'application, poussin"
          title="Logo Coco Game"
        />
        <strong>Coco Game</strong>
      </div>
      <BurgerMenu toggleMenu={toggleMenu} />

      {menuOpen && (
        <div className="opacity-100 z-50 absolute top-14 h-[100vh] right-0 w-full bg-[#ede1f6]/80 p-4">
          <ul className="flex flex-col p-4 box-white-shadow space-y-2 ml-auto max-w-[480px]  ">
            {user && (
              <NavLink
                className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] bg-[var(--color-mauve-pastel)]/70 transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
                to="/choix-coco"
              >
                <li className="flex items-center">
                  <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                    <FaEgg />
                  </i>
                  Commencer une aventure
                </li>
              </NavLink>
            )}

            <NavLink
              className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
              to="/coco-concept"
            >
              <li className="flex items-center ">
                <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                  <FaHome />
                </i>
                Accueil
              </li>
            </NavLink>

            <NavLink
              className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
              to="/coco-concept#fonctionnalité"
            >
              <li className="flex items-center">
                <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                  <FaPuzzlePiece />
                </i>
                Fonctionnalités
              </li>
            </NavLink>
            <NavLink
              className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
              to="/coco-concept#avis"
            >
              <li className="flex items-center">
                <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                  <FaStar />
                </i>
                Avis
              </li>
            </NavLink>
            {/*  si connecté alors  */}
            {!user ? (
              <>
                <NavLink
                  className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
                  to="/choix-profil"
                >
                  <li className="flex items-center">
                    <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                      <GiBirdHouse />
                    </i>
                    Choisir le profil
                  </li>
                </NavLink>

                <NavLink
                  className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
                  to="/logout"
                >
                  <li className="flex items-center">
                    <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                      <FaSignOutAlt />
                    </i>
                    Se déconnecter
                  </li>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
                  to="/login"
                >
                  <li className="flex items-center">
                    <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                      <FaSignInAlt />
                    </i>
                    Se connecter
                  </li>
                </NavLink>
              </>
            )}

            <hr className="w-full my-2 h-0.5 bg-[var(--color-mauve-pastel)] block border-0" />
            <NavLink
              className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
              to="/mentions-legales"
            >
              <li className="flex items-center ml-6">Mentions légales</li>
            </NavLink>
            <NavLink
              className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
              to="/politique-confidentialite"
            >
              <li className="flex items-center ml-6">
                Données personnelles et Cookies
              </li>
            </NavLink>
          </ul>
        </div>
      )}
    </header>
  );
}
