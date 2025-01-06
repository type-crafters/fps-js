import { InputListener } from ".";

interface LightDarkIcons {
    light: string;
    dark: string;
}

export class InputBinding {
    public code: string;
    public icons: LightDarkIcons;
    public listener: InputListener;
    public static readonly MouseWheelUp = "MouseWheelUp";
    public static readonly MouseWheelDown = "MouseWheelDown";

    constructor(code: string, icons: LightDarkIcons, listener: InputListener) {
        this.code = code;
        this.icons = icons;
        this.listener = listener;
    }
}

