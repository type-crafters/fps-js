import { InputListener } from "./InputListener";

export class InputSystem {
    // eslint-disable-next-line no-unused-private-class-members
    #listener;

    constructor() {
        this.#listener = new InputListener();
    }
}