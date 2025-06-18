import usePreferencesStore from "../../stores/usePreferencesStore.js";

function FontTypeSwitch() {
  const fontType = usePreferencesStore((state) => state.fontType);
  const setFontType = usePreferencesStore((state) => state.setFontType);

  const toggleFontType = () => {
    setFontType(fontType === "OpenDyslexic" ? "Normal" : "OpenDyslexic");
  };
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={fontType === "OpenDyslexic"}
        onChange={toggleFontType}
      />
      <div
        className="group peer relative w-12 h-6 rounded-full duration-300

          /* Ring et couleurs par défaut */
          ring-2 ring-[var(--color-mauve-omb)] bg-transparent

          /* Pseudo-élément (le rond) */
          after:absolute after:top-1 after:left-1 after:h-4 after:w-4 
          after:rounded-full after:flex after:justify-center after:items-center 
          after:bg-[var(--color-mauve-omb)] after:duration-300

          /* Interactions */
          peer-hover:after:scale-95
          peer-checked:ring-[#1DF264]
          peer-checked:after:translate-x-6
          peer-checked:after:bg-[#1DF264]

          /* Mode contrasté */
          high-contrast:ring-yellow-400
          high-contrast:bg-black
          high-contrast:peer-checked:ring-green-400
          high-contrast:after:left-auto
          high-contrast:peer-checked:after:right-1
          high-contrast:peer-checked:after:translate-x-0
          high-contrast:after:bg-yellow-300
          high-contrast:peer-checked:after:bg-green-300"
      ></div>
    </label>
  );
}
export default FontTypeSwitch;
