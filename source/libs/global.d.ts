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

declare namespace fgui{
    interface GObject {

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

		/**
		 * 移除当前GObject的事件锁，为空则移除全局锁
		 * @param type 事件名称
		 */
		removeEventLock(type?: string): void;

		/**移除所有事件锁 */
		removeAllEventLock(): void;
    }
}