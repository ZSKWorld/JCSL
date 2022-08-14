export declare class Handler {
    protected static _pool: Handler[];
    private static _gid;
    protected _id: number;
    once: boolean;
    caller: Object | null;
    method: Function | null;
    args: any[] | null;
    constructor(caller?: Object | null, method?: Function | null, args?: any[] | null, once?: boolean);
    setTo(caller: any, method: Function | null, args: any[] | null, once?: boolean): this;
    run(): any;
    runWith(data: any): any;
    clear(): this;
    recover(): void;
    static create(caller: any, method: Function | null, args?: any[] | null, once?: boolean): Handler;
}
