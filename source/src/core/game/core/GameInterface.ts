import { GameObject } from "./GameObject";

export interface ITrigger {
    onTriggerEnter(other: GameObject): void;
    onTriggerStay(other: GameObject): void;
    onTriggerExit(other: GameObject): void;
}

export const enum GamePoolKey{
    Enemy_Fllow = "Enemy_Fllow",

    //以下为武器类型
    Weapon_JingGangFu = "Weapon_Base",
}

/**阵营 */
export const enum Camp {
    None,
    Enemy,
    Player,
}

export const enum GameEvent {

}