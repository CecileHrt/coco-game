import { useEffect } from "react";
import usePreferencesStore from "./stores/usePreferencesStore";

function AdaptativeMode({ children }) {
  const initTheme = usePreferencesStore((state) => state.initTheme);
  const initFontType = usePreferencesStore((state) => state.initFontType);
  const initVoiceSettings = usePreferencesStore(
    (state) => state.initVoiceSettings
  );

  useEffect(() => {
    initTheme();
    initFontType();
    initVoiceSettings();
  }, [initTheme, initFontType, initVoiceSettings]);

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  return <>{children}</>;
}

export default AdaptativeMode;
