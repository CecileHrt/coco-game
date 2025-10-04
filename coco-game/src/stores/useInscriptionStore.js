import { create } from "zustand";
import { stayConnected } from "../apis/auth.api";

const useInscriptionStore = create((set) => ({
  // user
  user: null,

  // état de chargement et erreurs globales
  loading: false,
  error: null,
  checkedAuth: false,

  // Vérifie si un user est connecté (via cookie ou token)
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const userConnected = await stayConnected();

      set((state) => ({
        user: userConnected || state.user, // garde l’existant si null
        loading: false,
        checkedAuth: true, // marquer qu’on a terminé
      }));
    } catch (err) {
      set((state) => ({
        user: state.user, // ne pas écraser si déjà défini
        error: err.message || "Erreur inconnue",
        loading: false,
        checkedAuth: true,
      }));
    }
  },

  // setUser avec gestion de loading simulée
  setUser: async (user) => {
    try {
      set({
        user: {
          ...user,
          childList: user.childList || [],
        },
        loading: false,
        error: null,
        checkedAuth: true, // on sait qu’on a un user
      });
    } catch (err) {
      set({ error: err.message || "Erreur inconnue", loading: false });
    }
  },
  //rendre la mise à jour synchrone (suite à une inscription)
  updateUser: (newUser) => set({ user: newUser }),

  clearUser: () => set({ user: null }),

  // Nouvel enfant
  addChildProfile: (child) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          childList: [...state.user.childList, child],
        },
      };
    }),

  // Suppression du profil enfant
  removeChildProfile: (id_enfant) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          childList: state.user.childList.filter(
            (child) => child._id_enfant !== id_enfant
          ),
        },
      };
    }),

  // Édition du profil enfant
  updateChildProfile: (id_enfant, update) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          childList: state.user.childList.map((child) =>
            child._id_enfant === id_enfant ? { ...child, ...update } : child
          ),
        },
      };
    }),
}));

export default useInscriptionStore;
