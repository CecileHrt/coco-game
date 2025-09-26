import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import BurgerMenu from "../components/BurgerMenu";
import {
  FaHome,
  FaPuzzlePiece,
  FaStar,
  FaSignInAlt,
  FaSignOutAlt,
  FaChild,
  FaUser,
  FaChartLine,
} from "react-icons/fa";
import { FaEgg } from "react-icons/fa6";
import { GiBirdHouse } from "react-icons/gi";
import useInscriptionStore from "../stores/useInscriptionStore.js";
import { signout } from "../apis/auth.api.js";
import { IoSettingsSharp } from "react-icons/io5";

export default function NavBarPdv() {
  // const [user, setUser] = useState(true);
  // Synchroniser user avec le store
  const user = useInscriptionStore((state) => state.user);
  const setUser = useInscriptionStore((state) => state.setUser);
  // console.log("user dans NavBarPdv : ", user);

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Déconnexion
  const clearUser = useInscriptionStore((state) => state.clearUser);
  const navigate = useNavigate();
  const handleLogout = async () => {
    clearUser();
    await signout();
    setMenuOpen(false);
    toggleActive();
    navigate("/");
  };

  return (
    <header className="relative flex items-center justify-between p-2 bg-[var(--color-blanc-mauve)] lg:px-6">
      <div className="logotype">
        <img
          src="/logo-coco.webp"
          alt="logo de l'application, poussin"
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
        <div className="fixed inset-0 z-50">
          {/* BG  */}

          <div
            className="absolute inset-0 bg-[#ede1f6]/80"
            onClick={() => {
              toggleMenu();
              toggleActive();
            }}
          ></div>

          <nav className="absolute top-14 right-0 w-full max-w-[480px] h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
            <ul className="flex flex-col p-4 box-white-shadow space-y-2 ml-auto max-w-[480px]  ">
              {user ? (
                <NavLink
                  className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
                  to="/choix-coco"
                >
                  <li className="flex items-center">
                    <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                      <GiBirdHouse />
                    </i>
                    Choisir le profil
                  </li>
                </NavLink>
              ) : (
                <NavLink
                  className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] bg-[var(--color-mauve-pastel)]/70 transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
                  to="/inscription"
                >
                  <li className="flex items-center">
                    <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                      <FaEgg />
                    </i>
                    Commencer une aventure
                  </li>
                </NavLink>
              )}
              {!user && (
                <>
                  <HashLink
                    className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
                    to="/#fonctionnalite"
                    onClick={() => {
                      toggleMenu();
                      toggleActive();
                    }}
                  >
                    <li className="flex items-center">
                      <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                        <FaPuzzlePiece />
                      </i>
                      Fonctionnalités
                    </li>
                  </HashLink>
                  <HashLink
                    className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
                    to="/#avis"
                    onClick={() => {
                      toggleMenu();
                      toggleActive();
                    }}
                  >
                    <li className="flex items-center">
                      <i className="text-[var(--color-mauve-omb)] mr-2 mb-0.5">
                        <FaStar />
                      </i>
                      Avis
                    </li>
                  </HashLink>
                </>
              )}
              {/*  si connecté alors  */}
              {user ? (
                <>
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
                </>
              ) : (
                <>
                  <NavLink
                    className={`sm:text-xl xl:text-2xl hover:font-[600] hover:text-[var(--color-mauve-omb)] transition-all duration-500 ease-in-out hover:bg-[var(--color-mauve-pastel)] rounded w-full p-2 `}
                    to="/connexion"
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
                to="/"
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
          </nav>
        </div>
      )}
    </header>
  );
}
