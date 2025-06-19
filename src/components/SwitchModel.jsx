import React from "react";

export default function SwitchModel() {
  return (
    <>
      {/* <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" class="sr-only peer" value="" />
        <div class="group peer rounded-full duration-300 w-16 h-8 ring-2 ring-[var(--color-mauve-omb)] after:duration-300 after:bg-[var(--color-mauve-omb)] peer-checked:after:bg-[#1DF264] peer-checked:ring-[#1DF264] after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"></div>
      </label> */}
      {/* <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" class="sr-only peer" value="" />
        <div class="group peer rounded-full duration-300 w-12 h-6 ring-2 ring-[var(--color-mauve-omb)] after:duration-300 after:bg-[var(--color-mauve-omb)] peer-checked:after:bg-[#1DF264] peer-checked:ring-[#1DF264] after:rounded-full after:absolute after:h-4 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"></div>
      </label> */}
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
    </>
  );
}
