import * as websocket from "websocket";
import { EventDispatcher } from "../libs/event/EventDispatcher";
import { Pool, PoolKey } from "../libs/pool/Pool";
import { connectionMgr } from "./ConnectionMgr";
import { LoginController } from "./controller/LoginController";
import { RegisterController } from "./controller/RegisterController";
import { ErrorCode } from "./ErrorCode";
import { UserInput, UserOutput } from "./interface/Interface";
import { UserData } from "./UserData";
export class Connection {
    private _listener = Pool.get(PoolKey.EventDispatcher, EventDispatcher);
    private _controllers = [
        new RegisterController(this),
        new LoginController(this),
    ];

    private _connection: websocket.connection;
    private _playerData: UserData;
    get playerData() { return this._playerData; }
    get listener() { return this._listener; }
    constructor(connection: websocket.connection) {
        this._connection = connection;
        connection.on('message', (message) => {
            if (message.type === 'utf8') {
                const data: UserInput = JSON.parse(message.utf8Data);
                if (this._listener.hasListener(data.cmd))
                    this._listener.event(data.cmd, data);
                else
                    this.response({ cmd: data.cmd, error: ErrorCode.UnknownCmd });
            }
            // else if (message.type === 'binary') {
            //     connection.sendBytes(message.binaryData);
            // }
        });
        connection.on('close', (code, desc) => {
            this.connectionClose();
        });
    }

    userLogin(data: any) {
        this._playerData = new UserData();
        this._playerData.initData(data);
        const oldConnection = connectionMgr.getConnection(this._playerData.uid);
        if (oldConnection) {
            oldConnection.response({ cmd: "", error: ErrorCode.LOGIN_OTHER_PLACE });
            oldConnection._connection.close(0, "login other place");
        }
        connectionMgr.addConnection(this._playerData.uid, this);
    }

    response(data: UserOutput) {
        this._connection.sendUTF(JSON.stringify(data));
    }

    private connectionClose() {
        if (this._playerData) {
            this._playerData.save();
            connectionMgr.removeConnection(this._playerData.uid);
        }
        this._listener.offAll();
        Pool.recover(PoolKey.EventDispatcher, this._listener);
        this._listener = null;
        this._connection = null;
        this._playerData = null;
        this._controllers = null;
    }
}