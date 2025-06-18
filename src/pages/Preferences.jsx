import React from "react";
import HighContrastSwitch from "../components/preferences/HighContrastSwitch.jsx";
import FontTypeSwitch from "../components/preferences/FontTypeSwitch.jsx";
import VoiceSwitch from "../components/preferences/VoiceSwitch.jsx";
import SpeechButton from "../components/preferences/SpeechButton.jsx";
import SynthesisButton from "../components/preferences/SynthesisButton.jsx";

export default function Preferences() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Préférences</h1>

      <div className="flex items-center space-x-4">
        <p>Mode contrasté</p>
        <HighContrastSwitch />
      </div>

      <div className="flex items-center space-x-4">
        <p>Mode Dys</p>
        <FontTypeSwitch />
      </div>

      <div className="flex items-center space-x-4">
        <p>Assistance vocale</p>
        <VoiceSwitch />
      </div>

      {/* <div className="flex items-center space-x-4 bg-red-400 p-4 rounded">
        <p>Reconnaissance vocale</p>
        <SynthesisButton text="Bonjour, ceci est une synthèse vocale." />
      </div>
      <div className="flex items-center space-x-4 bg-red-400 p-4 rounded">
        <p>Synthèse vocale</p>
        <SpeechButton
          onResult={(result) => console.log("Texte reconnu :", result)}
        />
      </div> */}
    </section>
  );
}
