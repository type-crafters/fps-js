export default class AdapterError extends Error {
    constructor(message) {
        super(message);
        this.name = "AdapterError";
    }
}