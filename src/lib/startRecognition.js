import usePreferencesStore from "../stores/usePreferencesStore.js";

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
