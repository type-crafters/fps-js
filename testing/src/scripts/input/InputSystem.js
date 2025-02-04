import { InputListener, ActionMap, InputContext } from "@scripts/input/index";
import SystemBase from "@scripts/SystemBase";

export default class InputSystem extends SystemBase {
    /* TODO add implementation */
    isLoggedIn = () => false;

    static WHEEL_UP = "wheel up";
    static WHEEL_DOWN = "wheel down";

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


    actions;
    listener;

    constructor() {
        super();
        this.listener = new InputListener();

        /* TODO retrieve user bindings from source */

        this.actions = new ActionMap(Object.fromEntries(
            Object.entries(this.#defaultBindings).map(([key, value]) => {
                return [key, new InputContext(value)]
            })
        ));
        this.onInitialize();
    }

    getDefaultBindings() {
        return this.#defaultBindings;
    }

    storeDefaultBindings() {
        if (this.isLoggedIn()) {
            console.warn("Store in Database through endpoint!");
        } else {
            console.warn("Store in LocalStorage using key!");
        }
    }

    onInitialize() {
        for (const context of Object.values(this.actions)) {
            context.enable();
        }
    }

    onAnimationFrame() {
        for (const context of Object.values(this.actions)) {
            if (this.listener.isPressed(context.getBinding())) {
                context.setCurrent(InputContext.PRESS);
            } else if (this.listener.isHeld(context.getBinding())) {
                context.setCurrent(InputContext.HOLD)
            } else if (this.listener.isReleased(context.getBinding())) {
                context.setCurrent(InputContext.RELEASE);
            } else {
                context.setCurrent(InputContext.INACTIVE);
            }
            context.onAnimationFrame();
        }
        this.listener.onAnimationFrame();
    }

    onCleanup() {
        this.listener.onCleanup();
        for (const context of Object.values(this.actions)) {
            context.disable();
        }
    }
}