import { IRegister } from "../network/IRegister";
import { BaseService } from "./BaseService";

export class RegisterService extends BaseService<IRegister>{
    protected static _inst: RegisterService;
    static get Inst() { return (this._inst || (this._inst = new this()))._proxy; }
}