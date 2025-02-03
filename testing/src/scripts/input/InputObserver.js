import { inferType } from "@lib/index";

export default class InputObserver {
    static nil = new InputObserver();
    #callstack;

    constructor() {
        this.#callstack = new Map();
    }

    #typecheck = (callbackfn) => {
        if (typeof callbackfn !== "function") {
            throw new TypeError(`Argument of type '${inferType(callbackfn)}' is not assignable to parameter of type 'function'`);
        }
    };

    subscribe(callbackfn) {
        if (InputObserver.nil !== this) {
            this.#typecheck(callbackfn);
            if (!callbackfn.name) {
                throw new Error("Only named functions can be inserted into the InputObserver class.");
            }
            this.#callstack.set(callbackfn.name, callbackfn);
        }
    }

    unsubscribe(callbackfn) {
        if (InputObserver.nil !== this) {
            this.#typecheck(callbackfn);
            if (!callbackfn.name) {
                throw new Error("Only named functions can be deleted from the InputObserver class.");
            }
            this.#callstack.delete(callbackfn.name);
        }
    }

    invoke() {
        if (InputObserver.nil !== this) {
            this.#callstack.forEach(callbackfn => callbackfn());
        }
    }
}
