import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Page404 from "./pages/Page404";
import CocoConcept from "./pages/CocoConcept";
import Preferences from "./pages/Preferences";
import TableauBord from "./pages/TableauBord";
import CompteAdulte from "./pages/CompteAdulte";
import ProfilEnfant from "./pages/ProfilEnfant";
import CreationProfilEnf from "./forms/CreationProfilEnf";
import InscriptionAdulte from "./forms/InscriptionAdulte";
import InscriptionMail from "./forms/signup/InscriptionMail";
import InscriptionMdp from "./forms/signup/InscriptionMdp";

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
        path: "/preferences",
        element: <Preferences />, // <UserConnected>
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
        path: "/tableau-de-bord",
        element: <TableauBord />, // <UserConnected>
      },
      {
        path: "/choix-coco",
        element: <Page404 />, // a modifier
      },
      {
        path: "/choix-profil",
        element: <Page404 />, // a modifier
      },
      {
        path: "/logout",
        element: <Page404 />, // a modifier
      },
      {
        path: "/login",
        element: <Page404 />, // a modifier
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
