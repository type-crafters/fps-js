import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@scripts": path.resolve(__dirname, "./src/scripts"),
            "@error": path.resolve(__dirname, "./src/scripts/error"),
            "@ui": path.resolve(__dirname, "./src/ui"),
            "@components": path.resolve(__dirname, "./src/ui/components"),
            "@styles": path.resolve(__dirname, "./src/styles")
        }
    },
    plugins: [react()]
});
