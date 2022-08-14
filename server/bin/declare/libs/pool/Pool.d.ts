export declare const enum PoolKey {
    EventDispatcher = "EventDispatcher"
}
export declare class Pool {
    private static _pool;
    static get<T>(key: PoolKey, cls: new (...args: any) => T): T;
    static recover(key: PoolKey, value: any): void;
}
