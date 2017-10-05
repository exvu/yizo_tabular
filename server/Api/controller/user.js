/// <reference path="../../typings/globals/yizo/index.d.ts" />
let UserModel = require("../model/user");
let fs = require('fs');
let jwt = require("../comment/jwt");
let { BaseError, Code } = yizo;
module.exports = class UserController extends yizo.Controller {
  /**
   * 登录接口
   *  
   */
  async signin({ account, password }) {
    let model = new UserModel();
    let data = await model.signIn({ account, password });

    let token = jwt.makeToken({ id: data['uid'], _c: data['_c'], type: 'user' })

    this.header('access-token', token)
    return this.json(data)
  }

  /**
   * 注册  自动登录
   */
  async signUp({ account, password }) {
    let model = new UserModel();
    let result = await model.signUp({ account, password });
    if (!result) {
      return this.json(false);
    }
    let data = await model.signIn({ account, password });
    let token = jwt.makeToken({ ...data, type: 'user' })
    this.header('access-token', token)
    return this.json(data)
  }
}