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
        element: <CompteAdulte />, // <UserConnected>
      },
      {
        path: "/profil-enfant",
        element: <ProfilEnfant />, // <UserConnected>
      },
      {
        path: "/edit-profil-enfant",
        element: <ProfilEnfant />, // <UserConnected>
      },
      {
        path: "/inscription",
        element: <InscriptionAdulte />, // <UserConnected>
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
        element: <Preferences />, // a modifier
      },
      {
        path: "/choix-profil",
        element: <Preferences />, // a modifier
      },
      {
        path: "/logout",
        element: <Preferences />, // a modifier
      },
      {
        path: "/login",
        element: <Preferences />, // a modifier
      },
      {
        path: "/mentions-legales",
        element: <Preferences />, // a modifier
      },
      {
        path: "/politique-confidentialite",
        element: <Preferences />, // a modifier
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
