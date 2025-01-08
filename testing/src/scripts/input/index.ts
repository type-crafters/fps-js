export enum ActionCode {
    MoveForward,
    MoveBackward,
    MoveLeft,
    MoveRight,
    Sprint,
    Crouch,
    Prone,
    Fire,
    ADS,
    NextWeapon,
    PreviousWeapon,
    LethalEquipment,
    TacticalEquipment,
    Interact,
    Menu,
    Accept
} 

export class InputAction {

}

export class InputBinding {

}

export interface ActionBinding {
    code: ActionCode;
    action: InputAction;
    binding: InputBinding;
}

export class ActionSet {
    private readonly _set: Set<ActionBinding> = new Set<ActionBinding>([
        { code: ActionCode.MoveForward, action: new InputAction(), binding: new InputBinding() },

    ]);
}