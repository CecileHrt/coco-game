import { create } from "zustand";
import argumentsData from "../data/argumentsData.json";

const useConceptStore = create((set) => ({
  // anticiper le filtre :
  argumentsList: [
    ...argumentsData.enfants.map((arg) => ({ ...arg, cible: "enfants" })),
    ...argumentsData.adultes.map((arg) => ({ ...arg, cible: "adultes" })),
  ],
}));

export default useConceptStore;
