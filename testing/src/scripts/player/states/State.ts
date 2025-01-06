import { Player } from "..";

export abstract class State {
    public abstract player: Player;
    public abstract transitions: Set<State>;
    public abstract onEnter(): void;
    public abstract onExit(): void;
    public abstract onAnimationFrame(): void;
}