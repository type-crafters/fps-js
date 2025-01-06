import { Player } from "../Player";
import { StateKey } from "../StateKey";
import { State } from "./State";

export class RunningState extends State {
    public player: Player;
    public transitions: Set<State>;

    constructor(player: Player) {
        super();
        this.player = player;
        this.transitions = new Set([
            this.player.states.get(StateKey.Idle)!,
        ]);
    }

    public onEnter(): void {
        console.log("RunningState entered");
    }

    public onExit(): void {
        console.log("RunningState exited");
    }
 
    public onAnimationFrame(): void {
        console.log("RunningState frame");
    }
}