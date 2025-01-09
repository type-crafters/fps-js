export class InputAction {
    private _enabled: boolean;
    private _current: InputPhase = InputPhase.nil;
    public name: string;
    public press: InputPhase;
    public hold: InputPhase;
    public release: InputPhase;

    constructor() {
        this._enabled = false;
        this.name = this.constructor.name;
        this.press = new InputPhase();
        this.hold = new InputPhase();
        this.release = new InputPhase();
    }

    public isEnabled() {
        return this._enabled;
    }

    public enable() {
        this._enabled = true;
    }

    public disable() {
        this._enabled = false;
    }

    public onAnimationFrame(): void {
        this._current.invoke();
    }
}

class InputPhase {
    private _callstack: Set<() => void>;
    public static nil: InputPhase = new InputPhase();

    constructor() {
        this._callstack = new Set();
    }

    public isNil(): boolean {
        return InputPhase.nil === this;
    }

    public subscribe(handler: () => void): void {
        if(!this.isNil()) {
            this._callstack.add(handler);
        }
    }

    public unsubscribe(handler: () => void): void {
        if(!this.isNil()) {
            if(this._callstack.has(handler)) {
                this._callstack.delete(handler);
            }
        }
    }

    public invoke(): void {
        if(!this.isNil()) {
            this._callstack.forEach((handler) => {
                handler();
            });
        }
    }
}