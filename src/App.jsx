import { useEffect, useState } from "react";
// import Switch from "./compoments/switch";
import usePreferencesStore from "./stores/usePreferencesStore";
import HighContrastSwitch from "./compoments/HighContrastSwitch";

function App() {
  const initTheme = usePreferencesStore((state) => state.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className=" ">
      <h1 className="text-[var(--color-mauve-clair)]">1ers pas</h1>
      <h3>test font</h3>
      <div
        className="flex space-x-2
      "
      >
        <p>Mode contrasté</p>
        <HighContrastSwitch />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, vitae
        quasi ea ipsam labore repellat quam, alias ex minus odit sint, deserunt
        nisi dolorum. Dolores commodi aliquam error consequatur eos.
      </p>
      <a href="">bknqebrn</a>
      <button>jrggn sv</button>
    </div>
  );
}

export default App;
