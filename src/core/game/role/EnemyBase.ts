import { Vector2 } from "../../libs/math/Vector2";
import { Logger } from "../../libs/utils/Logger";
import { Camp } from "../core/GameInterface";
import { player } from "./Player";
import { RoleBase } from "./RoleBase";

const logger = Logger.Create("EnemyBase").setEnable(true);

export abstract class EnemyBase extends RoleBase {
    private updateMoveDir = false;
    protected _collisionEnemyEnable = true;
    public collisionDir = new Vector2();
    get collisionEnemyEnable() { return this._collisionEnemyEnable; }
    override get moveDir(): Readonly<Vector2> {
        if (!this.updateMoveDir) {
            this.updateMoveDir = true;
            const { x: px, y: py } = player;
            this._moveDir.setValue(px - this.x, py - this.y).normalize().scale(this._moveSpeed);
        }
        return this._moveDir;
    }

    override onAwake() {
        super.onAwake();
        this._camp = Camp.Enemy;
    }

    override update() {
        this.onUpdate();
        this.updateMoveDir = false;
        this.collisionDir.setValue(0, 0);
    }

    override recover() {
        super.recover();
        this.updateMoveDir = false;
    }
}