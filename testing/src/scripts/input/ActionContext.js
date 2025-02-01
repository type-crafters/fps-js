export class ActionContext {
    #enabled;
    #current;

    isEnabled() {
        return this.#enabled;
    }

    enable() {
        this.#enabled = true;
    }

    disable() {
        this.#enabled = false;
    }

    invoke() {
        if(!this.#enabled) {
            throw new Error(`Trying to access disabled input context '${this.constructor.name}'`); ;
        }
        this.#current.invoke();
    }
}

export class InputState {
    #callstack;
    static nil = new InputState();
    constructor() {
        this.#callstack = new Set();
    }

    isNil() {
        return InputState.nil === this;
    }

    subscribe(callbackfn) {
        if(!this.isNil()) {
            if(typeof callbackfn !== "function") {
                throw new TypeError(`Type '${typeof callbackfn}' is not assignable to type 'function'`)
            }
            this.#callstack.add(callbackfn);
        }
    }

    unsubscribe(callbackfn) {
        if(!this.isNil()) {
            if(typeof callbackfn !== "function") {
                throw new TypeError(`Type '${typeof callbackfn}' is not assignable to type 'function'`)
            }
            this.#callstack.delete(callbackfn);
        }
    }
    
    invoke() {
        this.#callstack.forEach(callbackfn => callbackfn());
    }
}