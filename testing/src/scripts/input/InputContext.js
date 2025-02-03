import { InputObserver } from "./InputObserver";

export default class InputContext {
    static WHEEL_DOWN = "down";
    static WHEEL_UP = "up";
    binding;
    press = new InputObserver();
    hold = new InputObserver();
    release = new InputObserver();

    constructor(binding) {
        this.binding = binding;
    }
    
    getBinding() {
        return this.binding;
    }

    setBinding(binding) {
        this.binding = binding;
    }
}


