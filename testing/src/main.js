import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {Music} from "./ui/App";
import App from "./ui/App";
import "@styles/globals.css";

import { InputSystem } from "@scripts/input/index";
import { Player } from "@scripts/player/index";

let last = performance.now();

const input = new InputSystem();
const player = new Player(input);

function animate(now) {
    window.frametime = now - last;
    last = now;

    player.onAnimationFrame();

    requestAnimationFrame(animate);
}

animate();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Music />
        <App />
    </StrictMode>
);