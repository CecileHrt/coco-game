import usePreferencesStore from "../stores/usePreferencesStore";

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
      <div className="group peer rounded-full duration-300 w-12 h-6 ring-2 ring-[var(--color-mauve-omb)] after:duration-300 after:bg-[var(--color-mauve-omb)] peer-checked:after:bg-[#1DF264] peer-checked:ring-[#1DF264] after:rounded-full after:absolute after:h-4 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"></div>
    </label>
  );
}
export default FontTypeSwitch;
