export class InputPhase {
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