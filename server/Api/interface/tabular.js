/// <reference path="../../typings/globals/yizo/index.d.ts" />
//@ts-check
let TabularController = require("../controller/tabular");
let { Interface, Route, Validate } = yizo;
/**signin
 * 创建接口解析函数 将对应的接口解析到对应的controller的对应方法
 * 默认需要token
 */
Interface.create('/tabular', TabularController, [
  /**
   * 获取表单列表
   */
  Route('/', 'get', 'list', {
    verify: {
      page: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      pageSize: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      needPage: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      creater: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
  /**
   * 获取指定表单信息
   */
  Route("/:id",'get',"info",{
    verify:{
    },
    needToken:true
  }),
  /**
   * 添加
   */
  Route('/', 'post', 'add', {
    verify: {
      title: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      explanation: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      endTime: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
  /**
   * 修改表单信息
   */
  Route('/:id', 'put', 'update', {
    verify: {
      title: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      explanation: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      status: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
  /**
   * 删除表单
   */
  Route('/', 'delete', 'delete', {
    verify: {
      ids: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
  /**
   * 添加字段
   */
  Route('/field', 'post', 'addField', {
    verify: {
      tabular_id: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      name: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      type: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      explanation: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      require: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      default_value: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      options: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
  /**
   * 字段排序
   */
  Route('/field/sort/:id','put','sortField',{
    verify:{
      field_id:{
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      type:{
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken:false
  }),
  /**
   * 删除字段
   */
  Route("/field",'delete','deleteField',{
    verify:{
      ids:{
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken:true
  })
])