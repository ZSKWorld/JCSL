import { Camp } from "../core/GameInterface";
import { GameObject } from "../core/GameObject";

export abstract class WeaponBase extends GameObject {
    protected _speed: number = 1;
    protected _level: number = 1;
    protected _range: number = 1;
    protected _duration:number = 0;
    protected _coolDown: number = Number.MAX_SAFE_INTEGER;

    get speed(): number { return this._speed; }
    set speed(value: number) { this._speed = value; }
    get level() { return this._level; }
    set level(value: number) { this._level = value; }

    setCamp(camp: Camp) { this._camp = camp; }

    override onAwake(){
        super.onAwake();
        this._camp = Camp.Player;
    }

    override recover() {
        super.recover();
        this._speed = 1;
        this._level = 1;
        this._range = 1;
        this._duration = 0;
        this._coolDown = Number.MAX_SAFE_INTEGER;
    }
}