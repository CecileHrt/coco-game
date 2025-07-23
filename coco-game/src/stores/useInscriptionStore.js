import { create } from "zustand";

const useInscriptionStore = create((set) => ({
  mail: "",
  password: "",
  confirmPassword: "",
}));

export default useInscriptionStore;
