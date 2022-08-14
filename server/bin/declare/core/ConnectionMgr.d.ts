import { Connection } from "./Connection";
declare class ConnectionMgr {
    private connectionMap;
    addConnection(uid: string, connection: Connection): void;
    removeConnection(uid: string): void;
    getConnection(uid: string): Connection;
}
export declare const connectionMgr: ConnectionMgr;
export {};
