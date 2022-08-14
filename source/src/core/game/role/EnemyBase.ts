import { Logger } from "../../libs/utils/Logger";
import { Camp } from "../core/GameInterface";
import { RoleBase } from "./RoleBase";

const logger = Logger.Create("EnemyBase").setEnable(true);

export abstract class EnemyBase extends RoleBase {
    protected _collisionEnemyEnable = true;
    get collisionEnemyEnable() { return this._collisionEnemyEnable; }

    override onAwake() {
        super.onAwake();
        this._camp = Camp.Enemy;
    }
}