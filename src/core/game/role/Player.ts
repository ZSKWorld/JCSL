import { Vector2 } from "../../libs/math/Vector2";
import { Logger } from "../../libs/utils/Logger";
import { Camp } from "../core/GameInterface";
import { GameObject } from "../core/GameObject";
import { WeaponBase } from "../weapon/WeaponBase";
import { RoleBase } from "./RoleBase";

const logger = Logger.Create("PlayerController").setEnable(true);
class Player extends RoleBase {
    private mousePressed: boolean;
    private lastMousePoint: Vector2 = new Vector2();
    private phSp: Laya.Sprite;

    private weapons: WeaponBase[] = [];

    override onAwake() {
        this._camp = Camp.Player;
        this.anchor(0.5, 0.5);
        this.phSp = new Laya.Sprite();
        this.phSp.size(100, 10);
        this.phSp.graphics.drawRect(0, 0, 100, 10, "#ff0000");
        this.addChild(this.phSp);
        this.zOrder = 999;
        super.onAwake();
    }

    override onEnable(): void {
        this._moveSpeed = 5;
        this.onMouseUp();
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
    }

    override onDisable(): void {
        Laya.stage.offAllCaller(this);
    }

    override recover() {
        super.recover();
        this.mousePressed = false;
        this.lastMousePoint.setValue(0, 0);
        this.weapons.forEach(v => v.recover());
        this.weapons.length = 0;
    }

    addWeapon(weapon: WeaponBase) {
        this.weapons.push(weapon);
        this.addChild(weapon);
        weapon.pos(this.width / 2, this.height / 2, true);
    }

    override onTriggerEnter(other: GameObject) {

    }
    override onTriggerStay(other: GameObject) {

    }
    override onTriggerExit(other: GameObject) {

    }

    protected override onResize(): void {
        super.onResize();
        if (this.phSp)
            this.phSp.pos((this.width - 100) / 2, -10, true);
    }

    protected onUpdate(): void {
        const { x, y } = this;
        const { x: mx, y: my } = this._moveDir;
        this.pos(x + mx, y + my, true);
    }

    private onMouseDown(): void {
        this.mousePressed = true;
        this.lastMousePoint.setValue(Laya.stage.mouseX, Laya.stage.mouseY);
    }

    private onMouseMove(): void {
        if (!this.mousePressed) return;
        const { mouseX, mouseY } = Laya.stage;
        this._moveDir.setValue(mouseX - this.lastMousePoint.x, mouseY - this.lastMousePoint.y)
            .normalize().scale(this._moveSpeed);
        // this.lastMousePoint.setValue(Laya.stage.mouseX, Laya.stage.mouseY);
    }

    private onMouseUp(): void {
        this.mousePressed = false;
        this._moveDir.setValue(0, 0);
    }
}

export const player = new Player();