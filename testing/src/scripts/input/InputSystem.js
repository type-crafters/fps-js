import { InputListener, ActionMap } from "@scripts/input/index";
import path from "path";
export default class InputSystem {
    /* TODO add implementation */
    isLoggedIn() {
        return false;
    }
    static WHEEL_UP = "wheel up";
    static WHEEL_DOWN = "wheel down";
    listener;

    #defaultBindings = new ActionMap({
        moveForward: "KeyW",
        moveBackward: "KeyS",
        moveLeft: "KeyA",
        moveRight: "KeyD",
        jump: "Space",
        crouch: "KeyC",
        prone: "ControlLeft",
        sprint: "ShiftLeft",
        reload: "KeyR",
        fire: 0,
        ads: 2,
        throwLethal: "KeyG",
        throwTactical: "KeyQ",
        nextWeapon: InputSystem.WHEEL_UP,
        previousWeapon: InputSystem.WHEEL_DOWN,
        melee: "KeyE",
        interact: "KeyF",
        openMenu: "Escape",
        accept: "Enter"
    });

    constructor() {
        super();
        this.listener = new InputListener();
    }

    getDefaultBindings() {
        return this.#defaultBindings;
    }

    storeDefaultBindings() {
        if(this.isLoggedIn()) {
            throw new Error("Method not implemented");
        } else {
            throw new Error("Method not implemented");
        }
    }
}