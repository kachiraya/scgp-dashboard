import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: "./dist/electron.js",
    }),
  ],
  server: {
    port: 8080,
    origin: 'http://127.0.0.1:8080'
  },
  define: {
    "process.env": {},
  },
});
