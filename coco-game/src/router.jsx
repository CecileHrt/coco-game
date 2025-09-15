import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Page404 from "./pages/Page404";
// Pages Adultes
import CocoConcept from "./pages/CocoConcept";
import Preferences from "./pages/Preferences";
import TableauBord from "./pages/TableauBord";
import CompteAdulte from "./pages/CompteAdulte";
import ProfilEnfant from "./pages/ProfilEnfant";
// Pages Inscription
import CreationProfilEnf from "./forms/CreationProfilEnf";
import InscriptionAdulte from "./forms/InscriptionAdulte";
import InscriptionMail from "./forms/signup/InscriptionMail";
import InscriptionMdp from "./forms/signup/InscriptionMdp";
import ConfirmPreferences from "./pages/ConfirmPreferences";
// Pages Connexion et Déconnexion
import Connexion from "./forms/loginLogout/Connexion";
import MdpOublie from "./forms/loginLogout/MdpOublie";
import ReinitMdp from "./forms/loginLogout/ReinitMdp";
// Pages de jeux

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <CocoConcept />, // <UserNotConnected>
      },
      {
        path: "/edit-preferences",
        element: <Preferences />, // <UserConnected>
      },
      {
        path: "/preferences",
        element: <Preferences />, // A modifier - <UserConnected>
      },
      {
        path: "/mon-compte",
        element: <CompteAdulte />, // <UserConnected>
      },
      {
        path: "/edit-mon-compte",
        element: <CompteAdulte />, // A modifier - <UserConnected>
      },
      {
        path: "/profil-enfant",
        element: <ProfilEnfant />, // <UserConnected>
      },
      {
        path: "/edit-profil-enfant",
        element: <ProfilEnfant />, // A modifier - <UserConnected>
      },
      {
        path: "/inscription",
        element: <InscriptionAdulte />, // <UserNotConnected>
        children: [
          {
            // > /inscription
            index: true,
            element: <InscriptionMail />, // <UserNotConnected>
          },
          {
            // > /inscription/finaliser-inscription
            path: "finaliser-inscription",
            element: <InscriptionMdp />, // <UserNotConnected>
          },
        ],
      },
      {
        path: "/creer-profil-enfant",
        element: <CreationProfilEnf />, // <UserConnected>
      },
      {
        path: "/confirmer-preferences",
        element: <ConfirmPreferences />, // <UserConnected>
      },
      {
        path: "/naissance-coco",
        element: <Page404 />, // <UserConnected>
      },
      {
        path: "/tableau-de-bord",
        element: <TableauBord />, // <UserConnected>
      },
      {
        path: "/choix-coco",
        element: <Page404 />, // a modifier
      },
      {
        path: "/connexion",
        element: <Connexion />, // <UserNotConnected>
      },
      {
        path: "/mot-de-passe-oublie",
        element: <MdpOublie />, // <UserNotConnected>
      },
      {
        path: "/reinitialiser-mot-de-passe/:token",
        element: <ReinitMdp />, // <UserNotConnected>
      },
      {
        path: "/mentions-legales",
        element: <Page404 />, // a modifier
      },
      {
        path: "/politique-confidentialite",
        element: <Page404 />, // a modifier
      },
    ],
  },
]);

// Choix du profil   <UserConnected>
// un "PlayerConnected" ?
// Login      <UserNotConnected>
// Mot de passe oublié
// Inscription      <UserNotConnected>
// Profil enfant
// Attention : Iscription, consultation et modification des pages
