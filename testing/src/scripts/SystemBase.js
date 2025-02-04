export default class SystemBase {
    #abstractMethods = [
        "onInitialize",
        "onAnimationFrame",
        "onCleanup"
    ]

    constructor() {
        if (new.target === SystemBase) {
            throw new Error("Abstract class 'SystemBase' cannot be instantiated directly.");
        }

        this.#abstractMethods.forEach((method) => {
            if (typeof this[method] !== "function") {
                throw new Error(`Class '${this.constructor.name}' must implement abstract member '${method}'.`);
            }
        })
    }
}
