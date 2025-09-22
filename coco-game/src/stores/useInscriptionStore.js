import { create } from "zustand";
import { persist } from "zustand/middleware";

const useInscriptionStore = create(
  // persist(
  // permet la persistance de l'état dans le localStorage
  (set) => ({
    // user
    user: null,
    // setUser: (user) => set({ user }),
    setUser: (user) =>
      set({
        user: {
          ...user,
          childList: user.childList || [], // assure que childList existe
        },
      }),

    clearUser: () => set({ user: null }), // déconnexion

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
  })
  //   {
  //     name: "inscription-storage", // clé dans localStorage
  //   }
  // )
);

export default useInscriptionStore;
