import { Vector2 } from "../../libs/math/Vector2";
import { GameObject } from "../core/GameObject";

export abstract class RoleBase extends GameObject {
    protected _hp: number = 0;
    protected _maxHp: number = 0;
    protected _atk: number = 0;
    protected _moveSpeed: number = 0;
    protected _moveDir: Vector2 = new Vector2();

    get moveDir(): Readonly<Vector2> { return this._moveDir; }

    update() {
        this.onUpdate();
    }

    getHurt(hurt: number) {
        this._hp = Math.max(this._hp - hurt, 0);
    }

    override recover() {
        super.recover();
        this._hp = 0;
        this._maxHp = 0;
        this._atk = 0;
        this._moveSpeed = 0;
        this._moveDir.setValue(0, 0);
    }

    protected abstract onUpdate(): void;
}