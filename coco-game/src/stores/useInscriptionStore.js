import { create } from "zustand";

const useInscriptionStore = create((set) => ({
  // user
  user: null,

  // état de chargement et erreurs globales
  loading: false,
  error: null,
  checkedAuth: false,

  // Vérifie si un user est connecté (via cookie)
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const userConnected = await stayConnected();
      set({
        user: userConnected,
        loading: false,
        checkedAuth: true, //  on marque que c’est fini
      });
    } catch (err) {
      set({
        user: null,
        error: err.message || "Erreur inconnue",
        loading: false,
        checkedAuth: true,
      });
    }
  },

  // setUser avec gestion de loading simulée
  setUser: async (user) => {
    try {
      set({ loading: true, error: null });
      // ici faire un appel API si besoin
      // await fetch(...) etc.
      set({
        user: {
          ...user,
          childList: user.childList || [],
        },
        loading: false,
      });
    } catch (err) {
      set({ error: err.message || "Erreur inconnue", loading: false });
    }
  },

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
