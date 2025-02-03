import SystemBase from "@scripts/SystemBase";

export default class InputListener extends SystemBase {
    static WHEEL_DOWN = "down";
    static WHEEL_UP = "up";
    static WHEEL_REST = "rest";
    #keyboard;
    #mouse;
    #wheel = InputListener.WHEEL_REST;

    constructor() {
        super();
        this.#keyboard = new Map();
        this.#mouse = new Map();
        this.onInitialize();
    }

    updateInputStates() {
        this.#keyboard.forEach((value, key, map) => {
            if (value["press"]) {
                map.set(key, { press: false, hold: true, release: false });
            } else if (value["release"]) {
                map.set(key, { press: false, hold: false, release: false })
            }
        });
        this.#mouse.forEach((value, key, map) => {
            if (value["press"]) {
                map.set(key, { press: false, hold: true, release: false });
            } else if (value["release"]) {
                map.set(key, { press: false, hold: false, release: false })
            }
        });
        this.#wheel = InputListener.WHEEL_REST;
    }

    onKeyDown = (event) => {
        this.#keyboard.set(event.code, { press: true, hold: false, release: false });
    }

    onKeyUp = (event) => {
        this.#keyboard.set(event.code, { press: false, hold: false, release: true })
    }

    onMouseDown = (event) => {
        this.#mouse.set(event.button, { press: true, hold: false, release: false });
    }

    onMouseUp = (event) => {
        this.#mouse.set(event.button, { press: false, hold: false, release: true })
    }

    onWheel = (event) => {
        if (event.deltaY == 0) return;
        this.#wheel = event.deltaY > 0 ? InputListener.WHEEL_DOWN : InputListener.WHEEL_UP;
    }

    isPressed(code) {
        if (code === InputListener.WHEEL_DOWN) {
            return this.#wheel === InputListener.WHEEL_DOWN;
        } else if (code === InputListener.WHEEL_UP) {
            return this.#wheel === InputListener.WHEEL_UP;
        } else if (typeof code === "string") {
            return this.#keyboard.get(code)?.press || false;
        } else if (typeof code === "number") {
            return this.#mouse.get(code)?.press || false;
        }
    }

    isHeld(code) {
        if (code === InputListener.WHEEL_DOWN) {
            return this.#wheel === InputListener.WHEEL_DOWN;
        } else if (code === InputListener.WHEEL_UP) {
            return this.#wheel === InputListener.WHEEL_UP;
        } else if (typeof code === "string") {
            return this.#keyboard.get(code)?.hold || false;
        } else if (typeof code === "number") {
            return this.#mouse.get(code)?.hold || false;
        }
    }

    isReleased(code) {
        if (code === InputListener.WHEEL_DOWN) {
            return this.#wheel === InputListener.WHEEL_REST;
        } else if (code === InputListener.WHEEL_UP) {
            return this.#wheel === InputListener.WHEEL_REST;
        } else if (typeof code === "string") {
            return this.#keyboard.get(code)?.release || false;
        } else if (typeof code === "number") {
            return this.#mouse.get(code)?.release || false;
        }
    }

    isInactive(code) {
        if (code === InputListener.WHEEL_DOWN) {
            return this.#wheel === InputListener.WHEEL_REST;
        } else if (code === InputListener.WHEEL_UP) {
            return this.#wheel === InputListener.WHEEL_REST;
        } else if (typeof code === "string") {
            return !this.#keyboard.get(code)?.press && !this.#keyboard.get(code)?.hold && !this.#keyboard.get(code)?.release;
        } else if (typeof code === "number") {
            return !this.#mouse.get(code)?.press && !this.#mouse.get(code)?.hold && !this.#mouse.get(code)?.release;
        }
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
}