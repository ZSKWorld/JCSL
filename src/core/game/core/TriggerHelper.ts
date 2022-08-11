import { Vector2 } from "../../libs/math/Vector2";
import { Logger } from "../../libs/utils/Logger";
import { EnemyBase } from "../role/EnemyBase";
import { GameObject } from "./GameObject";

const enum TriggerState {
    None,
    Enter,
    Stay,
}

const logger = Logger.Create("TriggerHelper").setEnable(true);

export class TriggerHelper {
    private static tempV20 = new Vector2();
    // private static tempV21 = new Vector2();
    private static triggerStateMap: { [ key: string ]: TriggerState } = {};

    static checkTrigger() {
        const allObjs: GameObject[][] = [];
        const enemys: EnemyBase[] = [];
        for (const value of GameObject.instances.values()) {
            allObjs.push(value);
            if (value.length && value[ 0 ] instanceof EnemyBase) {
                enemys.push(...(value as EnemyBase[]));
            }
        }
        const triggerMap = this.triggerStateMap;
        const len = allObjs.length;
        let arrA: GameObject[], arrB: GameObject[];
        let lenA: number, lenB: number;
        let objA: GameObject, objB: GameObject;
        let triggerSignA: string, triggerSignB: string;
        let i: number, j: number, x: number, y: number;
        for (i = 0; i < len; i++) {
            arrA = allObjs[ i ];
            objA = arrA[ 0 ];
            if (!objA.colliderEnable) continue;
            lenA = arrA.length;
            for (j = i + 1; j < len; j++) {
                arrB = allObjs[ j ];
                objB = arrB[ 0 ];
                if (!objB.colliderEnable) continue;
                if (objA.camp == objB.camp) continue;
                lenB = arrB.length;
                for (x = 0; x < lenA; x++) {
                    objA = arrA[ x ];
                    for (y = 0; y < lenB; y++) {
                        objB = arrB[ y ];
                        triggerSignA = objA.gid + "" + objB.gid;
                        triggerSignB = objB.gid + "" + objA.gid;
                        if (((objA.x - objB.x) ** 2 + (objA.y - objB.y) ** 2) <= (objA.colliderRadius + objB.colliderRadius) ** 2) {
                            if (!triggerMap[ triggerSignA ] && !triggerMap[ triggerSignB ]) {
                                triggerMap[ triggerSignA ] = TriggerState.Enter;
                                triggerMap[ triggerSignB ] = TriggerState.Enter;
                                objA.onTriggerEnter(objB);
                                objB.onTriggerEnter(objA);
                            } else {
                                triggerMap[ triggerSignA ] = TriggerState.Stay;
                                triggerMap[ triggerSignB ] = TriggerState.Stay;
                                objA.onTriggerStay(objB);
                                objB.onTriggerStay(objA);
                            }
                        } else {
                            if (triggerMap[ triggerSignA ] || triggerMap[ triggerSignB ]) {
                                objA.onTriggerExit(objB);
                                objB.onTriggerExit(objA);
                                triggerMap[ triggerSignA ] = null;
                                triggerMap[ triggerSignB ] = null;
                            }
                        }
                    }
                }
            }
        }

        const enemyCount = enemys.length;
        let enemyA: EnemyBase, enemyB: EnemyBase, tempEnemy: EnemyBase;
        const { tempV20 } = this;
        for (i = 0; i < enemyCount; i++) {
            enemyA = enemys[ i ];
            if (!enemyA.colliderEnable) continue;
            if (!enemyA.collisionEnemyEnable) continue;
            for (j = i + 1; j < enemyCount; j++) {
                enemyB = enemys[ j ];
                if (enemyA == enemyB) continue;
                if (!enemyB.colliderEnable) continue;
                if (!enemyB.collisionEnemyEnable) continue;

                tempV20.setValue(enemyA.x - enemyB.x, enemyA.y - enemyB.y);
                if (tempV20.lengthSquared <= (enemyA.colliderRadius + enemyB.colliderRadius) ** 2) {
                    if (Vector2.dot(enemyB.moveDir, tempV20) > 0) tempEnemy = enemyB;
                    else if (Vector2.dot(enemyA.moveDir, tempV20.scale(- 1)) > 0) tempEnemy = enemyA;
                    else continue;
                    tempEnemy.collisionDir.add(tempV20.normalize());//.normalize();
                }
            }
        }

    }
}