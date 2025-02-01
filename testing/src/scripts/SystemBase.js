export default class SystemBase {
    constructor() {
        if(new.target === SystemBase) {
            throw new Error("Abstract class 'SystemBase' cannot be instantiated directly.");
        }

        ["onInitialize", "onAnimationFrame", "onCleanup"]
        .forEach((method) => {
            if(typeof this[method] !== "function") {
                throw new Error(`Class '${this.constructor.name}' must implement abstract member '${method}'.`);
            }
        })
    }
}
