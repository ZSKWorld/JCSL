/**
 * @Author       : zsk
 * @Date         : 2022-08-15 23:09:57
 * @LastEditors  : zsk
 * @LastEditTime : 2022-09-04 20:43:02
 * @Description  : 各个服务器请求代理
 */

import { ProxyAdapter } from "../libs/utils/ProxyAdapter";
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