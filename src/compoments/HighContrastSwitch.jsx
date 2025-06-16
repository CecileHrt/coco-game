import usePreferencesStore from "../stores/usePreferencesStore";

function HighContrastSwitch() {
  const theme = usePreferencesStore((state) => state.theme);
  const setTheme = usePreferencesStore((state) => state.setTheme);

  const toggleTheme = () => {
    setTheme(theme === "HighContrast" ? "Normal" : "HighContrast");
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === "HighContrast"}
        onChange={toggleTheme}
      />
      <div className="group peer rounded-full duration-300 w-12 h-6 ring-2 ring-[var(--color-mauve-omb)] after:duration-300 after:bg-[var(--color-mauve-omb)] peer-checked:after:bg-[#1DF264] peer-checked:ring-[#1DF264] after:rounded-full after:absolute after:h-4 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"></div>
    </label>
  );
}

export default HighContrastSwitch;
