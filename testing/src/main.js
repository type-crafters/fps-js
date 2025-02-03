import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./ui/App";
import "@styles/globals.css";

let last = performance.now();

function animate(now) {
    window.frametime = now - last;
    last = now;

    requestAnimationFrame(animate);
}

animate();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);