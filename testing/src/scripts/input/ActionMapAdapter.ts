import { AdapterError } from "../error";
import { IActionMap } from "./IActionMap";

export class ActionMapAdapter<T> {
    private _actionMap: string[] = Object.keys({} as IActionMap<T>);
    public fromJsonString(json: string): IActionMap<T> {
        const data = JSON.parse(json);

        if(!data || typeof data !== "object" || Array.isArray(data)) {
            throw new AdapterError(`Type ${typeof data} is not mappable to ${typeof this._actionMap}`);
        }

        const missing = Object.keys(this._actionMap).filter(key => !Object.keys(data).includes(key));
        const extra = Object.keys(data).filter(key => this._actionMap.includes(key));
        
        if(missing.length > 0) {
            throw new AdapterError(`Type '${typeof data}' is not assignable to type 'ActionMap<>'. Properties '${missing.join("', '")}' are missing in type '${typeof data}'`);
        }
        if(extra.length > 0) {
            throw new AdapterError(`Type '${typeof data}' is not assignable to type ''. Properties '${extra.join("', '")}' are not defined in type '${typeof this._actionMap}'`);
        }

        return {} as IActionMap<T>;
    }
}