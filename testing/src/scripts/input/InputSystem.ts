import { IActionMap, InputAction, KeyBindSystem } from ".";

export class InputSystem {
    public actions: IActionMap<InputAction> = {} as IActionMap<InputAction>;

    constructor() {
        Object.keys(this.actions).forEach((key) => {
            const name = key as keyof IActionMap<InputAction>;
            this.actions[name] = new InputAction(KeyBindSystem.getDefaultBinding(name));
        });
    }

    public enableAll(): void {
        Object.keys(this.actions).forEach((key) => {
            const name = key as keyof IActionMap<InputAction>;
            this.actions[name].enable();
        });
    }

    public disableAll(): void {
        Object.keys(this.actions).forEach((key) => {
            const name = key as keyof IActionMap<InputAction>;
            this.actions[name].disable();
        });
    }
}