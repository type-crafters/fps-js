export class AdapterError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AdapterError";
        Object.setPrototypeOf(this, AdapterError.prototype);
    }
}