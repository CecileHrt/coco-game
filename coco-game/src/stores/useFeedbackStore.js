import { create } from "zustand";

const useFeedbackStore = create((set) => ({
  rating: 0, // valeur par défaut
  setRating: (newRating) => set({ rating: newRating }), //fonction

  avis: "",
  setAvis: (newAvis) => set({ avis: newAvis }),

  auteur: "",
  setAuteur: (newAuteur) => set({ auteur: newAuteur }),
}));

export default useFeedbackStore;
