import { useEffect, useState } from "react";
import usePreferencesStore from "./stores/usePreferencesStore";
import HighContrastSwitch from "./components/preferences/HighContrastSwitch.jsx";
import FontTypeSwitch from "./components/preferences/FontTypeSwitch.jsx";
import VoiceSwitch from "./components/preferences/VoiceSwitch.jsx";

import { speak, startRecognition } from "../src/lib/speech.js";
import APropos from "./pages/APropos";

// icones Font Awesome
import { FaVolumeHigh } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";

function App() {
  const initTheme = usePreferencesStore((state) => state.initTheme);
  const initFontType = usePreferencesStore((state) => state.initFontType);
  const initVoiceSettings = usePreferencesStore(
    (state) => state.initVoiceSettings
  );
  const voiceAssistance = usePreferencesStore((state) => state.voiceAssistance);
  const [listening, setListening] = useState(false);

  const handleClick = () => {
    if (!voiceAssistance) return;

    setListening(true);
    startRecognition((result) => {
      alert(`Tu as dit : "${result}"`);
      setListening(false);
    });
  };

  useEffect(() => {
    initTheme(), initFontType(), initVoiceSettings();
  }, [initTheme, initFontType, initVoiceSettings]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.getVoices(); // déclenche le chargement
      window.speechSynthesis.onvoiceschanged = () => {};
    }
  }, []);

  return (
    <div className=" ">
      <h1 className="text-[var(--color-mauve-clair)]">1ers pas</h1>
      <h3>test font</h3>
      <APropos />
      <div className="flex space-x-2">
        <p>Mode contrasté</p>
        <HighContrastSwitch />
      </div>

      <div className="flex space-x-2">
        <p>Mode Dys</p>
        <FontTypeSwitch />
      </div>
      <div>
        <div className="flex space-x-2">
          <p>Assistance vocale</p>
          <VoiceSwitch />
        </div>
        <p>
          Entre écrans passifs et devoirs trop sérieux, cette application
          éducative propose un nouveau souffle : une expérience interactive,
          affective et évolutive qui crée du lien en toute liberté, sans pub et
          avec le sourire.
        </p>
        {voiceAssistance ? (
          <button
            className={`btn-carre-jaune`}
            onClick={() =>
              speak(
                "Entre écrans passifs et devoirs trop sérieux, cette application éducative propose un nouveau souffle : une expérience interactive, affective et évolutive qui crée du lien en toute liberté, sans pub et avec le sourire."
              )
            }
          >
            <i>
              <FaVolumeHigh />
            </i>
          </button>
        ) : (
          <button className="h-10 invisible">
            <i>
              <FaVolumeHigh />
            </i>
          </button>
        )}
        <p>reconnaissance</p>
        {voiceAssistance ? (
          <button
            className={`btn-carre-jaune`}
            onClick={handleClick}
            disabled={!voiceAssistance}
            title="Parler"
          >
            <i>
              <FaMicrophone />
            </i>
          </button>
        ) : (
          <button className="h-10 invisible">
            <i>
              <FaMicrophone />
            </i>
          </button>
        )}
      </div>
      <a href="">bknqebrn</a>
      <button>jrggn sv</button>
    </div>
  );
}

export default App;
