import { InputListener } from "@scripts/input";

interface LightDarkIcons {
    light: string | URL;
    dark: string | URL;
}

export class InputBinding {
    public code: string;
    public icons: LightDarkIcons;
    public listener: InputListener;

    constructor(code: string, icons: LightDarkIcons, listener: InputListener) {
        this.code = code;
        this.icons = icons;
        this.listener = listener;
    }
}
