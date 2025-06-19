import React from "react";
import usePreferencesStore from "../../stores/usePreferencesStore.js";
import { speak } from "../../lib/speech.js";
import { FaVolumeHigh } from "react-icons/fa6";

export default function SynthesisButton({ text, className = "" }) {
  const voiceAssistance = usePreferencesStore((state) => state.voiceAssistance);

  if (!voiceAssistance) return <button className="h-8 invisible" />;

  return (
    <button
      className={`btn-carre-jaune ${className}`}
      onClick={() => speak(text)}
      title="Lire à voix haute"
    >
      <i>
        <FaVolumeHigh />
      </i>
    </button>
  );
}
// <SynthesisButton text="Bonjour, ceci est une synthèse vocale." />
