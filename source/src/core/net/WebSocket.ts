import { NotifyConst } from "../common/NotifyConst";
import { Observer } from "../libs/event/Observer";
import { Logger } from "../libs/utils/Logger";
import { NetResponse } from "./NetResponse";
import { UserInput, UserOutput } from "./network/Interface";

const logger = Logger.Create("WebSocket").setEnable(true);

/**
* @Author       : zsk
* @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 22:21:33
* @Description  : 
*/
class WebSocket extends Observer {
    private url: string = "ws://192.168.1.19:3000";
    private socket: Laya.Socket;
    private waitList: UserInput[];
    private current: UserInput;
    get connected(): boolean { return this.socket.connected; }

    init(): void {
        this.waitList = [];
        this.socket = new Laya.Socket();
        this.socket.connectByUrl(this.url);
        this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this.socket.on(Laya.Event.MESSAGE, this, this.onSocketMessage);
        this.socket.on(Laya.Event.ERROR, this, this.onSocketError);
        this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
    }

    sendMsg(msg: UserInput): void {
        if (this.current && msg.cmd == this.current.cmd) return;
        const waitList = this.waitList;
        if (waitList.length > 0) {
            for (let i = waitList.length - 1; i >= 0; i--) {
                if (waitList[ i ].cmd == msg.cmd) return;
            }
        }
        this.waitList.push(msg);
        this.executeWaitMsg();
    }

    private onSocketOpen(): void {
        this.executeWaitMsg();
        this.dispatch(NotifyConst.SocketOpened);
    }

    private onSocketMessage(message: string): void {
        const msg: UserOutput = JSON.parse(message);
        if (msg && !msg.error) {
            this.dispatch(`Response_${ msg.cmd[ 0 ].toUpperCase() + msg.cmd.substring(1) }`, msg);
            if (msg.syncInfo) this.dispatch(NetResponse.SyncInfo, msg.syncInfo);
            if (this.current && this.current.cmd == msg.cmd)
                this.current = null;
        } else {
            this.dispatch(NotifyConst.NetMsgError, msg);
            this.current = null;
        }

        this.socket.input.clear();
        this.executeWaitMsg();
    }

    private onSocketError(e): void { }

    private onSocketClose(): void {
        this.socket.connectByUrl(this.url);
        this.dispatch(NotifyConst.SocketClosed);
    }

    private executeWaitMsg(): void {
        if (this.waitList.length > 0 && !this.current && this.connected) {
            const msg = this.waitList.shift();
            this.current = msg;
            this.socket.send(JSON.stringify(msg));
        }
    }
}

export const websocket = new WebSocket();
windowImmit("websocket", websocket)