import { stayConnected } from "../apis/auth.api";

export async function authLoader() {
  try {
    const user = await stayConnected(); // récupère le cookie et l'utilisateur
    return { user }; // retourne un objet contenant le user
  } catch (err) {
    console.error("Erreur authLoader:", err);
    // return { user: null }; // en cas d'erreur, user = null
    return null; // en cas d'erreur, user = null = vrai false
  }
}
