import { State } from "./states/State";
import { StateKey } from "./StateKey";
import { Player } from ".";

export class StateContext {
    private _player: Player;
    private _current: State;

    constructor(player: Player) {
        this._player = player;
        this._current = this._player.states.get(StateKey.Idle)!;
        this._current.onEnter();
    }

    public switchState(target: StateKey): void {
        if (this._current.transitions.has(this._player.states.get(target)!)) {
            this._current.onExit();
            this._current = this._player.states.get(target)!;
            this._current.onEnter();
        }
    }

    public onAnimationFrame(): void {
        this._current.onAnimationFrame();
    }
}