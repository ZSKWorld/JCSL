import { Logger } from "../../libs/utils/Logger";
import { EnemyBase } from "./EnemyBase";

const logger = Logger.Create("PlayerController").setEnable(true);

export class Enemy_Fllow extends EnemyBase {
    override onEnable() {
        super.onEnable();
        this._moveSpeed = 2;
    }

    protected onUpdate(): void {
        const { x, y, moveDir, collisionDir } = this;
        collisionDir.scale(moveDir.dot(collisionDir));
        moveDir.sub(collisionDir);
        this.pos(x + moveDir.x, y + moveDir.y, true);
    }
}