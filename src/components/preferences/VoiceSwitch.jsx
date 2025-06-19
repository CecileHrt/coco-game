import usePreferencesStore from "../../stores/usePreferencesStore.js";

export default function VoiceSwitch() {
  const voiceAssistance = usePreferencesStore((state) => state.voiceAssistance);
  const setVoiceAssistance = usePreferencesStore(
    (state) => state.setVoiceAssistance
  );

  const toggle = () => {
    setVoiceAssistance(!voiceAssistance);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={voiceAssistance}
        onChange={() => setVoiceAssistance(!voiceAssistance)}
      />
      <div
        className="group peer relative w-9 h-5 rounded-full duration-300 bg-[#EDE1F6]

          /* Pseudo-élément (le rond) */
          after:absolute after:top-[1px] after:left-[1px] after:h-[18px] after:w-[18px]
          after:rounded-full after:flex after:justify-center after:items-center 
          after:duration-300 after:bg-white after:transition-transform 

          /* Interactions */
          peer-hover:after:scale-95
          peer-checked:after:translate-x-4
          peer-checked:bg-[#C550E5]"
      ></div>
    </label>
  );
}
