"use strict";
exports.__esModule = true;
exports.UserData = void 0;
var Util_1 = require("../utils/Util");
var UserData = /** @class */ (function () {
    function UserData(account, password, nickname) {
        if (account === void 0) { account = ""; }
        if (password === void 0) { password = ""; }
        if (nickname === void 0) { nickname = ""; }
        this.uid = Util_1.Util.CreateUID();
        this.nickname = "";
        this.account = "";
        this.password = "";
        this.account = String(account);
        this.password = String(password);
        this.nickname = String(nickname);
    }
    UserData.prototype.initData = function (data) {
        var _this = this;
        Object.keys(data).forEach(function (v) { return _this[v] = data[v]; });
    };
    UserData.prototype.save = function () {
        Util_1.Util.saveData(this);
    };
    return UserData;
}());
exports.UserData = UserData;
