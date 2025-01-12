import { InputBinding, InputListener } from ".";
import { ActionDisabledError } from "../error";

export class InputAction {
    private _binding: InputBinding;
    private _enabled: boolean;
    private _current: InputPhase;
    public press: InputPhase;
    public hold: InputPhase;
    public release: InputPhase;

    public isEnabled(): boolean {
        return this._enabled;
    }

    public enable(): void {
        this._enabled = true;
    }

    public disable(): void {
        this._enabled = false;
    }

    public getBinding(): InputBinding {
        return this._binding;
    }

    setBinding(binding: InputBinding): void {
        this._binding = binding;
    }

    constructor(binding: InputBinding) {
        this._binding = binding;
        this._enabled = false;
        this._current = InputPhase.nil;

        this.press = new InputPhase();
        this.hold = new InputPhase();
        this.release = new InputPhase();
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (!this.isEnabled()) {
            throw new ActionDisabledError(`Action '${this.constructor.name}' was not explicitly enabled before use.`);
        }
        if (this._binding.listener !== InputListener.Keyboard || event.code !== this._binding.code) {
            return;
        }

        this.goToPress();
        this.goToHold();
    }

    private onKeyUp(event: KeyboardEvent): void {
        if (!this.isEnabled()) {
            throw new ActionDisabledError(`Action '${this.constructor.name}' was not explicitly enabled before use.`);
        }
        if (this._binding.listener !== InputListener.Keyboard || this._binding.code !== event.code) {
            return;
        }

        this.goToRelease()
    }

    private onMouseDown(event: MouseEvent): void {
        if (!this.isEnabled()) {
            throw new ActionDisabledError(`Action '${this.constructor.name}' was not explicitly enabled before use.`);
        }
        if (this._binding.listener !== InputListener.Mouse || this._binding.code !== String(event.button)) {
            return;
        }

        this.goToPress();
        this.goToHold();
    }

    private onMouseUp(event: MouseEvent): void {
        if (!this.isEnabled()) {
            throw new ActionDisabledError(`Action '${this.constructor.name}' was not explicitly enabled before use.`);
        }
        if (this._binding.listener !== InputListener.Mouse || this._binding.code !== String(event.button)) {
            return;
        }

        this.goToRelease();
    }
    private onWheel(event: WheelEvent): void {
        if(!this.isEnabled()) {
            throw new ActionDisabledError(`Action '${this.constructor.name}' was not explicitly enabled before use.`);
        }
        if(this._binding.listener !== InputListener.Wheel || event.deltaY == 0) {
            return;
        }
        switch(this._binding.code) {
            case InputBinding.MouseWheelDown:
                if(event.deltaY > 0) {
                    this.goToPress();
                    this.goToHold();
                }
                else {
                    this.goToRelease();
                }
                break;
            case InputBinding.MouseWheelUp:
                if(event.deltaY < 0) {
                    this.goToPress();
                    this.goToHold();
                } else {
                    this.goToRelease();
                }
                break;
        }
    }

    private goToPress(): void {
        if (this._current == InputPhase.nil) {
            this._current = this.press;
        }
    }

    private goToHold(): void {
        if (this._current == this.press) {
            this._current = this.hold;
        }
    }

    private goToRelease(): void {
        if (this._current == this.press || this._current == this.hold) {
            this._current = this.release;
        }
    }

    private unset(): void {
        if (this._current == this.release) {
            this._current = InputPhase.nil;
        }
    }

    public initialize(): void {
        switch (this._binding.listener) {
            case InputListener.Keyboard:
                window.addEventListener("keydown", this.onKeyDown);
                window.addEventListener("keyup", this.onKeyUp);
                break;
            case InputListener.Mouse:
                window.addEventListener("mousedown", this.onMouseDown);
                window.addEventListener("mouseup", this.onMouseUp);
                break;
            case InputListener.Wheel:
                window.addEventListener("wheel", this.onWheel);
                break;
        }
    }

    public onAnimationFrame(): void {
        if (this.isEnabled()) {
            this._current.trigger();
            if (this._current == this.release) {
                this.unset();
            }
        } else {
            throw new ActionDisabledError(`Action '${this.constructor.name}' was not explicitly enabled before use.`);
        }
    }
}

class InputPhase {
    private _callstack: Set<() => void> = new Set();

    public static nil: InputPhase = new InputPhase();

    private isNil(): boolean {
        return InputPhase.nil == this;
    }

    public subscribe(handler: () => void): void {
        if (this.isNil()) {
            return;
        }
        this._callstack.add(handler);
    }

    public unsubscribe(handler: () => void): void {
        if (this.isNil()) {
            return;
        }
        if (this._callstack.has(handler)) {
            this._callstack.delete(handler);
        }
    }

    public trigger(): void {
        if (this.isNil()) {
            return;
        }
        this._callstack.forEach((handler) => {
            handler();
        })
    }
}