import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Page404 from "./pagesAdulte/Page404";
import { authLoader } from "./loaders/authLoader";
import UserConnected from "./protectedRoutes/UserConnected";
import UserNotConnected from "./protectedRoutes/UserNotConnected";
// import AuthProviderZustand from "./stores/ex.AuthProviderZustand";
// Pages Adultes
import CocoConcept from "./pagesAdulte/CocoConcept";
import Preferences from "./pagesAdulte/Preferences";
import TableauBord from "./pagesAdulte/TableauBord";
import CompteAdulte from "./pagesAdulte/CompteAdulte";
import ProfilEnfant from "./pagesAdulte/ProfilEnfant";
// Pages Inscription
import CreationProfilEnf from "./forms/CreationProfilEnf";
import InscriptionAdulte from "./forms/InscriptionAdulte";
import InscriptionMail from "./forms/signup/InscriptionMail";
import InscriptionMdp from "./forms/signup/InscriptionMdp";
import ConfirmPreferences from "./pagesAdulte/ConfirmPreferences";
// Pages Connexion et Reinitialisation mot de passe
import Connexion from "./forms/login/Connexion";
import MdpOublie from "./forms/login/MdpOublie";
import ReinitMdp from "./forms/login/ReinitMdp";
// Pages de jeux
import NaissanceCoco from "./pagesAdulte/NaissanceCoco";
import ChoixCoco from "./pagesEnfant/ChoixCoco";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    loader: authLoader, // récupérer user avant le rendu
    children: [
      {
        index: true,
        element: <CocoConcept />,
      },
      {
        path: "/edit-preferences",

        element: (
          <UserConnected>
            <Preferences />
          </UserConnected>
        ),
      },
      {
        path: "/preferences",
        element: (
          <UserConnected>
            <Preferences />
          </UserConnected>
        ), // A modifier
      },
      {
        path: "/mon-compte",
        element: (
          <UserConnected>
            <CompteAdulte />
          </UserConnected>
        ),
      },
      {
        path: "/edit-mon-compte",
        element: (
          <UserConnected>
            <CompteAdulte />
          </UserConnected>
        ), // A modifier
      },
      {
        path: "/profil-enfant",
        element: (
          <UserConnected>
            <ProfilEnfant />
          </UserConnected>
        ),
      },
      {
        path: "/edit-profil-enfant",
        element: (
          <UserConnected>
            <ProfilEnfant />
          </UserConnected>
        ), // A modifier
      },
      {
        path: "/inscription",
        element: (
          <UserNotConnected>
            <InscriptionAdulte />
          </UserNotConnected>
        ),
        children: [
          {
            // > /inscription
            index: true,
            element: (
              <UserNotConnected>
                <InscriptionMail />
              </UserNotConnected>
            ),
          },
          {
            // > /inscription/finaliser-inscription
            path: "finaliser-inscription",
            element: (
              <UserNotConnected>
                <InscriptionMdp />
              </UserNotConnected>
            ),
          },
        ],
      },
      {
        path: "/creer-profil-enfant",
        element: (
          <UserConnected>
            <CreationProfilEnf />
          </UserConnected>
        ),
      },
      {
        path: "/confirmer-preferences",
        element: (
          <UserConnected>
            <ConfirmPreferences />
          </UserConnected>
        ),
      },
      {
        path: "/naissance-coco",
        element: (
          <UserConnected>
            <NaissanceCoco />
          </UserConnected>
        ),
      },
      {
        path: "/tableau-de-bord",
        element: (
          <UserConnected>
            <TableauBord />
          </UserConnected>
        ),
      },
      {
        path: "/choix-coco",
        element: (
          <UserConnected>
            <ChoixCoco />
          </UserConnected>
        ),
      },
      {
        path: "/connexion",
        element: (
          <UserNotConnected>
            <Connexion />
          </UserNotConnected>
        ),
      },
      {
        path: "/mot-de-passe-oublie",
        element: (
          <UserNotConnected>
            <MdpOublie />
          </UserNotConnected>
        ),
      },
      {
        path: "/reinitialiser-mot-de-passe/:token",
        element: (
          <UserNotConnected>
            <ReinitMdp />
          </UserNotConnected>
        ),
      },
      {
        path: "/mentions-legales",
        element: (
          <UserNotConnected>
            <Page404 />
          </UserNotConnected>
        ),
      },
      {
        path: "/politique-confidentialite",
        element: (
          <UserNotConnected>
            <Page404 />
          </UserNotConnected>
        ),
      },
    ],
  },
]);
