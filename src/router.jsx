import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Page404 from "./pages/Page404";
import CocoConcept from "./pages/CocoConcept";
import Preferences from "./pages/Preferences";

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
        path: "/choix-coco",
        element: <Preferences />, // a modifier
      },
      {
        path: "/coco-concept",
        element: <CocoConcept />, // a modifier
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
