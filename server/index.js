/// <reference path="./typings/globals/yizo/index.d.ts" />
'use strict';
let path = require('path');
global['APP_PATH'] = path.join(__dirname, 'Api');
global['YIZO_PATH'] = path.join(__dirname, 'Yizo');
let Server = require("./Yizo/server");
let server = new Server();
/**
 * 设置中间件
 */
server.middleware = (app)=>{

}

/**
 * 启动服务器
 */
server.run();