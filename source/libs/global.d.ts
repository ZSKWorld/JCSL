declare type Class<T> = new (...args: any) => T;

/** 向window注入变量 */

declare function windowImmit(name: string, obj: any): void;

declare type Point = { x: number, y: number };

declare type Recycle = { recycle?(): void };
declare type RecycleMethod = { onRecycle?(): void, onReuse?(): void };
declare type Recyclable<T> = T & Recycle;

declare namespace Laya {
    interface Vector2 {
        get length(): number;
        get lengthSquared(): number;
        add(v2: Vector2): Vector2;
        add(x: number, y: number): Vector2;
        sub(v2: Vector2): Vector2;
        scale(scale: number): Vector2;
        normalize(): Vector2;
        /**
         * 旋转向量，角度大于0 顺时针旋转，小于0 逆时针旋转
         * @param angle 
         */
        rotate(angle: number): Vector2;
        copyTo(v2: Vector2): Vector2;
    }
}

declare namespace fgui {
    interface GObject {

        addComponentIntance<T extends Laya.Component>(component: T): T;
        
        addComponent<T extends Laya.Component>(componentType: new () => T): T;

        getComponent<T extends Laya.Component>(componentType: new () => T): T;

        getComponents<T extends Laya.Component>(componentType: new () => T): T[];

        /**
         * 给当前GObject添加用on注册的事件锁，为空则为全局锁。
         * 全局锁 会阻止所有的事件触发， 而指定事件的锁只阻止指定的事件触发。全局锁和事件锁可以同时存在，所以只有全局锁和事件锁都移除才会触发事件
         * @param type 事件名称
         * @param lockChild 是否加锁子节点，默认true。 如果为true， 则子节点也会加对应事件锁
         */
        addEventLock(type?: string, lockChild?: boolean): void;

        hasEventLock(type?: string): boolean;

        /**
         * 移除当前GObject的事件锁，为空则移除全局锁
         * @param type 事件名称
         */
        removeEventLock(type?: string): void;

        /**移除所有事件锁 */
        removeAllEventLock(): void;
    }
}