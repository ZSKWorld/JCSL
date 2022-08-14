import { Connection } from "./Connection";

class ConnectionMgr {
    private connectionMap: { [ uid: string ]: Connection } = {};
    addConnection(uid: string, connection: Connection) {
        this.connectionMap[ uid ] = connection;
    }

    removeConnection(uid: string) {
        delete this.connectionMap[ uid ];
    }

    getConnection(uid: string): Connection {
        return this.connectionMap[ uid ];
    }
}

export const connectionMgr = new ConnectionMgr();