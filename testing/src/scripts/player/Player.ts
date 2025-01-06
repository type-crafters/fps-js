import { InputSystem } from "../input";
import { StateContext, StateKey } from ".";
import { IdleState, RunningState, State } from "./states";

export class Player {
    public input: InputSystem;
    public context: StateContext;

    public states: Map<StateKey, State> = new Map([
        [StateKey.Idle, new IdleState(this)],
        [StateKey.Running, new RunningState(this)]
    ]);

    public pressMoveForward = (): void => {
        this.context.switchState(StateKey.Running);
    };
    
    public releaseMoveForward = (): void => {
        this.context.switchState(StateKey.Idle);
    };
    

    constructor(input: InputSystem) {
        this.input = input;
        this.context = new StateContext(this);

        this.input.enableAll();
        
        this.input.actions.MoveForward.press.subscribe(this.pressMoveForward);
        this.input.actions.MoveForward.release.subscribe(this.releaseMoveForward);
    }

    public onAnimationFrame() {
        this.context.onAnimationFrame();
    }
}