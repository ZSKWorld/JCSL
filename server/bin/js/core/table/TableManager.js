"use strict";
exports.__esModule = true;
exports.tableMgr = void 0;
var fs = require("fs");
var path = require("path");
var TableManager = /** @class */ (function () {
    function TableManager() {
    }
    TableManager.prototype.loadTable = function () {
        var _this = this;
        var tableData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../res/table/Config.json")).toString());
        if (tableData) {
            var keyMap_1 = tableData.keyMap;
            delete tableData.keyMap;
            var _loop_1 = function (tableKey) {
                var data = tableData[tableKey];
                Object.keys(data).forEach(function (dataKey) { return _this.decodeData(data[dataKey], keyMap_1); });
                this_1[tableKey] = data;
            };
            var this_1 = this;
            for (var tableKey in tableData) {
                _loop_1(tableKey);
            }
        }
    };
    TableManager.prototype.decodeData = function (data, keyMap) {
        var _this = this;
        if (data == null)
            return;
        if (typeof data != "object")
            return;
        Object.keys(data).forEach(function (key) {
            var _a;
            var temp = data[key];
            var type = (_a = temp === null || temp === void 0 ? void 0 : temp.constructor) === null || _a === void 0 ? void 0 : _a.name;
            if (type == "Object")
                _this.decodeData(temp, keyMap);
            else if (type == "Array")
                temp.forEach(function (v) { return _this.decodeData(v, keyMap); });
            data[keyMap[key]] = temp;
            delete data[key];
        });
    };
    return TableManager;
}());
exports.tableMgr = new TableManager();
