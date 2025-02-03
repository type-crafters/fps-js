export function inferType(variable) {
    return typeof variable === "object" ? variable.constructor.name : typeof variable;
}

export function getCookie(name) {
    for(let cookie of document.cookie.split(";")){
        const [key, value] = cookie.trim().split("=");
        if(key === name) {
            return value;
        }
    }
    return false;
}