import * as websocket from "websocket";
import { EventDispatcher } from "../libs/event/EventDispatcher";
import { UserOutput } from "./interface/Interface";
import { UserData } from "./UserData";
export declare class Connection {
    private _listener;
    private _controllers;
    private _connection;
    private _playerData;
    get playerData(): UserData;
    get listener(): EventDispatcher;
    constructor(connection: websocket.connection);
    userLogin(data: any): void;
    response(data: UserOutput): void;
    private connectionClose;
}
