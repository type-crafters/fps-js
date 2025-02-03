import InputListener from "@scripts/input/InputListener";
import KeyBindSystem from "@scripts/input/KeyBindSystem";

export class InputSystem {
    static WHEEL_UP = "wheel up";
    static WHEEL_DOWN = "wheel down";
    listener;
    bindings;
    actions;
    /* TODO use in production
    #actionMap = new Map([
        ["moveForward", "KeyW"], 
        ["moveBackward", "KeyS"], 
        ["moveLeft", "KeyA"], 
        ["moveRight", "KeyD"], 
        ["jump", "Space"], 
        ["crouch", "KeyC"], 
        ["prone", "ControlLeft"], 
        ["sprint", "ShiftLeft"], 
        ["reload", "KeyR"], 
        ["fire", 0], 
        ["ads", 2], 
        ["throwLethal", "KeyG"], 
        ["throwTactical", "KeyQ"], 
        ["nextWeapon", InputSystem.WHEEL_UP], 
        ["previousWeapon", InputSystem.WHEEL_DOWN], 
        ["melee", "KeyE"], 
        ["interact", "KeyF"], 
        ["openMenu", "Escape"], 
        ["accept", "Enter"],
    ])
    */

    /* personal preference for testing */
    #actionMap = new Map([
        ["moveForward", "KeyW"], 
        ["moveBackward", "KeyS"], 
        ["moveLeft", "KeyA"], 
        ["moveRight", "KeyD"], 
        ["jump", "Space"], 
        ["crouch", 3], 
        ["prone", 1], 
        ["sprint", 4], 
        ["reload", "KeyR"], 
        ["fire", 0], 
        ["ads", 2], 
        ["throwLethal", "KeyG"], 
        ["throwTactical", "KeyQ"], 
        ["nextWeapon", InputSystem.WHEEL_UP], 
        ["previousWeapon", InputSystem.WHEEL_DOWN], 
        ["melee", "KeyE"], 
        ["interact", "KeyF"], 
        ["openMenu", "Escape"], 
        ["accept", "Enter"],
    ]);

    getActionMap() {
        return this.#actionMap;
    }

    getActionSet() {
        return new Set(this.#actionMap.keys());
    }

    getDefaultBindings() {
        return JSON.stringify([...this.#actionMap]);
    }

    constructor() {
        super();
        this.listener = new InputListener();
        this.bindings = new KeyBindSystem(this);
        this.actions = new ActionManager(this);
    }
}