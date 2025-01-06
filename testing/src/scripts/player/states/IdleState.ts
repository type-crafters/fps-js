import { Player, StateKey } from "..";
import { State } from ".";

export class IdleState extends State {
    public player: Player;
    public transitions: Set<State> = new Set();

    constructor(player: Player) {
        super();
        this.player = player;
        this.transitions = new Set([
            this.player.states.get(StateKey.Running)!,
        ]);
    }
    public onEnter(): void {
        console.log("IdleState entered");
    }

    public onExit(): void {
        console.log("IdleState exited");
    }

    public onAnimationFrame(): void {
        console.log("IdleState frame");
    }
}