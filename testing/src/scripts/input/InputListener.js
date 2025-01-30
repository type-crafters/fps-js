/* eslint-disable no-unused-vars */
import SystemBase from "../SystemBase";

export class InputListener extends SystemBase {
    static down = "down";
    static up = "up";
    static rest = "rest";
    #keyboard;
    #mouse;
    #wheel;

    updateInputStates() {
        this.#keyboard.forEach((value, key, map) => {
            if(value["press"]) {
                map.set(key, { press: false, hold: true, release: false });
            } else if(value["release"]) {
                map.set(key, { press: false, hold: false, release: false })
            }
        });
    }

    onKeyDown(event) {
        const code = event.code;
        if(!this.#keyboard.has(code)) {
            this.#keyboard.set(code, { press: true, hold: false, release: false });
        }
    }

    onKeyUp(event) {
        const code = event.code;
        this.#keyboard.set(code, { press: false, hold: false, release: true })
    }

    onMouseDown(event) {
        const button = event.button;
        if(!this.#mouse.has(button)) {
            this.#mouse.set(button, { press: true, hold: false, release: false });
        }
    }

    onMouseUp(event) {
        const button = event.button;
        this.#mouse.set(button, { press: false, hold: false, release: true })
    }

    onWheel(event) {
        if(event.deltaY == 0) return;
        this.#wheel = event.deltaY > 0 ? InputListener.down : InputListener.up;
    }

    onInitialize() {
        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keyup", this.onKeyUp);
        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("mouseup", this.onMouseUp);
        window.addEventListener("wheel", this.onWheel);
    }

    onAnimationFrame() {
        this.updateInputStates();
    }

    onCleanup() {
        window.removeEventListener("keydown", this.onKeyDown);
        window.removeEventListener("keyup", this.onKeyUp);
        window.removeEventListener("mousedown", this.onMouseDown);
        window.removeEventListener("mouseup", this.onMouseUp);
        window.removeEventListener("wheel", this.onWheel);
    }

    constructor() {
        super();
        this.#keyboard = new Map();
        this.#mouse = new Map();
        this.#wheel = InputListener.rest;
        this.onInitialize();
    }
}
