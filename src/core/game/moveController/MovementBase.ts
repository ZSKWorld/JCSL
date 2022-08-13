import { Vector2 } from "../../libs/math/Vector2";
import { GameObject } from "../core/GameObject";

export abstract class  MovementBase {
    private static _instance = new Map<string, MovementBase[]>();
    static get instances() { return this._instance; }

    owner: GameObject;
    name: string;
    public collisionDir:Vector2;
    protected _moveEnable: boolean = true;
    /** 原始速度 */
    private _speedOrigin: number = 0;
    /** 当前速度 */
    private _speed: number = 0;
    protected _speedRecoverable: boolean = false;
    /** 速度回复速率 0 - 1 */
    protected _speedRecoverRate: number = 0.1;
    /** 移动方向 */
    protected _moveDir: Vector2 = new Vector2();
    get speedOrigin() { return this._speedOrigin; }
    set speedOrigin(value: number) {
        this._speedOrigin = value;
        this._speed = value;
    }
    get speed() { return this._speed; }
    set speed(value: number) { this._speed = Math.min(this._speedOrigin, value); }
    get moveDir() { return this._moveDir; }

    constructor() {
        this.name = this[ "__proto__" ].constructor.name;
        if (MovementBase._instance.has(this.name) == false)
            MovementBase.instances.set(this.name, []);
        MovementBase._instance.get(this.name).push(this);
    }

    awake() {
        this.onAwake();
    }

    enable() {
        this._speed = this._speedOrigin;
        this.onEnable();
    }

    update() {
        if (!this.owner.visible) return;
        if (this._speedRecoverable) {
            this.speed += this._speedOrigin * this._speedRecoverRate;
            this._speedRecoverable = this._speed == this._speedOrigin;
        }
        this.onUpdate();
        this.DoMove();
    }

    disable() {
        this._moveEnable = true;
        this._speedOrigin = 0;
        this._speed = 0;
        this._moveDir.setValue(0, 0);
        this.collisionDir && this.collisionDir.setValue(0, 0);
        this.onDisable();
    }
    protected DoMove() {
        if (!this._moveEnable) return;
        if (!this._speed) return;
        const { owner: self, _moveDir } = this;
        self.pos(self.x + _moveDir.x, self.y + _moveDir.y, true);
    }
    protected onAwake() { }
    protected onEnable() { }
    protected onUpdate() { }
    protected onDisable() { }
}
windowImmit("MovementBase", MovementBase);