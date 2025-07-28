import { create } from "zustand";

// user store ??
const useInscriptionStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }), //deconnexion
}));

export default useInscriptionStore;
