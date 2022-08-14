"use strict";
exports.__esModule = true;
var http = require("http");
var websocket = require("websocket");
var Connection_1 = require("./core/Connection");
var Logger_1 = require("./utils/Logger");
Logger_1.Logger.setEnable(true);
var server = http.createServer(function (request, response) {
    response.writeHead(200);
    response.end();
}).listen({ port: 3000, host: "192.168.1.19" }, function () {
    Logger_1.Logger.log("服务器已启动，端口号：" + server.address().port, "green" /* Color.green */);
});
var wsServer = new websocket.server({ httpServer: server, autoAcceptConnections: false });
wsServer.on('request', function (request) {
    var connection = request.accept();
    //request.resourceURL
    Logger_1.Logger.log("".concat(connection.remoteAddress, "\uFF1A\u901A\u4FE1\u5DF2\u8FDE\u63A5\uFF0C\u8FDE\u63A5\u6570\u91CF\uFF1A").concat(wsServer.connections.length), "green" /* Color.green */);
    new Connection_1.Connection(connection);
});
wsServer.on("connect", function (connection) {
    Logger_1.Logger.log("wsServer connect");
});
wsServer.on("close", function (connection, reson, desc) {
    Logger_1.Logger.log("".concat(connection.remoteAddress, "\uFF1A\u65AD\u5F00\u8FDE\u63A5\u3002").concat(reson, "-").concat(desc), "red" /* Color.red */);
    Logger_1.Logger.log("\u5269\u4F59\u8FDE\u63A5\u6570\u91CF\uFF1A".concat(wsServer.connections.length));
});
