import usePreferencesStore from "../stores/usePreferencesStore.js";

export function speak(text) {
  const voiceAssistance = usePreferencesStore.getState().voiceAssistance;
  if (!voiceAssistance || !text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";

  const voices = speechSynthesis.getVoices();
  const frenchVoice = voices.find((v) => v.lang.includes("fr"));
  if (frenchVoice) utterance.voice = frenchVoice;

  speechSynthesis.cancel(); // stop toute lecture en cours
  speechSynthesis.speak(utterance);
}

// Reconnaissance - optionnelle pour plus tard
export function startRecognition(callback) {
  const voiceAssistance = usePreferencesStore.getState().voiceAssistance;

  if (
    !voiceAssistance ||
    !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  )
    return;

  const RecognitionClass =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new RecognitionClass();
  recognition.lang = "fr-FR";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    if (callback) callback(result);
  };

  recognition.start();
}
