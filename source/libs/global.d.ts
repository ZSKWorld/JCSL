declare interface ReadOnlyObject<T> {
    readonly [ key: string ]: T;
}

declare type Class<T> = new (...args: any) => T;

/** 向window注入变量 */

declare function windowImmit(name: string, obj: any): void;

declare namespace Laya {
    interface Script {
        /**
        * 鼠标离开舞台时执行
        * 此方法为虚方法，使用时重写覆盖即可
        */
        onStageMouseOut(): void;
    }
}