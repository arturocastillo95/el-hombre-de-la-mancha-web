import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        inicio: resolve(import.meta.dirname, "index.html"),
        programa: resolve(import.meta.dirname, "programa/index.html"),
      },
    },
  },
});
