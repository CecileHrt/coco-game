import { create } from "zustand";

// user store ??
const useInscriptionStore = create((set) => ({
  // user
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }), //deconnexion

  // Nouvel enfant
  addChildProfile: (child) =>
    set((state) => {
      if (!state.user) return state; // si pas d'utilisateur, ne rien faire
      return {
        user: {
          ...state.user, // copie des autres propriétés de l'utilisateur
          childList: [...state.user.childList, child], // ajout du nouvel enfant à la liste
        },
      };
    }),

  // Supression du profil enfant
  removeChildProfile: (id_enfant) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          childList: state.user.childList.filter(
            (child) => child._id_enfant !== id_enfant // garder tout sauf l'enfant à supprimer
          ),
        },
      };
    }),

  // Edition du profil enfant
  updateChildProfile: (id_enfant, update) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          childList: state.user.childList.map(
            (child) =>
              child._id_enfant === id_enfant // chercher l'enfant qui match
                ? { ...child, ...update } // si résultat = fusionner les données existantes avec les nouvelles
                : child // sinon garder l'enfant tel quel
          ),
        },
      };
    }),
}));

export default useInscriptionStore;
