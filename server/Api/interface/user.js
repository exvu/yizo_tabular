/// <reference path="../../typings/globals/yizo/index.d.ts" />
//@ts-check
let UserController = require("../controller/user");
let { Interface, Route, Validate } = yizo;
/**
 * 创建接口解析函数 将对应的接口解析到对应的controller的对应方法
 * 默认需要token
 */
Interface.create('/user', UserController, [
  //user登录接口
  Route('/signIn', 'post', 'signin', {
    verify: {
      account: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      password: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: false
  }),
  Route('/signUp', 'post', 'signUp', {
    verify: {
      account: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      password: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: false
  })
])