import { Actions, InputAction, InputBinding, InputListener, Keys } from "@scripts/input";


export interface IActionBinding {
    action: InputAction;
    binding: InputBinding;
}

export class KeyBindSystem {
    public static readonly mappings: Map<Keys, InputBinding> = new Map([
        [Keys.Mouse0, new InputBinding("0", { light: "/Icons/1.0/Light/0", dark: "/Icons/1.0/Dark/0" }, InputListener.Mouse)],
        [Keys.Mouse1, new InputBinding("1", { light: "/Icons/1.0/Light/1", dark: "/Icons/1.0/Dark/1" }, InputListener.Mouse)],
        [Keys.Mouse2, new InputBinding("2", { light: "/Icons/1.0/Light/2", dark: "/Icons/1.0/Dark/2" }, InputListener.Mouse)],
        [Keys.Mouse3, new InputBinding("3", { light: "/Icons/1.0/Light/3", dark: "/Icons/1.0/Dark/3" }, InputListener.Mouse)],
        [Keys.Mouse4, new InputBinding("4", { light: "/Icons/1.0/Light/4", dark: "/Icons/1.0/Dark/4" }, InputListener.Mouse)],
        [Keys.Escape, new InputBinding("Escape", { light: "/Icons/1.0/Light/Escape", dark: "/Icons/1.0/Dark/Escape" }, InputListener.Keyboard)],
        [Keys.F1, new InputBinding("F1", { light: "/Icons/1.0/Light/F1", dark: "/Icons/1.0/Dark/F1" }, InputListener.Keyboard)],
        [Keys.F2, new InputBinding("F2", { light: "/Icons/1.0/Light/F2", dark: "/Icons/1.0/Dark/F2" }, InputListener.Keyboard)],
        [Keys.F4, new InputBinding("F4", { light: "/Icons/1.0/Light/F4", dark: "/Icons/1.0/Dark/F4" }, InputListener.Keyboard)],
        [Keys.F5, new InputBinding("F5", { light: "/Icons/1.0/Light/F5", dark: "/Icons/1.0/Dark/F5" }, InputListener.Keyboard)],
        [Keys.F6, new InputBinding("F6", { light: "/Icons/1.0/Light/F6", dark: "/Icons/1.0/Dark/F6" }, InputListener.Keyboard)],
        [Keys.F7, new InputBinding("F7", { light: "/Icons/1.0/Light/F7", dark: "/Icons/1.0/Dark/F7" }, InputListener.Keyboard)],
        [Keys.F8, new InputBinding("F8", { light: "/Icons/1.0/Light/F8", dark: "/Icons/1.0/Dark/F8" }, InputListener.Keyboard)],
        [Keys.F9, new InputBinding("F9", { light: "/Icons/1.0/Light/F9", dark: "/Icons/1.0/Dark/F9" }, InputListener.Keyboard)],
        [Keys.F10, new InputBinding("F10", { light: "/Icons/1.0/Light/F10", dark: "/Icons/1.0/Dark/F10" }, InputListener.Keyboard)],
        [Keys.F12, new InputBinding("F12", { light: "/Icons/1.0/Light/F12", dark: "/Icons/1.0/Dark/F12" }, InputListener.Keyboard)],
        [Keys.Backquote, new InputBinding("Backquote", { light: "/Icons/1.0/Light/Backquote", dark: "/Icons/1.0/Dark/Backquote" }, InputListener.Keyboard)],
        [Keys.Digit1, new InputBinding("Digit1", { light: "/Icons/1.0/Light/Digit1", dark: "/Icons/1.0/Dark/Digit1" }, InputListener.Keyboard)],
        [Keys.Digit2, new InputBinding("Digit2", { light: "/Icons/1.0/Light/Digit2", dark: "/Icons/1.0/Dark/Digit2" }, InputListener.Keyboard)],
        [Keys.Digit3, new InputBinding("Digit3", { light: "/Icons/1.0/Light/Digit3", dark: "/Icons/1.0/Dark/Digit3" }, InputListener.Keyboard)],
        [Keys.Digit4, new InputBinding("Digit4", { light: "/Icons/1.0/Light/Digit4", dark: "/Icons/1.0/Dark/Digit4" }, InputListener.Keyboard)],
        [Keys.Digit5, new InputBinding("Digit5", { light: "/Icons/1.0/Light/Digit5", dark: "/Icons/1.0/Dark/Digit5" }, InputListener.Keyboard)],
        [Keys.Digit6, new InputBinding("Digit6", { light: "/Icons/1.0/Light/Digit6", dark: "/Icons/1.0/Dark/Digit6" }, InputListener.Keyboard)],
        [Keys.Digit7, new InputBinding("Digit7", { light: "/Icons/1.0/Light/Digit7", dark: "/Icons/1.0/Dark/Digit7" }, InputListener.Keyboard)],
        [Keys.Digit8, new InputBinding("Digit8", { light: "/Icons/1.0/Light/Digit8", dark: "/Icons/1.0/Dark/Digit8" }, InputListener.Keyboard)],
        [Keys.Digit9, new InputBinding("Digit9", { light: "/Icons/1.0/Light/Digit9", dark: "/Icons/1.0/Dark/Digit9" }, InputListener.Keyboard)],
        [Keys.Digit0, new InputBinding("Digit0", { light: "/Icons/1.0/Light/Digit0", dark: "/Icons/1.0/Dark/Digit0" }, InputListener.Keyboard)],
        [Keys.Minus, new InputBinding("Minus", { light: "/Icons/1.0/Light/Minus", dark: "/Icons/1.0/Dark/Minus" }, InputListener.Keyboard)],
        [Keys.Equal, new InputBinding("Equal", { light: "/Icons/1.0/Light/Equal", dark: "/Icons/1.0/Dark/Equal" }, InputListener.Keyboard)],
        [Keys.Backspace, new InputBinding("Backspace", { light: "/Icons/1.0/Light/Backspace", dark: "/Icons/1.0/Dark/Backspace" }, InputListener.Keyboard)],
        [Keys.Tab, new InputBinding("Tab", { light: "/Icons/1.0/Light/Tab", dark: "/Icons/1.0/Dark/Tab" }, InputListener.Keyboard)],
        [Keys.KeyQ, new InputBinding("KeyQ", { light: "/Icons/1.0/Light/KeyQ", dark: "/Icons/1.0/Dark/KeyQ" }, InputListener.Keyboard)],
        [Keys.KeyW, new InputBinding("KeyW", { light: "/Icons/1.0/Light/KeyW", dark: "/Icons/1.0/Dark/KeyW" }, InputListener.Keyboard)],
        [Keys.KeyE, new InputBinding("KeyE", { light: "/Icons/1.0/Light/KeyE", dark: "/Icons/1.0/Dark/KeyE" }, InputListener.Keyboard)],
        [Keys.KeyR, new InputBinding("KeyR", { light: "/Icons/1.0/Light/KeyR", dark: "/Icons/1.0/Dark/KeyR" }, InputListener.Keyboard)],
        [Keys.KeyT, new InputBinding("KeyT", { light: "/Icons/1.0/Light/KeyT", dark: "/Icons/1.0/Dark/KeyT" }, InputListener.Keyboard)],
        [Keys.KeyY, new InputBinding("KeyY", { light: "/Icons/1.0/Light/KeyY", dark: "/Icons/1.0/Dark/KeyY" }, InputListener.Keyboard)],
        [Keys.KeyU, new InputBinding("KeyU", { light: "/Icons/1.0/Light/KeyU", dark: "/Icons/1.0/Dark/KeyU" }, InputListener.Keyboard)],
        [Keys.KeyI, new InputBinding("KeyI", { light: "/Icons/1.0/Light/KeyI", dark: "/Icons/1.0/Dark/KeyI" }, InputListener.Keyboard)],
        [Keys.KeyO, new InputBinding("KeyO", { light: "/Icons/1.0/Light/KeyO", dark: "/Icons/1.0/Dark/KeyO" }, InputListener.Keyboard)],
        [Keys.KeyP, new InputBinding("KeyP", { light: "/Icons/1.0/Light/KeyP", dark: "/Icons/1.0/Dark/KeyP" }, InputListener.Keyboard)],
        [Keys.BracketLeft, new InputBinding("BracketLeft", { light: "/Icons/1.0/Light/BracketLeft", dark: "/Icons/1.0/Dark/BracketLeft" }, InputListener.Keyboard)],
        [Keys.BracketRight, new InputBinding("BracketRight", { light: "/Icons/1.0/Light/BracketRight", dark: "/Icons/1.0/Dark/BracketRight" }, InputListener.Keyboard)],
        [Keys.Backslash, new InputBinding("Backslash", { light: "/Icons/1.0/Light/Backslash", dark: "/Icons/1.0/Dark/Backslash" }, InputListener.Keyboard)],
        [Keys.CapsLock, new InputBinding("CapsLock", { light: "/Icons/1.0/Light/CapsLock", dark: "/Icons/1.0/Dark/CapsLock" }, InputListener.Keyboard)],
        [Keys.KeyA, new InputBinding("KeyA", { light: "/Icons/1.0/Light/KeyA", dark: "/Icons/1.0/Dark/KeyA" }, InputListener.Keyboard)],
        [Keys.KeyS, new InputBinding("KeyS", { light: "/Icons/1.0/Light/KeyS", dark: "/Icons/1.0/Dark/KeyS" }, InputListener.Keyboard)],
        [Keys.KeyD, new InputBinding("KeyD", { light: "/Icons/1.0/Light/KeyD", dark: "/Icons/1.0/Dark/KeyD" }, InputListener.Keyboard)],
        [Keys.KeyF, new InputBinding("KeyF", { light: "/Icons/1.0/Light/KeyF", dark: "/Icons/1.0/Dark/KeyF" }, InputListener.Keyboard)],
        [Keys.KeyG, new InputBinding("KeyG", { light: "/Icons/1.0/Light/KeyG", dark: "/Icons/1.0/Dark/KeyG" }, InputListener.Keyboard)],
        [Keys.KeyH, new InputBinding("KeyH", { light: "/Icons/1.0/Light/KeyH", dark: "/Icons/1.0/Dark/KeyH" }, InputListener.Keyboard)],
        [Keys.KeyJ, new InputBinding("KeyJ", { light: "/Icons/1.0/Light/KeyJ", dark: "/Icons/1.0/Dark/KeyJ" }, InputListener.Keyboard)],
        [Keys.KeyK, new InputBinding("KeyK", { light: "/Icons/1.0/Light/KeyK", dark: "/Icons/1.0/Dark/KeyK" }, InputListener.Keyboard)],
        [Keys.KeyL, new InputBinding("KeyL", { light: "/Icons/1.0/Light/KeyL", dark: "/Icons/1.0/Dark/KeyL" }, InputListener.Keyboard)],
        [Keys.Semicolon, new InputBinding("Semicolon", { light: "/Icons/1.0/Light/Semicolon", dark: "/Icons/1.0/Dark/Semicolon" }, InputListener.Keyboard)],
        [Keys.Quote, new InputBinding("Quote", { light: "/Icons/1.0/Light/Quote", dark: "/Icons/1.0/Dark/Quote" }, InputListener.Keyboard)],
        [Keys.Enter, new InputBinding("Enter", { light: "/Icons/1.0/Light/Enter", dark: "/Icons/1.0/Dark/Enter" }, InputListener.Keyboard)],
        [Keys.ShiftLeft, new InputBinding("ShiftLeft", { light: "/Icons/1.0/Light/ShiftLeft", dark: "/Icons/1.0/Dark/ShiftLeft" }, InputListener.Keyboard)],
        [Keys.KeyZ, new InputBinding("KeyZ", { light: "/Icons/1.0/Light/KeyZ", dark: "/Icons/1.0/Dark/KeyZ" }, InputListener.Keyboard)],
        [Keys.KeyX, new InputBinding("KeyX", { light: "/Icons/1.0/Light/KeyX", dark: "/Icons/1.0/Dark/KeyX" }, InputListener.Keyboard)],
        [Keys.KeyC, new InputBinding("KeyC", { light: "/Icons/1.0/Light/KeyC", dark: "/Icons/1.0/Dark/KeyC" }, InputListener.Keyboard)],
        [Keys.KeyV, new InputBinding("KeyV", { light: "/Icons/1.0/Light/KeyV", dark: "/Icons/1.0/Dark/KeyV" }, InputListener.Keyboard)],
        [Keys.KeyB, new InputBinding("KeyB", { light: "/Icons/1.0/Light/KeyB", dark: "/Icons/1.0/Dark/KeyB" }, InputListener.Keyboard)],
        [Keys.KeyN, new InputBinding("KeyN", { light: "/Icons/1.0/Light/KeyN", dark: "/Icons/1.0/Dark/KeyN" }, InputListener.Keyboard)],
        [Keys.KeyM, new InputBinding("KeyM", { light: "/Icons/1.0/Light/KeyM", dark: "/Icons/1.0/Dark/KeyM" }, InputListener.Keyboard)],
        [Keys.Comma, new InputBinding("Comma", { light: "/Icons/1.0/Light/Comma", dark: "/Icons/1.0/Dark/Comma" }, InputListener.Keyboard)],
        [Keys.Period, new InputBinding("Period", { light: "/Icons/1.0/Light/Period", dark: "/Icons/1.0/Dark/Period" }, InputListener.Keyboard)],
        [Keys.Slash, new InputBinding("Slash", { light: "/Icons/1.0/Light/Slash", dark: "/Icons/1.0/Dark/Slash" }, InputListener.Keyboard)],
        [Keys.ShiftRight, new InputBinding("ShiftRight", { light: "/Icons/1.0/Light/ShiftRight", dark: "/Icons/1.0/Dark/ShiftRight" }, InputListener.Keyboard)],
        [Keys.ControlLeft, new InputBinding("ControlLeft", { light: "/Icons/1.0/Light/ControlLeft", dark: "/Icons/1.0/Dark/ControlLeft" }, InputListener.Keyboard)],
        [Keys.AltLeft, new InputBinding("AltLeft", { light: "/Icons/1.0/Light/AltLeft", dark: "/Icons/1.0/Dark/AltLeft" }, InputListener.Keyboard)],
        [Keys.Space, new InputBinding("Space", { light: "/Icons/1.0/Light/Space", dark: "/Icons/1.0/Dark/Space" }, InputListener.Keyboard)],
        [Keys.AltRight, new InputBinding("AltRight", { light: "/Icons/1.0/Light/AltRight", dark: "/Icons/1.0/Dark/AltRight" }, InputListener.Keyboard)],
        [Keys.ContextMenu, new InputBinding("ContextMenu", { light: "/Icons/1.0/Light/ContextMenu", dark: "/Icons/1.0/Dark/ContextMenu" }, InputListener.Keyboard)],
        [Keys.ControlRight, new InputBinding("ControlRight", { light: "/Icons/1.0/Light/ControlRight", dark: "/Icons/1.0/Dark/ControlRight" }, InputListener.Keyboard)],
        [Keys.ScrollLock, new InputBinding("ScrollLock", { light: "/Icons/1.0/Light/ScrollLock", dark: "/Icons/1.0/Dark/ScrollLock" }, InputListener.Keyboard)],
        [Keys.Pause, new InputBinding("Pause", { light: "/Icons/1.0/Light/Pause", dark: "/Icons/1.0/Dark/Pause" }, InputListener.Keyboard)],
        [Keys.Insert, new InputBinding("Insert", { light: "/Icons/1.0/Light/Insert", dark: "/Icons/1.0/Dark/Insert" }, InputListener.Keyboard)],
        [Keys.Home, new InputBinding("Home", { light: "/Icons/1.0/Light/Home", dark: "/Icons/1.0/Dark/Home" }, InputListener.Keyboard)],
        [Keys.PageUp, new InputBinding("PageUp", { light: "/Icons/1.0/Light/PageUp", dark: "/Icons/1.0/Dark/PageUp" }, InputListener.Keyboard)],
        [Keys.Delete, new InputBinding("Delete", { light: "/Icons/1.0/Light/Delete", dark: "/Icons/1.0/Dark/Delete" }, InputListener.Keyboard)],
        [Keys.End, new InputBinding("End", { light: "/Icons/1.0/Light/End", dark: "/Icons/1.0/Dark/End" }, InputListener.Keyboard)],
        [Keys.PageDown, new InputBinding("PageDown", { light: "/Icons/1.0/Light/PageDown", dark: "/Icons/1.0/Dark/PageDown" }, InputListener.Keyboard)],
        [Keys.ArrowUp, new InputBinding("ArrowUp", { light: "/Icons/1.0/Light/ArrowUp", dark: "/Icons/1.0/Dark/ArrowUp" }, InputListener.Keyboard)],
        [Keys.ArrowLeft, new InputBinding("ArrowLeft", { light: "/Icons/1.0/Light/ArrowLeft", dark: "/Icons/1.0/Dark/ArrowLeft" }, InputListener.Keyboard)],
        [Keys.ArrowDown, new InputBinding("ArrowDown", { light: "/Icons/1.0/Light/ArrowDown", dark: "/Icons/1.0/Dark/ArrowDown" }, InputListener.Keyboard)],
        [Keys.ArrowRight, new InputBinding("ArrowRight", { light: "/Icons/1.0/Light/ArrowRight", dark: "/Icons/1.0/Dark/ArrowRight" }, InputListener.Keyboard)],
        [Keys.NumLock, new InputBinding("NumLock", { light: "/Icons/1.0/Light/NumLock", dark: "/Icons/1.0/Dark/NumLock" }, InputListener.Keyboard)],
        [Keys.NumpadDivide, new InputBinding("NumpadDivide", { light: "/Icons/1.0/Light/NumpadDivide", dark: "/Icons/1.0/Dark/NumpadDivide" }, InputListener.Keyboard)],
        [Keys.NumpadMultiply, new InputBinding("NumpadMultiply", { light: "/Icons/1.0/Light/NumpadMultiply", dark: "/Icons/1.0/Dark/NumpadMultiply" }, InputListener.Keyboard)],
        [Keys.NumpadSubtract, new InputBinding("NumpadSubtract", { light: "/Icons/1.0/Light/NumpadSubtract", dark: "/Icons/1.0/Dark/NumpadSubtract" }, InputListener.Keyboard)],
        [Keys.Numpad7, new InputBinding("Numpad7", { light: "/Icons/1.0/Light/Numpad7", dark: "/Icons/1.0/Dark/Numpad7" }, InputListener.Keyboard)],
        [Keys.Numpad8, new InputBinding("Numpad8", { light: "/Icons/1.0/Light/Numpad8", dark: "/Icons/1.0/Dark/Numpad8" }, InputListener.Keyboard)],
        [Keys.Numpad9, new InputBinding("Numpad9", { light: "/Icons/1.0/Light/Numpad9", dark: "/Icons/1.0/Dark/Numpad9" }, InputListener.Keyboard)],
        [Keys.NumpadAdd, new InputBinding("NumpadAdd", { light: "/Icons/1.0/Light/NumpadAdd", dark: "/Icons/1.0/Dark/NumpadAdd" }, InputListener.Keyboard)],
        [Keys.Numpad4, new InputBinding("Numpad4", { light: "/Icons/1.0/Light/Numpad4", dark: "/Icons/1.0/Dark/Numpad4" }, InputListener.Keyboard)],
        [Keys.Numpad5, new InputBinding("Numpad5", { light: "/Icons/1.0/Light/Numpad5", dark: "/Icons/1.0/Dark/Numpad5" }, InputListener.Keyboard)],
        [Keys.Numpad6, new InputBinding("Numpad6", { light: "/Icons/1.0/Light/Numpad6", dark: "/Icons/1.0/Dark/Numpad6" }, InputListener.Keyboard)],
        [Keys.Numpad1, new InputBinding("Numpad1", { light: "/Icons/1.0/Light/Numpad1", dark: "/Icons/1.0/Dark/Numpad1" }, InputListener.Keyboard)],
        [Keys.Numpad2, new InputBinding("Numpad2", { light: "/Icons/1.0/Light/Numpad2", dark: "/Icons/1.0/Dark/Numpad2" }, InputListener.Keyboard)],
        [Keys.Numpad3, new InputBinding("Numpad3", { light: "/Icons/1.0/Light/Numpad3", dark: "/Icons/1.0/Dark/Numpad3" }, InputListener.Keyboard)],
        [Keys.Numpad0, new InputBinding("Numpad0", { light: "/Icons/1.0/Light/Numpad0", dark: "/Icons/1.0/Dark/Numpad0" }, InputListener.Keyboard)],
        [Keys.NumpadDecimal, new InputBinding("NumpadDecimal", { light: "/Icons/1.0/Light/NumpadDecimal", dark: "/Icons/1.0/Dark/NumpadDecimal" }, InputListener.Keyboard)],
        [Keys.NumpadEnter, new InputBinding("NumpadEnter", { light: "/Icons/1.0/Light/NumpadEnter", dark: "/Icons/1.0/Dark/NumpadEnter" }, InputListener.Keyboard)],
    ]);
    private static readonly _defaultBindings: Map<Actions, IActionBinding> = new Map([
        [Actions.MoveForward, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.KeyW)! }],
        [Actions.MoveBackward, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.KeyS)! }],
        [Actions.MoveLeft, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.KeyA)! }],
        [Actions.MoveRight, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.KeyD)! }],
        [Actions.Sprint, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.ShiftLeft)! }],
        [Actions.Crouch, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.KeyC)! }],
        [Actions.Prone, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.ControlLeft)! }],
        [Actions.Fire, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.Mouse0)! }],
        [Actions.ADS, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.Mouse2)! }],
        [Actions.NextWeapon, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.Digit1)! }],
        [Actions.PreviousWeapon, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.Digit2)! }],
        [Actions.LethalEquipment, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.KeyG)! }],
        [Actions.TacticalEquipment, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.KeyQ)! }],
        [Actions.Melee, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.KeyE)! }],
        [Actions.Interact, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.KeyF)! }],
        [Actions.Menu, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.Escape)! }],
        [Actions.Accept, { action: new InputAction(), binding: KeyBindSystem.mappings.get(Keys.Enter)! }]
    ]);

    public get defaultBindings(): Map<Actions, IActionBinding> {
        return KeyBindSystem._defaultBindings;
    }

    public getLocalUserBindings(): Map<Actions, IActionBinding> {
        return new Map() as Map<Actions, IActionBinding>; // TODO add implementation
    }
    public getStoredUserBindings(): Map<Actions, IActionBinding> {
        return new Map() as Map<Actions, IActionBinding>; // TODO add implementation
    }

    public storeUserBindings(): void {
        // <% if user is guest: %>
        
        // <% else if user is logged_in: %>
    }
}
