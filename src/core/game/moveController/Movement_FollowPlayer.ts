import { Vector2 } from "../../libs/math/Vector2";
import { player } from "../role/Player";
import { MovementBase } from "./MovementBase";

export class Movement_FollowPlayer extends MovementBase {
    private _updateMoveDir = false;

    override get moveDir() {
        const { _moveDir, _updateMoveDir, owner } = this;
        if (!_updateMoveDir) {
            this._updateMoveDir = true;
            const { x: px, y: py } = player;
            _moveDir.setValue(px - owner.x, py - owner.y).normalize();
        }
        return _moveDir;
    }

    protected override onAwake(){
        this.collisionDir = new Vector2();
    }

    protected override onEnable() {
        this.speedOrigin = 1;
    }

    protected override onUpdate() {
        // const { x, y, moveDir, collisionDir } = this;
        // if (collisionDir.dot(moveDir) >= 0.98) return;
        // moveDir.scale(this._moveSpeed);
        // collisionDir.scale(moveDir.dot(collisionDir));
        // moveDir.sub(collisionDir);
        // this.pos(x + moveDir.x, y + moveDir.y, true);
        this._updateMoveDir = false;
        this.collisionDir.setValue(0, 0);
    }

    protected override onDisable() {
        this._updateMoveDir = false;
    }
}