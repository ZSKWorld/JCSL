"use strict";
exports.__esModule = true;
exports.AddCMD = exports.BaseController = void 0;
var BaseController = /** @class */ (function () {
    function BaseController(connection) {
        this.connection = connection;
        if (this._cmds) {
            for (var key in this._cmds) {
                this.connection.listener.on(key, this, this[key]);
            }
        }
    }
    BaseController.prototype.response = function (cmd, data, error) {
        if (error === void 0) { error = 0 /* ErrorCode.None */; }
        if (this.connection) {
            var args = {
                cmd: cmd,
                error: error
            };
            if (data)
                args = Object.assign(args, data);
            this.connection.response(args);
        }
    };
    return BaseController;
}());
exports.BaseController = BaseController;
// export function AddCMD() {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         target._cmds = target._cmds || {};
//         target._cmds[ propertyKey ] = descriptor.value;
//     }
// }
function AddCMD(target, propertyKey, descriptor) {
    target._cmds = target._cmds || {};
    target._cmds[propertyKey] = propertyKey;
}
exports.AddCMD = AddCMD;
