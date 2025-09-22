import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // important pour simuler le DOM
    globals: true, // permet d’utiliser describe/it/expect sans importer
    setupFiles: "./vitest.setup.js", // fichier de setup global
  },
});
