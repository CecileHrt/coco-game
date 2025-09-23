const BASE_URL = import.meta.env.VITE_BASE_URL;
import useInscriptionStore from "../stores/useInscriptionStore";

const { addChildProfile } = useInscriptionStore.getState();

// -- -- -- -- -- -- --
// Inscription
// -- -- -- -- -- -- --

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
    // console.log("response dans signupMdp", response);
    const userConnected = await response.json();
    // console.log("userConnected dans signupMdp", userConnected);
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
    const data = await response.json(); //child = result (variable envoyée par le serveur)
    // console.log("Réponse serveur addChildProfile(child) :", child);
    //Si le prénom de l'enfant est déjà utilisé et retourne un message d'erreur
    if (!response.ok) {
      throw new Error(
        data.message || "Erreur lors de la création du profil enfant"
      );
    }
    return data.user;
  } catch (error) {
    console.log(error);
  }
};

// -- -- -- -- -- -- --
// Connexion Déconnexion
// -- -- -- -- -- -- --

//  Connexion
export const connexion = async (values) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/connexion`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const userConnected = await response.json();
    // console.log("userConnected dans auth.api", userConnected);
    return userConnected;
  } catch (error) {
    console.log(error);
  }
};

// Mot de passe oublié
export async function forgotPassword(values) {
  // console.log("api", values);
  try {
    const response = await fetch(`${BASE_URL}/auth/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// Réinitialisation du mot de passe
export async function resetPassword(values) {
  try {
    const response = await fetch(`${BASE_URL}/auth/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// Sauvegarder la connexion
export async function stayConnected() {
  try {
    const response = await fetch(`${BASE_URL}/auth/isconnected`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const userConnected = await response.json();
      return userConnected;
    } else {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
