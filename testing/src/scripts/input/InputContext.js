import { typecheck } from "@lib/index";
import { InputObserver } from "@scripts/input/index";

export default class InputContext {
    #enabled;
    static PRESS = "press";
    static HOLD = "hold";
    static RELEASE = "release";
    static INACTIVE = "inactive";

    static WHEEL_DOWN = "down";
    static WHEEL_UP = "up";
    binding;

    #current = InputObserver.nil;
    press = new InputObserver();
    hold = new InputObserver();
    release = new InputObserver();

    constructor(binding) {
        this.binding = binding;
        this.#enabled = false;
    }

    isEnabled() {
        return this.#enabled;
    }

    enable() {
        this.#enabled = true;
    }

    disable() {
        this.#enabled = false;
    }

    getBinding() {
        return this.binding;
    }

    setBinding(binding) {
        this.binding = binding;
    }
    
    setCurrent(observer) {
        switch (observer) {
            case InputContext.PRESS:
                this.#current = this.press;
                break;
            case InputContext.HOLD:
                this.#current = this.hold;
                break;
            case InputContext.RELEASE:
                this.#current = this.release;
                break;
            case InputContext.INACTIVE:
                this.#current = InputObserver.nil;
                break;
            default:
                typecheck(observer, String);
        }
    }

    onAnimationFrame() {
        if (this.#enabled) {
            this.#current.invoke();
        } else {
            console.warn("Action requested using code '" + this.binding + "' was not executed. Action is currently disabled.");
        }
    }
}


