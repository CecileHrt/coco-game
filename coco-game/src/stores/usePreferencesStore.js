import { create } from "zustand";

const usePreferencesStore = create((set) => ({
  // === THEME CONTRASTE ===
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

  // === POLICE DYSLEXIQUE ===
  fontType: "Normal",
  setFontType: (fontType) => {
    set({ fontType });
    localStorage.setItem("fontType", fontType);

    const root = document.documentElement;
    root.classList.remove("dys-font");
    if (fontType === "OpenDyslexic") {
      root.classList.add("dys-font");
    }
  },
  initFontType: () => {
    const savedFontType = localStorage.getItem("fontType") || "Normal";
    const root = document.documentElement;
    root.classList.remove("dys-font");
    if (savedFontType === "OpenDyslexic") {
      root.classList.add("dys-font");
    }
    set({ fontType: savedFontType });
  },

  // === SYNTHESE ET RECONNAISSANCE VOCALE ===
  voiceAssistance: false,
  setVoiceAssistance: (enabled) => {
    set({ voiceAssistance: enabled });
    localStorage.setItem("voiceAssistance", JSON.stringify(enabled));
  },

  initVoiceSettings: () => {
    const enabled =
      JSON.parse(localStorage.getItem("voiceAssistance")) || false;
    set({
      voiceAssistance: enabled,
    });
  },
}));

export default usePreferencesStore;
