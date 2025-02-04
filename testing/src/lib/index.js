export function typecheck(variable, type) {
    if (variable instanceof type) return;
    if (typeof variable  !== "object" && typeof variable === type.name.toLowerCase()) return;
    
    const truetype = typeof variable === "object" ? variable.name : typeof variable;
    throw new TypeError(`Argument of type '${truetype}' is not assignable to parameter of type '${type.name.toLowerCase()}'.`);
}
export function inferType(variable) {
    return typeof variable === "object" ? variable.constructor.name : typeof variable;
}

export function getCookie(name) {
    for (let cookie of document.cookie.split(";")) {
        const [key, value] = cookie.trim().split("=");
        if (key === name) {
            return value;
        }
    }
    return false;
}