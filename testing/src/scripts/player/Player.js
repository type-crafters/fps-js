import SystemBase from "@scripts/SystemBase";
import CharacterController from "./CharacterController";
import { InputSystem } from "@scripts/input/index";
import { typecheck } from "@/lib/index";

export default class Player extends SystemBase {
    input;
    controller;

    constructor(input) {
        super();
        if (input) {
            typecheck(input, InputSystem);
        }
        this.input = new InputSystem();
        this.controller = new CharacterController(this);
        this.onInitialize();
    }

    onInitialize() {
        this.input.onInitialize();
        this.controller.onInitialize();
    }

    onAnimationFrame() {
        this.input.onAnimationFrame();
        this.controller.onAnimationFrame();
    }
    
    onCleanup() {
        this.input.onCleanup();
        this.controller.onCleanup();
    }
}