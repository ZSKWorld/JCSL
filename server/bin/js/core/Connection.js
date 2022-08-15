"use strict";
exports.__esModule = true;
exports.Connection = void 0;
var EventDispatcher_1 = require("../libs/event/EventDispatcher");
var Pool_1 = require("../libs/pool/Pool");
var ConnectionMgr_1 = require("./ConnectionMgr");
var HeartController_1 = require("./controller/HeartController");
var LoginController_1 = require("./controller/LoginController");
var RegisterController_1 = require("./controller/RegisterController");
var UserData_1 = require("./UserData");
var Connection = /** @class */ (function () {
    function Connection(connection) {
        var _this = this;
        this._listener = Pool_1.Pool.get("EventDispatcher" /* PoolKey.EventDispatcher */, EventDispatcher_1.EventDispatcher);
        this._controllers = [
            new HeartController_1.HeartController(this),
            new RegisterController_1.RegisterController(this),
            new LoginController_1.LoginController(this),
        ];
        this._connection = connection;
        connection.on('message', function (message) {
            if (message.type === 'utf8') {
                var data = JSON.parse(message.utf8Data);
                if (_this._listener.hasListener(data.cmd))
                    _this._listener.event(data.cmd, data);
                else
                    _this.response({ cmd: data.cmd, error: 1000 /* ErrorCode.UnknownCmd */ });
            }
            // else if (message.type === 'binary') {
            //     connection.sendBytes(message.binaryData);
            // }
        });
        connection.on('close', function (code, desc) {
            _this.connectionClose();
        });
    }
    Object.defineProperty(Connection.prototype, "logined", {
        get: function () { return this._logined; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "playerData", {
        get: function () { return this._playerData; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "listener", {
        get: function () { return this._listener; },
        enumerable: false,
        configurable: true
    });
    Connection.prototype.userLogin = function (data) {
        this._playerData = new UserData_1.UserData();
        this._playerData.initData(data);
        var oldConnection = ConnectionMgr_1.connectionMgr.getConnection(this._playerData.uid);
        if (oldConnection) {
            oldConnection.response({ cmd: "", error: 1007 /* ErrorCode.LOGIN_OTHER_PLACE */ });
            oldConnection._connection.close(0, "login other place");
        }
        ConnectionMgr_1.connectionMgr.addConnection(this._playerData.uid, this);
        this._logined = true;
    };
    Connection.prototype.response = function (data) {
        if (this.logined)
            this._connection.sendUTF(JSON.stringify(data));
    };
    Connection.prototype.connectionClose = function () {
        if (this._playerData) {
            this._playerData.save();
            ConnectionMgr_1.connectionMgr.removeConnection(this._playerData.uid);
        }
        this._listener.offAll();
        Pool_1.Pool.recover("EventDispatcher" /* PoolKey.EventDispatcher */, this._listener);
        this._controllers.forEach(function (v) { return v.clear(); });
        this._logined = false;
        this._listener = null;
        this._connection = null;
        this._playerData = null;
        this._controllers = null;
    };
    return Connection;
}());
exports.Connection = Connection;
