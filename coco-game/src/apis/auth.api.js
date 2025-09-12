const BASE_URL = import.meta.env.VITE_BASE_URL;
import useInscriptionStore from "../stores/useInscriptionStore";

const { addChildProfile } = useInscriptionStore.getState();

//  inscription double optin / mail
//  inscription classique
// export const signup = async (values) => {
//   try {
//     const response = await fetch(`${BASE_URL}/auth`, {
//       method: "POST",
//       body: JSON.stringify(values),
//       headers: {
//         "Content-type": "application/json",
//       },
//       //   credentials: "include",
//     });
//     const userConnected = await response.json();
//     return userConnected;
//   } catch (error) {
//     console.log(error);
//   }
// };

//  inscription double optin / mail
export const signupMail = async (values) => {
  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const userConnected = await response.json();
    return userConnected;
  } catch (error) {
    console.log(error);
  }
};

//  inscription double optin / mdp
export const signupMdp = async (values, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/finaliser-inscription/${token}`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    );
    const userConnected = await response.json();
    return userConnected;
  } catch (error) {
    console.log(error);
  }
};

//  inscription Nouveau profil enfant
export const createProfile = async (values) => {
  // console.log("values dans auth.api", values);
  try {
    const response = await fetch(`${BASE_URL}/auth/creer-profil-enfant`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const child = await response.json(); //child = result (variable envoyée par le serveur)
    console.log("Réponse serveur addChildProfile(child) :", child);
    return child;
  } catch (error) {
    console.log(error);
  }
};
