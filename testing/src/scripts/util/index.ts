export function getCookie(name: string): string | false {
    for(const cookie of document.cookie.split(";")) {
        const [key, value] = cookie.split("=");
        if(name === key) {
            return decodeURIComponent(value);
        }
    }
    return false;
}