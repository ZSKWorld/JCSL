import { Logger } from "../../libs/utils/Logger";
import { MovementBase } from "../moveController/MovementBase";
import { EnemyBase } from "../role/EnemyBase";
import { GameObject } from "./GameObject";

const enum TriggerState {
    None,
    Enter,
    Stay,
}

const logger = Logger.Create("TriggerHelper", true);

export class TriggerHelper {
    private static tempV20 = new Laya.Vector2();
    private static triggerStateMap: { [ key: string ]: TriggerState } = {};

    static checkTrigger() {
        const allObjs: GameObject[][] = [];
        for (const value of GameObject.instances.values()) {
            allObjs.push(value);
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

        const movements = MovementBase.instances.get("Movement_FollowPlayer");
        if (movements?.length) {
            const moveCount = movements.length;
            let ownerA: EnemyBase, ownerB: EnemyBase;
            let moveA: MovementBase, moveB: MovementBase, tempmove: MovementBase;
            const { tempV20 } = this;
            for (i = 0; i < moveCount; i++) {
                moveA = movements[ i ];
                ownerA = moveA.owner as EnemyBase;
                if (!ownerA.colliderEnable) continue;
                if (!ownerA.collisionEnemyEnable) continue;
                for (j = i + 1; j < moveCount; j++) {
                    moveB = movements[ j ];
                    ownerB = moveB.owner as EnemyBase;
                    if (moveA == moveB) continue;
                    if (!ownerB.colliderEnable) continue;
                    if (!ownerB.collisionEnemyEnable) continue;

                    tempV20.setValue(ownerA.x - ownerB.x, ownerA.y - ownerB.y);
                    if (tempV20.lengthSquared <= (ownerA.colliderRadius + ownerB.colliderRadius) ** 2) {
                        if (Laya.Vector2.dot(moveB.moveDir, tempV20) > 0) tempmove = moveB;
                        else if (Laya.Vector2.dot(moveA.moveDir, tempV20.scale(- 1)) > 0) tempmove = moveA;
                        else continue;
                        tempmove.collisionDir.add(tempV20.normalize()).normalize();
                    }
                }
            }
        }
    }
}