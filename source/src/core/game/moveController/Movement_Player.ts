import { MovementBase } from "./MovementBase";

export class Movement_Player extends MovementBase {
    private _mousePressed: boolean;
    private _lastMousePoint: Laya.Vector2 = new Laya.Vector2();

    protected override onEnable() {
        this.speedOrigin = 5;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
    }

    protected override onDisable() {
        Laya.stage.offAllCaller(this);
    }

    private onMouseDown(): void {
        this._mousePressed = true;
        this._lastMousePoint.setValue(Laya.stage.mouseX, Laya.stage.mouseY);
    }

    private onMouseMove(): void {
        if (!this._mousePressed) return;
        const { mouseX, mouseY } = Laya.stage;
        this._moveDir.setValue(mouseX - this._lastMousePoint.x, mouseY - this._lastMousePoint.y);
        this._moveDir.normalize().scale(this.speed);
        // this.lastMousePoint.setValue(Laya.stage.mouseX, Laya.stage.mouseY);
    }

    private onMouseUp(): void {
        this._mousePressed = false;
        this._moveDir.setValue(0, 0);
    }
}