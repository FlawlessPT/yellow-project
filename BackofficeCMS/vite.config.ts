import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@configs": `${path.resolve(__dirname, "./src/configs/")}`,
      "@types": `${path.resolve(__dirname, "./src/types/")}`,
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@pages": `${path.resolve(__dirname, "./src/pages/")}`,
      "@utils": `${path.resolve(__dirname, "./src/utils/")}`,
    },
  },
});
