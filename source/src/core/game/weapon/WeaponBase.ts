import { Camp } from "../core/GameInterface";
import { GameObject } from "../core/GameObject";

export abstract class WeaponBase extends GameObject {
    protected _level: number = 1;
    protected _range: number = 1;
    protected _duration: number = 0;
    protected _coolDown: number = Number.MAX_SAFE_INTEGER;

    get level() { return this._level; }
    set level(value: number) { this._level = value; }

    setCamp(camp: Camp) { this._camp = camp; }

    override onAwake() {
        super.onAwake();
        this._camp = Camp.Player;
    }

    override onEnable() {
        super.onEnable();
        if (this.onUpdate != WeaponBase.prototype.onUpdate)
            Laya.timer.frameLoop(1, this, this.onUpdate);
    }

    override onDisable() {
        super.onDisable();
        Laya.timer.clearAll(this);
    }

    override recover() {
        super.recover();
        this._level = 1;
        this._range = 1;
        this._duration = 0;
        this._coolDown = Number.MAX_SAFE_INTEGER;
    }

    protected onUpdate(): void { }
}