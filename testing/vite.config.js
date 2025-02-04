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
            //"@assets": path.resolve(__dirname, "./src/assets")
        }
    },
    esbuild: {
        loader: "jsx",
        include: [
            "src/**/*.js",
            "src/**/*.jsx",
            "node_modules/**/*.jsx",
            "node_modules/**/*.tsx",
        ],
        exclude: [
            "src/scripts/**/*.js"
        ]
    }
});