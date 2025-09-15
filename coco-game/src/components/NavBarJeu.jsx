import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu";
import { GiBirdHouse } from "react-icons/gi";
import { FaSignOutAlt, FaUser, FaChild, FaChartLine } from "react-icons/fa";
// import {FaHome, FaCheck } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import useInscriptionStore from "../stores/useInscriptionStore";

export default function NavBarJeu() {
  const [active, setActive] = useState(false);
  // Déconnexion
  const clearUser = useInscriptionStore((state) => state.clearUser);
  const navigate = useNavigate();
  const handleLogout = () => {
    clearUser();
    setMenuOpen(false);
    navigate("/");
  };

  // Toggle class active
  const toggleActive = () => {
    setActive(!active);
  };

  // const [user, setUser] = useState(false);
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

      <BurgerMenu
        toggleMenu={toggleMenu}
        toggleActive={toggleActive}
        active={active}
      />

      {menuOpen && (
        <div className="opacity-100 z-50 absolute top-14 h-[100vh] right-0 w-full bg-[#ede1f6]/80 p-4">
          <ul className="flex flex-col p-4 box-white-shadow space-y-2 ml-auto max-w-[480px]  ">
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
              to="/tableau-de-bord"
            >
              <li className="flex items-center">
                <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                  <FaChartLine />
                </i>
                Tableau de bord
              </li>
            </NavLink>

            <NavLink
              className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
              to="/mon-compte"
            >
              <li className="flex items-center">
                <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                  <FaUser />
                </i>
                Compte adulte
              </li>
            </NavLink>

            <NavLink
              className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
              to="/profil-enfant"
            >
              <li className="flex items-center">
                <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                  <FaChild />
                </i>
                Profil enfant
              </li>
            </NavLink>

            <NavLink
              className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
              to="/preferences"
            >
              <li className="flex items-center">
                <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                  <IoSettingsSharp />
                </i>
                Préférences
              </li>
            </NavLink>

            <NavLink
              className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
              onClick={handleLogout}
            >
              <li className="flex items-center">
                <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                  <FaSignOutAlt />
                </i>
                Se déconnecter
              </li>
            </NavLink>

            <hr className="w-full my-2 h-0.5 bg-[var(--color-mauve-pastel)] block border-0" />

            <NavLink
              className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
              to="/coco-concept"
            >
              <li className="flex items-center ml-6">Accueil</li>
            </NavLink>

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
