import { ProxyAdapter } from "../libs/utils/ProxyAdapter";
import { ILogin } from "./network/ILogin";
import { IRegister } from "./network/IRegister";
import { ServiceObj } from "./ServiceObj";
import { websocket } from "./WebSocket";
class BaseService<T> {
    protected _proxy: T;
    protected constructor() {
        this._proxy = ProxyAdapter(ServiceObj.Objs, {
            get(_target, property) {
                return (args: Object) => {
                    const netArgs = {
                        cmd: property
                    };
                    Object.assign(args, netArgs);
                    websocket.sendMsg(args);
                };
            }
        });
    }
}

function ServiceInst<T>() {
    return class ServiceInst extends BaseService<T>{
        protected static _inst: ServiceInst;
        static get Inst() { return (this._inst || (this._inst = new this()))._proxy; }
    }
}

export const LoginService = ServiceInst<ILogin>();
export const RegisterService = ServiceInst<IRegister>();