import { typecheck } from "@lib/index";
export default class InputObserver {
    static nil = new InputObserver();
    #callstack;

    constructor() {
        this.#callstack = new Map();
    }

    subscribe(callbackfn) {
        if (InputObserver.nil !== this) {
            typecheck(callbackfn, Function);
            if (!callbackfn.name) {
                throw new Error("Only named functions can be inserted into the InputObserver class.");
            }
            this.#callstack.set(callbackfn.name, callbackfn);
        }
    }

    unsubscribe(callbackfn) {
        if (InputObserver.nil !== this) {
            typecheck(callbackfn, Function);
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
