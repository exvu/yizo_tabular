/// <reference path="../../typings/globals/yizo/index.d.ts" />
let AdminModel = require("../model/admin");
let fs = require('fs');
let jwt = require("../comment/jwt");
let { BaseError, Code } = yizo;
module.exports = class AdminController extends yizo.Controller {
  /**
   * 登录接口
   *  
   */
  async signin({ account, password }) {

    let model = new AdminModel();
    let data = await model.signIn({ account, password });

    let token = jwt.makeToken({ ...data, type: 'admin' })

    this.header('access-token',token)
    return this.json(data)
  }
}