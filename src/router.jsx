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
        element: <Preferences />,
        //element: <CocoConcept />, // <UserNotConnected>
      },
      {
        path: "/preferences",
        element: <Preferences />, // <UserConnected>
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
