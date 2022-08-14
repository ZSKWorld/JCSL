import { ILogin } from "../network/ILogin";
import { BaseService } from "./BaseService";

export class LoginService extends BaseService<ILogin> {
    protected static _inst: LoginService;
    static get Inst() { return (this._inst || (this._inst = new this()))._proxy; }
}