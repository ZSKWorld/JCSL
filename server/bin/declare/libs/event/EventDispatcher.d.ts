export declare class EventDispatcher {
    private _events;
    hasListener(type: string): boolean;
    event(type: string, data?: any): boolean;
    on(type: string, caller: any, listener: Function, args?: any[]): this;
    once(type: string, caller: any, listener: Function, args?: any[]): this;
    off(type: string, caller: any, listener: Function, onceOnly?: boolean): this;
    offAll(type?: string): this;
    offAllCaller(caller: any): this;
    private _createListener;
    private _recoverHandlers;
}
