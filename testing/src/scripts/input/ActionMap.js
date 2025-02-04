import AdapterError from "@error/AdapterError";
import { inferType, typecheck } from "@lib/index";

export default class ActionMap {
    moveForward;
    moveBackward;
    moveLeft;
    moveRight;
    jump;
    crouch;
    prone;
    sprint;
    reload;
    fire;
    ads;
    throwLethal;
    throwTactical;
    nextWeapon;
    previousWeapon;
    melee;
    interact;
    openMenu;
    accept
    constructor({
        moveForward,
        moveBackward,
        moveLeft,
        moveRight,
        jump,
        crouch,
        prone,
        sprint,
        reload,
        fire,
        ads,
        throwLethal,
        throwTactical,
        nextWeapon,
        previousWeapon,
        melee,
        interact,
        openMenu,
        accept
    }) {
        this.moveForward = moveForward;
        this.moveBackward = moveBackward;
        this.moveLeft = moveLeft;
        this.moveRight = moveRight;
        this.jump = jump;
        this.crouch = crouch;
        this.prone = prone;
        this.sprint = sprint;
        this.reload = reload;
        this.fire = fire;
        this.ads = ads;
        this.throwLethal = throwLethal;
        this.throwTactical = throwTactical;
        this.nextWeapon = nextWeapon;
        this.previousWeapon = previousWeapon;
        this.melee = melee;
        this.interact = interact;
        this.openMenu = openMenu;
        this.accept = accept;
    }

    /**
     * @param {string} key
     */
    has(key) {
        typecheck(key, String);
        return Object.keys(this).includes(key);
    }

    /**
     * @param {string} key
     */
    get(key) {
        if (typeof key !== "string") {
            throw new TypeError(`Argument of type '${inferType(key)}' is not assignable to parameter of type 'string'.`);
        }
        return Object.keys(this).includes(key) ? this[key] : undefined;
    }

    /**
     * @param {string} key
     */
    delete(key) {
        if (typeof key !== "string") {
            throw new TypeError(`Argument of type '${inferType(key)}' is not assignable to parameter of type 'string'.`);
        }
        this[key] = undefined; 
    }

    clear() {
        Object.keys(this).forEach(key => this[key] = undefined);
    }

    keys() {
        return new Set(Object.keys(this));
    }

    values() {
        return new Set(Object.values(this));
    }

    parse(json) {
        try {
            const parsed = JSON.parse(json);
            const missingProps = Object.keys(this).filter(key => !Object.keys(parsed).includes(key));
            if(missingProps.length > 0) {
                throw new AdapterError(`Parsed JSON is missing the following properties from 'ActionMap': '${missingProps.join("', '")}'.`);
            }
            const extraProps = Object.keys(parsed).filter(key => !Object.keys(this).includes(key));
            if(extraProps.length > 0) {
                throw new AdapterError(`Type 'ActionMap' does not define the following properties found in parsed JSON: '${extraProps.join("', '")}'.`);
            }

            for(const key in parsed) {
                const value = parsed[key];
                if(!isNaN(Number(value)) && String(Number(value)) === value) {
                    parsed[key] = Number(value);
                } else if(["true", "false"].includes(value)) {
                    parsed[key] = value === "true";
                }
            }
            return new ActionMap({...parsed});
        } catch(error) {
            if(error instanceof SyntaxError) {
                throw new AdapterError("Provided string is not valid JSON.");
            }
        }
    }

    stringify() {
        return JSON.stringify(this);
    }
}