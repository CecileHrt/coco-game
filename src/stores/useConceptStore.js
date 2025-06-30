import { create } from "zustand";
import argumentsData from "../data/argumentsData.json";
import avisData from "../data/avisData.json";

const useConceptStore = create((set) => ({
  // anticiper le filtre :
  argumentsList: [
    ...argumentsData.enfants.map((arg) => ({ ...arg, cible: "enfants" })),
    ...argumentsData.adultes.map((arg) => ({ ...arg, cible: "adultes" })),
  ],

  avis: avisData,
  setAvis: (newAvis) => set({ avis: newAvis }),
}));

export default useConceptStore;
