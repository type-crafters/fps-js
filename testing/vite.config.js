import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@ui": path.resolve(__dirname, "./src/ui"),
            "@styles": path.resolve(__dirname, "./src/ui/styles"),
            "@scripts": path.resolve(__dirname, "./src/scripts"),
            "@lib": path.resolve(__dirname, "./src/lib"),
            "@error": path.resolve(__dirname, "./src/error")
        }
    },
    esbuild: {
        include: [
            "src/**/*.js",
            "src/**/*.jsx",
            "node_modules/**/*.jsx",
            "node_modules/**/*.tsx",
        ],
        exclude: [
            "src/scripts/**/*.js"
        ],
        loader: "jsx",
    }
});