import { Connection } from "../Connection";
export declare class BaseController {
    private _cmds;
    protected connection: Connection;
    constructor(connection: Connection);
    protected response(cmd: string, data?: object, error?: number): void;
}
export declare function AddCMD(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
