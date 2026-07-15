import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
    assetsInlineLimit: 1_000_000,
    cssCodeSplit: false,
  },
});
