import { Handler } from "./Handler";
export declare class EventHandler extends Handler {
    protected static _pool: EventHandler[];
    recover(): void;
    static create(caller: any, method: Function | null, args?: any[] | null, once?: boolean): EventHandler;
}
