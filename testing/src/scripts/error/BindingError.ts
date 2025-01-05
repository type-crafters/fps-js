export class BindingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BindingError";
    }
}