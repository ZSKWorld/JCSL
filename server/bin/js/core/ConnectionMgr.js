"use strict";
exports.__esModule = true;
exports.connectionMgr = void 0;
var ConnectionMgr = /** @class */ (function () {
    function ConnectionMgr() {
        this.connectionMap = {};
    }
    ConnectionMgr.prototype.addConnection = function (uid, connection) {
        this.connectionMap[uid] = connection;
    };
    ConnectionMgr.prototype.removeConnection = function (uid) {
        delete this.connectionMap[uid];
    };
    ConnectionMgr.prototype.getConnection = function (uid) {
        return this.connectionMap[uid];
    };
    return ConnectionMgr;
}());
exports.connectionMgr = new ConnectionMgr();
