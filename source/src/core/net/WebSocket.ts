import { Observer } from "../libs/event/Observer";
import { Logger } from "../libs/utils/Logger";
import { UserInput, UserOutput } from "./network/Interface";

const logger = Logger.Create("WebSocket").setEnable(true);
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
        if (this.current && msg.cmd == this.current.cmd) {
            return;
        }
        const waitList = this.waitList;
        if (waitList.length > 0) {
            for (let i = waitList.length - 1; i >= 0; i--) {
                if (waitList[ i ].cmd == msg.cmd) return;
            }
        }
        if (msg.cmd == "reconect") this.waitList.unshift(msg);
        else this.waitList.push(msg);
        this.executeWaitMsg();
    }

    private onSocketOpen(): void {
        logger.log("socket open");
        this.executeWaitMsg();
    }

    private onSocketMessage(message: string): void {
        const msg: UserOutput = JSON.parse(message);
        if (msg && !msg.error) {
            if (this.current && this.current.cmd == msg.cmd) {
                this.dispatch(`Response_${ msg.cmd[ 0 ].toUpperCase() + msg.cmd.substring(1) }`, msg);
                //发送事件
                this.current = null;
            }
        } else {

            this.current = null;
        }

        this.socket.input.clear();
        this.executeWaitMsg();
    }

    private onSocketError(e): void {
        logger.error("socket error");
        // this.onSocketClose();
    }

    private onSocketClose(): void {
        logger.warn("socket close");
        this.socket.connectByUrl(this.url);
        logger.log("socket reconnectting...");
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