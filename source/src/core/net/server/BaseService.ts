import { ProxyAdapter } from "../../libs/utils/ProxyAdapter";
import { websocket } from "../WebSocket";
import { ServiceObj } from "./ServiceObj";

export class BaseService<T>{

    protected _proxy: T;

    protected constructor() {
        this._proxy = ProxyAdapter(ServiceObj.Objs, {
            get(_target, property) {
                return (args: Object) => {
                    const netArgs = {
                        cmd: property
                    };

                    Object.assign(args, netArgs);
                    return websocket.sendMsg(args);
                };
            }
        });
    }
}