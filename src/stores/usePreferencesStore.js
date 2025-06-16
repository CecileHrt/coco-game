import { create } from "zustand";

const usePreferencesStore = create((set) => ({
  theme: "Normal",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("theme", theme);

    const root = document.documentElement;
    root.classList.remove("high-contrast");

    if (theme === "HighContrast") {
      root.classList.add("high-contrast");
    }
  },
  initTheme: () => {
    const savedTheme = localStorage.getItem("theme") || "Normal";
    const root = document.documentElement;
    root.classList.remove("high-contrast");

    if (savedTheme === "HighContrast") {
      root.classList.add("high-contrast");
    }

    set({ theme: savedTheme });
  },
}));

export default usePreferencesStore;
