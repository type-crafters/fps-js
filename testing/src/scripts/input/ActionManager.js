import { inferType } from "../lib/index";
import { InputContext } from "./InputContext"
import { InputSystem } from "./InputSystem";

export class ActionManager {
    #input;

    /**
     * @param {InputSystem} input 
     */
    constructor(input) {
        if(!(input instanceof InputSystem)) {
            throw new TypeError(`Argument of type '${inferType(input)}' is not assignable to parameter of type 'InputSystem'.`);
        }
        this.#input = input;

        this.#input.actionMap.forEach(action => {
            this[action] = new ActionContext();
        });
    }
}