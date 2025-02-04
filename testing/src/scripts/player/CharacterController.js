import { inferType, typecheck } from "@lib/index";
import Player from "@scripts/player/Player";

export default class CharacterController {
    player;
    actions;
    constructor(player) {
        typecheck(player, Player);
        this.player = player;
        this.actions = player.input.actions;
    }

    onMoveForwardPress = () => {
        console.log("STARTED MOVING FORWARD");
    }

    onMoveForwardHold = () => {
        console.log("MOVING FORWARD");
    }

    onMoveForwardRelease = () => {
        console.log("STOPPED MOVING FORWARD");
    }

    onInitialize() {
        this.actions.moveForward.press.subscribe(this.onMoveForwardPress);
        this.actions.moveForward.hold.subscribe(this.onMoveForwardHold);
        this.actions.moveForward.release.subscribe(this.onMoveForwardRelease);
    }

    onInitialize() {
        this.actions.moveForward.press.unsubscribe(this.onMoveForwardPress);
        this.actions.moveForward.hold.unsubscribe(this.onMoveForwardHold);
        this.actions.moveForward.release.unsubscribe(this.onMoveForwardRelease);
    }
}