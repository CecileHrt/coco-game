import React, { useState } from "react";
import usePreferencesStore from "../../stores/usePreferencesStore.js";
import { startRecognition } from "../../lib/startRecognition.js";
import { FaMicrophone } from "react-icons/fa6";

export default function SpeechButton({ onResult = null, className = "" }) {
  const voiceAssistance = usePreferencesStore((state) => state.voiceAssistance);
  const [listening, setListening] = useState(false);

  const handleClick = () => {
    if (!voiceAssistance) return;

    setListening(true);
    startRecognition((result) => {
      if (onResult) {
        onResult(result);
      } else {
        alert(`Tu as dit : "${result}"`);
      }
      setListening(false);
    });
  };

  if (!voiceAssistance) return <button className="h-8 invisible" />;

  return (
    <button
      className={`btn-carre-jaune ${className}`}
      onClick={handleClick}
      disabled={!voiceAssistance}
      title="Parler"
    >
      <i>
        <FaMicrophone />
      </i>
    </button>
  );
}
// <SpeechButton onResult={(result) => console.log("Texte reconnu :", result)} />
