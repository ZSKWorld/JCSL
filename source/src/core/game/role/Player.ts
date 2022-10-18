import { Logger } from "../../libs/utils/Logger";
import { Camp } from "../core/GameInterface";
import { GameObject } from "../core/GameObject";
import { Movement_Player } from "../moveController/Movement_Player";
import { WeaponBase } from "../weapon/WeaponBase";
import { RoleBase } from "./RoleBase";

const logger = Logger.Create("PlayerController", true);
class Player extends RoleBase {
    private _phSp: Laya.Sprite;
    private _weapons: WeaponBase[] = [];

    override onAwake() {
        super.onAwake();
        this._camp = Camp.Player;
        this.anchor(0.5, 0.5);
        this._phSp = new Laya.Sprite();
        this._phSp.size(100, 10);
        this._phSp.graphics.drawRect(0, 0, 100, 10, "#ff0000");
        this.addChild(this._phSp);
        this.zOrder = 999;
    }

    override recover() {
        super.recover();
        this._weapons.forEach(v => v.recover());
        this._weapons.length = 0;
    }

    addWeapon(weapon: WeaponBase) {
        weapon.setCamp(this._camp);
        this._weapons.push(weapon);
        this.addChild(weapon);
        weapon.pos(this.width / 2, this.height / 2, true);
    }

    override onTriggerEnter(other: GameObject) { }

    override onTriggerStay(other: GameObject) { }

    override onTriggerExit(other: GameObject) { }

    protected onHurt(hurt: number): void {

    }

    protected onDead(): void {

    }

    protected override onResize(): void {
        super.onResize();
        if (this._phSp)
            this._phSp.pos((this.width - 100) / 2, -10, true);
    }
}

export const player = new Player();
player.moveCtrl = new Movement_Player();