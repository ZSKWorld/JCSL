import { Vector2 } from "../../libs/math/Vector2";
import { GameObject } from "../core/GameObject";

export abstract class RoleBase extends GameObject {
    protected _hp: number = 0;
    protected _maxHp: number = 0;
    protected _atk: number = 0;

    get isDead() { return this._hp < 0; }

    getHurt(hurt: number) {
        this._hp = Math.max(this._hp - hurt, 0);
        this.onHurt(hurt);
        this._hp <= 0 && this.dead();
    }

    override recover() {
        super.recover();
        this._hp = 0;
        this._maxHp = 0;
        this._atk = 0;
    }

    private dead(){
        this.onDead();
        this.recover();
    }
    protected abstract onHurt(hurt: number): void;
    protected abstract onDead(): void;
}